-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "nameOfPersonResponsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_email_key" ON "organization"("email");
