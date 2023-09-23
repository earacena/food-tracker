import { Button } from "@/components/ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet"
import { Link } from "react-router-dom"
import { LogOut, Menu as MenuIcon } from "lucide-react"
import { useContext, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"

interface LinkItem {
  link: string
  label: string
}

const linkItems: LinkItem[]  = [
  {  link: '/activities', label: 'Activities'},
  {  link: '/', label: 'Dashboard'},
  {  link: '/foodItems', label: 'Food Items'},
  {  link: '/meals', label: 'Meals'},
]

function Menu() {
  const auth = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false)

  async function logout() {
    await auth?.keycloak?.logout()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="mt-4 ml-2" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        {linkItems.map((l) => (
          <Link key={l.label} to={l.link} className="flex flex-col mt-5">
            <Button className="border rounded-md p-2 text-2xl items-center h-30" variant="link" onClick={() => setOpen(false)}>
              {l.label}
            </Button>
          </Link>
        ))}

        <Button variant="destructive" onClick={logout} className="self-center mt-auto">
          <LogOut />
          Sign Out
        </Button>
      </SheetContent>
    </Sheet>
  )
}

export default Menu
