import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    kvUrl: process.env.KV_URL ? 'Set' : 'Not set',
    kvRestApiUrl: process.env.KV_REST_API_URL ? 'Set' : 'Not set',
    kvRestApiToken: process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set',
    kvRestApiReadOnlyToken: process.env.KV_REST_API_READ_ONLY_TOKEN ? 'Set' : 'Not set'
  });
}
