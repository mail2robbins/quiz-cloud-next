import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const { name } = await req.json();
  if (!name) {
    return new NextResponse('Category name is required', { status: 400 });
  }
  const category = await prisma.category.create({
    data: { name },
  });
  return NextResponse.json(category);
} 