import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import logger from "@/utils/Logger"
import { AuthContext } from "../Auth/AuthProvider"
import mealService from "./api/meal.service"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { MealFormSchema, zMealFormSchema } from "./types/mealForm.types"
import { Button } from "@/components/ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function MealForm() {
  const auth = useContext(AuthContext)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<MealFormSchema>({
    resolver: zodResolver(zMealFormSchema),
    defaultValues: {
      name: '',
    }
  })

  const addMeal = useMutation({
    mutationFn: async (newMeal: MealFormSchema) => await mealService.create({
      ...newMeal,
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meals', auth?.userInfo?.id, auth?.keycloak?.token]
      })

      navigate('/meals')
    },
    onError: (error) => logger.logError(error)
  })

  function onSubmit(values: MealFormSchema) {
    addMeal.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-8 my-9">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Add new food item</h2>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Name</FormLabel>
              <FormControl>
                <Input placeholder="Fish and chips" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the meal.
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

export default MealForm