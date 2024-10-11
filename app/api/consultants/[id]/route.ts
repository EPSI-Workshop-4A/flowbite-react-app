import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const consultantId = parseInt(params.id, 10);

  if (isNaN(consultantId)) {
    return NextResponse.json({ error: 'ID de consultant non valide' }, { status: 400 });
  }

  try {
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
    });

    if (!consultant) {
      return NextResponse.json({ error: 'Consultant non trouvé' }, { status: 404 });
    }

    return NextResponse.json(consultant, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du consultant:", error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
