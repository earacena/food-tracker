import { Loader } from 'lucide-react';
import { type JSX } from 'react';

export function Loading(): JSX.Element {
  return <Loader className="animate-spin mx-auto my-auto" />;
}
