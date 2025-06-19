"use client"
import { useEffect, useRef } from "react"

export function EnhancedWebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      // Enhanced 2D fallback with particles and waves
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
        life: number
        maxLife: number
      }> = []

      const waves: Array<{
        x: number
        y: number
        radius: number
        maxRadius: number
        alpha: number
        speed: number
      }> = []

      // Create particles
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 4 + 1,
          color: ["#60A5FA", "#F472B6", "#FBBF24", "#34D399"][Math.floor(Math.random() * 4)],
          alpha: Math.random() * 0.6 + 0.2,
          life: 0,
          maxLife: Math.random() * 300 + 200,
        })
      }

      const createWave = (x: number, y: number) => {
        waves.push({
          x,
          y,
          radius: 0,
          maxRadius: Math.random() * 100 + 50,
          alpha: 0.8,
          speed: Math.random() * 2 + 1,
        })
      }

      const animate2D = () => {
        // Clear with gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, "rgba(15, 23, 42, 0.02)")
        gradient.addColorStop(0.5, "rgba(30, 41, 59, 0.01)")
        gradient.addColorStop(1, "rgba(15, 23, 42, 0.02)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        particles.forEach((particle, index) => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.life++

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8

          // Mouse attraction
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            particle.vx += dx * 0.0001
            particle.vy += dy * 0.0001
          }

          // Fade out over time
          const lifeRatio = particle.life / particle.maxLife
          particle.alpha = Math.max(0, 0.8 * (1 - lifeRatio))

          // Reset particle if dead
          if (particle.life >= particle.maxLife) {
            particle.x = Math.random() * canvas.width
            particle.y = Math.random() * canvas.height
            particle.life = 0
            particle.alpha = Math.random() * 0.6 + 0.2
          }

          // Draw particle with glow
          ctx.save()
          ctx.globalAlpha = particle.alpha
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Draw connections
          particles.forEach((other, otherIndex) => {
            if (index !== otherIndex) {
              const dx = other.x - particle.x
              const dy = other.y - particle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              if (distance < 80) {
                ctx.save()
                ctx.globalAlpha = (1 - distance / 80) * 0.2
                ctx.strokeStyle = particle.color
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(other.x, other.y)
                ctx.stroke()
                ctx.restore()
              }
            }
          })
        })

        // Update and draw waves
        waves.forEach((wave, index) => {
          wave.radius += wave.speed
          wave.alpha *= 0.98

          if (wave.radius < wave.maxRadius && wave.alpha > 0.01) {
            ctx.save()
            ctx.globalAlpha = wave.alpha
            ctx.strokeStyle = "#60A5FA"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()
          } else {
            waves.splice(index, 1)
          }
        })

        frameIdRef.current = requestAnimationFrame(animate2D)
      }

      const handleClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        createWave(e.clientX - rect.left, e.clientY - rect.top)
      }

      const resize2D = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resize2D()
      window.addEventListener("resize", resize2D)
      window.addEventListener("click", handleClick)
      animate2D()

      return () => {
        window.removeEventListener("resize", resize2D)
        window.removeEventListener("click", handleClick)
        if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
      }
    }

    // Enhanced WebGL implementation with complex shaders
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_uv = a_position * 0.5 + 0.5;
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Enhanced noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      // Fractal Brownian Motion
      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for(int i = 0; i < 8; i++) {
          value += amplitude * snoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      // Domain warping
      vec3 domainWarp(vec3 p) {
        return p + vec3(
          fbm(p + vec3(0.0, 0.0, u_time * 0.1)),
          fbm(p + vec3(5.2, 1.3, u_time * 0.1)),
          fbm(p + vec3(1.7, 9.2, u_time * 0.1))
        ) * 0.3;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse / u_resolution;
        
        // Create 3D coordinates with time evolution
        vec3 pos = vec3(uv * 4.0, u_time * 0.15);
        pos.xy += mouse * 0.5;
        
        // Apply domain warping for organic movement
        vec3 warpedPos = domainWarp(pos);
        
        // Multiple noise layers with different frequencies
        float noise1 = fbm(warpedPos * 1.2 + u_time * 0.2);
        float noise2 = fbm(warpedPos * 2.1 - u_time * 0.15);
        float noise3 = fbm(warpedPos * 0.8 + u_time * 0.1);
        float noise4 = fbm(warpedPos * 3.5 + u_time * 0.25);
        
        // Create depth with multiple distance fields
        float centerDist = length(uv - 0.5);
        float depth1 = sin(centerDist * 12.0 - u_time * 4.0) * 0.5 + 0.5;
        float depth2 = cos(centerDist * 8.0 + u_time * 3.0) * 0.3 + 0.7;
        
        // Enhanced mouse interaction with multiple ripples
        float mouseDist = distance(uv, mouse);
        float ripple1 = sin(mouseDist * 25.0 - u_time * 8.0) * exp(-mouseDist * 5.0) * 0.4;
        float ripple2 = cos(mouseDist * 15.0 - u_time * 6.0) * exp(-mouseDist * 3.0) * 0.3;
        float ripple3 = sin(mouseDist * 35.0 - u_time * 10.0) * exp(-mouseDist * 7.0) * 0.2;
        
        // Complex color mixing with multiple gradients
        vec3 color1 = vec3(0.1, 0.3, 0.9); // Deep blue
        vec3 color2 = vec3(0.8, 0.2, 0.7); // Magenta
        vec3 color3 = vec3(0.9, 0.6, 0.1); // Orange
        vec3 color4 = vec3(0.2, 0.8, 0.4); // Green
        vec3 color5 = vec3(0.7, 0.3, 0.9); // Purple
        
        // Multi-layer color blending
        vec3 finalColor = mix(color1, color2, noise1 * 0.7 + 0.3);
        finalColor = mix(finalColor, color3, noise2 * 0.5);
        finalColor = mix(finalColor, color4, noise3 * 0.4);
        finalColor = mix(finalColor, color5, noise4 * 0.3);
        
        // Add ripple effects
        finalColor += vec3(ripple1 + ripple2 + ripple3);
        
        // Apply depth and movement
        finalColor *= (depth1 * depth2 * 0.8 + 0.2);
        finalColor *= (0.7 + noise1 * 0.3);
        
        // Add sparkle and energy
        float sparkle = step(0.985, snoise(warpedPos * 80.0));
        finalColor += sparkle * vec3(1.0, 0.8, 0.6) * 0.8;
        
        // Add flowing energy lines
        float flow = sin(uv.x * 20.0 + u_time * 2.0) * sin(uv.y * 15.0 - u_time * 1.5);
        finalColor += flow * 0.1 * vec3(0.5, 0.8, 1.0);
        
        // Vignette effect
        float vignette = 1.0 - smoothstep(0.3, 1.2, centerDist);
        finalColor *= vignette;
        
        gl_FragColor = vec4(finalColor * 0.4, 1.0);
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

    gl.useProgram(program)

    const render = (time: number) => {
      timeRef.current = time
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
}
