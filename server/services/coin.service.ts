import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';
import { CustomError } from '../middleware/errorHandler';

export class CoinService {
  async addCoins(userId: number, amount: number) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        coins: (user.coins || 0) + amount
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        username: users.username,
        coins: users.coins
      });

    return updatedUser;
  }

  async deductCoins(userId: number, amount: number) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    if ((user.coins || 0) < amount) {
      throw new CustomError('Insufficient coins', 400);
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        coins: user.coins - amount
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        username: users.username,
        coins: users.coins
      });

    return updatedUser;
  }

  async transferCoins(fromUserId: number, toUserId: number, amount: number) {
    const fromUser = await db.query.users.findFirst({
      where: eq(users.id, fromUserId)
    });

    const toUser = await db.query.users.findFirst({
      where: eq(users.id, toUserId)
    });

    if (!fromUser || !toUser) {
      throw new CustomError('User not found', 404);
    }

    if ((fromUser.coins || 0) < amount) {
      throw new CustomError('Insufficient coins', 400);
    }

    // Using a transaction to ensure both operations succeed or fail together
    return await db.transaction(async (tx) => {
      const [updatedFromUser] = await tx
        .update(users)
        .set({
          coins: fromUser.coins - amount
        })
        .where(eq(users.id, fromUserId))
        .returning({
          id: users.id,
          username: users.username,
          coins: users.coins
        });

      const [updatedToUser] = await tx
        .update(users)
        .set({
          coins: (toUser.coins || 0) + amount
        })
        .where(eq(users.id, toUserId))
        .returning({
          id: users.id,
          username: users.username,
          coins: users.coins
        });

      return { from: updatedFromUser, to: updatedToUser };
    });
  }
}

export const coinService = new CoinService();
