-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "address" VARCHAR(150),
ADD COLUMN     "area" VARCHAR(150),
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "pincode" VARCHAR(10),
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "state" VARCHAR(100),
ADD COLUMN     "total_reviews" INTEGER DEFAULT 0;
