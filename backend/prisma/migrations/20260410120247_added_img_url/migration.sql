/*
  Warnings:

  - You are about to drop the column `contact_number` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "contact_number",
ADD COLUMN     "img_url" VARCHAR(100);
