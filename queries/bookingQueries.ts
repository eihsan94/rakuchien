import { Booking, Lesson, PreBooking } from "../types"
import { getLists, paymentHandler, postSingle } from "../utils/crudUtil"
import { fmt, parse } from "../utils/dateUtils"

export const getAllBookings = async (): Promise<Booking[]> => {
    return await getLists<Booking[]>('bookings')
}
export const postBookings = async (customer_email: string, lesson: Lesson, preBooking: PreBooking) => {
    const { sys, name, image, url, teacher } = lesson
    const { dates: preBookingDates } = preBooking
    try {
        await paymentHandler({
            line_items: preBookingDates.map((d) => ({
                name: `${lesson.name} - ${fmt(parse(d), "yyyy年MM月dd日 (eee) HH:mm")}`,
                images: [lesson.image.url],
                amount: lesson.price,
                quantity: 1,
            })),
            customer_email,
            success_url: '/lessons/result',
            cancel_url: '/lessons',
            client_reference_id: 2,
        })
    } catch (error) {
        return alert(error)
    }
    return
}