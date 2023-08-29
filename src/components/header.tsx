import { LayoutList, User, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="flex w-full items-center justify-between border-b px-4 py-4 shadow-sm">
      <Button variant="ghost" className="cursor-default rounded-full">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <LayoutList />
          To-Do App
        </h2>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer gap-2"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-5 w-5" />
            Light mode
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer gap-2"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-5 w-5" /> Dark mode
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex cursor-pointer gap-2  text-red-600">
            <LogOut className="h-5 w-5" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
