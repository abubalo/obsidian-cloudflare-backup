import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";
import { R2Bucket, R2Object } from "@cloudflare/workers-types";
import { buffer } from "stream/consumers";

const accountId = process.env.ACCOUNT_ID;
const bucketName = process.env.BUCKET_NAME;

const encryptionKey = "";

const r2 = new R2Bucket({ accountId, bucketName });

async function calculateFileHash(filePath: string): Promise<string> {
    let r2Bucket: R2Object | null = null;



  const fileBuffer = await fs.readFile(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(fileBuffer);

  return hash.digest("hex");
}

async function compressFile(filePath: string): Promise<Buffer> {
  const fileBuffer = await fs.readFile(filePath);

  return new Promise<Buffer>((resolve, reject) => {
    zlib.gzip(fileBuffer, (error, compressedBuffer) => {
      if (error) {
        reject(error);
      } else {
        resolve(compressedBuffer);
      }
    });
  });
}

async function encryptFile(filePath: string): Promise<Buffer> {
  const fileBuffer = await fs.readFile(filePath);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  const encryptBuffer = Buffer.concat([
    iv,
    cipher.update(fileBuffer),
    cipher.final(),
  ]);

  return encryptBuffer;
}

async function uploadToR2(filePath: string): Promise<void> {
    const key = path.relative(backupObsidianVault, filePath);
    const fileHash = await calculateFileHash(filePath)
    let r2Object: R2Object | null = null;


    try {
        r2Object = r2.get(key)
    } catch (error) {
        if(error instanceof Error && error.message.includes("Not Found")){
            const compressedFile = await compressFile(filePath);
            const encryptedFile = await encryptFile(compressedFile)
        }
    }
}

function calculateDiff(oldBuffer: Buffer, newBuffer: Buffer): Buffer {
  return newBuffer;
}
async function getBackupKeys(): Promise<string[]> {}

export async function validateBackups() {}

export async function backupObsidianVault() {}

async function getLocalFiles(filePath: string): Promise<string[]> {}

backupObsidianVault();
