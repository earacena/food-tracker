import { useForm } from "react-hook-form"
import { zProfileFormSchema, ProfileFormSchemaType } from "./types/profileForm.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from '@/components/ui/Input'
import { Button } from "@/components/ui/Button"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import profileService from "./api/profile.service"
import { useNavigate } from "react-router-dom"
import logger from "@/utils/Logger"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserContext } from "../User/UserProvider"
import { Loader2 } from "lucide-react"

function ProfileForm() {
  const auth = useContext(AuthContext)
  const user = useContext(UserContext)
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(zProfileFormSchema),
    defaultValues: {
      dailyCalorieGoal: 2000,
    },
  })

  const addProfile = useMutation({
    mutationFn: async (values: ProfileFormSchemaType) => {
      setLoading(true)
      return await profileService.create({
        ...values,
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', auth?.userInfo?.id, auth?.keycloak?.token]
      })
      
      setLoading(false)
      navigate('/')
    },
    onError: (error) => {
      setLoading(false)
      logger.logError(error)
    }
  })

  function onSubmit(values: ProfileFormSchemaType) {
    addProfile.mutate(values)
  }

  useEffect(() => {
    if (user?.userProfile != null) {
      navigate('/')
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mx-auto space-y-8 my-9 w-[360px] p-5">
        <h2 className="self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Create a new profile</h2>
        <FormField
          control={form.control}
          name='dailyCalorieGoal'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Calorie Goal</FormLabel>
              <FormControl>
                <Input placeholder="2000" {...field} />
              </FormControl>
              <FormDescription>
                This is the amount of calories you would like to consume every day.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm