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
          bg-gradient-to-r from-primary to-purple-900
          px-6 py-2 text-white`,
          classNames
        )}
      >
        <LayoutList />
        <h2>To-Do App</h2>
      </div>
    </div>
  );
}
