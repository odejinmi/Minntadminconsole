import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormField({
  label,
  htmlFor,
  children,
}: Readonly<{
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-muted-foreground text-sm">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function SelectField({
  label,
  value,
  onValueChange,
  options,
}: Readonly<{
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
}>): React.ReactElement {
  return (
    <FormField label={label}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
