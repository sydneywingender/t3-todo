import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { User, Sun, Moon, LogOut, XCircle, CheckCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "~/components/ui/use-toast";
import { cn } from "~/utils/utils";

export default function Header() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const user = useUser();
  const supabase = useSessionContext().supabaseClient;

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      await router.push("/auth");
      toast({
        description: "Signed out successfully",
        duration: 1500,
        action: <CheckCircle2 className="text-green-600" />,
      });
    } catch (error) {
      toast({
        description: "Error signing out",
        duration: 1500,
        action: <XCircle className="text-red-600" />,
      });
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <header className="flex w-full items-center justify-between border-b px-4 py-4 shadow-sm">
      <Logo />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex flex-col items-start">
            <span>Logged in as</span>
            <span className="font-semibold">{user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
          <DropdownMenuItem
            className="flex cursor-pointer gap-2 text-red-600"
            onClick={() => handleSignOut()}
          >
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
