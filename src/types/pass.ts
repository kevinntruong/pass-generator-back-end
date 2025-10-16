export interface PassRequest {
  description: string;
  organizationName: string;
  passTypeIdentifier: string;
  teamIdentifier: string;
  serialNumber?: string;
  logoText?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  expirationDate?: string;
  relevantDate?: string;
  locations?: PassLocation[];
  beacons?: PassBeacon[];
  barcode?: PassBarcode;
  fields?: {
    primaryFields?: PassField[];
    secondaryFields?: PassField[];
    auxiliaryFields?: PassField[];
    backFields?: PassField[];
  };
}

export interface PassLocation {
  latitude: number;
  longitude: number;
  altitude?: number;
  relevantText?: string;
}

export interface PassBeacon {
  proximityUUID: string;
  major?: number;
  minor?: number;
  relevantText?: string;
}

export interface PassBarcode {
  message: string;
  format:
    | "PKBarcodeFormatQR"
    | "PKBarcodeFormatPDF417"
    | "PKBarcodeFormatAztec"
    | "PKBarcodeFormatCode128";
  messageEncoding: string;
}

export interface PassField {
  key: string;
  label?: string;
  value: string;
  textAlignment?:
    | "PKTextAlignmentLeft"
    | "PKTextAlignmentCenter"
    | "PKTextAlignmentRight"
    | "PKTextAlignmentNatural";
}

export interface PassResponse {
  success: boolean;
  data?: {
    passId: string;
    downloadUrl: string;
    expiresAt: string;
  };
  error?: string;
}
