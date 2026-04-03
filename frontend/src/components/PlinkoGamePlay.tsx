import { useEffect, useRef } from "react";
import type { Ball } from "../types/Ball";

// Area for Plinko Game
const WIDTH = 750;
const HEIGHT = 600;

// -------------------------------------------------------------------------------------------------
// Size of peg & ball
const PEG_RADIUS = 5;
const BALL_RADIUS = 6;


// -------------------------------------------------------------------------------------------------
// Tuned physics
const GRAVITY = 0.08;
const FRICTION = 0.99;
const BOUNCE = 0.01;
const MAX_SPEED = 2.0;

// -------------------------------------------------------------------------------------------------
// Center bias
const CENTER_FORCE = 0.0;
const COLLISION_BIAS = 0.002;
// Details:
// CENTER_FORCE - Pulls the ball toward the center
// COLLISION_BIAS - Applies only when hitting a peg, each collison slightly redirects ball toward center

// -------------------------------------------------------------------------------------------------
// Area for bins
const ROWS = 10;
const COLS = 15;
const SPACING_X = WIDTH / COLS;
const SPACING_Y = 50;

const BIN_HEIGHT = 40;
const BIN_Y = HEIGHT - BIN_HEIGHT;

const BINS = 13;

// -------------------------------------------------------------------------------------------------

type Props = {
  ballsRef: React.MutableRefObject<Ball[]>;
};

function PlinkoGamePlay({ ballsRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pegsRef = useRef<{ x: number; y: number }[]>([]);

  // --- Triangle pegs (start at 3) ---
  useEffect(() => {
    const pegArray: { x: number; y: number }[] = [];
    const centerX = WIDTH / 2;
    const START_COLS = 3;

    for (let row = 0; row < ROWS; row++) {
      const count = START_COLS + row;
      const totalWidth = (count - 1) * SPACING_X;

      for (let col = 0; col < count; col++) {
        pegArray.push({
          x: centerX - totalWidth / 2 + col * SPACING_X,
          y: 100 + row * SPACING_Y,
        });
      }
    }

    pegsRef.current = pegArray;
  }, []);

  // --- Game loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const update = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // draw pegs
      ctx.fillStyle = "white";
      pegsRef.current.forEach((peg) => {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, PEG_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      // draw bins
      const binWidth = WIDTH / BINS;
      ctx.strokeStyle = "yellow";
      for (let i = 0; i < BINS; i++) {
        ctx.strokeRect(i * binWidth, BIN_Y, binWidth, BIN_HEIGHT);
      }

      const balls = ballsRef.current;

      balls.forEach((ball) => {
        if (!ball.active) return;

        // gravity + damping
        ball.vy += GRAVITY;
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;

        // --- center attraction --- (Custome: pull ball toward the center)
        // ball.vx += (WIDTH / 2 - ball.x) * CENTER_FORCE;
        

        ball.x += ball.vx;
        ball.y += ball.vy;

        // wall bounce
        if (ball.x < BALL_RADIUS || ball.x > WIDTH - BALL_RADIUS) {
          ball.vx *= -BOUNCE;
        }

        // peg collision
        pegsRef.current.forEach((peg) => {
          const dx = ball.x - peg.x;
          const dy = ball.y - peg.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < PEG_RADIUS + BALL_RADIUS && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;

            // reflect
            const dot = ball.vx * nx + ball.vy * ny;
            ball.vx -= 2 * dot * nx;
            ball.vy -= 2 * dot * ny;

            // small bounce boost
            ball.vx *= 1.05;
            ball.vy *= 1.05;

            // --- extra center bias on collision --- (Custome: when hitting pegs make ball redirect to center)
            ball.vx += (WIDTH / 2 - ball.x) * COLLISION_BIAS;
          }
        });

        // clamp speed
        ball.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, ball.vx));
        ball.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, ball.vy));

        // bottom
        if (ball.y > BIN_Y) {
          ball.active = false;
        }
      });

      // draw balls
      ctx.fillStyle = "red";
      balls.forEach((ball) => {
        if (!ball.active) return;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-lg min-h-screen bg-black text-white">
        <div className="flex items-center justify-center w-full">
            <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            />
        </div>
      </div>
    </>
  );
}

export default PlinkoGamePlay;
