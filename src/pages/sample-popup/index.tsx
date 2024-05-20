import {useEffect} from "react";
import {bottomPopup} from "@utils/bottomPopup/bottomPopup.ts";

const Index = () => {
    useEffect(() => {
        console.log("triger")
        bottomPopup({title:"anjir"})
    }, []);
    return (
        <div>
            samples
        </div>
    );
};

export default Index;

// import Button from '@components/atom/button'
// import Popup from '@components/molecules/popup'
// import {useEffect, useState} from 'react'
// import {bottomPopup} from "@utils/bottomPopup/bottomPopup.ts";
// import WrapperLayouts from "../../layouts/wrapper/wrapper.layouts.tsx";
// import {motion} from "framer-motion";
//
// const motionConfig = {
//     closed: {
//         position: 'absolute',
//         bottom: 200,
//         width: '100%'
//     },
//     //open visible
//     open: {
//         position: 'absolute',
//         bottom: 100,
//         width: '100%'
//     },
// }
//
// const Index = () => {
//   const [open, setopen] = useState(true)
//     useEffect(() => {
//         bottomPopup({
//             title: 'Walk into the portal to experience your dream',
//             useButton: false,
//             floating: true,
//             dark: false,
//         })
//     }, []);
//   return (
//       <WrapperLayouts isFull>
//           <motion.div
//               initial={'closed'}
//               animate={open ? "open" : "closed"}
//               transition={{type: 'spring', damping: 25}}
//               variants={motionConfig}
//
//           >
//               <Popup
//                   isParentAnimate
//                   title={'Get Rewarded'}
//                   isFloating={false}
//                   onPop={() => setopen(!open)}
//                   content={<Rewarded/>}
//                   open={true}
//               />
//           </motion.div>
//       </WrapperLayouts>
//   )
// }
//
// // const Before = () => {
// //   return (
// //     <div>
// //       <div className='caption mb-5'>
// //         <p className='body-1'>We'll need some permissions</p>
// //       </div>
// //       <div className='caption mb-5'>
// //         <img className='m-auto mb-5' src={Camera} alt='' />
// //         <p className='note'>
// //           AR requires access <br /> to your camera
// //         </p>
// //       </div>
// //       <div className='caption mb-5'>
// //         <img className='m-auto mb-5' src={Rotate} alt='' />
// //         <p className='note'>
// //           AR requires access <br />
// //           to your device motion sensors
// //         </p>
// //       </div>
// //       <div className='action-button flex gap-5'>
// //         <Button title='Enable access' type='primary' />
// //       </div>
// //     </div>
// //   )
// // }
// const Rewarded = () => {
//     return (
//         <div>
//             <div className='icon flex justify-center mb-4'>
//                 <img src={''} alt=''/>
//             </div>
//             <div className='caption mb-8'>
//                 <p className='note'>Get $20 voucher when you sign up</p>
//             </div>
//             <div className='action-button flex gap-5'>
//                 <Button title='Learn more' type='secondaryWhite'/>
//                 <Button title='Sign up' type='primary'/>
//             </div>
//         </div>
//     )
// }
// //
// // const Captured = () => {
// //   return (
// //     <div>
// //       <div className='caption mb-8'>
// //         <p className='body-1'>
// //           Download the image and share this withbr <br /> your friends!
// //         </p>
// //         <img
// //           className='my-5 mx-auto'
// //           style={{
// //             objectFit: 'cover',
// //             height: 278,
// //             width: 156,
// //             borderRadius: 16,
// //           }}
// //           src='https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// //           alt=''
// //         />
// //       </div>
// //       <div className='action-button flex gap-5'>
// //         <Button title='Retake' type='secondaryWhite' />
// //         <Button title='Download' type='primary' />
// //       </div>
// //     </div>
// //   )
// // }
//
// export default Index
