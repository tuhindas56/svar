import Link from "next/link"

import { logout } from "@/lib/actions"

async function Dashboard() {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/form/create">Create form</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
