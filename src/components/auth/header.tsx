import {cn} from "@/lib/utils"

interface HeaderProps {
    title: string;
    label: string;
    className?: string;
}

export const Header = ({title, label, className}: HeaderProps) => {
    return(
        <div className={cn("w-full flex flex-col items-start justify-center mb-5", className)}>
            <h5 className="font-bold text-base text-themeTextWhite">{title}</h5>
            <p className="text-themeTextGray leading-tight">{label}</p>
        </div>
    )
}

