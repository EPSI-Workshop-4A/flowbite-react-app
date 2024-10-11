import { NextResponse } from "next/server";
import {prisma} from "@/prisma";

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    // Vérifiez que l'ID de l'utilisateur est présent pour la mise à jour
    if (!data.id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    // Mise à jour de l'utilisateur existant avec Prisma
    const updatedUser = await prisma.user.update({
      where: { id: data.id }, // Utilisez le champ 'id' pour identifier l'utilisateur
      data: {
        name: data.name, // Mapper les champs envoyés avec Prisma
        birthdate: new Date(data.birthdate),
        lieu_naissance: data.lieu_naissance,
        pathologie: data.pathologie || "",
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'utilisateur" }, { status: 500 });
  }
}
