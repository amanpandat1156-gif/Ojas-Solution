"use client";

import { useState, useRef, useEffect } from "react";
import { useMessages } from "@/hooks/use-messages";
import { Send, Users, ShieldAlert, ShieldCheck, Search, Flame, ArrowLeft, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_ROOMS = [
  { id: "nofap", tag: "ADDICTION", title: "NoFap Support 90-Day Challenge", healers: "142", icons: ["🦁", "🌿", "🛡️"] },
  { id: "pcod", tag: "WOMEN'S HEALTH", title: "PCOD Sisters & Natural Relief", healers: "86", icons: ["🌸", "👩‍🦱", "✨"] },
  { id: "vata", tag: "AYURVEDA", title: "Vata Balancing Group", healers: "45", icons: ["🍃", "🍵", "🧘"] },
  { id: "anxiety", tag: "MENTAL HEALTH", title: "Anxiety & Exam Stress Vent", healers: "234", icons: ["🧠", "📚", "💨"] },
  { id: "mindful", tag: "MINDFULNESS", title: "Meditation Daily Check-ins", healers: "67", icons: ["✨", "👁️", "🧘‍♂️"] },
  { id: "relationships", tag: "RELATIONSHIPS", title: "Recovering from Breakups", healers: "189", icons: ["💔", "❤️‍🩹", "🫂"] },
];

export default function CommunityPage() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto w-full min-h-[calc(100vh-8rem)] flex flex-col p-4 sm:p-8 mt-16 md:mt-0 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!activeRoom ? (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col w-full h-full"
          >
            {/* Header & Search Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 w-full glass-card p-6 md:p-8 bg-dark-surface/50 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              <div>
                <h1 className="text-4xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
                  Live Rooms <Flame className="text-primary" size={32} />
                </h1>
                <p className="text-text-secondary text-base">Join an active anonymous voice or chat room to heal together.</p>
              </div>
              <div className="relative w-full lg:w-96 shrink-0 z-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search active rooms..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-text-muted/70 shadow-inner"
                />
              </div>
            </div>

            {/* Encrypted Pill Box wrapper */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-dark-surface/80 shadow-md text-[10px] sm:text-xs font-bold tracking-widest text-text-muted uppercase">
                <ShieldCheck size={16} className="text-primary opacity-80" /> End-to-end encrypted & anonymous
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {MOCK_ROOMS.map((room) => (
                <div 
                  key={room.id} 
                  className="glass-card p-6 md:p-7 flex flex-col justify-between group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 bg-dark-surface/60 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
                  onClick={() => setActiveRoom(room.id)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {/* Card Header Top */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-black tracking-widest uppercase text-primary border border-primary/20 bg-primary/10 px-3 py-1 rounded-full">
                      {room.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" /> LIVE
                    </div>
                  </div>

                  {/* Card Title */}
                  <div className="mb-6 flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">{room.title}</h3>
                    <p className="flex items-center gap-2 text-sm text-text-secondary font-medium"><Users size={16} /> <strong className="text-white/90">{room.healers}</strong> active healers</p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 border-t border-white/5">
                    <div className="flex -space-x-2">
                       {room.icons.map((icon, i) => (
                         <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center text-xs shadow-md z-10 shrink-0">
                           {icon}
                         </div>
                       ))}
                    </div>
                    <span className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">
                      Join Room <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col"
          >
            <ChatRoom roomId={activeRoom} onBack={() => setActiveRoom(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Extracted ChatRoom Component from the previous step
function ChatRoom({ roomId, onBack }: { roomId: string, onBack: () => void }) {
  const { messages, loading, addMessage } = useMessages();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  
  const roomInfo = MOCK_ROOMS.find(r => r.id === roomId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage("user", input);
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0 bg-dark-surface/50 border border-white/10 glass-card p-3 sm:p-4 shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 leading-tight">
              {roomInfo?.title || "Community Room"}
            </h1>
            <div className="text-xs text-primary font-medium tracking-wide flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(0,255,255,0.8)]" /> {roomInfo?.healers || 0} active</div>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent active:bg-white/5 transition-colors border-transparent text-text-muted hover:text-white shrink-0">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col relative border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.02)] bg-dark-surface/40">
        {/* Chat message list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scroll-smooth relative z-10 w-full">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted opacity-70">
              <ShieldAlert className="w-12 h-12 mb-3 text-primary/40" />
              <p className="text-sm font-medium">It's quiet here. Be the first to open up.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex flex-col w-full animate-fade-in-up">
                <div className={`p-3.5 sm:p-4 rounded-[20px] relative group w-fit max-w-[85%] sm:max-w-[70%] text-sm sm:text-base leading-relaxed break-words ${
                  msg.role === 'assistant'
                    ? 'bg-white/5 border border-white/10 text-white/90 rounded-tl-sm self-start shadow-sm'
                    : 'bg-primary border border-primary/20 text-deep-navy shadow-[0_4px_15px_rgba(0,255,255,0.25)] rounded-tr-sm self-end font-medium'
                }`}>
                   <p className="whitespace-pre-wrap">{msg.content}</p>
                   <span className={`absolute -bottom-5 text-[10px] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity ${
                     msg.role === 'assistant' ? 'left-2 text-text-muted' : 'right-2 text-primary/70'
                   }`}>
                     {msg.timestamp?.toDate ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                   </span>
                </div>
              </div>
            ))
          )}
          <div ref={endRef} className="h-4" />
        </div>

        {/* Chat input */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-dark-surface/90 backdrop-blur-xl relative z-20">
          <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto w-full group">
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Share anonymously..."
               className="w-full bg-background/50 border border-white/10 rounded-full py-3.5 px-6 pr-14 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 focus:bg-background transition-all text-white placeholder-text-muted/60 shadow-inner group-focus-within:shadow-[0_0_20px_rgba(0,255,255,0.05)]"
               maxLength={500}
               autoFocus
             />
             <button
               type="submit"
               disabled={!input.trim()}
               className="absolute right-2 px-3.5 py-2 bg-primary text-deep-navy font-bold rounded-full disabled:opacity-40 disabled:scale-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)]"
             >
               <Send size={16} className="-ml-0.5" />
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}
