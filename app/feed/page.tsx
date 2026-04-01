"use client";

import { useState } from "react";
import { PostComposer } from "@/components/feed/post-composer";
import { PostItem, Post } from "@/components/feed/post-item";
import { Flame, Sparkles, Clock, Hash, TrendingUp, ShieldAlert, Award, ArrowRight, Search, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { usePosts } from "@/hooks/use-posts";

const feedTabs = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "new", label: "New Space", icon: Clock },
  { id: "ai-picks", label: "Ojas AI Picks", icon: Sparkles },
];

const mockPosts: Post[] = [
  {
    id: "m1",
    author: { name: "Aranya_H", avatar: "🌸" },
    content: "My irregular cycles and intense fatigue from PCOS are getting out of hand. Does anyone have natural ways to manage this?",
    timeAgo: "2h ago",
    tag: "Women's Health",
    upvotes: 145,
    comments: 12,
    aiSummary: {
      level: "info",
      insight: "PCOS is complex but natural management is highly effective.",
      ayurvedic: ["Shatavari (balances hormones)", "Kanchanar Guggulu"],
      lifestyle: "Try seed cycling and significantly reduce refined sugar.",
      medical: "Please ensure you get an ultrasound and a detailed hormonal profile."
    }
  },
  {
    id: "m2",
    author: { name: "ExamWarrior", avatar: "📚" },
    content: "I have exams next week and the brain fog and stress are literally paralyzing me. Help!",
    timeAgo: "4h ago",
    tag: "Anxiety Help",
    upvotes: 210,
    comments: 8,
    aiSummary: {
      level: "success",
      insight: "Exam stress often triggers brain fog. Grounding is key.",
      ayurvedic: ["Brahmi or Shankhpushpi for focus", "Warm milk with a pinch of nutmeg before bed"],
      lifestyle: "Study in 45-minute blocks with 10-minute movement breaks."
    }
  },
  {
    id: "m3",
    author: { name: "ClaritySeeker", avatar: "🛡️" },
    content: "Day 60 of NoFap. The urges are still there sometimes, but my mental clarity and energy levels are insane right now. Keep going guys!",
    timeAgo: "5h ago",
    tag: "NoFap Journey",
    upvotes: 432,
    comments: 24,
    aiSummary: {
      level: "success",
      insight: "Congratulations! 60 days is a major milestone for neuroplasticity.",
      lifestyle: "Channel this new energy into physical training or creative pursuits."
    }
  },
  {
    id: "m4",
    author: { name: "DigitalNomad", avatar: "📱" },
    content: "My chronic anxiety peaks when I scroll reels. What's a realistic digital detox routine that won't make me feel isolated?",
    timeAgo: "8h ago",
    tag: "Mental Health",
    upvotes: 189,
    comments: 15,
    aiSummary: {
      level: "info",
      insight: "Short-form content spikes cortisol and fragments attention.",
      lifestyle: "Try a 'Screen-Free Morning'—no phone for the first hour after waking."
    }
  },
  {
    id: "m5",
    author: { name: "SleeplessYogi", avatar: "🧘" },
    content: "I keep waking up at 3 AM and can't go back to sleep. Heard it's a Vata imbalance. How do I fix this 'Tridosha' issue?",
    timeAgo: "12h ago",
    tag: "Ayurveda",
    upvotes: 87,
    comments: 9,
    aiSummary: {
      level: "info",
      insight: "3 AM to 5 AM is the Vata time of day, often causing restless awakenings.",
      ayurvedic: ["Rub sesame oil on the soles of your feet before bed"],
      lifestyle: "Avoid screens and heavy meals after 8 PM."
    }
  },
  {
    id: "m6",
    author: { name: "MorningSun", avatar: "☀️" },
    content: "Started doing 12 rounds of Surya Namaskar at sunrise. The difference in my focus and mood throughout the day is unbelievable.",
    timeAgo: "1d ago",
    tag: "Meditation",
    upvotes: 520,
    comments: 31,
    aiSummary: {
      level: "success",
      insight: "Surya Namaskar is a complete mind-body workout that balances all doshas.",
      lifestyle: "Pair it with 5 minutes of mindful breathing (Pranayama) afterwards."
    }
  }
];

const trendingTags = [
  { tag: "NoFap Journey", count: "89" },
  { tag: "Ayurvedic Remedies", count: "45" },
  { tag: "PCOD & Women's Health", count: "34" },
  { tag: "Anxiety Help", count: "28" },
  { tag: "Meditation", count: "12" }
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const { posts, loading, addPost, deletePost, toggleUpvote, addReply } = usePosts();

  const handleAddPost = (content: string, tag: string) => {
    addPost(content, tag, { name: "BraveMonk_4421", avatar: "🛡️" });
  };

  const handleReply = (postId: string, content: string) => {
    addReply(postId, content, "BraveMonk_4421", "🛡️");
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        
        {/* LEFT COLUMN: Main Feed */}
        <div className="flex-1 w-full lg:max-w-3xl xl:max-w-4xl">
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <h1 className="text-3xl font-black tracking-tight text-white hidden xl:block">Sanctuary</h1>
             <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide flex-1 sm:justify-end w-full">
               
               {/* Search Bar for Tags */}
               <div className="relative shrink-0 hidden sm:block">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search size={14} className="text-text-muted" />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search topics or #tags..." 
                   className="w-48 lg:w-64 bg-dark-surface/80 border border-border/50 text-sm text-white rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-calm-blue/50 transition-colors placeholder:text-text-muted/50"
                 />
               </div>

               {/* Dynamic Tabs */}
               <div className="flex items-center gap-1 bg-dark-surface/50 p-1 rounded-full border border-border/50 shrink-0">
                 {feedTabs.map((tab) => {
                   const Icon = tab.icon;
                   const isActive = activeTab === tab.id;
                   return (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`shrink-0 flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                         isActive
                           ? "bg-primary text-deep-navy shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                           : "text-text-secondary hover:text-white hover:bg-white/5"
                       }`}
                     >
                       <Icon size={16} />
                       {tab.label}
                     </button>
                   );
                 })}
               </div>
             </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <PostComposer onPost={handleAddPost} />
          </motion.div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center text-text-muted py-8 flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p>Loading real-time feed...</p>
              </div>
            ) : [...posts, ...mockPosts].length === 0 ? (
               <div className="text-center text-text-muted py-8">
                 No posts yet. Be the first to start a conversation!
               </div>
            ) : [...posts, ...mockPosts].map((post, i) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <PostItem 
                  post={post} 
                  onUpvote={toggleUpvote}
                  onReply={handleReply}
                  onDelete={deletePost}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Widgets */}
        <div className="hidden lg:flex flex-col w-80 shrink-0 space-y-6 sticky top-24">
          
          {/* Daily Streak Mini-Widget */}
          <div className="glass-card p-6 border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
             <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                 <Award className="text-primary" size={20} />
               </div>
               <div>
                  <h3 className="text-sm text-text-muted font-bold tracking-wider uppercase">My Streak</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">45</span>
                    <span className="text-primary font-bold">Days 🔥</span>
                  </div>
               </div>
             </div>
             <p className="text-xs text-text-secondary mt-2">You are in the top 5% of active healers this month! Keep going.</p>
          </div>

          {/* Trending Topics */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-calm-blue" size={20} /> Today's Discussions
            </h3>
            <div className="space-y-4">
              {trendingTags.map((t, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <span className="text-sm font-bold text-text-secondary group-hover:text-calm-blue transition-colors block">#{t.tag}</span>
                    <span className="text-xs text-text-muted">{t.count} posts</span>
                  </div>
                  <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-calm-blue transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Safe Space Rules */}
          <div className="glass-card p-5 border-healing-green/20 bg-healing-green/5">
            <h3 className="text-sm font-bold text-healing-green mb-3 flex items-center gap-2 uppercase tracking-wider">
              <ShieldAlert size={16} /> Community Rules
            </h3>
            <ul className="text-xs text-text-secondary space-y-2">
              <li className="flex gap-2"><span>1.</span> <span className="flex-1">Zero judgment. We are all healing.</span></li>
              <li className="flex gap-2"><span>2.</span> <span className="flex-1">Never share personally identifiable info.</span></li>
              <li className="flex gap-2"><span>3.</span> <span className="flex-1">Trust Ojas AI, but verify with real doctors.</span></li>
            </ul>
          </div>
          
          <div className="text-center text-xs text-text-muted pt-4 pb-8">
            <p>Ojas Circle © 2026</p>
            <p className="mt-1 flex justify-center gap-3">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </p>
          </div>

        </div>

      </div>

      {/* Sticky Medical Disclaimer Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface/95 backdrop-blur-xl border-t border-white/5 py-2.5 px-4 sm:px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 w-full animate-fade-in-up">
        <Stethoscope className="text-primary shrink-0 hidden sm:block" size={16} />
        <p className="text-[10px] sm:text-[11px] text-text-secondary text-center max-w-4xl leading-snug">
           <strong className="text-white uppercase tracking-wider">Disclaimer:</strong> Ojas AI provides educational insights based on traditional Ayurvedic texts and broad psychological frameworks. <strong className="text-primary">It is not a replacement for professional medical diagnosis or immediate crisis intervention.</strong>
        </p>
      </div>

    </div>
  );
}
