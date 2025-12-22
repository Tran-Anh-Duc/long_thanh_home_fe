import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'loading'

/**
 * 🔒 STATE DÙNG CHUNG TOÀN APP
 */
const show = ref(false)
const message = ref('')
const type = ref<ToastType>('info')

let timer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
    const open = (
        msg: string,
        toastType: ToastType = 'info',
        duration = 2000
    ) => {
        if (!msg) return

        // clear toast cũ
        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        message.value = msg
        type.value = toastType
        show.value = true

        // auto close nếu không phải loading
        if (toastType !== 'loading') {
            timer = setTimeout(() => {
                show.value = false
            }, duration)
        }
    }

    const close = () => {
        show.value = false
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    return {
        show,
        message,
        type,
        open,
        close,
    }
}
