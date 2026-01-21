import Swal from 'sweetalert2'

interface NotificationOptions {
    message: string
}

export const notifySuccess = async ({ message }: NotificationOptions) => await Swal.fire({
    icon: 'success',
    title: message,
})

export const notifyError = async ({ message }: NotificationOptions) => await Swal.fire({
    icon: 'error',
    title: message,
})
