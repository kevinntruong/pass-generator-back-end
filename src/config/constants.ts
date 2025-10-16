export const CONFIG = {
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  PKPASS_PASS_TYPE_IDENTIFIER: process.env.PKPASS_PASS_TYPE_IDENTIFIER || "",
  PKPASS_TEAM_IDENTIFIER: process.env.PKPASS_TEAM_IDENTIFIER || "",
  PKPASS_WWDR: process.env.PKPASS_WWDR || "",
  PKPASS_SIGNER_CERT: process.env.PKPASS_SIGNER_CERT || "",
  PKPASS_SIGNER_KEY: process.env.PKPASS_SIGNER_KEY || "",
  PKPASS_SIGNER_KEY_PASSPHRASE: process.env.PKPASS_SIGNER_KEY_PASSPHRASE || "",
} as const;

export const PASS_CONFIG = {
  DEFAULT_EXPIRATION_DAYS: 365,
  MAX_FILE_SIZE: 1024 * 1024, // 1MB
  SUPPORTED_BARCODE_FORMATS: [
    "PKBarcodeFormatQR",
    "PKBarcodeFormatPDF417",
    "PKBarcodeFormatAztec",
    "PKBarcodeFormatCode128",
  ],
  SUPPORTED_TEXT_ALIGNMENTS: [
    "PKTextAlignmentLeft",
    "PKTextAlignmentCenter",
    "PKTextAlignmentRight",
    "PKTextAlignmentNatural",
  ],
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
