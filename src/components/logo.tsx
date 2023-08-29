import { LayoutList } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/utils";

type LogoProps = {
  classNames?: string;
};

export default function Logo({ classNames }: LogoProps) {
  return (
    <Button
      variant="ghost"
      className={cn("cursor-default rounded-full bg-accent", classNames)}
    >
      <h2 className="flex items-center gap-2">
        <LayoutList />
        To-Do App
      </h2>
    </Button>
  );
}
