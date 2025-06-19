"use client"
import { useEffect, useRef } from "react"

export function WebGL3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_uv = a_position * 0.5 + 0.5;
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // 3D noise function
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
      }

      // 3D fractal noise
      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for(int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse / u_resolution;
        
        // Create 3D coordinates
        vec3 pos = vec3(uv * 2.0 - 1.0, u_time * 0.1);
        pos.xy += mouse * 0.5;
        
        // Generate 3D noise layers
        float noise1 = fbm(pos * 2.0 + u_time * 0.2);
        float noise2 = fbm(pos * 3.0 - u_time * 0.15);
        float noise3 = fbm(pos * 1.5 + u_time * 0.1);
        
        // Create depth effect
        float depth = sin(length(uv - 0.5) * 10.0 - u_time * 2.0) * 0.5 + 0.5;
        
        // Mouse interaction ripples
        float dist = distance(uv, mouse);
        float ripple = sin(dist * 15.0 - u_time * 4.0) * exp(-dist * 3.0) * 0.3;
        
        // Color mixing for 3D effect
        vec3 color1 = vec3(0.1, 0.3, 0.8); // Deep blue
        vec3 color2 = vec3(0.6, 0.1, 0.6); // Purple
        vec3 color3 = vec3(0.8, 0.4, 0.1); // Orange
        
        vec3 finalColor = mix(color1, color2, noise1);
        finalColor = mix(finalColor, color3, noise2 * 0.7);
        finalColor += vec3(ripple);
        finalColor *= (depth + 0.3);
        
        // Add some brightness variation for 3D depth
        finalColor *= (0.8 + noise3 * 0.4);
        
        gl_FragColor = vec4(finalColor * 0.2, 1.0);
      }
    `

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader))
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, "a_position")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uMouse = gl.getUniformLocation(program, "u_mouse")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = rect.height - (e.clientY - rect.top)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouse)
    resize()

    let frameId: number

    const render = (time: number) => {
      gl.useProgram(program)
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = requestAnimationFrame(render)
      frameIdRef.current = frameId
    }

    frameId = requestAnimationFrame(render)
    frameIdRef.current = frameId

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
}
