import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/components/ui/toastHook'
import logger from '@/utils/Logger'
import { ActivityFormSchema, zActivityFormSchema } from './types/activityForm.types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { FoodItems } from '../FoodItems/types/foodItem.types'
import { Meals } from '../Meals/types/meals.types'
import { Activities } from './types/activity.types'

interface ActivityFormProps {
  setActivities: Dispatch<SetStateAction<Activities>>
  foodItems: FoodItems
  meals: Meals
}

function ActivityForm({ foodItems, meals }: ActivityFormProps) {
  // const auth = useContext(AuthContext)

  const { toast } = useToast()
  // const navigate = useNavigate()
  const [selectType, setSelectType] = useState<string>()

  const form = useForm<ActivityFormSchema>({
    resolver: zodResolver(zActivityFormSchema),
    defaultValues: {
      foodItemId: undefined,
      mealId: undefined,
      quantity: 1
    },
  })

  async function onSubmit(values: ActivityFormSchema) {
    try {
      console.log(values)
    } catch (err: unknown) {
      logger.logError(err)

      toast({
        title: 'Error',
        description: 'Unable to create profile',
        variant: 'destructive'
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-6 my-9">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Add new activity</h2>

        <Select onValueChange={(value) => setSelectType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select consumption type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="foodItem">Individual item</SelectItem>
              <SelectItem value="meal">Meal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>
          The type of consumption activity.
        </FormDescription>

        {
          selectType === 'foodItem' && (
            <>
              <FormField
                control={form.control}
                name='foodItemId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food item</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select food item consumed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {foodItems.map((f) => (
                          <SelectItem value={f.id.toString()}>{f.foodName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the food item you consumed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (grams)</FormLabel>
                    <FormControl>
                      <Input placeholder='200' {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the number of grams consumed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )
        }

        {
          selectType === 'meal' && (
            <>
              <FormField
                control={form.control}
                name='mealId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal consumed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {meals.map((m) => (
                          <SelectItem value={m.id.toString()}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the meal you consumed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (servings)</FormLabel>
                    <FormControl>
                      <Input placeholder='200' {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the number of servings consumed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )
        }

        <Button type='submit'>Submit</Button>
      </form>
    </Form >
  )
}

export default ActivityForm