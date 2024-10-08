import { auth } from "@/auth";
import Link from "next/link";
import SignIn from "./sign-in";
import UserDropdown from "./UserDropdown";
import { Button } from "flowbite-react";

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex">
      <img src="logo.png" alt="" className="max-h-20" />
      <div className="flex-auto">
        <div className="h-full bg-sky-800 rounded-bl-full p-4 pl-6 flex justify-end gap-4">
          <Link href="/"><Button>Accueil</Button></Link>
          <Link href="/onboarding"><Button>Onboarding</Button></Link>
          {session ? <UserDropdown /> : <SignIn />}
        </div>
      </div>
    </nav>
  )
}
