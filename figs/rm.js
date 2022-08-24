const vsSource =
  "attribute vec4 aVertexPosition; void main(){gl_Position = aVertexPosition;}";

const fsSource = `
    precision highp float;
    uniform vec2 res;

    float sdSphere(float r, vec3 p) {
      return length(p) - r;
    }

    vec4 map(vec3 ro, vec3 rd) {
      float depth = 0.;
      for (int i = 0; i < 50; i++) {
        vec3 p = ro + depth * rd;
        float dist = sdSphere(1., p - vec3(0., 0., 0.));
        if (dist < 1e-4) {
          return vec4(1.0);
        }
        depth += dist;
      }
      return vec4(0.0);
    }

    void main() {
      vec2 p = (gl_FragCoord.xy / res - 0.5) * 2.;
      p.x *= res.x / res.y;

      vec3 ro = vec3(0.0, 0.0, 2.0);
      vec3 rd = normalize(vec3(p, -1.2));
      float res = map(ro, rd).x;
      gl_FragColor = vec4(res, res, 0.0, 1.0);
    }
  `;

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return { position: positionBuffer };
}
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function drawScene(canvas, gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }
  gl.useProgram(programInfo.program);
  gl.uniform2f(programInfo.uniformLocations.res, canvas.width, canvas.height);
  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

function init() {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const gl = canvas.getContext("webgl");
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      res: gl.getUniformLocation(shaderProgram, 'res'),
    },
  };
  const buffers = initBuffers(gl);
  drawScene(canvas, gl, programInfo, buffers);
}

init();