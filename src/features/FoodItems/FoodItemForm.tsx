import { SetStateAction, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'

import { useToast } from "@/components/ui/toastHook"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthContext } from "../Auth/AuthProvider"
import { FoodItemFormSchema, zFoodItemFormSchema } from "./types/foodItemForm.types"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import logger from "@/utils/Logger"
import { Button } from "@/components/ui/Button"
import foodItemService from "./api/foodItem.service"
import { FoodItems } from "./types/foodItem.types"

interface FoodItemFormProps {
  setFoodItems: React.Dispatch<SetStateAction<FoodItems>>,
}

function FoodItemForm ({ setFoodItems }: FoodItemFormProps) {
  const auth = useContext(AuthContext)

  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<FoodItemFormSchema>({
    resolver: zodResolver(zFoodItemFormSchema),
    defaultValues: {
      foodName: '',
      caloriesPerServing: 100,
      servingSizeInGrams: 0,
      servingSizeInUnits: 0,
      searchVisibility: 'private'
    }
  })

  async function onSubmit (values: FoodItemFormSchema) {
    try {
      const newFoodItem = await foodItemService.create({
        ...values,
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })

      if (newFoodItem) {
        setFoodItems((prevFoodItems) => prevFoodItems.concat(newFoodItem))
        navigate('/foodItems')
      }
    } catch (err: unknown) {
      logger.logError(err)

      toast({
        title: 'Error',
        description: 'Unable to create food item',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-6 my-9">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Add new food item</h2>
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
          name='caloriesPerServing'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories Per Serving</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
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
          name='servingSizeInGrams'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Size In Grams</FormLabel>
              <FormControl>
                <Input placeholder="150" {...field} />
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
          name='servingSizeInUnits'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Size In Units</FormLabel>
              <FormControl>
                <Input placeholder="5" {...field} />
              </FormControl>
              <FormDescription>
                The number of pieces in a single serving.
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