/* eslint-disable prettier/prettier */
// @ts-nocheck
const portalCameraComponent = {
  schema: {
    width: {default: 10},
    height: {default: 10},
  },
  init() {
    this.camera = this.el
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')
    this.portalVideo = document.getElementById('portalVideo')
    this.isInPortalSpace = false
    this.wasOutside = true
  },

  tick() {
    const {position} = this.camera.object3D
    const isOutside = position.z > 0
    const withinPortalBounds =
      position.y < this.data.height && Math.abs(position.x) < this.data.width / 2
    if (this.wasOutside !== isOutside && withinPortalBounds) {
      this.isInPortalSpace = !isOutside
    }
    this.contents.object3D.visible = this.isInPortalSpace || isOutside
    this.walls.object3D.visible = !this.isInPortalSpace && isOutside
    this.portalWall.object3D.visible = this.isInPortalSpace && !isOutside
    this.portalVideo.object3D.visible = isOutside
    this.wasOutside = isOutside
  },
}

const tapToPlacePortalComponent = {
  init() {
    const { sceneEl } = this.el
    const recenterBtn = document.getElementById('recenterButton')

    this.camera = document.getElementById('camera')
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')
    this.isInPortalSpace = false
    this.wasOutside = true

    const portalHiderRing = this.el.sceneEl.querySelector('#portalHiderRing')
    const portalRim = this.el.sceneEl.querySelector('#portalRim')
    const portalBox = this.el.sceneEl.querySelector('#portalBox')
    const portalVideo = this.el.sceneEl.querySelector('#portalVideo')
    const portalShadow = this.el.sceneEl.querySelector('#portalShadow')

    const handleClickEvent = (e) => {
      //create new event
      const event = new CustomEvent('clcik', {
        status: true,
      })
      sceneEl.dispatchEvent(event)
      if (!e.touches || e.touches.length < 2) {
        recenterBtn.classList.add('pulse-once')
        sceneEl.emit('recenter')
        setTimeout(() => {
          recenterBtn.classList.remove('pulse-once')
        }, 200)
      }
    }

    const firstPlaceEvent = (e) => {
      sceneEl.emit('recenter')
      sceneEl.emit('dismissPrompt')
      
      portalBox.setAttribute('animation-mixer', {
        clip: '*',
        loop: 'once',
        clampWhenFinished: true,
      })
      
      // Mulai animasi pada target2 setelah animasi target1 selesai
      setTimeout(() => {
        portalRim.setAttribute('visible', true)
        portalRim.setAttribute('animation-mixer', {
          clip: '*',
          loop: 'once',
          clampWhenFinished: true,
          timeScale: 2,
        })
        portalRim.setAttribute('position', '0 0 -4')
        setTimeout(() => {
          // portalRim.setAttribute('position', '0 -2 -5')
          portalRim.setAttribute('animation',{
            property: 'position',
            dur: 2000,
            to: '0 -2 -4',
            easing: 'linear',
          })

          portalVideo.setAttribute('animation__3', {
            property: 'scale',
            dur: 1500,
            from: '0.001 0.001 0.001',
            to: '7 7 1',
            easing: 'easeOutElastic',
          })
        }, 3500)
        setTimeout(() => {
          portalHiderRing.setAttribute('animation__1', {
            property: 'radius-inner',
            dur: 500,
            from: '0.001',
            to: '3.5',
            easing: 'linear',
          })

          portalVideo.setAttribute('animation__5', {
            property: 'radius-inner',
            dur: 500,
            from: '0.001',
            to: '3.5',
            easing: 'linear',
          })
        }, 5000)
      }, 3000) // Jeda 3000 milidetik (3 detik)



      portalShadow.setAttribute('animation__4', {
        property: 'scale',
        dur: 1500,
        from: '0.001 0.001 0.001',
        to: '15.5 2 11',
        easing: 'easeOutElastic',
      })
      sceneEl.removeEventListener('click', firstPlaceEvent)
      recenterBtn.addEventListener('click', handleClickEvent, true)
      const event = new CustomEvent('hasClicked', {
        status: true,
      })
      sceneEl.dispatchEvent(event)
      //push new event
    }

    sceneEl.addEventListener('click', firstPlaceEvent)
  },
}

const promptFlowComponent = {
  init() {
    this.prompt = document.getElementById('promptText')
    this.overlay = document.getElementById('overlay')

    this.el.sceneEl.addEventListener('realityready', () => {
      this.overlay.style.display = 'block'
    })

    this.el.addEventListener('dismissPrompt', () => {
      this.prompt.classList.add('fade-out')
    })
  },
}

const spinComponent = {
  schema: {
    speed: { default: 2000 },
    direction: { default: 'normal' },
    axis: { default: 'y' },
  },
  init() {
    const { el } = this
    el.setAttribute('animation__spin', {
      property: `object3D.rotation.${this.data.axis}`,
      from: 0,
      to: 360,
      dur: this.data.speed,
      dir: this.data.direction,
      loop: true,
      easing: 'linear',
    })
  },
}

export {
  portalCameraComponent,
  tapToPlacePortalComponent,
  promptFlowComponent,
  spinComponent,
 
}
