import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(req: Request) {
  try {
    const { videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    return NextResponse.json({ transcript });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
