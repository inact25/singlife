/* eslint-disable prettier/prettier */
// @ts-nocheck
import useAframe from '@hooks/useAframe.ts'
import React, {useEffect} from 'react'
import AFrameScene from '@components/libs/AFrameScene'

type Props = {
  params: any
  callback: (e: any) => void
}
const ArRender: React.FC<Props> = ({ params, callback }) => {
  const aframe = useAframe()
  const [url, setUrl] = React.useState(null)
  useEffect(() => {
    console.log('params', params?.url)
    if (params?.url) {
      setUrl(params.url)
    }
  }, [params])
  useEffect(() => {
    //reality ready
    aframe.register('reality-ready', {
      init: function () {
        const el = this.el
        el.addEventListener('realityready', function () {
          callback && callback(true)
        })
      },
    })
    aframe.register('portal-camera', {
      schema: {
        width: { default: 10 },
        height: { default: 10 },
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
        const { position } = this.camera.object3D
        const isOutside = position.z > 0
        const withinPortalBounds =
          position.y < this.data.height &&
          Math.abs(position.x) < this.data.width / 2
        if (this.wasOutside !== isOutside && withinPortalBounds) {
          this.isInPortalSpace = !isOutside
        }
        this.contents.object3D.visible = this.isInPortalSpace || isOutside
        this.walls.object3D.visible = !this.isInPortalSpace && isOutside
        this.portalWall.object3D.visible = this.isInPortalSpace && !isOutside
        this.portalVideo.object3D.visible = isOutside
        this.wasOutside = isOutside
      },
    })
    aframe.register('spin', {
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
    })
    aframe.register('prompt-flow', {
      init() {
        this.prompt = document.getElementById('promptText')
        this.overlay = document.getElementById('overlay')

        this.el.sceneEl.addEventListener('realityready', () => {
          this.overlay.style.display = 'block'
          this.prompt.innerHTML = 'Tap to Place<br>Moon Portal'
          this.prompt.classList.add('fly-in')
        })

        this.el.addEventListener('dismissPrompt', () => {
          this.prompt.classList.remove('fly-in')
          this.prompt.classList.add('fly-out')
        })
      },
    })
    aframe.register('tap-to-place-portal', {
      init() {
        const { sceneEl } = this.el
        const recenterBtn = document.getElementById('recenterButton')

        this.camera = document.getElementById('camera')
        this.contents = document.getElementById('portal-contents')
        this.walls = document.getElementById('hider-walls')
        this.portalWall = document.getElementById('portal-wall')
        this.isInPortalSpace = false
        this.wasOutside = true

        const portalHiderRing =
          this.el.sceneEl.querySelector('#portalHiderRing')
        const portalRim = this.el.sceneEl.querySelector('#portalRim')
        const portalVideo = this.el.sceneEl.querySelector('#portalVideo')
        const portalShadow = this.el.sceneEl.querySelector('#portalShadow')

        const handleClickEvent = (e) => {
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

          portalHiderRing.setAttribute('animation__1', {
            property: 'radius-inner',
            dur: 1500,
            from: '0.001',
            to: '3.5',
            easing: 'easeOutElastic',
          })

          portalRim.setAttribute('animation__2', {
            property: 'scale',
            dur: 1500,
            from: '0.001 0.001 0.001',
            to: '4.3 4.3 4.3',
            easing: 'easeOutElastic',
          })

          portalVideo.setAttribute('animation__3', {
            property: 'scale',
            dur: 1500,
            from: '0.001 0.001 0.001',
            to: '7 7 1',
            easing: 'easeOutElastic',
          })

          portalShadow.setAttribute('animation__4', {
            property: 'scale',
            dur: 1500,
            from: '0.001 0.001 0.001',
            to: '15.5 2 11',
            easing: 'easeOutElastic',
          })
          sceneEl.removeEventListener('click', firstPlaceEvent)
          recenterBtn.addEventListener('click', handleClickEvent, true)
        }

        sceneEl.addEventListener('click', firstPlaceEvent)
      },
    })
    aframe.register('responsive-immersive', {
      init() {
        const onAttach = ({ sessionAttributes }) => {
          const hiderWalls = document.getElementById('hider-walls')
          const scene = this.el
          const s = sessionAttributes
          if (
            !s.cameraLinkedToViewer &&
            !s.controlsCamera &&
            !s.fillsCameraTexture &&
            !s.supportsHtmlEmbedded &&
            s.supportsHtmlOverlay &&
            !s.usesMediaDevices &&
            !s.usesWebXr
          ) {
            // Desktop-specific behavior goes here
          } else if (
            s.cameraLinkedToViewer &&
            s.controlsCamera &&
            !s.fillsCameraTexture &&
            s.supportsHtmlEmbedded &&
            !s.supportsHtmlOverlay &&
            !s.usesMediaDevices &&
            s.usesWebXr
          ) {
            // HMD-specific behavior goes here
            if (this.el.sceneEl.xrSession.environmentBlendMode === 'opaque') {
              // VR HMD (i.e. Oculus Quest) behavior goes here
            } else if (
              this.el.sceneEl.xrSession.environmentBlendMode === 'additive' ||
              'alpha-blend'
            ) {
              // AR HMD (i.e. Quest 3, Hololens) behavior goes here
              scene.setAttribute('tap-to-place-portal', '')
              scene.setAttribute('prompt-flow', '')
              scene.sceneEl.camera.el.setAttribute('portal-camera', '')
            }
          } else if (
            !s.cameraLinkedToViewer &&
            !s.controlsCamera &&
            s.fillsCameraTexture &&
            !s.supportsHtmlEmbedded &&
            s.supportsHtmlOverlay &&
            s.usesMediaDevices &&
            !s.usesWebXr
          ) {
            // Mobile-specific behavior goes here
            scene.setAttribute('tap-to-place-portal', '')
            scene.setAttribute('prompt-flow', '')
            scene.sceneEl.camera.el.setAttribute('portal-camera', '')
          }
        }

        const onxrloaded = () => {
          XR8.addCameraPipelineModules([
            { name: 'responsiveImmersive', onAttach },
          ])
        }
        window.XR8
          ? onxrloaded()
          : window.addEventListener('xrloaded', onxrloaded)
      },
    })
    aframe.register('auto-play-video', {
      schema: {
        video: { type: 'string' },
      },
      init() {
        const v = document.querySelector(this.data.video)
        v.play()
      },
    })
  }, [])
  if (!url) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div
        id='overlay'
        style={{
          display: 'none',
        }}
        className='absolute-fill'
      >
        <img
          id='recenterButton'
          src='https://static.8thwall.app/assets/recenter-m71fa5ubcu.png'
        />
        <span id='promptText'></span>
      </div>
      <AFrameScene
      responsive-immersive
        xrextras-loading
        xrextras-runtime-error
        renderer='colorManagement: true;'
        xrweb='allowedDevices: any; disableDefaultEnvironment: true;'
        reality-ready
      >
        <a-assets>
          <img crossOrigin='anonymous' id='skybox-img' src={url} />

          {/* portal assets */}
          <a-asset-item
            id='portal-rim-model'
            src='https://static.8thwall.app/assets/portal%20(1)-8fj5kci5t4.glb'
          ></a-asset-item>
          <a-asset-item
            id='moon-model'
            src='https://static.8thwall.app/assets/moon-ground-5dc3hau3o2.glb'
          ></a-asset-item>
          <a-asset-item
            id='platform-model'
            src='https://static.8thwall.app/assets/platform-cvp8cpu7n7.glb'
          ></a-asset-item>
          <a-asset-item
            id='flag-model'
            src='https://static.8thwall.app/assets/flag%20(1)-1gepdc4al8.glb'
          ></a-asset-item>
          <a-asset-item
            id='rocks-model'
            src='https://static.8thwall.app/assets/rocks-1phpku57lc.glb'
          ></a-asset-item>
          <img
            id='blob-shadow-img'
            src='https://static.8thwall.app/assets/blob-shadow-5ez3hboap2.png'
          />
          <img
            id='satellite-img'
            src='https://static.8thwall.app/assets/satellite-92l691o6f5.png'
          />
          <video
            id='portal-video'
            muted
            loop='true'
            src='https://static.8thwall.app/assets/blue-portal-lrmelmi6qc.mp4'
          ></video>
        </a-assets>

        <a-camera
          id='camera'
          position='0 9 11'
          raycaster='objects: .cantap'
          cursor='fuse: false; rayOrigin: mouse;'
        ></a-camera>

        <xrextras-opaque-background remove='true'>
          <a-entity id='hider-walls'>
            <a-box
              scale='100 1 100'
              position='0 -1 49'
              xrextras-hider-material
            ></a-box>
            <a-box
              scale='100 100 1'
              position='0 50 75'
              xrextras-hider-material
            ></a-box>
            <a-box
              scale='100 1 100'
              position='0 100 49'
              xrextras-hider-material
            ></a-box>
            <a-box
              scale='1 100 100'
              position='-30 50 50'
              xrextras-hider-material
            ></a-box>
            <a-box
              scale='1 100 100'
              position='30 50 50'
              xrextras-hider-material
            ></a-box>
            <a-ring
              id='portalHiderRing'
              radius-inner='0.001'
              radius-outer='100'
              position='0 7.5 -0.2'
              xrextras-hider-material
            ></a-ring>
          </a-entity>

          <a-entity id='portal-wall'>
            <a-circle
              radius='5.2'
              rotation='0 180 0'
              position='0 7.5 0'
              scale='0.8 0.8 0'
              xrextras-hider-material
            ></a-circle>
            <a-circle
              radius='5.2'
              rotation='0 180 0'
              position='0 7.5 0.25'
              scale='0.8 0.8 0'
              xrextras-hider-material
            ></a-circle>
          </a-entity>
        </xrextras-opaque-background>

        <a-entity
          light='
      type: directional;
      castShadow: true;
      shadowMapHeight:2048;
      shadowMapWidth:2048;
      shadowCameraTop: 35;
      shadowCameraBottom: -20;
      shadowCameraRight: 40;
      shadowCameraLeft: -10;
      target: #portalRim'
          xrextras-attach='target: portalRim; offset: 18 7 14'
          shadow
        ></a-entity>

  <a-entity id="portal-contents">
  <a-entity
      gltf-model="#moon-model"
      rotation="0 90 0"
      position="8 -0.5 -5"
      scale="0.5 0.5 0.5"
      shadow="cast: false">
    </a-entity>

    <a-entity
      gltf-model="#platform-model"
      rotation="0 -90 0"
      reflections="type: static"
      position="-0.4 0 -10"
      scale="9 9 9"
      shadow="receive: false">
    </a-entity>
    
    <a-plane
      material="src: #satellite-img; transparent: true; roughness: 0.8; metalness: 0"
      rotation="0 30 0"
      position="-200 150 -250"
      scale="120 80 1"
      shadow="receive: false">
     </a-plane>
    
     <a-entity
      gltf-model="#flag-model"
      rotation="0 30 0"
      reflections="type: static"
      position="-14 0 -43"
      scale="5 5 5"
      shadow="receive: false">
     </a-entity>
    
     <a-entity
      gltf-model="#rocks-model"
      reflections="type: static"
      position="-14 -1 -42"
      scale="0.75 0.25 0.75"
      shadow="receive: false">
     </a-entity>
    
     <a-sky id='image-360' radius='10' src='#portal-content'></a-sky>
    </a-entity>

   <a-entity
    id="portalRim"
    gltf-model="#portal-rim-model"
    spin="axis: x; speed: 14000"
    reflections="type: realtime"
    position="0 7.5 0"
    rotation="90 -90 -90"
    scale="0.001 0.001 0.001"
    shadow="receive: false">
  </a-entity>

  <a-entity
    id="portalVideo"
    auto-play-video="video: #portal-video"
    material="shader: chromakey; src: #portal-video; color: 0 0 0; blending: additive; side: front"
    geometry="primitive: plane; height: 1; width: 1;"
    position="0 7.5 0.1"
    scale="0.001 0.001 0.001">
  </a-entity>

  <a-circle
    id="portalShadow"
    radius="0.5"
    material="src: #blob-shadow-img; opacity: 0.65; roughness: 0.8; metalness: 0"
    position="0 0.01 1.25"
    rotation="-90 0 0"
    scale="0.001 0.001 0.001">
  </a-circle>

      </AFrameScene>
    </>
  )
}

export default ArRender
