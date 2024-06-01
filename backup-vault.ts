import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";
import { R2Bucket } from "@cloudflare/workers-types";

const accountId = "9e56442d6d939701bd12cbdd4390ca3f";
const bucketName = "obsidian-vaults-backup";

const encryptionKey = "";

const r2 = new R2Bucket({ accountId, bucketName });

async function calculateHash(filePath: string): Promise<string> {}

async function compressFile(filePath: string): Promise<string> {}

async function encryptFile(filePath: string): Promise<Buffer> {}

async function uploadToR2(filePath: string): Promise<void> {}

function calculateDiff(oldBuffer: Buffer, newBuffer: Buffer): Buffer {
  return newBuffer;
}

async function validateBackups() {}
async function getBackupKeys(): Promise<string[]> {}

async function backupObsidianVault() {}

async function getLocalFiles(filePath: string): Promise<string[]> {}

backupObsidianVault();
