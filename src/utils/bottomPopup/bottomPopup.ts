import Swal from 'sweetalert2'
import './styles.css'

const bottomPopup = () => {
  return Swal.fire({
    customClass: {
      container: 'p-0',
      popup: 'rounded-b-none rounded-t-2xl',
      title: 'body-1 font-medium text-black pt-10',
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
    title: 'Your work has been saved',
    showConfirmButton: true,
    confirmButtonText: 'CREATE YOUR OWN DREAM',
    allowOutsideClick: false,
  })
}

export { bottomPopup }
