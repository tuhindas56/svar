"use client"

import { useState } from "react"
import { Cable } from "lucide-react"

import { Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog"
import { FormSection } from "@/lib/definitions"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"

interface SectionRelationshipsModalProps {
  sections: FormSection[]
  onUpdateSection: (section: FormSection) => void
}

function SectionRelationshipsModal({
  sections,
  onUpdateSection
}: SectionRelationshipsModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  function onOpenDialog() {
    setDialogOpen(true)
  }

  function onDialogOpenChange(open: boolean) {
    if (!open) {
      setAlertDialogOpen(true)
    }
  }

  function onCancel() {
    setAlertDialogOpen(false)
  }

  function onClose() {
    setAlertDialogOpen(false)
    setDialogOpen(false)
  }

  function onCheckedChange(value: string) {}

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
        <form>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" onClick={onOpenDialog}>
              <Cable />
              Section Relationships
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Configure Section Relationships</DialogTitle>
              <DialogDescription>
                Choose how sections connect and control the form flow based on
                responses.
              </DialogDescription>
            </DialogHeader>

            {sections.map((section, index) => (
              <div className="my-2" key={index}>
                <p className="font-medium">
                  {section.title || "Untitled section"}
                </p>
                <p>
                  <small>Section {index + 1}</small>
                </p>
                <RadioGroup
                  defaultValue="next"
                  onValueChange={(v) => console.log(v)}
                  className="mt-2"
                >
                  <Label className="has-data-[state=checked]:border-primary border-border flex gap-4 rounded-sm border px-3 py-2 text-sm transition duration-100">
                    <RadioGroupItem value="next" />
                    Continue to next section
                  </Label>
                  <Label className="border-border has-data-[state=checked]:border-primary flex gap-4 rounded-sm border px-3 py-2 text-sm transition duration-100">
                    <RadioGroupItem value="based_on_answer" />
                    Continue to next section based on answer
                  </Label>
                </RadioGroup>

                {false && (
                  <div className="mt-2">
                    <Select onValueChange={onSelect}>
                      <SelectTrigger className="min-w-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper" align="start">
                        <SelectGroup>
                          <SelectItem value="next">
                            Continue to next section
                          </SelectItem>
                          {sections.map((section, index) => {
                            return (
                              <SelectItem value={section.id} key={section.id}>
                                Go to section {index + 1} (
                                {section.title || "Untitled section"})
                              </SelectItem>
                            )
                          })}
                          <SelectItem value="submit">Submit Form</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ))}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <AlertDialog open={alertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Wait!</AlertDialogTitle>
            <AlertDialogDescription>
              You might lose unsaved changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default SectionRelationshipsModal
