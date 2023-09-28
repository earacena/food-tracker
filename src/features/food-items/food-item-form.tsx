import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'

// import { useToast } from '@/components/ui/toast-hook'
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthContext } from '../auth/auth-provider'
import { FoodItemFormSchema, zFoodItemFormSchema } from './types/food-item-form.types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import logger from '@/utils/logger'
import { Button } from '@/components/ui/button'
import foodItemService from './api/food-item.service'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQueryClient } from "@tanstack/react-query"


function FoodItemForm() {
  const auth = useContext(AuthContext)

  const queryClient  = useQueryClient()
  // const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<FoodItemFormSchema>({
    resolver: zodResolver(zFoodItemFormSchema),
    defaultValues: {
      foodName: '',
      caloriesPerServing: 100,
      servingSizeInGrams: 0,
      searchVisibility: 'private'
    }
  })
  
  const addFoodItem = useMutation({
    mutationFn: async (newFoodItem: FoodItemFormSchema) => await foodItemService.create({
      ...newFoodItem,
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['foodItems', auth?.userInfo?.id, auth?.keycloak?.token]
      })

      navigate('/foodItems')
    },
    onError: (error) => logger.logError(error)
  })

  async function onSubmit (values: FoodItemFormSchema) {
    addFoodItem.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mx-auto space-y-8 my-9 w-[360px] p-5">
        <h2 className="self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Add new food item</h2>
        <FormField
          control={form.control}
          name='foodName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name</FormLabel>
              <FormControl>
                <Input placeholder="Strawberry" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the food item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='servingSizeInGrams'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Size In Grams</FormLabel>
              <FormControl>
                <Input placeholder="150" type="number" {...field} />
              </FormControl>
              <FormDescription>
                The number of grams in a single serving.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='caloriesPerServing'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories Per Serving</FormLabel>
              <FormControl>
                <Input placeholder="100" type="number" {...field} />
              </FormControl>
              <FormDescription>
                The number of calories (kcal) consumed with this food item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='searchVisibility'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is whether this entry is publicly visible or visible only by you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default FoodItemForm