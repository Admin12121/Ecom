"use client";

import { useId } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { DropdownNavProps, DropdownProps } from "react-day-picker";

interface DatepickerProps {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
}

export function YearCalander({selected, onSelect}: DatepickerProps) {

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <Calendar
      mode="single"
      required={true}
      selected={selected}
      onSelect={onSelect}
      className="rounded-lg border border-border p-2"
      classNames={{
        month_caption: "mx-0",
      }}
      captionLayout="dropdown"
      defaultMonth={new Date()}
      startMonth={new Date(1980, 6)}
      hideNavigation
      components={{
        DropdownNav: (props: DropdownNavProps) => {
          return (
            <div className="flex w-full items-center gap-2">
              {props.children}
            </div>
          );
        },
        Dropdown: (props: DropdownProps) => {
          return (
            <Select
              value={String(props.value)}
              onValueChange={(value) => {
                if (props.onChange) {
                  handleCalendarChange(value, props.onChange);
                }
              }}
            >
              <SelectTrigger className="h-8 w-fit font-medium first:grow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                {props.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      }}
    />
  );
}


interface Props {
  selected: string | undefined;
  label?: string;
  onSelect: (date: Date) => void;
  className?: string;
}

export default function DatePicker({selected, onSelect, label, className}: Props) {
  const id = useId();

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
              <CalendarIcon
                size={16}
                strokeWidth={2}
                className={cn("shrink-0 hover:text-white text-muted-foreground/80 transition-colors group-hover:text-foreground", className)}
                aria-hidden="true"
              />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0" align='start'>
            <YearCalander selected={selected ? parseISO(selected) : new Date()} onSelect={onSelect} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
