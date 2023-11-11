import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { prisma } from '~/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: 'Unauthorized, please login' },
      { status: 401 }
    );
  const { id: invoiceId } = params;
  if (!invoiceId) {
    return NextResponse.json(
      { error: 'No invoice id selected' },
      { status: 403 }
    );
  }
  const data = await req.json();

  const invoice = await prisma.invoice.update({
    where: {
      id: invoiceId!,
    },
    data,
  });

  return NextResponse.json(invoice);
}
