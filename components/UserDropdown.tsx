import { auth, signOut } from "@/auth";
import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { redirect } from "next/navigation";

export default async function UserDropdown() {
  const session = await auth()

  if (!session) return null;

  if (!session.user) return null

  const handleLogout = async () => {
    "use server"
    await signOut({redirect: false})

    redirect(`${process.env.AUTH_AUTH0_ISSUER}/v2/logout?client_id=${process.env.AUTH_AUTH0_ID}`)
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar alt="User settings" img={session.user.image} rounded />
      }
      className="rounded-xl"
    >
      <DropdownHeader>
        <span className="block text-sm">{session.user.username}</span>
        <span className="block truncate text-sm font-medium">{session.user.email}</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleLogout}>Sign-Out</DropdownItem>
    </Dropdown>
  )
}
