"use client"

import { use } from "react"
import type { Usable } from "react"
import type { Session } from "next-auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { deleteAccount, logout } from "@/lib/actions/auth"
import { getInitials } from "@/lib/utils"

interface Props {
  sessionPromise: Usable<Session | null>
}

function AvatarMenu({ sessionPromise }: Props) {
  const session = use(sessionPromise)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image || ""} alt="" />
          <AvatarFallback>
            {getInitials(session?.user?.name || "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={deleteAccount}>
          Delete account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarMenu
