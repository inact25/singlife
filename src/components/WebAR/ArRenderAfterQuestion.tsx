/* eslint-disable prettier/prettier */
// @ts-nocheck
import useAframe from '@hooks/useAframe.ts'
import React, {useEffect, useState} from 'react'
import AFrameScene from '@components/libs/AFrameScene'
import capture from '@assets/capture.svg'
import portalSpin from '@assets/glbs/portal-new.glb'
import portalBox from '@assets/glbs/box.glb'
import imgReward from '@assets/svgs/rewarded.svg'
import {
  portalCameraComponent,
  promptFlowComponent,
  spinComponent,
  tapToPlacePortalComponent,
} from '@components/WebAR/partials/portal-component.ts'
import {responsiveImmersiveComponent} from '@components/WebAR/partials/immersive-component.ts'
import MediaPopup from '@components/atom/mediapop'

// portal video
import portalVideo from '@assets/portal-video.mp4'
import {bottomPopup} from '@utils/bottomPopup/bottomPopup.ts'
import Popup from '@components/molecules/popup'
import Button from '@components/atom/button'
import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Swal from 'sweetalert2'
import {useParams} from 'react-router-dom'
import {FaFacebookF, FaLink, FaWhatsapp} from 'react-icons/fa6'
import {HiGiftTop} from 'react-icons/hi2'

type Props = {
  params: any
  callback: (e: any) => void
}
const ArRenderAfterQuestion: React.FC<Props> = ({ params, callback }) => {
  const aframe = useAframe()
  const [url, setUrl] = React.useState(null)
  const [reward, setReward] = useState(0)
  useEffect(() => {
    if (params?.url) {
      setUrl(params.url)
    }
  }, [params])
  useEffect(() => {
    //reality ready
    aframe.register('reality-ready', {
      init: function () {
        const el = this.el
        el.addEventListener('hasClicked', (x) => {
          console.log('portal summon', x)
          setTimeout(() => {
            bottomPopup({
              title: 'Walk into the portal to experience your dream',
              useButton: false,
              floating: true,
              dark: false,
            })
          }, 3000)
          setTimeout(() => Swal.close(), 6000)
          setTimeout(() => setReward(1), 15000)
        })
        el.addEventListener('realityready', function () {
          callback && callback(true)
        })
      },
    })

    aframe.register('portal-camera', portalCameraComponent)
    aframe.register('spin', spinComponent)

    aframe.register('prompt-flow', promptFlowComponent)
    aframe.register('tap-to-place-portal', tapToPlacePortalComponent)

    aframe.register('responsive-immersive', responsiveImmersiveComponent)

    aframe.register('auto-play-video', {
      schema: {
        video: { type: 'string' },
      },
      init() {
        const v = document.querySelector(this.data.video)
        v.play()
      },
    })
    aframe.register('custom-capture-btn', {
      init() {
        const btn = document.getElementById('recorder-button')
        btn.innerHTML = `<img id="icon" src=${capture}>`
      },
    })
  }, [window?.XR8])
  useEffect(() => {
    console.log('window?.XR8', window?.XR8)
  }, [window?.XR8])
  return (
    <>
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
          <div
            id='promptText'
            className='relative z-10 min-h-screen flex justify-center items-center px-5'
          >
            <MediaPopup type='tap' className='w-full' />
          </div>
        </div>
        <AFrameScene
          responsive-immersive
          custom-capture-btn
          xrextras-runtime-error
          renderer='colorManagement: true;'
          xrweb='allowedDevices: any; disableDefaultEnvironment: true;'
          reality-ready
        >
          <a-assets>
            <img crossOrigin='anonymous' id='skybox-img' src={url} />

            {/* portal assets */}
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
              src={portalVideo}
            ></video>
          </a-assets>

        <xrextras-capture-button capture-mode='standard'></xrextras-capture-button>
        <xrextras-capture-config
          max-duration-ms='30000'
          max-dimension='1280'
          enable-end-card='true'
          cover-image-url=''
          end-card-call-to-action='Try it at:'
          short-link=''
          watermark-image-url='/logo.png'
          watermark-max-width='800'
          watermark-max-height='10'
          watermark-location='bottomRight'
          file-name-prefix='singlife-image-'
          footer-image-url="/logo.png"
        ></xrextras-capture-config>
        <xrextras-capture-preview
          action-button-share-text="test"
          action-button-view-text="View"
          finalize-text="Exporting..."
        ></xrextras-capture-preview>

          <a-camera
            id='camera'
            position='0 9 11'
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
                scale='0.85 0.85 0.85'
                position='0 9 -0.02187'
                geometry='radiusOuter: 15'
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

          <a-light type='ambient' intensity='0.3'></a-light>

          <a-entity id='portal-contents'>
            {/* <a-entity
            gltf-model={`url(${moonGlb})`}
            rotation='0 90 0'
            position='8 -0.5 -5'
            scale='0.5 0.5 0.5'
            shadow='cast: false'
          ></a-entity>

          <a-entity
            gltf-model={`url(${platformGlb})`}
            rotation='0 -90 0'
            reflections='type: static'
            position='-0.4 0 -10'
            scale='9 9 9'
            shadow='receive: false'
          ></a-entity>

          <a-plane
            material='src: #satellite-img; transparent: true; roughness: 0.8; metalness: 0'
            rotation='0 30 0'
            position='-200 150 -250'
            scale='120 80 1'
            shadow='receive: false'
          ></a-plane> */}

            {/* <a-entity
            gltf-model={`url(${flagGlb})`}
            rotation='0 30 0'
            reflections='type: static'
            position='-14 0 -43'
            scale='5 5 5'
            shadow='receive: false'
          ></a-entity>

          <a-entity
            gltf-model={`url(${rocksGlb})`}
            reflections='type: static'
            position='-14 -1 -42'
            scale='0.75 0.25 0.75'
            shadow='receive: false'
          ></a-entity> */}
            <a-sky src='#skybox-img' rotation='0 7 0'></a-sky>
          </a-entity>

          <a-entity
            id='portalRim'
            gltf-model={`url(${portalSpin})`}
            reflections='type: realtime'
            shadow='receive: false'
            visible='false'
            scale='2 2 2 '
          ></a-entity>
          <a-entity
            id='portalBox'
            gltf-model={`url(${portalBox})`}
            reflections='type: realtime'
            shadow='receive: false'
            visible='false'
          ></a-entity>

          <a-entity
            id='portalVideo'
            auto-play-video='video: #portal-video'
            material='shader: chromakey; src: #portal-video; color: 0 0 0; blending: additive; side: front'
            geometry='primitive: plane; height: 1; width: 1;'
            scale='0.001 0.001 0.001'
          ></a-entity>

          <a-circle
            id='portalShadow'
            radius='0.5'
            material='src: #blob-shadow-img; opacity: 0.65; roughness: 0.8; metalness: 0'
            position='0 0.01 1.25'
            rotation='-90 0 0'
            scale='0.001 0.001 0.001'
          ></a-circle>
        </AFrameScene>
      </>
      <WrapperLayouts isFull>
        {reward === 1 && (
          <Popup
            title={'Get Rewarded'}
            isFloating={false}
            onPop={() => setReward(2)}
            content={<Rewarded />}
            open={true}
          />
        )}
      </WrapperLayouts>
      {reward === 2 && (
        <div className='absolute top-5 right-5'>
          <div className='h-[48px] mb-3 [:&>svg]:text-[24px] w-[48px] shadow-sm bg-[#1877F2] text-white rounded-full flex items-center justify-center'>
            <span className='text-[24px]'>
              <FaFacebookF />
            </span>
          </div>
          <div className='h-[48px] mb-3 [:&>svg]:text-[24px] w-[48px] shadow-sm bg-[#25D366] text-white rounded-full flex items-center justify-center'>
            <span className='text-[24px]'>
              <FaWhatsapp />
            </span>
          </div>
          <div className='h-[48px] mb-3 [:&>svg]:text-[24px] shadow-sm w-[48px] bg-white text-black rounded-full flex items-center justify-center'>
            <span className='text-[24px]'>
              <FaLink />
            </span>
          </div>
          <div className='h-[48px] mb-3 [:&>svg]:text-[24px] w-[48px] shadow-sm bg-black text-white rounded-full flex items-center justify-center'>
            <span className='text-[24px]'>
              <HiGiftTop />
            </span>
          </div>
        </div>
      )}
    </>
  )
}

const Rewarded = () => {
  const params = useParams()
  const dream_no = params?.id?.split('-')[1]
  const entry_id = params?.id?.split('-')[0]
  return (
    <div>
      <div className='icon flex justify-center mb-4'>
        <img src={imgReward} alt='' />
      </div>
      <div className='caption mb-8'>
        <p className='note'>Get $20 voucher when you sign up</p>
      </div>
      <div className='action-button flex gap-5'>
        <Button
          title='Learn more'
          onClick={() =>
            window.open(
              `https://www.singlife.com/leadgendreamcube/?ffdream=${dream_no}&entry_id=${entry_id}`,
              '_blank',
            )
          }
          type='secondaryWhite'
        />
        <Button
          onClick={() =>
            window.open(
              `https://www.singlife.com/leadgendreamcube/?ffdream=${dream_no}&entry_id=${entry_id}`,
              '_blank',
            )
          }
          title='Sign up'
          type='primary'
        />
      </div>
    </div>
  )
}

export default ArRenderAfterQuestion
