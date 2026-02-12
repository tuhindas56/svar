import { redirect } from "next/navigation"
import Image from "next/image"

import { login, getSession } from "@/lib/actions"
import GoogleIcon from "@/public/google.svg"

async function Login() {
  const session = await getSession()

  if (session) redirect("/dashboard")

  return (
    <div className="grid h-dvh place-content-center">
      <form action={login}>
        <button>
          <Image height={16} width={16} src={GoogleIcon} alt="" /> Continue with
          Google
        </button>
      </form>
    </div>
  )
}

export default Login
