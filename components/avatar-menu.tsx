"use client"

import { useState } from "react"
import type { Session, User } from "better-auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/actions/auth"
import { getInitials } from "@/lib/utils"
import DeleteAccount from "./delete-account"

interface Props {
  session: { user: User; session: Session } | null
}

function AvatarMenu({ session }: Props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  if (!session) {
    return null
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={session.user.image || ""} alt="" />
            <AvatarFallback>{getInitials(session.user.name || "")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
            Delete account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAccount open={deleteModalOpen} onOpenChange={setDeleteModalOpen} />
    </>
  )
}

export default AvatarMenu
