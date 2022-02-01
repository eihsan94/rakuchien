export const fetcherUtil = async<T>(fn: any) => {
    return fn
        .then((data: T) => data)
        .catch((err: any) => {
            const { status, data } = err.response
            const { message } = data
            const error = { status, message }
            throw error
        })
}

export const mutateUtil = async<T>(fn: any) => {
    return fn
        .then((data: T) => data)
        .catch((err: any) => {
            const { status, data } = err.response
            const { message } = data
            const error = { status, message }
            throw error
        })
}