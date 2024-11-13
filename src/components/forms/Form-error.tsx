import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps{
    message?:string | null
}

export const FormError = ({message}:FormErrorProps)=>{
    if(!message) return null

    return(
        <div className="text-destructive bg-destructive/20 flex items-center p-3 rounded gap-2">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    )
}
