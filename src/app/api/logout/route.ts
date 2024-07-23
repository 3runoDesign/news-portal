import { NextRequest, NextResponse } from 'next/server';
import { useAuthStore } from '../../../stores/authStore';

export async function DELETE(request: NextRequest) {
  useAuthStore.getState().logout();
  return NextResponse.json({ message: 'Logged out successfully' });
}