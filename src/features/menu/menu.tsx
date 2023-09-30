import { Link } from 'react-router-dom';
import { LogOut, Menu as MenuIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { KeycloakContext } from '@/features/auth/keycloak-context';

interface LinkItem {
  link: string;
  label: string;
}

const linkItems: LinkItem[] = [
  { link: '/activities', label: 'Activities' },
  { link: '/', label: 'Dashboard' },
  { link: '/foodItems', label: 'Food Items' },
  { link: '/meals', label: 'Meals' },
];

export function Menu(): JSX.Element {
  const keycloak = useContext(KeycloakContext);
  const [open, setOpen] = useState<boolean>(false);

  async function logout(): Promise<void> {
    await keycloak?.client?.logout();
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="mt-4 ml-2" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="left">
        {linkItems.map((l) => (
          <Link className="flex flex-col mt-5" key={l.label} to={l.link}>
            <Button
              className="border rounded-md p-2 text-2xl items-center h-30"
              onClick={() => {
                setOpen(false);
              }}
              variant="link"
            >
              {l.label}
            </Button>
          </Link>
        ))}

        <Button
          className="self-center mt-auto"
          onClick={() => void logout()}
          variant="destructive"
        >
          <LogOut />
          Sign Out
        </Button>
      </SheetContent>
    </Sheet>
  );
}
