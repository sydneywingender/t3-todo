import { useUser } from "@supabase/auth-helpers-react";
import Header from "~/components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const user = useUser();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-start">
      <Header hidden={!user} />
      <div className="flex h-full w-full max-w-xl flex-col gap-4 p-4">
        {children}
      </div>
    </main>
  );
}
