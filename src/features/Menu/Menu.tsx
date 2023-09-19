import { Button } from "@/components/ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet"
import { Link } from "react-router-dom"

function Menu () {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          Menu 
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link to="/activities">
          Activities
        </Link>
        <Link to="/">
          Dashboard
        </Link>
        <Link to="/foodItems">
          Food Items
        </Link>
        <Link to="/meals">
          Meals
        </Link>
      </SheetContent>
    </Sheet>
  )
}

export default Menu
