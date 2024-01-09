import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/utils/logger';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AuthContext } from './user-credential-provider';

const zEmailSignUpFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Must be valid email' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(4, { message: 'Password must have 4 or more characters' })
      .max(20, { message: 'Password must be less than 20 characters' })
      .regex(new RegExp(/\d/), 'Password must contain 1 digit')
      .regex(
        new RegExp(/[!@#$%^&*-+=]/),
        'Password must contain one of the following: !@#$%^&*-+=',
      ),
    confirmPassword: z.string().min(1, { message: 'Must confirm password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function EmailSignUpForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const authUser = useContext(AuthContext);
  const auth = getAuth();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof zEmailSignUpFormSchema>>({
    resolver: zodResolver(zEmailSignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof zEmailSignUpFormSchema>,
  ): Promise<void> {
    setLoading(true);

    const { email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      authUser?.setAuthUser(userCredential.user);
      navigate('/');
    } catch (err: unknown) {
      logger.logError(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-3xl">Create a new account</h2>
      <Form {...form}>
        <form
          className="flex flex-col mt-16 w-80"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="" />
                <FormDescription className="">
                  The email for the account.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage className="" />
                <FormDescription className="">
                  Passwords must contain: <br />
                  &bull; between 4 and 20 characters <br />
                  &bull; 1 number <br />
                  &bull; 1 special symbol: !@#$%^&*-+= <br />
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="" />
                <FormDescription className="">
                  Re-type the desired password.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button className="mt-4" disabled={loading} type="submit">
            {loading ? <Loader className="mr-2 animate-spin" /> : null}
            {loading ? '' : 'Sign In'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
