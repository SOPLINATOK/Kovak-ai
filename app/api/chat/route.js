import { NextResponse } from 'next/server';

export async function POST(req) {
  const { message } = await req.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192", 
      messages: [
        { role: "system", content: process.env.SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    })
  });

  const data = await response.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}
