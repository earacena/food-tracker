import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { logger } from '@/utils/logger';
import { AuthContext } from './user-credential-provider';

const zEmailLoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Must be a valid email' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export function EmailLoginForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof zEmailLoginFormSchema>>({
    resolver: zodResolver(zEmailLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof zEmailLoginFormSchema>,
  ): Promise<void> {
    setLoading(true);

    // TODO: Process credentials using firebase, and log users in, redirect to main page
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      user?.setAuthUser(userCredential.user);
      navigate('/');
    } catch (err: unknown) {
      logger.logError(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-3xl">Sign In With Email</h2>
      <Form {...form}>
        <form
          className="flex flex-col mt-16 w-80"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" disabled={loading} type="submit">
            {loading ? <Loader className="mr-2 animate-spin" /> : null}
            {loading ? '' : 'Sign In'}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col w-80">
        <p className="text-sm mx-2 text-stone-500 self-center my-4">
          Don&apos;t have an account?
        </p>
        <Link className="flex flex-col w-80" to="/signup/email">
          <Button variant="outline">Create an account</Button>
        </Link>
      </div>
    </div>
  );
}
