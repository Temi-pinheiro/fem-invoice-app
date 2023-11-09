import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  try {
    const term = await prisma.terms.create({ data });
    return NextResponse.json(term);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
