import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful assistant that specializes in Texas electricity and power plans.
You help users understand electricity rates, compare plans, and make informed decisions about their power provider in Texas.
Use web search to find current, up-to-date information about Texas electricity plans, rates, and providers.
Keep answers concise and practical. If a question is not about electricity or power plans, you can still answer it helpfully but gently guide the conversation back to how you can help with power plans.`;

export async function POST(request: NextRequest) {
  try {
    const { message, previousResponseId } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const input = previousResponseId
      ? message
      : [
          { role: 'developer' as const, content: SYSTEM_PROMPT },
          { role: 'user' as const, content: message },
        ];

    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      input,
      tools: [{ type: 'web_search_preview' as const }],
      ...(previousResponseId && { previous_response_id: previousResponseId }),
    });

    const reply = response.output_text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: reply, responseId: response.id });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
