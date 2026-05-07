import { useEffect, useRef, useState } from "react";
import type { Ball } from "../types/Ball";
import { BIN_COLORS } from "../utils/bin";
import type { RiskLevel, RowCount } from "../types/GameConfig";
import { generateMultipliers } from "../utils/generateMulitipliers";

// Area for Plinko Game
const WIDTH = 750;
const HEIGHT = 650;

// -------------------------------------------------------------------------------------------------
// Size of peg & ball
const PEG_RADIUS = 5;
const BALL_RADIUS = 6;


// -------------------------------------------------------------------------------------------------
// Tuned physics
const GRAVITY = 0.045;
const FRICTION = 0.992;
const BOUNCE = 0.35;
const MAX_SPEED = 1.2;

// -------------------------------------------------------------------------------------------------
// Center bias
const CENTER_FORCE = 0.0;
const COLLISION_BIAS = 0.002;
// Details:
// CENTER_FORCE - Pulls the ball toward the center
// COLLISION_BIAS - Applies only when hitting a peg, each collison slightly redirects ball toward center

// -------------------------------------------------------------------------------------------------

const BINS = 11;

type Props = {
  ballsRef: React.MutableRefObject<Ball[]>;
  risk: RiskLevel;
  rows: RowCount;
};

function PlinkoGamePlay({ ballsRef, risk, rows }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pegsRef = useRef<{ x: number; y: number }[]>([]);
  const binAnimRef = useRef<number[]>(Array(BINS).fill(0));

  // Add config (temporary hardcode)
  const RISK: RiskLevel = risk;
  const ROWS: RowCount = rows;
  const MULTIPLIERS = generateMultipliers(RISK);

  // Area for bins
  // const ROWS = 10;
  const [COLS, isCOLS] = useState(16); // const COLS = 16; //row=12|16 row=8|14 row=16|20
  const [SPACING_Y, isSPACING_Y] = useState(40); //row=12|40 row=8|65 row=16|30

  useEffect(() => {
    if (ROWS === 8) {
      isCOLS(14);
      isSPACING_Y(65);
    } else if (ROWS === 12) {
      isCOLS(16);
      isSPACING_Y(40);
    } else {
      isCOLS(20);
      isSPACING_Y(30);
    }
  }, [ROWS])

  const BOTTOM_OFFSET = 20;
  const BIN_HEIGHT = 40;
  const BIN_Y = HEIGHT - BIN_HEIGHT - BOTTOM_OFFSET;
 
  // --- Triangle pegs (start at 3) ---
  useEffect(() => {
    let SPACING_X = WIDTH / COLS;
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
  }, [ROWS, COLS, SPACING_Y]);

  // --- Game loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d"); // canvas tag is a container used to draw graphics on a web page on the fly via scripting
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
      const GAP = 6;
      const BIN_HEIGHT = 60;
      const TOTAL_WIDTH = 600;
      const START_X = (WIDTH - TOTAL_WIDTH) / 2;
      const binWidth = (TOTAL_WIDTH - GAP * (BINS - 1)) / BINS;
      
      for (let i = 0; i < BINS; i++) {
        const anim = binAnimRef.current[i];

        // decay animation
        if (anim > 0.001) {
          binAnimRef.current[i] *= 0.9;
        } else {
          binAnimRef.current[i] = 0;
        }

        const bounceHeight = 15;
        const offsetY = -Math.sin(anim * Math.PI) * bounceHeight;
        const scale = 1 + anim * 0.15;

        const x = START_X + i * (binWidth + GAP);
        const y = BIN_Y + offsetY;

        ctx.save();
        ctx.translate(x + binWidth / 2, y + BIN_HEIGHT / 2);
        ctx.scale(scale, scale);
        ctx.translate(-binWidth / 2, -BIN_HEIGHT / 2);

        // glow
        ctx.shadowColor = BIN_COLORS[i % BIN_COLORS.length];
        ctx.shadowBlur = 10 + anim * 20;

        const radius = 10;

        ctx.fillStyle = BIN_COLORS[i % BIN_COLORS.length];
        // ctx.shadowColor = BIN_COLORS[i % BIN_COLORS.length];
        // ctx.shadowBlur = 10;

        // rounded rectangle
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(binWidth - radius, 0);
        ctx.quadraticCurveTo(binWidth, 0, binWidth, radius);
        ctx.lineTo(binWidth, BIN_HEIGHT - radius);
        ctx.quadraticCurveTo(binWidth, BIN_HEIGHT, binWidth - radius, BIN_HEIGHT);
        ctx.lineTo(radius, BIN_HEIGHT);
        ctx.quadraticCurveTo(0, BIN_HEIGHT, 0, BIN_HEIGHT - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();

        ctx.fill();

        ctx.fillStyle = "black";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
          MULTIPLIERS[i % MULTIPLIERS.length] + "x",
          binWidth / 2,
          BIN_HEIGHT / 2
        );

        ctx.restore();
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
            ball.vx -= 1 * dot * nx;
            ball.vy -= 2 * dot * ny;

            const overlap = PEG_RADIUS + BALL_RADIUS - dist;

            ball.x += nx * overlap;
            ball.y += ny * overlap;

            // small bounce boost
            // ball.vx *= 1.05;
            // ball.vy *= 1.05;

            // --- extra center bias on collision --- (Custome: when hitting pegs make ball redirect to center)
            ball.vx += (WIDTH / 2 - ball.x) * COLLISION_BIAS;
          }
        });

        // clamp speed
        ball.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, ball.vx));
        ball.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, ball.vy));

        // bottom
        if (ball.y > BIN_Y) {
          const index = Math.floor((ball.x - START_X) / (binWidth + GAP));

          if (index >= 0 && index < BINS) {
            binAnimRef.current[index] = 1; // trigger animation
          }

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
  }, [RISK]);

  return (
    <>
      <div className="h-175 rounded-lg bg-black text-white">
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
