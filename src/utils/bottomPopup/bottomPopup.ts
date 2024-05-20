import Swal from 'sweetalert2'
import './styles.css'

type Props = {
  title?: string
  desc?: string
  useButton?: boolean
  floating?: boolean
  dark?: boolean
  timer?: number
}
const bottomPopup = ({
  title = '',
  desc = 'Create your own dream',
  useButton = true,
  floating = false,
  dark = true,
                       timer
}: Props) => {
  return Swal.fire({
    customClass: {
      container: `${floating ? 'p-5' : 'p-0'}`,
      popup: `!shadow-md rounded-b-none !border-0  rounded-t-[32px] ${dark ? 'bg-black/50' : 'bg-white/60'} ${floating ? 'bottom-14  !rounded-[5rem]' : ''}`,
      title: `${dark ? 'note font-medium text-white' : 'text-black note font-light'} ${floating ? 'pt-3 pb-1 mb-[-.75rem]' : 'pt-10'}`,
      actions: 'w-full px-5',
      confirmButton: '!outline-none !shadow-none w-full rounded-full !bg-singlife-red-800',
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
    backdrop: false,
    timer: timer && timer
  })
}

export { bottomPopup }
