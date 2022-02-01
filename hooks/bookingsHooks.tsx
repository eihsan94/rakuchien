import useSWR from 'swr'
import axios, { AxiosRequestConfig } from 'axios';
import { Booking } from '../types';
import { getSession } from 'next-auth/react';
import { fetcherUtil } from '../utils/swrUtil';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings`;

const useBookingHooks = (reqConfig?: AxiosRequestConfig) => {
    const fetcher = async (...args: any) => fetcherUtil<Booking[]>(axios.get<Booking[]>(args, await appendAuth(reqConfig)))
    const { data, error } = useSWR(baseURL, fetcher)
    return {
        bookings:
            data?.data
                // sort booking by the latest date
                .sort((a: Booking, b: Booking) => (new Date(b.date) as any) - (new Date(a.date) as any)),
        error,
        loading: !data && !error
    }
}



const useMutateBooking = (reqConfig?: AxiosRequestConfig, id: string) => {
    const mutator = async (...args: any) => mutatorUtil<Booking>(axios.put<Booking>(args, await appendAuth(reqConfig)))

    const { data, error } = useSWR(`${baseURL}/cancel/`, mutator)

    return {
        bookings:
            data?.data
                // sort booking by the latest date
                .sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)),
        error,
        loading: !data && !error
    }
}


const appendAuth = async (reqConfig?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
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
    useBookingHooks,
    useMutateBooking,
}
function mutatorUtil<T>(arg0: Promise<import("axios").AxiosResponse<Booking, any>>) {
    throw new Error('Function not implemented.');
}

