// import React, { useRef, useEffect } from 'react';

// function Boid({ x, y, vx, vy }) {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');

//         // Clear the canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Translate and rotate the canvas to draw the arrow
//         ctx.translate(x, y);
//         ctx.rotate(Math.atan2(vy, vx));

//         // Draw arrow body
//         ctx.beginPath();
//         ctx.moveTo(0, 0);
//         ctx.lineTo(15, 0);
//         ctx.strokeStyle = 'black';
//         ctx.lineWidth = 1;
//         ctx.stroke();
//         ctx.closePath();

//         // Draw arrowhead
//         ctx.beginPath();
//         ctx.moveTo(15, 0);
//         ctx.lineTo(10, 5);
//         ctx.lineTo(10, -5);
//         ctx.fillStyle = 'black';
//         ctx.fill();
//         ctx.closePath();

//         // Reset transformations
//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//     }, [x, y, vx, vy]);

//     return <canvas ref={canvasRef} />;
// }

// function Boids() {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');

//         canvas.width = window.innerWidth; // Set canvas width to window width
//         canvas.height = window.innerHeight; // Set canvas height to window height

//         const flock = [];
//         const numBoids = 100;
//         for (let i = 0; i < numBoids; i++) {
//             const x = Math.random() * canvas.width;
//             const y = Math.random() * canvas.height;
//             const vx = Math.random() * 2 - 1;
//             const vy = Math.random() * 2 - 1;
//             flock.push({ x, y, vx, vy });
//         }

//         const visual_range = 50;
//         const protected_range_squared = 40;
//         const visual_range_squared = visual_range ** 2;
//         const centering_factor = 0.01;
//         const matching_factor = 0.125;
//         const avoidfactor = 2;
//         const turnfactor = 0.05;
//         const minspeed = 1;
//         const maxspeed = 2;

//         function updateAndRenderBoids() {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             for (const boid of flock) {
//                 let xpos_avg = 0,
//                     ypos_avg = 0,
//                     xvel_avg = 0,
//                     yvel_avg = 0,
//                     neighboring_boids = 0,
//                     close_dx = 0,
//                     close_dy = 0;

//                 for (const otherboid of flock) {
//                     const dx = boid.x - otherboid.x;
//                     const dy = boid.y - otherboid.y;
//                     const squared_distance = dx * dx + dy * dy;

//                     if (Math.abs(dx) < visual_range && Math.abs(dy) < visual_range) {
//                         if (squared_distance < protected_range_squared) {
//                             close_dx += boid.x - otherboid.x;
//                             close_dy += boid.y - otherboid.y;
//                         } else if (squared_distance < visual_range_squared) {
//                             xpos_avg += otherboid.x;
//                             ypos_avg += otherboid.y;
//                             xvel_avg += otherboid.vx;
//                             yvel_avg += otherboid.vy;
//                             neighboring_boids++;
//                         }
//                     }
//                 }

//                 if (neighboring_boids > 0) {
//                     xpos_avg /= neighboring_boids;
//                     ypos_avg /= neighboring_boids;
//                     xvel_avg /= neighboring_boids;
//                     yvel_avg /= neighboring_boids;

//                     boid.vx += (xpos_avg - boid.x) * centering_factor + (xvel_avg - boid.vx) * matching_factor;
//                     boid.vy += (ypos_avg - boid.y) * centering_factor + (yvel_avg - boid.vy) * matching_factor;
//                 }

//                 boid.vx += close_dx * avoidfactor;
//                 boid.vy += close_dy * avoidfactor;

//                 if (boid.x < 0) boid.vx += turnfactor;
//                 if (boid.x > canvas.width) boid.vx -= turnfactor;
//                 if (boid.y < 0) boid.vy += turnfactor;
//                 if (boid.y > canvas.height) boid.vy -= turnfactor;

//                 const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);

//                 if (speed < minspeed) {
//                     boid.vx = (boid.vx / speed) * minspeed;
//                     boid.vy = (boid.vy / speed) * minspeed;
//                 }
//                 if (speed > maxspeed) {
//                     boid.vx = (boid.vx / speed) * maxspeed;
//                     boid.vy = (boid.vy / speed) * maxspeed;
//                 }

//                 boid.x += boid.vx;
//                 boid.y += boid.vy;

//                 // Render Boid
//                 <Boid key={boid.id} x={boid.x} y={boid.y} vx={boid.vx} vy={boid.vy} />
//             }

//             requestAnimationFrame(updateAndRenderBoids);
//         }

//         updateAndRenderBoids();

//         window.addEventListener('resize', () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         });

//         return () => {
//             window.removeEventListener('resize', () => {
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
//             });
//         };

//     }, []);

//     return <canvas ref={canvasRef} />;
// }

// export default Boids;


import React, { useRef, useEffect } from 'react';

function Boids() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const flock = [];
        const numBoids = 50;
        for (let i = 0; i < numBoids; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const vx = Math.random() * 2 - 1;
            const vy = Math.random() * 2 - 1;
            flock.push({ x, y, vx, vy });
        }

        const visual_range = 50;
        const protected_range_squared = 40;
        const visual_range_squared = visual_range ** 2;
        const centering_factor = 0.01;
        const matching_factor = 0.125;
        const avoidfactor = 5;
        const turnfactor = 0.05;
        const minspeed = 1;
        const maxspeed = 2;

        function drawArrow(ctx, x, y, angle) {
          ctx.beginPath();
          ctx.arc(x, y,5, 0, 2 * Math.PI);
          ctx.fillStyle = 'black';
          ctx.fill();

          // const arrowLength = 15;
          // const arrowWidth = 10;
          // ctx.save();
          // ctx.translate(x, y);
          // ctx.rotate((angle+4.7)); // Rotating by Math.PI / 2 makes the arrow point in the correct direction
          // ctx.beginPath();
          // ctx.moveTo(-arrowWidth / 2, 0);
          // ctx.lineTo(arrowWidth / 2, 0);
          // ctx.lineTo(0, arrowLength);
          // ctx.closePath();
          // ctx.fillStyle = 'black';
          // ctx.fill();
          // ctx.restore();
        }

        function updateAndRenderBoids() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const boid of flock) {
                let xpos_avg = 0,
                    ypos_avg = 0,
                    xvel_avg = 0,
                    yvel_avg = 0,
                    neighboring_boids = 0,
                    close_dx = 0,
                    close_dy = 0;

                for (const otherboid of flock) {
                    const dx = boid.x - otherboid.x;
                    const dy = boid.y - otherboid.y;
                    const squared_distance = dx * dx + dy * dy;

                    if (Math.abs(dx) < visual_range && Math.abs(dy) < visual_range) {
                        if (squared_distance < protected_range_squared) {
                            close_dx += boid.x - otherboid.x;
                            close_dy += boid.y - otherboid.y;
                        } else if (squared_distance < visual_range_squared) {
                            xpos_avg += otherboid.x;
                            ypos_avg += otherboid.y;
                            xvel_avg += otherboid.vx;
                            yvel_avg += otherboid.vy;
                            neighboring_boids++;
                        }
                    }
                }

                if (neighboring_boids > 0) {
                    xpos_avg /= neighboring_boids;
                    ypos_avg /= neighboring_boids;
                    xvel_avg /= neighboring_boids;
                    yvel_avg /= neighboring_boids;

                    boid.vx += (xpos_avg - boid.x) * centering_factor + (xvel_avg - boid.vx) * matching_factor;
                    boid.vy += (ypos_avg - boid.y) * centering_factor + (yvel_avg - boid.vy) * matching_factor;
                }

                boid.vx += close_dx * avoidfactor;
                boid.vy += close_dy * avoidfactor;

                if (boid.x < 0) boid.vx += turnfactor;
                if (boid.x > canvas.width) boid.vx -= turnfactor;
                if (boid.y < 0) boid.vy += turnfactor;
                if (boid.y > canvas.height) boid.vy -= turnfactor;

                const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);

                if (speed < minspeed) {
                    boid.vx = (boid.vx / speed) * minspeed;
                    boid.vy = (boid.vy / speed) * minspeed;
                }
                if (speed > maxspeed) {
                    boid.vx = (boid.vx / speed) * maxspeed;
                    boid.vy = (boid.vy / speed) * maxspeed;
                }

                boid.x += boid.vx;
                boid.y += boid.vy;

                drawArrow(ctx, boid.x, boid.y, Math.atan2(boid.vy, boid.vx));
            }

            requestAnimationFrame(updateAndRenderBoids);
        }

        updateAndRenderBoids();

    }, []);

    return <canvas ref={canvasRef} />;
}

export default Boids;
