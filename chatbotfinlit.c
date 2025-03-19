import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { Send } from "lucide-react";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isAI: boolean }>>([
    { text: "Hi! I'm your AI financial assistant. How can I help you today?", isAI: true },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isAI: false }]);
    setLoading(true);

    try {
      const API_KEY = "AIzaSyAtPKC3kpxBQqmy3B3PhiY-FqZ--YWbF0k"; // Replace with your actual API key
      const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch AI response: ${response.statusText}`);
      }

      const data = await response.json();

      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond to that.";

      setMessages((prev) => [...prev, { text: aiReply, isAI: true }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong. Please try again.", isAI: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl glass dark:glass-dark rounded-lg border shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} isAI={message.isAI} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={loading}
          />
          <Button onClick={handleSend} size="icon" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
