import { streamText } from "ai";
import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "abc"
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google("gemini-1.5-flash-8b-latest"),
      messages,
      temperature: 0.7
    });

    // Collect all text chunks into a single string
    let fullText = "";
    for await (const chunk of result.textStream) {
      fullText += chunk;
    }

    // Return as proper JSON
    return NextResponse.json({
      content: fullText,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Error processing request: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
