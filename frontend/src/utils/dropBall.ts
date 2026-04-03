import type { Ball } from "../types//Ball";

export const dropBall = (ballsRef: React.MutableRefObject<Ball[]>, width: number) => {
  ballsRef.current.push({
    x: width / 2,
    y: 20,
    vx: (Math.random() - 0.5) * 0.8,
    vy: 0,
    radius: 6,
    active: true,
  });
};