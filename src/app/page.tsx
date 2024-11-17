
import Image from "next/image";
import { signOut } from "./(auth)/actions";
import { Button } from "@/components/ui/button";
import { joinOrg } from "@/actions/org-actions";
import Link from "next/link";
//hi
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
    </div>
  );
}
