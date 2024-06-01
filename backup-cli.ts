import { program } from "commander";
import { backupObsidianVault, validateBackups } from "./backup-vault";
import { dryRunBackup } from "./dry-run-backup";
import * as cron from "node-cron";

program
  .version("1.0.0")
  .description("Command line interface for managing Obsidian Vault backup");
program
  .command("backup")
  .description("Perform backup of the Obsidian Vault")
  .action(async () => {
    console.log("Backup started ...");
    await backupObsidianVault();
    console.log("backup process completed successfully!");
  });

program
  .command("dry-run")
  .description(
    "Simulate the backup process without actually uploading or deleting files"
  )
  .action(async () => {
    console.log("Starting drun run ...");
    await dryRunBackup();
    console.log("Dry run completed");
  });

program
  .command("validate")
  .description("Validate the integrity of the backups stored in R2")
  .action(async () => {
    console.log("Starting backup validation...");
    await validateBackups();
    console.log("Backup validation completed");
  });

program
  .command("schedule <cron-pattern>")
  .description("Schedule a backup based on a cron pattern")
  .action(async (cronPattern) => {
    console.log(`Scheduling backup with cron pattern: ${cronPattern}`);
    const job = cron.schedule(cronPattern, async () => {
      console.log("Starting scheduled backup...");
      await backupObsidianVault();
      console.log("Scheduled backup completed!");
    });
    job.start();
  });
