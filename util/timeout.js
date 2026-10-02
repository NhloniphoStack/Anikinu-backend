

export const controller = new AbortController()

export const timeout = setTimeout(() => {
    controller.abort()
}, 5000)