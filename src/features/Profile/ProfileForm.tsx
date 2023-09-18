import { useForm } from "react-hook-form"
import { zProfileFormSchema, ProfileFormSchemaType } from "./types/profileForm.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from '@/components/ui/Input'
import { Button } from "@/components/ui/Button"
import { useContext } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import profileService from "./api/profile.service"
import { UserContext } from "../User/UserProvider"
import { useNavigate } from "react-router-dom"
import logger from "@/utils/Logger"
import { useToast } from "@/components/ui/toastHook"

function ProfileForm() {
  const auth = useContext(AuthContext)
  const user = useContext(UserContext)

  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(zProfileFormSchema),
    defaultValues: {
      dailyCalorieGoal: 2000,
    },
  })

  async function onSubmit(values: ProfileFormSchemaType) {
    try {
      const { dailyCalorieGoal } = values
      const newProfile = await profileService.create({
        dailyCalorieGoal,
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })

      user?.actions.setUserProfile(newProfile)

      logger.log('redirecting to "/"')
      navigate('/')
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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Create a new profile</h2>
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default ProfileForm