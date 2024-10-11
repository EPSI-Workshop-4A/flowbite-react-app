import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth()

  let tree = await prisma.familyTree.findFirst({
    where: {
      userId: session?.user?.id
    }
  });

  return NextResponse.json(tree);
}

export async function PUT(request: Request) {
  const session = await auth();
  const body = await request.json(); // Get the updated node data from the request body

  console.log('PUT', body);

  // Assuming you want to update the entire tree with new node data
  let updatedTree = await prisma.familyTree.update({
    where: {
      id: body.id,
    },
    data: {
      tree: body.tree, // Assuming 'tree' is the field that holds the tree structure
    },
  });

  return NextResponse.json(updatedTree.tree);
}
