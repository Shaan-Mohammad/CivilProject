"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, File, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UploadedFileData {
  name: string;
  url: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  onUploadComplete: (files: UploadedFileData[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
}

export function FileUploader({ 
  onUploadComplete, 
  maxFiles = 5,
  acceptedTypes = "image/*,application/pdf,.dwg,.dxf"
}: FileUploaderProps) {
  const [uploads, setUploads] = useState<UploadedFileData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (uploads.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    setError("");
    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Upload failed");
      }

      const result = await response.json();
      const newFiles = [...uploads, ...result.files];
      setUploads(newFiles);
      onUploadComplete(newFiles);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
      // Reset input so the same file could be selected again if removed
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeFile = (indexToRemove: number) => {
    const newFiles = uploads.filter((_, idx) => idx !== indexToRemove);
    setUploads(newFiles);
    onUploadComplete(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div 
        className="border-2 border-dashed border-border rounded-xl p-8 hover:bg-secondary/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer relative"
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          multiple
          accept={acceptedTypes}
          onChange={handleFileChange}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-primary">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-semibold">Uploading...</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <UploadCloud size={24} />
            </div>
            <p className="font-semibold text-foreground mb-1">Click to upload blueprints or documents</p>
            <p className="text-xs text-muted-foreground">PDF, JPEG, DWG up to 10MB each</p>
          </>
        )}
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      {/* Uploaded Files List */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-secondary rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                {file.type.startsWith('image/') ? (
                  <ImageIcon size={18} className="text-primary shrink-0" />
                ) : (
                  <File size={18} className="text-primary shrink-0" />
                )}
                <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-50 shrink-0"
                onClick={() => removeFile(idx)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
