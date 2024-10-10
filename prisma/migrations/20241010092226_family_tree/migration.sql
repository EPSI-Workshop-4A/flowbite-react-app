-- CreateTable
CREATE TABLE "FamilyTree" (
    "id" SERIAL NOT NULL,
    "tree" JSONB NOT NULL,
    "userId" TEXT,

    CONSTRAINT "FamilyTree_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FamilyTree" ADD CONSTRAINT "FamilyTree_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
