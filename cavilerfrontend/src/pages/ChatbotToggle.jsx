import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaWhatsapp, FaTimes, FaRobot } from "react-icons/fa";

const ChatbotToggle = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Cavalier Tactical AI. I'm here to assist with your journey into the Armed Forces. Are you interested in NDA, CDS, AFCAT, or SSB prep?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    const msg = input.toLowerCase();
    let reply = "";

    // Defence related queries
    if (msg.includes("nda")) {
      reply = "The National Defence Academy (NDA) is the joint services academy of the Indian Armed Forces. We offer rigorous training programs for UPSC NDA written exams and SSB interviews. Our tactical curriculum ensures high performance.";
    } else if (msg.includes("cds")) {
      reply = "Combined Defence Services (CDS) coaching at Cavalier focus on advanced strategy, complete syllabus coverage, and personality development. We prepare you for IMA, OTA, AFA, and INA.";
    } else if (msg.includes("afcat")) {
      reply = "AFCAT preparation here focuses on Numerical Ability, Reasoning, Military Aptitude, and General Awareness. Fly high with our specialized Air Force coaching modules.";
    } else if (msg.includes("ssb")) {
      reply = "Our SSB (Services Selection Board) training is led by retired GTOs and Interviewing Officers. We provide realistic GTO grounds and psychological test series to ensure you get recommended.";
    } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      reply = "Greetings, Aspirant! Welcome to Cavalier Defence Academy. Ready to initiate your tactical training?";
    } else if (msg.includes("fee") || msg.includes("payment") || msg.includes("cost")) {
      reply = "Investment in your future as an officer varies by course. We offer competitive training packages and scholarships for wards of martyrs and defence personnel. Connect on WhatsApp for the current fee structure.";
    } else if (msg.includes("admission") || msg.includes("join")) {
      reply = "Enlistment procedure: 1) Initial counseling 2) Diagnostic assessment 3) Batch selection 4) Training commencement. Join the ranks today!";
    } else {
      reply = "That intel is being processed. For immediate field support and detailed course info, I recommend connecting with our Command Center via WhatsApp.";
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: reply, sender: "bot" },
      ]);
    }, 500);

    setInput("");
  };

  const openWhatsApp = () => {
    const phoneNumber = "917020892704";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      "Hello! I'm interested in Cavalier Defence Academy courses for NDA/CDS/AFCAT/SSB. Please share mission details."
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-96 h-[500px] bg-cavalier-card-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[100] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-black to-gray-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cavalier-brand/20 rounded-full flex items-center justify-center border border-cavalier-brand/30">
                  <FaRobot className="text-cavalier-brand text-xl" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">Cavalier Tactical AI</h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-400 uppercase font-mono tracking-tighter">System: Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.sender === "user"
                      ? "bg-cavalier-brand text-black font-bold rounded-br-none"
                      : "bg-white/5 border border-white/10 text-gray-300 rounded-bl-none backdrop-blur-sm"
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/40">
              {["NDA", "CDS", "SSB", "AFCAT"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setInput(tag);
                    // Use a temporary variable for the mock 'e' or just call sendMessage logic
                    const mockE = { preventDefault: () => { } };
                    setTimeout(sendMessage, 100);
                  }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 hover:bg-cavalier-brand hover:text-black hover:border-cavalier-brand transition-all whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/60 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Enter transmission..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cavalier-brand transition-colors"
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 bg-cavalier-brand text-black rounded-lg flex items-center justify-center hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openWhatsApp}
          className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl relative group"
          title="Connect on WhatsApp"
        >
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30"></div>
          <FaWhatsapp className="text-white text-3xl md:text-4xl" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-300 ${open
            ? "bg-white text-black border-white"
            : "bg-cavalier-bg text-cavalier-brand border-cavalier-brand shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            }`}
        >
          <FaRobot className="text-3xl md:text-4xl" />
          {!open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</span>
          )}
        </motion.button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default ChatbotToggle;
