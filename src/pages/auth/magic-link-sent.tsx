import Link from "next/link";

export default function MagicLinkSent() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1>Magic link sent!</h1>
      <span>Check your inbox and follow the instructions.</span>
      <Link href="/auth" className="text-primary">
        Back to login
      </Link>
    </div>
  );
}
