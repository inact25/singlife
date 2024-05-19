import Swal from 'sweetalert2'
import './styles.css'

type Props = {
  title?: string
  desc?: string
  useButton?: boolean
}
const bottomPopup = ({
  title = '',
  desc = 'Create your own dream',
  useButton = true,
}: Props) => {
  return Swal.fire({
    customClass: {
      container: 'p-0',
      popup: 'rounded-b-none rounded-t-[32px] bg-black/50',
      title: 'body-1 font-medium text-white pt-10',
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
  })
}

export { bottomPopup }
