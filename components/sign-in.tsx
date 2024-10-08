import { signIn } from "@/auth"
import { Button } from "flowbite-react"

export default function SignIn() {
  return (
    <>
      <form
        action={async () => {
          "use server"
          await signIn("auth0")
        }}
      >
        <Button type="submit">Signin</Button>
      </form>
    </>
  )
}
