import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholderText?: string;
}

export function DatePicker({ selected, onSelect, placeholderText = "Pick a date" }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] justify-start text-left font-normal", !selected && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>{placeholderText}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selected}
          onSelect={onSelect}
          initialFocus
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
