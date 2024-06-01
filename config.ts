type Config = {
  accountId: string;
  bucketName: string;
};
export function config(
  type: string,
  path: string,
  encryptionKey: string,
  config: Config
) {
  return config;
}
