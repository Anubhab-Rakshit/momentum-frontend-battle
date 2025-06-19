"use client"
import { useEffect, useRef } from "react"

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    /* ---------- SHADERS ---------- */
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;

        float dist = distance(uv, mouse);
        float ripple = sin(dist * 20.0 - u_time * 3.0) * exp(-dist * 5.0);

        float wave1 = sin(uv.x * 3.0 + u_time * .5) * .5 + .5;
        float wave2 = sin(uv.y * 2.0 + u_time * .3) * .5 + .5;

        vec3 c1 = vec3(0.2, 0.6, 1.0);
        vec3 c2 = vec3(0.8, 0.2, 0.8);
        vec3 c3 = vec3(1.0, 0.8, 0.2);

        vec3 color = mix(c1, c2, wave1);
        color = mix(color, c3, wave2 * .3);
        color += ripple * .3;

        gl_FragColor = vec4(color * .15, 1.0);
      }
    `

    /* ---------- HELPERS ---------- */
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
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

    /* ---------- GEOMETRY ---------- */
    const positions = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, "a_position")
    const aUV = gl.getAttribLocation(program, "a_texCoord")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uMouse = gl.getUniformLocation(program, "u_mouse")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = rect.height - (e.clientY - rect.top)
    }
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouse)

    /* ---------- RENDER LOOP ---------- */
    const render = (time: number) => {
      gl.useProgram(program)

      gl.enableVertexAttribArray(aPos)
      gl.enableVertexAttribArray(aUV)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
      gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 16, 8)

      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      frameIdRef.current = requestAnimationFrame(render)
    }

    gl.useProgram(program) // Move gl.useProgram to the top level of the useEffect hook

    frameIdRef.current = requestAnimationFrame(render)

    /* ---------- CLEAN-UP ---------- */
    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
      gl.deleteProgram(program)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }} />
}
