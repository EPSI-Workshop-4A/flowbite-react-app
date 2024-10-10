import { auth } from "@/auth";
import UserTree from "@/components/UserTree";
import UserDrawer from "@/components/UserDrawer";
import { prisma } from "@/prisma";

export default async function Page() {
  const session = await auth()

  let tree = await prisma.familyTree.findFirst({
    where: {
      userId: session?.user?.id
    }
  });

  return (
    <>
      <UserDrawer />
      <UserTree nodes={tree?.tree} />
    </>
  );
};
