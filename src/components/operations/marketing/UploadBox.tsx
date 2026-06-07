"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";

const ACCEPT = "image/png,image/jpeg";
const MAX_BYTES = 5 * 1024 * 1024;

type UploadBoxProps = {
  /** Controlled selected file. Omit to let the box manage its own state. */
  value?: File | null;
  onChange?: (file: File | null) => void;
};

/** Click or drag-and-drop dropzone for cover image uploads, with preview. */
export function UploadBox({
  value,
  onChange,
}: Readonly<UploadBoxProps>): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const file = value !== undefined ? value : internalFile;
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const setFile = (next: File | null): void => {
    if (value === undefined) setInternalFile(next);
    onChange?.(next);
  };

  const accept = (next: File | undefined): void => {
    if (!next) return;
    if (!ACCEPT.split(",").includes(next.type)) {
      setError("Only PNG or JPG images are allowed.");
      return;
    }
    if (next.size > MAX_BYTES) {
      setError("Image must be 5MB or smaller.");
      return;
    }
    setError(null);
    setFile(next);
  };

  const openPicker = (): void => inputRef.current?.click();

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setDragging(false);
    accept(event.dataTransfer.files?.[0]);
  };

  const clear = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setError(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={openPicker}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative grid h-40 w-full place-items-center overflow-hidden rounded-xl border border-dashed text-center transition-colors ${
          dragging
            ? "border-primary bg-accent"
            : "border-border bg-muted/30 hover:border-primary/60"
        }`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt={file?.name ?? "Cover image"}
              fill
              className="object-cover"
              unoptimized
            />
            <span
              role="button"
              tabIndex={-1}
              onClick={clear}
              className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-background"
            >
              <X className="size-4" />
            </span>
          </>
        ) : (
          <div className="space-y-1">
            <UploadCloud className="mx-auto size-6 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Drag &amp; drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(event) => accept(event.target.files?.[0])}
      />

      {file && !error ? (
        <p className="truncate text-xs text-muted-foreground">{file.name}</p>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
