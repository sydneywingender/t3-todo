import Link from "next/link";

export default function MagicLinkSent() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1>Check your email</h1>
      <span>We just sent you a magic link</span>
      <Link href="/auth" className="text-primary">
        Back to login
      </Link>
    </div>
  );
}
