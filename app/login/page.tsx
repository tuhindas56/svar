import { redirect } from "next/navigation"
import Image from "next/image"
import { auth, signIn } from "@/auth"
import GoogleIcon from "@/public/google.svg"

async function Login() {
  const session = await auth()

  if (session) redirect("/dashboard")

  async function loginAction() {
    "use server"
    await signIn("google")
  }

  return (
    <div className="grid h-dvh place-content-center">
      <form action={loginAction}>
        <button>
          <Image height={16} width={16} src={GoogleIcon} alt="" /> Continue with
          Google
        </button>
      </form>
    </div>
  )
}

export default Login
