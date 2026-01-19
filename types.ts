export enum TraitColor {
  Yellow = 'Yellow',
  Green = 'Green',
}

export enum TraitShape {
  Round = 'Round',
  Wrinkled = 'Wrinkled',
}

export interface Genotype {
  colorAlleles: string; // e.g., "YY", "Yy", "yy"
  shapeAlleles: string; // e.g., "RR", "Rr", "rr"
}

export interface PeaPhenotype {
  color: TraitColor;
  shape: TraitShape;
  genotype: Genotype;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const GENE_COLOR_DOMINANT = 'Y'; // Yellow
export const GENE_COLOR_RECESSIVE = 'y'; // Green
export const GENE_SHAPE_DOMINANT = 'R'; // Round
export const GENE_SHAPE_RECESSIVE = 'r'; // Wrinkled
