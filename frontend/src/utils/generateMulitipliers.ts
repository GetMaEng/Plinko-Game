import { RISK_CONFIG } from "./riskConfig";
import type { RiskLevel } from "../types/GameConfig";

export function generateMultipliers(risk: RiskLevel): number[] {
  const { min, max } = RISK_CONFIG[risk];

  const bins = 11;
  const mid = Math.floor(bins / 2);

  const multipliers: number[] = [];

  for (let i = 0; i < bins; i++) {
    const distance = Math.abs(i - mid) / mid; // 0 → center, 1 → edge

    // exponential curve (important)
    const value =
      min + (max - min) * Math.pow(distance, risk === "easy" ? 1.5 : risk === "medium" ? 2 : 2.5);

    multipliers.push(parseFloat(value.toFixed(2)));
  }

  return multipliers;
}