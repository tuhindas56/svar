import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

type Props = {
  title: string
}

function NotReceivingSubmissions({ title }: Props) {
  return (
    <div className="flex h-dvh w-full justify-center">
      <Card className="bg-background mt-24 h-max w-xs rounded-sm shadow-none sm:w-md">
        <CardHeader className="">
          <CardTitle className="font-lora text-2xl">{title}</CardTitle>
          <CardDescription>
            This form is no longer receiving submissions.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
export default NotReceivingSubmissions
