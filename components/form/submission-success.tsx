import { CircleCheck } from "lucide-react"

import Card from "./form-card"

function SubmissionSuccess() {
  return (
    <Card className="flex-row items-center gap-3">
      <CircleCheck className="text-primary" size={48} strokeWidth={1.3} />
      <div>
        <h2 className="text-lg font-medium">Success!</h2>
        <p className="text-sm">Your submission has been recorded.</p>
      </div>
    </Card>
  )
}

export default SubmissionSuccess
