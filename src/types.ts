/**
 * Types partagés pour l'application "Navigateur de Thèse Jauge τ124"
 * de MULENDA MACHEKO JOHNY (Johny Mulenda)
 */

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  formula: string;
  mathExplanation: string[]; // Paragraphes d'explication formelle
  keywords: string[];
}

export interface Juror {
  name: string;
  role: string;
  avatarColor: string; // Tailwind class
  initialObjection: string;
  profile: string;
  focusArea: string;
}

export interface SimulationParams {
  viscosity: number; // ν, de 0.005 à 0.1
  initialEnergy: number; // E0, de 1 à 10
  vorticityScale: number; // échelle de perturbation
  enableTau124: boolean; // Si activé, utilise l'amortisseur conforme
  forceStretching: number; // Facteur d'étirement
}

export interface SimulationState {
  time: number[];
  vorticity經典: number[]; // sans jauge (Tao)
  vorticityτ124: number[]; // avec jauge τ124
  enostrophy經典: number[];
  enostrophyτ124: number[];
  mCrit: number;
  fLimite: number;
  isCrashed: boolean;
  crashTime: number | null;
}

export interface JuryResponse {
  juror: string;
  evaluation: number;
  verdict: "Validé" | "Défense Partielle (Besoin de précisions)" | "Réfuté" | string;
  feedback: string;
  nextObjection: string;
}

export interface ChatMessage {
  sender: "Johny" | "Jury";
  jurorName?: string;
  text: string;
  timestamp: string;
  evaluation?: number;
  verdict?: string;
}
