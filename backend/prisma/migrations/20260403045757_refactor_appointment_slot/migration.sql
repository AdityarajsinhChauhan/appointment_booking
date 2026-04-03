/*
  Warnings:

  - You are about to drop the column `appointment_date` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `time_slot` on the `appointments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slot_id]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slot_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "unique_provider_slot";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "appointment_date",
DROP COLUMN "time_slot",
ADD COLUMN     "slot_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_slot_id_key" ON "appointments"("slot_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "availability_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
