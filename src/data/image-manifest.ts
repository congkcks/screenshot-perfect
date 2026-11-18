import manifestJson from "../../public/images/manifest.json";

export interface ManifestImage {
  id: string;
  file: string;
  place: string;
  alt: string;
  sourceUrl: string;
  author: string;
  license: string;
  licenseUrl: string;
  attributionRequired: boolean;
  illustrative: boolean;
  verifiedBy: string[];
  width: number;
  height: number;
  sizeKB: number;
}

export const imageManifest: ManifestImage[] = manifestJson as ManifestImage[];
