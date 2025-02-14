import { eq } from 'drizzle-orm';
import { db } from '../db';
import { storeItems, users } from '../db/schema';
import { CustomError } from '../middleware/errorHandler';

export class StoreService {
  async getAllItems() {
    const items = await db.query.storeItems.findMany({
      where: eq(storeItems.enabled, true)
    });
    return items;
  }

  async purchaseItem(userId: number, itemId: number) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const item = await db.query.storeItems.findFirst({
      where: eq(storeItems.id, itemId)
    });

    if (!item) {
      throw new CustomError('Item not found', 404);
    }

    if (!item.enabled) {
      throw new CustomError('Item is not available for purchase', 400);
    }

    if (user.coins < item.price) {
      throw new CustomError('Insufficient coins', 400);
    }

    return await db.transaction(async (tx) => {
      // Deduct coins
      const [updatedUser] = await tx
        .update(users)
        .set({
          coins: user.coins - item.price,
          cpu: user.cpu + (item.cpu || 0),
          memory: user.memory + (item.memory || 0),
          disk: user.disk + (item.disk || 0),
          slots: user.slots + (item.slots || 0)
        })
        .where(eq(users.id, userId))
        .returning({
          id: users.id,
          username: users.username,
          coins: users.coins,
          cpu: users.cpu,
          memory: users.memory,
          disk: users.disk,
          slots: users.slots
        });

      return {
        user: updatedUser,
        purchasedItem: item
      };
    });
  }
}

export const storeService = new StoreService();
