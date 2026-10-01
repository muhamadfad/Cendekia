"use client";
import { Bot, Send, Sparkles, Lightbulb, BookA, Calculator } from "lucide-react";
import { useState } from "react";

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Halo! Saya EduBot, asisten belajar AI kamu. Ada PR atau materi pelajaran yang ingin kamu tanyakan hari ini?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "Sebagai asisten AI simulasi, saya mencatat pertanyaanmu! Di versi aslinya, saya akan langsung memberikan rumus matematika atau penjelasan konsep sains yang kamu butuhkan secara interaktif. Teruslah semangat belajar!" 
      }]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      <div className="p-8 border-b border-slate-200 bg-white flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Bot className="w-8 h-8 text-purple-600" />
            EduBot <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs rounded-full uppercase tracking-widest font-black">AI Tutor</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">Tanya apa saja tentang pelajaranmu 24/7.</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'}`}>
              {msg.role === 'user' ? 'ST' : <Bot className="w-6 h-6" />}
            </div>
            <div className={`p-5 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'}`}>
              <p className="leading-relaxed font-medium">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <button className="flex flex-col items-center text-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-md transition-all group">
              <Calculator className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-700">Bantu pecahkan soal Aljabar</p>
            </button>
            <button className="flex flex-col items-center text-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-md transition-all group">
              <BookA className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-700">Ringkaskan sejarah Kemerdekaan</p>
            </button>
            <button className="flex flex-col items-center text-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-md transition-all group">
              <Lightbulb className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-700">Jelaskan Teori Relativitas</p>
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <Sparkles className="absolute left-4 w-5 h-5 text-purple-400" />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan materi yang belum kamu pahami..." 
            className="w-full pl-12 pr-16 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
          />
          <button type="submit" className="absolute right-2 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-sm">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
