"use client"
import { useEffect, useRef } from "react"

export function Enhanced3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      console.warn("WebGL not supported, falling back to canvas 2D")
      // Fallback to 2D canvas
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const particles: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        color: string
        alpha: number
      }> = []

      // Create particles
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          color: ["#60A5FA", "#F472B6", "#FBBF24"][Math.floor(Math.random() * 3)],
          alpha: Math.random() * 0.5 + 0.1,
        })
      }

      const animate2D = () => {
        ctx.fillStyle = "rgba(15, 23, 42, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          ctx.save()
          ctx.globalAlpha = particle.alpha
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        frameIdRef.current = requestAnimationFrame(animate2D)
      }

      const resize2D = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resize2D()
      window.addEventListener("resize", resize2D)
      animate2D()

      return () => {
        window.removeEventListener("resize", resize2D)
        if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
      }
    }

    // WebGL implementation
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

      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
      }

      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for(int i = 0; i < 6; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse / u_resolution;
        
        // Create 3D coordinates with time
        vec3 pos = vec3(uv * 3.0, u_time * 0.1);
        pos.xy += mouse * 0.3;
        
        // Multiple noise layers for depth
        float noise1 = fbm(pos * 1.5 + u_time * 0.2);
        float noise2 = fbm(pos * 2.5 - u_time * 0.15);
        float noise3 = fbm(pos * 0.8 + u_time * 0.1);
        
        // Create depth with distance from center
        float centerDist = length(uv - 0.5);
        float depth = sin(centerDist * 8.0 - u_time * 3.0) * 0.5 + 0.5;
        
        // Mouse ripples
        float mouseDist = distance(uv, mouse);
        float ripple = sin(mouseDist * 20.0 - u_time * 6.0) * exp(-mouseDist * 4.0) * 0.4;
        
        // Color layers
        vec3 color1 = vec3(0.2, 0.4, 0.9); // Blue
        vec3 color2 = vec3(0.8, 0.3, 0.7); // Pink
        vec3 color3 = vec3(0.9, 0.7, 0.2); // Gold
        
        vec3 finalColor = mix(color1, color2, noise1);
        finalColor = mix(finalColor, color3, noise2 * 0.6);
        finalColor += vec3(ripple);
        finalColor *= (depth * 0.7 + 0.3);
        finalColor *= (0.6 + noise3 * 0.4);
        
        // Add some sparkle
        float sparkle = step(0.98, noise(pos * 50.0));
        finalColor += sparkle * 0.5;
        
        gl_FragColor = vec4(finalColor * 0.3, 1.0);
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

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, "a_position")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uMouse = gl.getUniformLocation(program, "u_mouse")

    const render = (time: number) => {
      gl.useProgram(program)
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameIdRef.current = requestAnimationFrame(render)
    }

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

    gl.useProgram(program) // Move gl.useProgram here
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouse)
    resize()

    frameIdRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
}
