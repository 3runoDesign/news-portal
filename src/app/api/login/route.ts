import { NextRequest, NextResponse } from 'next/server';
import { useAuthStore } from '../../../stores/authStore';
import { generateToken } from '../../../lib/jwt';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'admin') {
    const token = generateToken(username);
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}