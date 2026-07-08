"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_PHOTOS,
  MAX_PHOTO_SIZE_BYTES,
} from "@/lib/validations";
import type { UploadedPhoto } from "@/types";

interface PhotoUploadProps {
  photos: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
}

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function PhotoUpload({ photos, onChange }: PhotoUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    setError(null);

    const valid: File[] = [];
    for (const file of incoming) {
      if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
        setError("Only JPG, PNG, WebP, and HEIC images are allowed.");
        continue;
      }
      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        setError("Each photo must be 5MB or smaller.");
        continue;
      }
      valid.push(file);
    }

    const newPhotos: UploadedPhoto[] = valid.map((file, i) => ({
      file,
      id: `${file.name}-${file.size}-${i}-${Date.now()}`,
      previewUrl: URL.createObjectURL(file),
    }));

    const combined = [...photos, ...newPhotos];
    if (combined.length > MAX_PHOTOS) {
      setError(`You can upload up to ${MAX_PHOTOS} photos.`);
    }

    onChange(combined.slice(0, MAX_PHOTOS));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function removePhoto(id: string) {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.previewUrl);
    onChange(photos.filter((p) => p.id !== id));
    setError(null);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging ? "border-royal-blue bg-royal-blue/5" : "border-border"
        }`}
      >
        <ImagePlus className="h-8 w-8 text-text-muted" aria-hidden="true" />
        <p className="mt-3 text-[15px] font-medium text-dark-navy">
          Click to upload or drag photos here
        </p>
        <p className="mt-1 text-sm text-text-muted">
          JPG, PNG, WebP, HEIC • Max 5 photos • 5MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/heic"
          onChange={handleInputChange}
          className="hidden"
          aria-label="Upload photos"
        />
      </div>

      {error && <p className="mt-2 text-[13px] text-error">{error}</p>}

      {photos.length > 0 && (
        <ul className="mt-4 space-y-2">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className="flex items-center gap-3 rounded-lg border border-border p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.previewUrl}
                alt={photo.file.name}
                className="h-12 w-12 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-dark-navy">
                  {photo.file.name}
                </p>
                <p className="text-xs text-text-muted">{formatSize(photo.file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="shrink-0 rounded-full p-1.5 text-text-muted hover:bg-light-grey hover:text-error"
                aria-label={`Remove ${photo.file.name}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
