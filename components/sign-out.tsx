import { signOut } from "@/auth"
import { Button } from "flowbite-react"
import { redirect } from "next/navigation"

export default function SignOut() {
  return (
    <>
      <form
        action={async () => {
          "use server"
          await signOut({redirect: false})

          redirect(`${process.env.AUTH_AUTH0_ISSUER}/v2/logout?client_id=${process.env.AUTH_AUTH0_ID}`)
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  )
}
