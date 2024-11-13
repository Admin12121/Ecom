import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps{
    message?:string
}

export const FormSuccess = ({message}:FormSuccessProps)=>{
    if(!message) return null

    return(
        <div className="text-green-300 bg-green-500/20 flex items-center p-3 rounded gap-2">
            <CheckCircledIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    )
}
