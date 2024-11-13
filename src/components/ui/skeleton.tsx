import { cn } from "@/lib/utils"

function Skeleton({
  className,
  disable = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { disable?: boolean }) {
  return disable ? (
    <div {...props}>{children}</div>
  ) : (
    <div  className={cn(
      "animate-pulse rounded-md bg-primary/10",
      className,
    )} {...props} />
  );
}

export { Skeleton };