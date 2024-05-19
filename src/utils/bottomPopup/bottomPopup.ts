import Swal from 'sweetalert2'
import './styles.css'

type Props = {
  title?: string
  desc?: string
  useButton?: boolean
  floating?: boolean
  dark?: boolean
}
const bottomPopup = ({
  title = '',
  desc = 'Create your own dream',
  useButton = true,
  floating = false,
  dark = true,
}: Props) => {
  return Swal.fire({
    customClass: {
      container: `${floating ? 'p-3' : 'p-0'}`,
      popup: `rounded-b-none rounded-t-[32px] ${dark ? 'bg-black/50' : 'bg-white/60'} ${floating ? 'bottom-2  !rounded-[5rem]' : ''}`,
      title: `${dark ? 'body-1 font-medium text-white ' : 'text-black note font-light'} ${floating ? 'pt-5' : 'pt-10'}`,
      actions: 'w-full px-5',
      confirmButton: 'w-full rounded-full bg-singlife-red-800',
    },
    showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
    },
    position: 'bottom',
    title: title,
    showConfirmButton: useButton,
    confirmButtonText: desc,
    allowOutsideClick: false,
    backdrop:false
  })
}

export { bottomPopup }
