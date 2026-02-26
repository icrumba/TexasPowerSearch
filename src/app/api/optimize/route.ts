import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OPTIMIZER_PROMPT = `You are a prompt optimizer. The user is using a Texas electricity plan comparison tool and wants to ask a question.
Take their rough question and rewrite it to be:
1. More specific and clear
2. Include relevant context about Texas electricity if applicable
3. Structured to get the most useful answer

IMPORTANT: Only return the improved question text. Do not add any explanation or preamble. Keep it concise (1-3 sentences max). Preserve the user's original intent exactly.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: OPTIMIZER_PROMPT },
        { role: 'user', content: prompt },
      ],
    });

    const optimized = completion.choices[0]?.message?.content || prompt;

    return NextResponse.json({ optimizedPrompt: optimized });
  } catch (error) {
    console.error('Optimize API error:', error);
    return NextResponse.json({ error: 'Failed to optimize prompt' }, { status: 500 });
  }
}
