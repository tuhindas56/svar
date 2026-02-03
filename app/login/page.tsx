import { redirect } from "next/navigation"
import Image from "next/image"
import { auth, signIn } from "@/auth"
import Button from "@/app/ui/button"
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
        <Button>
          <Image height={16} width={16} src={GoogleIcon} alt="" /> Continue with
          Google
        </Button>
      </form>
    </div>
  )
}

export default Login
