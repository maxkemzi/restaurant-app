/*
  Warnings:

  - You are about to drop the column `created_at` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cart_id` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `client_address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `client_name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `client_phone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `is_spicy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `is_vegan` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_USD` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size_cm` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ProductIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `ingredient_id` on the `ProductIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `ProductIngredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredientId,productId]` on the table `ProductIngredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceUsd` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientId` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_order_id_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_product_id_fkey";

-- DropIndex
DROP INDEX "Cart_order_id_key";

-- DropIndex
DROP INDEX "ProductIngredient_ingredient_id_product_id_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "created_at",
DROP COLUMN "order_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "cart_id",
DROP COLUMN "created_at",
DROP COLUMN "product_id",
ADD COLUMN     "cartId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "client_address",
DROP COLUMN "client_name",
DROP COLUMN "client_phone",
DROP COLUMN "created_at",
ADD COLUMN     "clientAddress" TEXT NOT NULL,
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "clientPhone" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "is_spicy",
DROP COLUMN "is_vegan",
DROP COLUMN "price_USD",
DROP COLUMN "size_cm",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isSpicy" BOOLEAN,
ADD COLUMN     "isVegan" BOOLEAN,
ADD COLUMN     "priceUsd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sizeCm" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductIngredient" DROP COLUMN "created_at",
DROP COLUMN "ingredient_id",
DROP COLUMN "product_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ingredientId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_orderId_key" ON "Cart"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductIngredient_ingredientId_productId_key" ON "ProductIngredient"("ingredientId", "productId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
