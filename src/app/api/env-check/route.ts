import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const hasKey = !!process.env.DEEPSEEK_API_KEY;
    return NextResponse.json({ hasDeepSeekKey: hasKey });
}
