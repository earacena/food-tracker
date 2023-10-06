import { HttpResponse, http } from 'msw';
import { z } from 'zod';
import { baseUrl } from '@/config';
import { randomValueFromZeroTo } from '@/utils/math';
import type { FoodItems } from '../types/food-item.types';

export function generateFoodItems({
  numOfGenerated,
  userId,
}: {
  numOfGenerated: number;
  userId: string;
}): FoodItems {
  const generatedFoodItems: FoodItems = [];

  for (let i = 0; i < numOfGenerated; ++i) {
    generatedFoodItems.push({
      id: i,
      userId,
      foodName: `food-${crypto.randomUUID()}`,
      caloriesPerServing: randomValueFromZeroTo({ to: 1000 }),
      servingSizeInGrams: randomValueFromZeroTo({ to: 1000 }),
      servingSizeInUnits: randomValueFromZeroTo({ to: 100 }),
      searchVisibility: 'private',
      createdAt: new Date(),
    });
  }

  return generatedFoodItems;
}

export const foodItemsRequestHandlers = [
  http.get(`${baseUrl}/api/foodItems/user/:userId`, ({ params }) => {
    const { userId } = z.object({ userId: z.string().uuid() }).parse(params);
    const body = {
      success: true,
      data: {
        userFoodItems: generateFoodItems({
          numOfGenerated: 5,
          userId,
        }),
      },
    };

    return HttpResponse.json(body, { status: 200 });
  }),
];
