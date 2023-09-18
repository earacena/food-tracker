import { useContext, Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import logger from "@/utils/Logger"
import { AuthContext } from "../Auth/AuthProvider"
import { useToast } from "@/components/ui/toastHook"
import mealService from "./api/meal.service"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { MealFormSchema, zMealFormSchema } from "./types/mealForm.types"
import { Meals } from "./types/meals.types"

interface MealFormProps {
  setMeals: Dispatch<SetStateAction<Meals>>
}

function MealForm({ setMeals }: MealFormProps) {
  const auth = useContext(AuthContext)

  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<MealFormSchema>({
    resolver: zodResolver(zMealFormSchema),
    defaultValues: {
      name: '',
    }
  })

  async function onSubmit(values: MealFormSchema) {
    try {
      const newMeal = await mealService.create({
        ...values,
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })

      if (newMeal) {
        setMeals((prevMeals) => prevMeals.concat(newMeal))
        logger.log('redirecting to meals')
        navigate('/meals')
      }
    } catch (err: unknown) {
      logger.logError(err)

      toast({
        title: 'Error',
        description: 'Unable to create meal',
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
      </form>
    </Form>

  )
}

export default MealForm