import { useContext, useEffect, useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type MealEntryFormSchema, zMealEntryFormSchema } from "./types/mealEntryForm.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Input } from "@/components/ui/Input"
import { useNavigate, useParams } from "react-router-dom"
import { Meal } from "./types/meals.types"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import mealEntryService from "./api/mealEntry.service"
import { AuthContext } from "../Auth/AuthProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useMeals from "./hooks/useMeals"
import { useFoodItems } from "../FoodItems/hooks/foodItem.hooks"
import logger from "@/utils/Logger"

const zMealIdParam = z.object({
  mealId: z.coerce.number()
})

function MealEntryForm() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: meals } = useMeals()
  const { data: foodItems } = useFoodItems()
  const { mealId } = zMealIdParam.parse(useParams())
  const [meal, setMeal] = useState<Meal | undefined>()


  const form = useForm<MealEntryFormSchema>({
    resolver: zodResolver(zMealEntryFormSchema),
    defaultValues: {
      foodItemId: undefined,
      quantity: 50
    }
  })

  const addMealEntry = useMutation({
    mutationFn: async (values: MealEntryFormSchema) => await mealEntryService.create({
      ...values,
      mealId,
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mealEntries', auth?.userInfo?.id, auth?.keycloak?.token]
      })

      navigate('/meals')
    },
    onError: (error) => logger.logError(error)
  })

  function onSubmit (values: MealEntryFormSchema) {
    addMealEntry.mutate(values)
  }

  useEffect(() => {
    setMeal(meals?.find((m) => m.id === mealId))
  }, [mealId, meals, setMeal])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-8  my-9">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Add new meal entry</h2>
        <h3 className="flex flex-col items-center">{meal?.name}</h3>
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
                  {foodItems?.map((f) => (
                    <SelectItem key={f.id} value={f.id.toString()}>{f.foodName}</SelectItem>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default MealEntryForm