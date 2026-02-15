import { useState, useEffect } from 'react';

interface Message {
  role: string;
  content: string;
}

export const Agent = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [copiedId, setCopiedId] = useState<number | null>(null)

    // Load messages from localStorage on mount
    useEffect(() => {
      const saved = localStorage.getItem('chat-history');
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load chat history:', e);
        }
      }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
      if (messages.length > 0) {
        localStorage.setItem('chat-history', JSON.stringify(messages));
      }
    }, [messages]);

    const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    console.log('Sending message to OpenAI:', import.meta.env.VITE_REACT_APP_OPENAI_API_KEY);

    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (messages.length > 0 && window.confirm('Are you sure you want to clear the chat?')) {
      setMessages([]);
      localStorage.removeItem('chat-history');
    }
  };

  const copyMessage = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl h-[90vh] flex flex-col font-sans bg-dark-850 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-neon-cyan/20 animate-slide-up relative" style={{ backgroundColor: 'rgba(19, 28, 62, 0.4)' }}>
      {/* Neon glow effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0, 217, 255, 0.05), rgba(255, 0, 110, 0.05))' }}></div>
      
      {/* Header with New Chat button */}
      <div className="bg-dark-850 px-8 py-6 text-center shadow-lg relative border-b border-neon-cyan/20 flex items-center justify-between">
        <div className="absolute inset-0 blur-2xl opacity-50" style={{ background: 'linear-gradient(to right, rgba(0, 217, 255, 0.1), rgba(255, 0, 110, 0.1))' }}></div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold m-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink drop-shadow-lg relative z-10">✨ AI Assistant</h1>
          <p className="m-0 text-sm opacity-80 font-medium tracking-widest relative z-10" style={{ color: 'rgba(0, 217, 255, 0.8)' }}>POWERED BY OPENAI GPT-4</p>
        </div>

        {/* New Chat Button */}
        <button
          onClick={clearChat}
          disabled={messages.length === 0}
          className="relative z-10 px-4 py-2 text-sm font-bold rounded-lg border border-neon-pink/50 text-neon-pink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'rgba(255, 0, 110, 0.1)',
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 0, 110, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 110, 0.8)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 0, 110, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 0, 110, 0.5)';
          }}
        >
          ➕ New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 relative z-10" style={{ background: 'linear-gradient(to bottom, rgba(15, 22, 41, 0.5), rgba(19, 28, 62, 0.5), rgba(15, 22, 41, 0.5))' }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-scale">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">👋 Welcome to AI Assistant</p>
            <p className="text-base font-medium" style={{ color: 'rgba(0, 217, 255, 0.6)' }}>Ask me anything—I'm here to help!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 max-w-[85%] animate-slide-in group ${
                message.role === 'user' ? 'self-end' : 'self-start'
              }`}
              style={{ animationDelay: `${Math.min(index * 50, 150)}ms` }}
            >
              <div 
                className={`px-5 py-3 rounded-lg max-w-full transition-all duration-300 relative border ${
                  message.role === 'user'
                    ? 'rounded-br-none shadow-neon-pink'
                    : 'rounded-bl-none shadow-neon-cyan'
                }`}
                style={{
                  backgroundColor: message.role === 'user' 
                    ? 'rgba(255, 0, 110, 0.2)' 
                    : 'rgba(19, 28, 62, 0.6)',
                  borderColor: message.role === 'user' 
                    ? 'rgba(255, 0, 110, 0.3)' 
                    : 'rgba(0, 217, 255, 0.3)',
                  color: message.role === 'user' ? 'white' : 'rgba(0, 217, 255, 1)',
                }}
              >
                <div className="absolute inset-0 rounded-lg pointer-events-none group-hover:opacity-100" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)', opacity: 0.05 }}></div>
                <div className={`text-xs font-bold mb-1.5 opacity-80 uppercase tracking-widest flex items-center justify-between gap-2 ${
                  message.role === 'user' ? 'text-neon-pink' : 'text-neon-cyan'
                }`}>
                  <span>{message.role === 'user' ? '👤 You' : '🤖 Assistant'}</span>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => copyMessage(message.content, index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded hover:bg-white/10"
                      title="Copy message"
                    >
                      {copiedId === index ? '✓ Copied' : '📋'}
                    </button>
                  )}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap break-words relative z-10">
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3 self-start max-w-[85%] animate-slide-in">
            <div className="flex gap-2 px-5 py-3 rounded-lg border border-neon-cyan/30 shadow-neon-cyan rounded-bl-none" style={{ backgroundColor: 'rgba(19, 28, 62, 0.6)' }}>
              <span className="w-3 h-3 rounded-full shadow-neon-cyan animate-bounce-typing opacity-70" style={{ background: 'rgb(0, 217, 255)' }}></span>
              <span className="w-3 h-3 rounded-full shadow-neon-cyan animate-bounce-typing opacity-70" style={{ background: 'rgb(0, 217, 255)', animationDelay: '0.2s' }}></span>
              <span className="w-3 h-3 rounded-full shadow-neon-cyan animate-bounce-typing opacity-70" style={{ background: 'rgb(0, 217, 255)', animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3 px-6 py-5 border-t border-neon-cyan/20 relative z-10" style={{ backgroundColor: 'rgba(19, 28, 62, 0.6)', backdropFilter: 'blur(12px)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          autoFocus
          className="flex-1 px-5 py-3 text-sm rounded-lg outline-none font-inherit transition-all duration-300"
          style={{
            backgroundColor: 'rgba(15, 22, 41, 0.5)',
            border: 'rgba(0, 217, 255, 0.3) 1px solid',
            color: 'white',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.8)';
            e.currentTarget.style.backgroundColor = 'rgba(15, 22, 41, 0.8)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
            e.currentTarget.style.backgroundColor = 'rgba(15, 22, 41, 0.5)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          className="px-7 py-3 text-base font-bold rounded-lg cursor-pointer transition-all duration-300 min-w-[100px] relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(0, 217, 255, 0.2)',
            border: '1px solid rgba(0, 217, 255, 0.5)',
            color: 'rgb(0, 217, 255)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.4)';
            e.currentTarget.style.borderColor = 'rgb(0, 217, 255)';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.5)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
          }}
        >
          <span className="relative z-10">{isLoading ? '⏳' : '📤'}</span>
        </button>
      </div>
    </div>
  )
}

