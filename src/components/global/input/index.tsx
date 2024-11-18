import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  error?: string | undefined;
  required?: boolean;
  className?: string;
  base?:string;
}

export default function GlobalInput({
  label,
  placeholder,
  type = "text",
  description,
  error,
  required,
  className,
  base,
  ...props
}: InputProps) {
  return (
    <div className={cn("space-y-2", base)}>
      {label && (
        <Label htmlFor={label}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input
        id={label}
        className={cn(
          className,
          error &&
            "border-destructive/80 !bg-destructive/20 !text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
        )}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {description || error && (
        <p
          className={cn("mt-2 text-xs text-muted-foreground" , error && "!text-destructive")}
          role="region"
          aria-live="polite"
        >
          {description || error}
        </p>
      )}
    </div>
  );
}
