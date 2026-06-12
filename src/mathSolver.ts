import { SimulationParams, SimulationState } from "./types";

/**
 * Calcule la borne macroscopique invariante endogène M_crit
 * Mcrit = sqrt(E0 / ν^3)
 */
export function calculateMCrit(energy: number, viscosity: number): number {
  return Math.sqrt(energy / Math.pow(viscosity, 3));
}

/**
 * Calcule la fréquence limite absolue de Kolmogorov
 * flimite = Mcrit / (2π)
 */
export function calculateFLimit(mCrit: number): number {
  return mCrit / (2 * Math.PI);
}

/**
 * Simule l'évolution temporelle de la vorticité crête et de l'énostrophie
 * Modèle Classique : d||ω||/dt = C * ||ω||^2 - ν * k^2 * ||ω|| -> Divergence exponentielle
 * Modèle τ124 Conforme : d||ω||/dt = C * ||ω||^2 * (1.0 - tanh(||ω||/Mcrit)) - ν * k^2 * ||ω|| -> Stabilisation
 */
export function runDiscreteSimulation(
  params: SimulationParams,
  steps: number = 100,
  dt: number = 0.05
): SimulationState {
  const mCrit = calculateMCrit(params.initialEnergy, params.viscosity);
  const fLimite = calculateFLimit(mCrit);

  const time: number[] = [];
  const vorticity經典: number[] = [];
  const vorticityτ124: number[] = [];
  const enostrophy經典: number[] = [];
  const enostrophyτ124: number[] = [];

  let isCrashed = false;
  let crashTime: number | null = null;

  // Conditions initiales : vorticité de départ proportionnelle à vorticitéScale
  let wClassical = params.vorticityScale;
  let wTau = params.vorticityScale;

  const C = params.forceStretching * 0.7; // Constante d'accélération d'étirement
  const dissipationCoef = params.viscosity * 1.5; // Coefficient de perte linéaire (visqueux)

  for (let i = 0; i < steps; i++) {
    const t = i * dt;
    time.push(Number(t.toFixed(2)));

    // --- MODE CLASSIQUE ---
    if (!isCrashed) {
      // Évolution quadratique de l'étirement classique
      const dwClassical = C * Math.pow(wClassical, 2) - dissipationCoef * wClassical;
      wClassical += dwClassical * dt;

      // Si la vorticité classique dépasse 3 fois Mcrit, ou explose vers l'infini, on considère un crash numérique/blow-up
      if (wClassical > mCrit * 2.5 || Number.isNaN(wClassical) || !Number.isFinite(wClassical)) {
        isCrashed = true;
        crashTime = t;
        wClassical = mCrit * 3.0; // Capturer le seuil d'explosion
      }
    } else {
      wClassical = mCrit * 3.0;
    }

    vorticity經典.push(Number(wClassical.toFixed(3)));
    // Énostrophie locale classique ~ 0.5 * w²
    enostrophy經典.push(Number((0.5 * Math.pow(wClassical, 2)).toFixed(3)));

    // --- MODE JAUGE DE JOHNY (τ124) ---
    // Facteur d'amortissement topologique : tanh(||ω|| / Mcrit)
    const tauValue = Math.tanh(wTau / mCrit);
    const attenuation = 1.0 - tauValue;

    // Équation de structure modifiée : l'étirement s'évanouit à l'approche de Mcrit
    const dwTau = C * Math.pow(wTau, 2) * attenuation - dissipationCoef * wTau;
    wTau += dwTau * dt;

    // Garantie absolue : wTau ne peut dépasser Mcrit théoriquement. On force la contrainte
    if (wTau > mCrit) {
      wTau = mCrit;
    }

    vorticityτ124.push(Number(wTau.toFixed(3)));
    enostrophyτ124.push(Number((0.5 * Math.pow(wTau, 2)).toFixed(3)));
  }

  return {
    time,
    vorticity經典,
    vorticityτ124,
    enostrophy經典,
    enostrophyτ124,
    mCrit,
    fLimite,
    isCrashed,
    crashTime,
  };
}

/**
 * Génère des points 3D pour tracer un tourbillon (vortex ring ou tube perturbé)
 * afin de projeter visuellement l'étirement des lignes de courant 3D.
 * Les points se tordent ou se contractent en temps réel.
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
  intensity: number; // Intensité locale de la vorticité
}

export function generateVortexTornadoState(
  timeStep: number,
  params: SimulationParams,
  mCrit: number
): Point3D[] {
  const points: Point3D[] = [];
  const numRings = 24;
  const pointsPerRing = 16;
  const scale = params.vorticityScale;

  // Calcul du rayon et du rétrécissement (étirement) du vortex
  // En mode classique (sans jauge): contraction critique vers l'infini (rayon -> 0, intensité -> infini)
  // En mode τ124: contraction contenue, le rayon se stabilise au goulot critique
  let coreContraction = 1.0;
  let intensityScale = 1.0;

  if (params.enableTau124) {
    // Stable, s'atténue aux limites
    const currentW = scale * (1 + 1.2 * Math.sin(timeStep * 0.15));
    const tau = Math.tanh(currentW / mCrit);
    coreContraction = 0.5 + 0.5 * (1.0 - tau); // Ne se contracte pas en-dessous de 0.5
    intensityScale = currentW;
  } else {
    // Instabilité cumulative
    const blowUpFactor = Math.min(2.5, 1.0 + timeStep * 0.08);
    coreContraction = Math.max(0.08, 1.0 - timeStep * 0.038); // Tend vers 0 (singularité)
    intensityScale = scale * blowUpFactor * 1.5;
  }

  for (let r = 0; r < numRings; r++) {
    const z = (r / (numRings - 1) - 0.5) * 5; // De -2.5 à 2.5
    // Goulot d'étranglement central (vortex stretching)
    const baseRadius = 1.2 - 0.8 * Math.exp(-Math.pow(z, 2));
    const finalRadius = baseRadius * coreContraction;

    // Twist angulaire simulant la rotation hydrodynamique
    const twist = z * 1.8 + timeStep * 0.25;

    for (let p = 0; p < pointsPerRing; p++) {
      const angle = (p / pointsPerRing) * Math.PI * 2 + twist;
      // Ajout de légères perturbations de Fourier turbulentes (modes ultra-critiques)
      const perturbation = 0.05 * Math.sin(angle * 4 + timeStep * 0.5);
      const r_perturbed = finalRadius + perturbation;

      const x = Math.cos(angle) * r_perturbed;
      const y = Math.sin(angle) * r_perturbed;

      // Intensité locale de la vorticité inversement proportionnelle à la section
      const intensity = intensityScale * (1.5 / Math.max(0.1, finalRadius));

      points.push({ x, y, z, intensity });
    }
  }

  return points;
}
