<template>
  <div class="main-box" @click="imageClickHandler">
    <div id="container"></div>
  </div>
</template>
  
<script lang="ts" setup>
// import triangulate from 'delaunay-triangulate'
import { triangulate, randomRange, clamp, sign, Fragment } from './triangulate'
import { gsap } from 'gsap'
import blueImge from '@/assets/images/blue.png'

let vertices = [] as any[]
let indices = [] as any[]
const fragments = [] as any[]
let image = new Image()
let images = []
let imageIndex = 0
let content
let container = null as any
const TWO_PI = Math.PI * 2

image.src = blueImge
image.width = 768 // 设置最大宽度
image.height = 485 // 设置最大高度
const imageWidth = 768
const imageHeight = 485
const clickPosition = [imageWidth * 0.5, imageHeight * 0.5]

const imagesLoaded = () => {
  container = document.getElementById('container')
  gsap.set(container, { perspective: 500 })
  placeImage(false)
  triangulatePoint()
  shatter()
}

const placeImage = (transitionIn: boolean) => {
  container.appendChild(image)
  if (transitionIn !== false) {
    // 淡出弹窗
    // gsap.fromTo(
    //     image,
    //     { y: -1000 },
    //     { y: 0, duration: 1, ease: 'ease-out' }
    // )
  }
}

const imageClickHandler = (event: any) => {
  let box = image.getBoundingClientRect(),
    top = box.top,
    left = box.left

  clickPosition[0] = event.clientX - left
  clickPosition[1] = event.clientY - top

  triangulatePoint()
  shatter()
}

const triangulatePoint = () => {
  const rings = [
    { r: 50, c: 12 },
    { r: 150, c: 12 },
    { r: 300, c: 12 },
    { r: 1200, c: 12 } // very large in case of corner clicks
  ]
  vertices.push([clickPosition[0], clickPosition[1]])

  rings.forEach((ring) => {
    const radius = ring.r
    const count = ring.c
    const variance = radius * 0.25

    for (let i = 0; i < count; i++) {
      const x =
        Math.cos((i / count) * Math.PI * 2) * radius +
        clickPosition[0] +
        randomRange(-variance, variance)
      const y =
        Math.sin((i / count) * Math.PI * 2) * radius +
        clickPosition[1] +
        randomRange(-variance, variance)
      vertices.push([x, y])
    }
  })
  vertices.forEach((v) => {
    v[0] = clamp(v[0], 0, imageWidth)
    v[1] = clamp(v[1], 0, imageHeight)
  })
  indices = triangulate(vertices)
}

const shatter = () => {
  const tl = gsap.timeline({ onComplete: shatterCompleteHandler })

  indices.forEach((index, i) => {
    if (i % 3 === 0) {
      // 找三角形的3个点
      const p0 = vertices[indices[i]]
      const p1 = vertices[indices[i + 1]]
      const p2 = vertices[indices[i + 2]]

      const fragment = new Fragment(p0, p1, p2, image)
      fragments.push(fragment)
      container.appendChild(fragment.canvas)
      const dx = fragment.centroid[0] - clickPosition[0]
      const dy = fragment.centroid[1] - clickPosition[1]
      const d = Math.sqrt(dx * dx + dy * dy)
      const rx = 30 * sign(dy)
      const ry = 90 * -sign(dx)
      const delay = d * 0.003 * randomRange(0.9, 1.1)

      const tl1 = gsap.timeline()
      tl1.to(fragment.canvas, {
        z: -500,
        rotationX: rx,
        rotationY: ry,
        opacity: 0,
        ease: 'power3.in',
        duration: 1
      })

      tl.add(tl1, delay)
    }
  })

  container.removeChild(image)
}

const shatterCompleteHandler = () => {
  fragments.forEach((fragment) => {
    container.removeChild(fragment.canvas)
  })
  fragments.length = 0
  vertices.length = 0
  indices.length = 0
  placeImage(true)
}

onMounted(() => {
  // container = document.querySelector('.main-box')
  imagesLoaded()
})
</script>
  
  <style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #000;
}

.main-box {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: auto;
  cursor: pointer;
}

.container {
  position: relative;
  width: 500px;
  height: 500px;
}

.clipped-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/crayon.jpg')
    no-repeat center center;
  background-size: cover;
}

canvas {
  position: absolute;
  opacity: 1;
  transition: all 1s ease;
}
</style>