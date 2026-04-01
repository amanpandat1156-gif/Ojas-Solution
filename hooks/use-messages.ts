import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: any;
};

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: If you want user-specific messages, you should filter by a user/session ID.
    // For now, this fetches all messages in the collection.
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgsData: Message[] = [];
      snapshot.forEach((doc) => {
        msgsData.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addMessage = async (role: 'user' | 'assistant', content: string) => {
    try {
      await addDoc(collection(db, 'messages'), {
        role,
        content,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return { messages, loading, addMessage };
}
