import { LayoutList } from "lucide-react";
import { cn } from "~/utils/utils";

type LogoProps = {
  classNames?: string;
};

export default function Logo({ classNames }: LogoProps) {
  return (
    <div className="w-auto">
      <div
        className={cn(
          `flex items-center justify-center gap-2 rounded-full
          bg-gradient-to-r from-violet-300 to-purple-200 px-6
          py-2 text-primary`,
          classNames
        )}
      >
        <LayoutList />
        <h2>To-Do App</h2>
      </div>
    </div>
  );
}
