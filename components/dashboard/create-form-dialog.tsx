"use client"

import { useActionState, useId } from "react"

import { submitCreateFormAction } from "@/lib/actions/form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { usePathname } from "next/navigation"

function CreateFormDialog() {
  const pathname = usePathname()
  const formId = useId()

  const [state, action, pending] = useActionState(submitCreateFormAction, {
    name: ""
  })

  if (!pathname.endsWith("dashboard")) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create form</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
          <DialogDescription>
            Enter a name for the form. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

         <form action={action} id={formId}>
           <Label className="flex flex-col items-start">
             Name
             <Input
               type="text"
               name="name"
               placeholder="eg: Product survey"
               disabled={pending}
               defaultValue={state.name}
               aria-describedby={state?.error ? `form-error-${formId}` : undefined}
             />
           </Label>
           {state?.error && (
             <p id={`form-error-${formId}`} className="mt-2 text-xs text-red-400">{state.error}</p>
           )}
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form={formId} disabled={pending}>
            {pending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormDialog
