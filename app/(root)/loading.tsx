import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[50rem]">
      <Loader2 className=" h-20 w-20   animate-spin" />
    </div>
  )
}

export default Loading
