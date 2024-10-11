// app/api/consultants/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { nom, specialite, ville, code_postal, adresse, note, description, annee_exercice } = body;

  try {
    const consultant = await prisma.consultant.create({
      data: {
        nom,
        specialite,
        ville,
        code_postal,
        adresse,
        note: note ? parseFloat(note) : null,
        description,
        annee_exercice: parseInt(annee_exercice, 10),
      },
    });

    return NextResponse.json(consultant);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de l'ajout du consultant" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom');
  const specialite = searchParams.get('specialite');
  const ville = searchParams.get('ville');

  try {
    const consultants = await prisma.consultant.findMany({
      where: {
        AND: [
          nom ? { nom: { contains: nom, mode: 'insensitive' } } : {},
          specialite ? { specialite: { contains: specialite, mode: 'insensitive' } } : {},
          ville ? { ville: { contains: ville, mode: 'insensitive' } } : {},
        ],
      },
    });

    return NextResponse.json(consultants);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des consultants" }, { status: 500 });
  }
}
