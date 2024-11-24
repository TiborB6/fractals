function setup() {
  createCanvas(800, 800)
  pixelDensity(1)
  noLoop()
}

let maxIterations = 100; 
let zoom = 1
let moveX = 0
let moveY = 0


function draw() {
  loadPixels()

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      // Complex plane
      let a = map(x, 0, width, -2.5 / zoom + moveX, 1.5 / zoom + moveX)
      let b = map(y, 0, width, -2 / zoom + moveY, 2 / zoom + moveY)
    
      // Re & Im
      let ca = a
      let cb = b

      let n = 0

      // Checken ob es im set ist
      while (n < maxIterations) {
        let aa = a * a - b * b + ca
        let bb = 2 * a * b + cb

        a = aa
        b = bb

        if (abs(a + b) > 16) {
          break
        }

        n++
      }

      let color = map(n, 0, maxIterations, 0, 255)
      let pix = (x + y * width) * 4
      if (n === maxIterations) {
        color = 0
      }

      pixels[pix + 0] = color
      pixels[pix + 1] = color * 0.6
      pixels[pix + 2] = color * 0.2
      pixels[pix + 3] = 255
    }
  }

  updatePixels()
}