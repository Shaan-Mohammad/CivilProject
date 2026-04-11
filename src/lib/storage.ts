/**
 * Storage Abstraction Layer
 * 
 * Currently uses local filesystem (public/uploads/).
 * Designed for easy migration to S3/R2/GCS by implementing
 * the StorageAdapter interface.
 */

import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// ─── Storage Interface ────────────────────────────────────────────────
export interface StorageAdapter {
  upload(file: Buffer, filename: string, contentType: string): Promise<string>;
  delete(url: string): Promise<void>;
  getPublicUrl(key: string): string;
}

// ─── Local Storage Implementation ─────────────────────────────────────
class LocalStorageAdapter implements StorageAdapter {
  private uploadDir: string;
  private publicPath: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), "public", "uploads");
    this.publicPath = "/uploads";
  }

  async upload(
    file: Buffer,
    filename: string,
    _contentType: string
  ): Promise<string> {
    // Ensure upload directory exists
    if (!existsSync(this.uploadDir)) {
      await mkdir(this.uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${timestamp}-${sanitized}`;
    const filePath = path.join(this.uploadDir, uniqueName);

    await writeFile(filePath, file);

    return `${this.publicPath}/${uniqueName}`;
  }

  async delete(url: string): Promise<void> {
    const filename = url.replace(`${this.publicPath}/`, "");
    const filePath = path.join(this.uploadDir, filename);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }

  getPublicUrl(key: string): string {
    return `${this.publicPath}/${key}`;
  }
}

// ─── S3 Storage Placeholder ───────────────────────────────────────────
// class S3StorageAdapter implements StorageAdapter {
//   async upload(file: Buffer, filename: string, contentType: string): Promise<string> {
//     // Implement S3 upload using @aws-sdk/client-s3
//     throw new Error("S3 adapter not implemented");
//   }
//   async delete(url: string): Promise<void> {
//     throw new Error("S3 adapter not implemented");
//   }
//   getPublicUrl(key: string): string {
//     return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
//   }
// }

// ─── Factory ──────────────────────────────────────────────────────────
function createStorageAdapter(): StorageAdapter {
  const provider = process.env.STORAGE_PROVIDER || "local";

  switch (provider) {
    // case "s3":
    //   return new S3StorageAdapter();
    case "local":
    default:
      return new LocalStorageAdapter();
  }
}

export const storage = createStorageAdapter();
