import Link from "next/link"
import { signOut } from "@/auth"
import Button from "@/app/ui/button"

function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      Dashboard
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login" })
        }}
      >
        <Button>Logout</Button>
      </form>
      <Link href="/create">Create form</Link>
    </div>
  )
}

export default Dashboard
