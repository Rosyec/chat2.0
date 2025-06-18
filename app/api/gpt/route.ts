import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
    // apiKey: process.env.DEEPSEEK_API_KEY,
    apiKey: process.env.OPENAI_API_KEY,
    // baseURL: 'https://api.deepseek.com'
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userMessage = body.message || "Responde como si no entendiste nada.";

        const chatResponse = await openai.chat.completions.create({
            // model: "deepseek-chat",
            model: "gpt-3.5-turbo",
            // messages: [{ role: "system", content: userMessage }],
            messages: [{ role: "user", content: userMessage }],
        });

        const reply = chatResponse.choices[0]?.message?.content ?? "";
        console.log('RESPONSE: ', reply)

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("OpenAI error:", error.message || error);
        return NextResponse.json(
            { error: "Error al conectarse con OpenAI." },
            { status: 500 }
        );
    }
}
