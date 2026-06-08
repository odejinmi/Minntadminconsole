"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ACCEPT = "image/png,image/jpeg,image/svg+xml,image/x-icon";

type BrandingUploadProps = {
  label: string;
};

/** Square dashed image picker with a "Choose file" button, for logo/favicon. */
export function BrandingUpload({
  label,
}: Readonly<BrandingUploadProps>): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onPick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative grid size-28 place-items-center overflow-hidden rounded-xl border border-dashed border-border transition-colors hover:border-primary/60"
      >
        {preview ? (
          <Image
            src={preview}
            alt={label}
            fill
            className="object-contain p-2"
            unoptimized
          />
        ) : (
          <Upload className="size-5 text-success" />
        )}
      </button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="border-success/50 text-success hover:text-success"
        onClick={() => inputRef.current?.click()}
      >
        Choose file
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={onPick}
      />
    </div>
  );
}
