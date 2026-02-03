import React, { useState } from "react"
import NextImage from "next/image"

interface Cover {
  file: File | null
  previewUrl: string
}

function Cover() {
  const [cover, setCover] = useState<Cover | null>(null)

  function onCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const previewUrl = URL.createObjectURL(file)
      setCover({ file, previewUrl })
    }
  }

  function onCoverRemove() {
    if (cover) URL.revokeObjectURL(cover.previewUrl)
    setCover(null)
  }

  return (
    <div className="dotted-bg relative h-60 overflow-hidden">
      {cover && (
        <NextImage
          src={cover.previewUrl}
          fill
          objectFit="cover"
          objectPosition="center 50%"
          alt="form cover image"
        />
      )}
      {!cover && (
        <form className="absolute top-0 left-0 h-full w-full">
          <input
            type="file"
            id="cover-upload"
            onChange={onCoverUpload}
            className="hidden"
          />
          <label
            htmlFor="cover-upload"
            aria-label="click or touch to upload cover image"
            className="grid h-full w-full cursor-pointer place-content-center"
          >
            Click or drag and drop image here to add cover
          </label>
        </form>
      )}
    </div>
  )
}

export default Cover
