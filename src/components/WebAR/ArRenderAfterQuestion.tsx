/* eslint-disable prettier/prettier */
// @ts-nocheck
import useAframe from '@hooks/useAframe.ts'
import React, { useEffect, useState } from 'react'
import AFrameScene from '@components/libs/AFrameScene'
import capture from '@assets/capture.svg'
import portalSpin from '@assets/glbs/portal-new.glb'
import portalBox from '@assets/glbs/box.glb'
import { motion } from 'framer-motion'
import imgReward from '@assets/svgs/rewarded.svg'
import {
  portalCameraComponent,
  promptFlowComponent,
  spinComponent,
  tapToPlacePortalComponent,
} from '@components/WebAR/partials/portal-component.ts'
import { responsiveImmersiveComponent } from '@components/WebAR/partials/immersive-component.ts'
import MediaPopup from '@components/atom/mediapop'

// portal video
import portalVideo from '@assets/red_portal.mp4'
import { bottomPopup } from '@utils/bottomPopup/bottomPopup.ts'
import Popup from '@components/molecules/popup'
import Button from '@components/atom/button'
import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import FaLink from '../../assets/svgs/link-copy.svg'
import HiGiftTop from '../../assets/svgs/gift.svg'
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import Recenter from '../../assets/svgs/recenter.svg'
import WAICON from '@assets/svgs/whatsapp-icon.svg'
import FBICON from '@assets/svgs/facebook.svg'
import GIFT from '@assets/svgs/gift.svg'
import COPY from '@assets/svgs/copy.svg'

type Props = {
  params: any
  callback: (e: any) => void
}

const motionConfig = {
  closed: {
    left: 0,
    position: 'absolute',
    bottom: -500,
    width: '100%',
    zIndex: 99999,
  },
  //open visible
  open: {
    zIndex: 99999,
    left: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
}

const ArRenderAfterQuestion: React.FC<Props> = ({ params, callback }) => {
  const aframe = useAframe()
  const [url, setUrl] = React.useState(null)
  const [reward, setReward] = useState(0)
  const [rewardShowUp, setRewardShowUp] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [isPopupShow, setIsPopupShow] = useState(false)

  const shareUrl = () => {
    const host = window.location.host
    const path = '/share'
    const id = params?.id
    return `https://${host}${path}/explore-${id}`
  }
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
            setTimeout(() => {
              setIsPopupShow(true)
              setTimeout(() => {
                setIsPopupShow(false)
                setTimeout(() => setReward(1), 15000)
              }, 2500)
            }, 6000)
          }, 3000)
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
        btn.innerHTML = `<img id="icon-capture-btn" class="capture-icon" src=${capture}>`
      },
    })
  }, [window?.XR8])

  useEffect(() => {
    const btn = document.querySelector('.capture-icon')
    const progressbtn = document.querySelector('.progress-container')

    if (reward === 2 && !rewardShowUp) {
      if (btn) btn.style = 'display:block;'
      if (progressbtn) progressbtn.style = 'display:block;'

      setTimeout(
        () =>
          bottomPopup({
            className: 'callout',
            title:
              'Tap the camera button to take a<br/>photo or hold it to take a video',
            useButton: false,
            floating: true,
            dark: false,
            timer: 5000,
          }),
        500,
      )
      setRewardShowUp(true)
    } else {
      Swal.close()
    }
    return () => Swal.close()
  }, [reward])

  useEffect(() => {
    setInterval(() => {
      const btnRecord = document.querySelector('.recorder-container')
      const preview = document.querySelector('#previewContainer')
      if (preview.className !== '') {
        btnRecord.style = 'display:none;'
      } else {
        btnRecord.style = 'display:block;'
      }
    }, [200])
  }, [])

  useEffect(() => {
    console.log('window?.XR8', window?.XR8)
  }, [window?.XR8])

  useEffect(() => {
    const btnRecord = document.querySelector('.recorder-container')
    const preview = document.querySelector('#videoPreview, #imagePreview')
    // btnRecord.style.display = 'none !important'
    //
    // if (btnRecord && preview) {
    //   if (!!preview.src.length) {
    //   } else {
    //     btnRecord.style.display = 'block !important'
    //   }
    // }
  }, [])

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
          <img id='recenterButton' src={Recenter} />
          <div
            id='promptText'
            className='relative z-10 min-h-[100dvh] flex justify-center items-center mt-[-10px] px-5'
          >
            <MediaPopup type='tap' className='w-full' />
          </div>
        </div>
        <AFrameScene
          responsive-immersive
          custom-capture-btn
          renderer='colorManagement: true'
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
            max-duration-ms='15000'
            max-dimension='1280'
            cover-image-url=''
            end-card-call-to-action='Try it at:'
            watermark-max-width='100'
            watermark-max-height='18'
            watermark-image-url='/singlife-watermark-new.png'
            watermark-location='bottomMiddle'
            file-name-prefix='singlife-image-'
            footer-image-url='/logo_horizontal.png'
          ></xrextras-capture-config>
          <xrextras-capture-preview
            action-button-share-text='Share your dream'
            action-button-view-text='View'
            finalize-text='Exporting...'
          ></xrextras-capture-preview>

          <a-camera
            id='camera'
            position='0 7 7'
            cursor='fuse: false; rayOrigin: mouse;'
          ></a-camera>

          <xrextras-opaque-background remove='true'>
            <a-entity id='hider-walls'>
              <a-box
                scale='100 1 100'
                position='0 -1 42'
                xrextras-hider-material
              ></a-box>
              <a-box
                scale='100 100 1'
                position='0 50 75'
                xrextras-hider-material
              ></a-box>
              <a-box
                scale='100 1 100'
                position='0 100 50'
                xrextras-hider-material
              ></a-box>
              <a-box
                scale='1 100 100'
                position='-30 50 50'
                xrextras-hider-material
              ></a-box>
              <a-box
                scale='1 100 100'
                position='30 0 50'
                xrextras-hider-material
              ></a-box>

              <a-ring
                id='portalHiderRing'
                radius-inner='0.001'
                radius-outer='120'
                scale='1.3 1.3 0'
                position='0 7 -4'
                xrextras-hider-material
              ></a-ring>
            </a-entity>

            <a-entity id='portal-wall'>
              <a-circle
                radius='6'
                rotation='0 180 0'
                position='0 7.5 0'
                scale='0.8 0.8 0'
                xrextras-hider-material
              ></a-circle>
              <a-circle
                radius='6'
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
          intensity: 1;
          castShadow: true;
          shadowMapHeight: 1024;
          shadowMapWidth: 1024;
          shadowCameraTop: 20;
          shadowBias: 0;
          target: #PortalRim;'
            xrextras-attach='target: portalRim; offset: 45 0 45'
            position='3 90 3'
          ></a-entity>

          <a-light type='ambient' intensity='1'></a-light>

          <a-entity id='portal-contents'>
            <a-sky src='#skybox-img' rotation='0 0 0'></a-sky>
          </a-entity>

          <a-entity
            id='portalRim'
            gltf-model={`url(${portalSpin})`}
            reflections='type: static'
            shadow='receive: false'
            visible='false'
            scale='2 2 2'
          ></a-entity>
          <a-entity
            id='portalBox'
            gltf-model={`url(${portalBox})`}
            reflections='type: static'
            shadow='receive: false'
            position='0 0 -1'
            scale='1.2 1.2 1.2'
          ></a-entity>

          <a-entity
            id='portalVideo'
            auto-play-video="video: #portal-video"
            material="shader: chromakey; src: #portal-video; color: 0 0 0; blending: additive; side: front"
            geometry='primitive: plane; height: 1.4; width: 1.4;'
            position="0 7 -3.8"
            scale='0.001 0.001 0.001'
          ></a-entity>

          <a-circle
            id='portalShadow'
            radius='0.5'
            material='src: #blob-shadow-img; opacity: 0; roughness: 0; metalness: 0'
            position='0 0.01 -5'
            rotation='-90 0 0'
            scale='0.001 0.001 0.001'
          ></a-circle>
        </AFrameScene>
      </>
      <WrapperLayouts isFull>
        <motion.div
          initial={'closed'}
          animate={reward === 1 ? 'open' : 'closed'}
          transition={{ type: 'spring', damping: 25 }}
          variants={motionConfig}
        >
          <Popup
            title={'Get Rewarded'}
            isFloating={false}
            onPop={() => setReward(2)}
            content={<Rewarded />}
            open={true}
            isParentAnimate
          />
        </motion.div>
      </WrapperLayouts>
      {reward === 2 && (
        <div className='flex flex-col gap-y-[0px] absolute top-5 right-3 z-50 '>
          <div>
            <FacebookShareButton
              url={shareUrl()}
              className='Demo__some-network__share-button'
            >
               <img src={FBICON} className='w-[48px] h-[48px] rounded-full' />
            </FacebookShareButton>
          </div>
          <div>
            <WhatsappShareButton
              url={shareUrl()}
              className='Demo__some-network__share-button'
            >
              {/* <WhatsappIcon size={60} round /> */}
              <img src={WAICON} className='w-[48px] h-[48px] rounded-full' />
            </WhatsappShareButton>
          </div>
          <div className='flex items-center'>
            {isLinkCopied && (
              <div className='note  absolute bg-white/80 right-[4rem] mt-[0rem] px-4 py-3 rounded-full w-fit min-w-[120px]'>
                Link copied
              </div>
            )}
            <div
              onClick={() => {
                navigator.clipboard.writeText(shareUrl()).then(() => {
                  setIsLinkCopied(true)
                  setTimeout(() => setIsLinkCopied(false), 2000)
                })
              }}
            >
              <span >
                <img src={COPY} className='h-[48px] w-[48px]'/>
              </span>
            </div>
          </div>
          <div
            onClick={() => setReward(1)}
          >
            <span >
              <img src={GIFT} className='h-[48px] w-[48px]' />
            </span>
          </div>
        </div>
      )}
      <MediaPopup type='move' show={isPopupShow} />
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
        <p className='note'>
          Get a Financial Freedom Starter Plan <br /> and a S$20 e-voucher
        </p>
      </div>
      <div className='action-button flex gap-[16px]'>
        <Button
          title='Learn more'
          onClick={() =>
            window.open(
              `https://singlife.com/en/about-us/financial-freedom-index?utm_source=singlife_web&utm_medium=web&utm_campaign=dreamcube_20240725-20240924&utm_content=learn-more&utm_term=&ffdream=${dream_no}&entry_id=${entry_id}`,
              '_blank',
            )
          }
          type='secondaryWhite'
        />
        <Button
          onClick={() =>
            window.open(
              `https://singlife.com/en/form/dream-cube?utm_source=singlife_web&utm_medium=web&utm_campaign=dreamcube_20240725-20240924&utm_content=sign-up&utm_term=&ffdream=${dream_no}&entry_id=${entry_id}`,
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
