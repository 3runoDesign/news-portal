import { NextRequest, NextResponse } from 'next/server';
import { generatePosts } from '../../../lib/generatePosts';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;

    if (page <= 0 || pageSize <= 0) {
        return NextResponse.json({ error: 'Invalid page or pageSize' }, { status: 400 });
    }

    const posts = generatePosts(page, pageSize);

    return NextResponse.json({
        posts,
        nextPage: page + 1
    });
}