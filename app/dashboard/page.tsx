import Link from "next/link"

import { getSession, logout } from "@/lib/actions"
import { redirect } from "next/navigation"

async function Dashboard() {
  const session = await getSession()

  if (!session) redirect("/login")

  return (
    <div className="flex flex-col gap-2">
      <Link href="/form/create">Create form</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
