import Header from "~/components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-start">
      <Header />
      <div className="flex h-full w-full max-w-xl flex-col gap-4 p-4">
        {children}
      </div>
    </main>
  );
}
