import { randomValueFromZeroTo } from '@/utils/math';
import { rest } from 'msw';
import { z } from 'zod';

export function generateFoodItems({
  numOfGenerated,
  userId,
}: {
  numOfGenerated: number;
  userId: string;
}) {
  const generatedFoodItems = [];

  for (let i = 0; i < numOfGenerated; ++i) {
    generatedFoodItems.push({
      id: i,
      userId,
      caloriesPerServing: randomValueFromZeroTo({ to: 1000 }),
      servingSizeInGrams: randomValueFromZeroTo({ to: 1000 }),
      searchVisibility: 'private',
      createdAt: new Date(),
    });
  }

  return generateFoodItems;
}

export const foodItemsRequestHandlers = [
  rest.get(
    'http://localhost:3001/api/foodItems/user/:userId',
    (req, res, ctx) => {
      const { userId } = z
        .object({ userId: z.string().uuid() })
        .parse(req.params);
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            userFoodItems: generateFoodItems({
              numOfGenerated: 5,
              userId,
            }),
          },
        }),
      );
    },
  ),
];
