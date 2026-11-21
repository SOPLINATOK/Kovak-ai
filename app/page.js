"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#111", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h2>KOVAK-AI</h2>
      <div style={{ marginBottom: "20px", height: "70vh", overflowY: "auto", border: "1px solid #333", padding: "10px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "10px 0", padding: "10px", background: m.role === "user" ? "#2563eb" : "#333", borderRadius: "5px", maxWidth: "80%", marginLeft: m.role === "user" ? "auto" : "0" }}>
            {m.content}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{ padding: "10px", flex: 1, color: "#000", borderRadius: "5px", border: "none" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب طلبك هنا..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px", background: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          إرسال
        </button>
      </div>
    </div>
  );
      }
