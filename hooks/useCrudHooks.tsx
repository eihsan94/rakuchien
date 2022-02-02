import useSWR from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { fetcherUtil } from '../utils/swrUtil';
import { handleHttpError } from '../utils/errorHandlerUtil';
import useErrorToaster from '../components/erroHandler/errorToaster';
import { useCallback, useState } from 'react';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`;

/**
 * @apiUrl THE PREFIX FOR SPECIFIC ENDPOINT
 * @fetcher THE GET LISTS API REQ
 * @errorToast THE ERROR TOASTER HOOKS THAT WILL TRIGGER WHEN HTTP ERROR
 * @makeServerReq THE SERVER REQ WRAPPER FOR FORMATTING THE RESPONSE AND ERROR HANDLING CORRECTLY
 * 
 */
const useCrudHooks = (prefix: string, reqConfig?: AxiosRequestConfig) => {
    const apiUrl = `${baseURL}/${prefix}`
    const fetcher = async (...args: any) => fetcherUtil(axios.get(args, await appendAuth(reqConfig)))
    const { errorToast } = useErrorToaster()
    const [reqLoading, setReqLoading] = useState(false)
    const { data, error, mutate: mutateData, ...swrProps } = useSWR(apiUrl, fetcher) // useSWR HOOKS INIT
    // SERVER REQ WRAPPER
    const makeServerReq = async (fn: Promise<AxiosResponse<any, any>>) => {
        setReqLoading(true)
        try {
            await fn
        } catch (err) {
            const error = handleHttpError(err) // GEN ERROR
            errorToast(error) // SHOW ERROR TOASTER
            await mutateData(() => data, false) // ROLLBACK OPTIMISTIC UPDATE
        }
        setReqLoading(false)
    }
    // DELETE HOOKS
    const deleteData = useCallback(async (pk: string | undefined) => {
        // Optimistic DELETE UPDATE
        await mutateData((res: any) => {
            const { data: dataState } = res
            return {
                ...data,
                data: [...dataState.filter((b: any) => b.pk !== pk)]
            }
        }, false)
        // SERVER DELETE
        await makeServerReq(axios.delete(`${apiUrl}/${pk}`, await appendAuth(reqConfig)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return {
        data: data?.data,
        error,
        loading: !data && !error,
        reqLoading,
        deleteData,
        ...swrProps,
    }
}

export const appendAuth = async (reqConfig?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const session = await getSession()
    return session
        ? {
            ...reqConfig,
            headers: {
                Current_User_Email: session!.user?.email as string,
            }
        }
        : {
            ...reqConfig
        }
}

export {
    useCrudHooks,
}
