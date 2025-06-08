import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const { name } = await req.json();
  if (!name) {
    return new NextResponse('Category name is required', { status: 400 });
  }
  const category = await prisma.category.update({
    where: { id: params.id },
    data: { name },
  });
  return NextResponse.json(category);
} 