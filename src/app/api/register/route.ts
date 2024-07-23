import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Extrair dados do corpo da requisição
    const { username, password } = await request.json();

    // Verificar se os dados são válidos
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const token = generateToken(username);
    
    return NextResponse.json(
      
      { message: 'User registered successfully', token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
