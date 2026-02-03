import Image from "next/image"
import Placeholder from "@/public/google.svg"

function Logo() {
  return (
    <Image
      src={Placeholder}
      height={100}
      width={100}
      objectFit="cover"
      objectPosition="center"
      alt="form logo"
    />
  )
}

export default Logo
