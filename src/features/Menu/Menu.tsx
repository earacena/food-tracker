import { Button } from "@/components/ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet"
import { Link } from "react-router-dom"
import { Menu as MenuIcon } from "lucide-react"
import { useState } from "react"

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
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="mt-4 ml-2" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {linkItems.map((l) => (
          <Link key={l.label} to={l.link} className="flex flex-col mt-5">
            <Button className="border rounded-md p-2 text-2xl items-center h-30" variant="link" onClick={() => setOpen(false)}>
              {l.label}
            </Button>
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  )
}

export default Menu
