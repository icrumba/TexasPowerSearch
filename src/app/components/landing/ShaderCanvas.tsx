'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Mouse warp influence
    vec2 mouseInfluence = (u_mouse - 0.5) * 0.25;
    float dist = length(uv - u_mouse);
    vec2 warped = uv + mouseInfluence * (1.0 - smoothstep(0.0, 0.8, dist));

    // Plasma sine waves
    float t = u_time * 0.25;
    float p = sin(warped.x * 7.0 + t)
            + sin(warped.y * 5.0 + t * 0.9)
            + sin((warped.x + warped.y) * 4.5 + t * 1.1)
            + sin(dist * 10.0 - t * 1.8);
    p = p * 0.25; // normalize to -1..1

    // Color palette: deep black -> vivid orange -> warm amber -> near-white
    vec3 c0 = vec3(0.020, 0.016, 0.012); // deep black base
    vec3 c1 = vec3(0.980, 0.365, 0.161); // #FA5D29 vivid orange
    vec3 c2 = vec3(1.000, 0.549, 0.259); // #FF8C42 warm amber
    vec3 c3 = vec3(1.000, 0.960, 0.920); // near white highlight

    float t1 = smoothstep(-1.0, 0.0, p);
    float t2 = smoothstep(0.0, 0.6, p);
    float t3 = smoothstep(0.6, 1.0, p);

    vec3 color = mix(c0, c1, t1 * 0.45);
    color = mix(color, c2, t2 * 0.30);
    color = mix(color, c3, t3 * 0.10);

    // Keep mostly dark
    color *= 0.75;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Compile shaders
    const vert = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Fullscreen quad (2 triangles)
    const quad = new Float32Array([
      -1, -1,  1, -1,  -1,  1,
      -1,  1,  1, -1,   1,  1,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');

    // Mouse state stored in ref — no React re-renders on mousemove
    const mouse = { x: 0.5, y: 0.5 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - e.clientY / window.innerHeight; // flip Y for WebGL
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize canvas framebuffer to match CSS size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Render loop
    let rafId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
