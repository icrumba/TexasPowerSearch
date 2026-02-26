'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/landing/Navbar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim(), previousResponseId: responseId }),
      });
      const data = await res.json();

      if (data.error) {
        setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.message }]);
        setResponseId(data.responseId);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!input.trim() || optimizing || loading) return;

    setOptimizing(true);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (data.optimizedPrompt) {
        setInput(data.optimizedPrompt);
      }
    } catch {
      // Keep original prompt on failure
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16" style={{ backgroundColor: '#030305' }}>
        <div className="container mx-auto px-4 py-10 max-w-3xl">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-space font-black text-3xl text-white">AI Power Advisor</h1>
              <p className="font-jetbrains text-white/40 text-sm mt-1">Ask anything about Texas electricity plans</p>
            </div>
            <Link href="/search" className="font-jetbrains text-electric-blue hover:text-electric-blue/80 text-sm transition-colors">
              &larr; Compare Plans
            </Link>
          </div>

          {/* Messages */}
          <div
            className="rounded-2xl border border-white/8 p-6 mb-4 min-h-[420px] max-h-[560px] overflow-y-auto"
            style={{ backgroundColor: '#0A0A12' }}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <span className="text-4xl">⚡</span>
                <p className="font-jetbrains text-white/25 text-sm text-center">
                  Ask me about rates, switching providers,<br />TDU charges, or anything Texas electricity.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] font-jetbrains text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-electric-blue text-white rounded-br-sm'
                      : 'text-white/80 rounded-bl-sm border border-white/10'
                  }`}
                  style={msg.role === 'assistant' ? { backgroundColor: '#16161f' } : undefined}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 font-jetbrains text-white/30 text-sm" style={{ backgroundColor: '#16161f' }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 p-4" style={{ backgroundColor: '#0A0A12' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about power plans..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 font-jetbrains text-sm focus:outline-none focus:border-electric-blue/50 transition-colors"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleOptimize}
                disabled={!input.trim() || optimizing || loading}
                className="px-3 py-2 rounded-xl border border-texas-gold/40 text-texas-gold font-jetbrains text-sm hover:bg-texas-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Optimize your prompt with AI"
              >
                {optimizing ? '...' : 'Optimize'}
              </button>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-electric-blue text-white px-5 py-2 rounded-xl font-space font-semibold text-sm hover:bg-electric-blue/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </form>

        </div>
      </main>
    </>
  );
}
