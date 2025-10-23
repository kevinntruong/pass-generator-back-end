import fs from "node:fs";
import { PKPass } from "passkit-generator";
import { CONFIG } from "../config/constants.js";
import type { PassRequest } from "../types/pass.js";

/**
 * Generate a pass using the passkit-generator library
 */
export async function generatePass(
  passData: PassRequest
): Promise<PKPass> {
  try {
    /** Each, but last, can be either a string or a Buffer. See API Documentation for more */
    // const { wwdr, signerCert, signerKey, signerKeyPassphrase } = getCertificatesContentsSomehow();

    const pass = new PKPass(
      {
        "thumbnail.png": fs.readFileSync("examplePass.pass/thumbnail.png"),
        "icon.png": fs.readFileSync("examplePass.pass/icon.png"),
        "pass.json": fs.readFileSync("examplePass.pass/pass.json"),
        // "it.lproj/pass.strings": fs.readFileSync('examplePass.pass/it.lproj/pass.strings'),
      },
      {
        wwdr: Buffer.from(CONFIG.PKPASS_WWDR, "base64").toString(),
        signerCert: Buffer.from(CONFIG.PKPASS_SIGNER_CERT, "base64").toString(),
        signerKey: Buffer.from(CONFIG.PKPASS_SIGNER_KEY, "base64").toString(),
        signerKeyPassphrase: CONFIG.PKPASS_SIGNER_KEY_PASSPHRASE,
      },
      {
        // keys to be added or overridden
        passTypeIdentifier: CONFIG.PKPASS_PASS_TYPE_IDENTIFIER,
        teamIdentifier: CONFIG.PKPASS_TEAM_IDENTIFIER,
        serialNumber: "AAGH44625236dddaffbda",
        webServiceURL: undefined,
        authenticationToken: undefined,
      }
    );

    // Adding some settings to be written inside pass.json
    // pass.localize("en", { ... });
    pass.setBarcodes("36478105430"); // Random value

    return pass;
  } catch (err) {
    console.error("Error generating pass:", err);
    // Rethrow the error to indicate failure, as the function is typed to return a successful PassResponse["data"]
    throw err;
  }
}

/**
 * Validate a pass ID
 */
export async function validatePass(passId: string): Promise<boolean> {
  // TODO: Implement actual pass validation logic
  // This could check against a database or validate the pass format
  return passId.length >= 3;
}
