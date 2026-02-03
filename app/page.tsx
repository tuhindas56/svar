import Link from "next/link"

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col gap-4">
        Home
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </main>
    </div>
  )
}
