import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, arrayUnion, query, orderBy, serverTimestamp, getDocs } from 'firebase/firestore';
import type { Post, AISummary } from '@/components/feed/post-item';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData: Post[] = [];
      snapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(postData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async (content: string, tag: string, author: { name: string, avatar: string }) => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        content,
        tag,
        author,
        timeAgo: 'Just now', // Ideally use created_at to calculate visually, but using this for simple match with existing component format
        upvotes: 0,
        comments: 0,
        replies: [],
        createdAt: serverTimestamp()
      });

      // Fetch AI summary in the background
      fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
      .then(res => res.json())
      .then(async (aiSummary) => {
        if (!aiSummary.error) {
          await updateDoc(docRef, { aiSummary });
        }
      })
      .catch(err => console.error("Error fetching AI summary:", err));

    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const addReply = async (postId: string, content: string, authorName: string, avatar: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const newReply = {
        id: Date.now().toString(),
        author: authorName,
        avatar,
        content,
        timeAgo: 'Just now'
      };
      
      await updateDoc(postRef, {
        replies: arrayUnion(newReply),
        comments: 1 // In reality, we'd increment this, but array size usually rules.
      });
    } catch (error) {
      console.error("Error replying to post:", error);
    }
  };

  const toggleUpvote = async (postId: string, currentUpvotes: number, upvoting: boolean) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        upvotes: upvoting ? currentUpvotes + 1 : currentUpvotes - 1
      });
    } catch (error) {
      console.error("Error toggling upvote:", error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      // Need import { deleteDoc } from 'firebase/firestore';
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'posts', postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return { posts, loading, addPost, addReply, toggleUpvote, deletePost };
}
