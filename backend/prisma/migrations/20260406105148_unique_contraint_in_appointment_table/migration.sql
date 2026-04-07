/*
  Warnings:

  - A unique constraint covering the columns `[slot_id,status]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "appointments_slot_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "appointments_slot_id_status_key" ON "appointments"("slot_id", "status");
