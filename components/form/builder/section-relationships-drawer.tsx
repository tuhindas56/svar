"use client"

import { useMemo, useState } from "react"
import { Cable } from "lucide-react"

import { FormSection } from "@/lib/definitions"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { toast } from "sonner"
import { FIELD_TYPE } from "@/lib/constants"

interface SectionRelationshipsDrawerProps {
  sections: FormSection[]
  onUpdateSection: (section: FormSection) => void
}

interface SectionRelationsipItemProps {
  index: number
  section: FormSection
  sections: FormSection[]
  onUpdateSectionsDraft: (section: FormSection) => void
}

function SectionRelationshipItem({
  index,
  section,
  sections,
  onUpdateSectionsDraft
}: SectionRelationsipItemProps) {
  const otherSections = useMemo(
    () => sections.slice(index).filter((s) => s.id !== section.id),
    [sections, section]
  )
  const lastMultiChoiceFieldIndex = useMemo(
    () => section.fields.findIndex((s) => s.type === FIELD_TYPE.RADIO),
    [section]
  )

  const isLastSection = index === sections.length - 1
  const hasMultiChoiceField = lastMultiChoiceFieldIndex !== -1
  const multiChoiceField = hasMultiChoiceField
    ? sections[lastMultiChoiceFieldIndex]
    : null

  return (
    <>
      <div
        className="border-border flex flex-col gap-2 rounded-xs border px-4 py-3"
        key={index}
      >
        <div>
          <p className="font-medium">
            <span>{section.title || "Untitled section"}</span>
          </p>
          <p>
            <small>Section {index + 1}</small>
          </p>
          {isLastSection && (
            <p>
              <small>
                This is the final section. Users submit their responses at this
                section.
              </small>
            </p>
          )}
          {!isLastSection && (
            <div className="mt-2">
              <p>
                <small>Continue to next section based on:</small>
              </p>
              <Select
                defaultValue="sectionOrder"
                value={
                  section.nextSectionBasedOnAnswer
                    ? "answerChoice"
                    : "sectionOrder"
                }
                onValueChange={(v) => {
                  if (v === "answerChoice") {
                    if (isLastSection) {
                      toast.info(
                        "Cannot setup navigation logic on the final section of the form."
                      )
                      return
                    }

                    if (!hasMultiChoiceField) {
                      toast.info(
                        "This section has no multi choice questions for setting up answer based navigation."
                      )
                      return
                    }
                    if (!isLastSection && hasMultiChoiceField) {
                      onUpdateSectionsDraft({
                        ...section,
                        nextSectionBasedOnAnswer: true
                      })
                    }
                  } else {
                    onUpdateSectionsDraft({
                      ...section,
                      nextSectionBasedOnAnswer: false
                    })
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem value="sectionOrder">Form order</SelectItem>
                    <SelectItem value="answerChoice">Answer choice</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {section.nextSectionBasedOnAnswer && (
          <>
            <div>
              <p>
                <small>
                  When answer to question {lastMultiChoiceFieldIndex + 1} in
                  this section
                </small>
              </p>
            </div>

            <div>
              <p>
                <small>is</small>:
              </p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    {sections
                      .filter((s) => s.id !== section.id)
                      .map((section, index) => {
                        return (
                          <SelectItem value={section.id} key={section.id}>
                            Go to section {index + 1} (
                            {section.title || "Untitled section"})
                          </SelectItem>
                        )
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p>
                <small>Go to</small>:
              </p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    {otherSections.map((section, index) => {
                      return (
                        <SelectItem value={section.id} key={section.id}>
                          Go to section {index + 1} (
                          {section.title || "Untitled section"})
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function SectionRelationshipsDrawer({
  sections,
  onUpdateSection
}: SectionRelationshipsDrawerProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [sectionsDraft, setSectionsDraft] = useState(sections)

  function onOpenDialog() {
    setDialogOpen(true)
    setSectionsDraft(sections)
  }

  function onDialogOpenChange(open: boolean) {
    if (!open) {
      setAlertDialogOpen(true)
    }
  }

  function onCancel() {
    setAlertDialogOpen(false)
  }

  function onSave() {
    setAlertDialogOpen(false)
    setDialogOpen(false)

    for (let section of sectionsDraft) {
      onUpdateSection(section)
    }
  }

  function onUpdateSectionsDraft(section: FormSection) {
    setSectionsDraft((prev) =>
      prev.map((s) => (s.id === section.id ? section : s))
    )
  }

  return (
    <>
      <Drawer
        direction="right"
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
        handleOnly
      >
        <DrawerTrigger asChild>
          <Button size="sm" variant="ghost" onClick={onOpenDialog}>
            <Cable />
            Section Relationships
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Configure Section Relationships</DrawerTitle>
            <DrawerDescription>
              Choose how sections connect and control the form flow based on
              responses.
            </DrawerDescription>

            <DrawerDescription asChild>
              <div className="border-border rounded-xs border px-4 py-3">
                <p>Please note:</p>
                <p>
                  <small>
                    Only the last occurrence of a multiple-choice question in a
                    section can be used to set up section navigation logic.
                  </small>
                </p>
              </div>
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex w-full flex-col gap-4 overflow-y-auto px-4">
            {sectionsDraft.map((section, index) => (
              <SectionRelationshipItem
                key={section.id}
                index={index}
                sections={sectionsDraft}
                section={section}
                onUpdateSectionsDraft={onUpdateSectionsDraft}
              />
            ))}
          </div>

          <DrawerFooter className="flex-row justify-end">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button type="submit">Save changes</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={alertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              Any unsaved changes will be lost. Are you sure you want to
              continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onSave}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default SectionRelationshipsDrawer
