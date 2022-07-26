import { getLists, paymentHandler } from "@utils/crudUtil";
import { fmt, fmtEn, parse } from "@utils/dateUtils";
import { Booking, Course, Lesson, PreBooking } from "../types"

export const getAllBookings = async (): Promise<Booking[]> => {
    let bookings: Booking[] = []
    try {
        const bookingsProto = (await getLists<Booking[]>('bookings'))
        console.log(bookingsProto);

        // bookings = bookingsProto.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)) // sort booking by the latest date
    } catch (error) {
        throw error
    }
    return bookings
}
export const postBookings = async (customer_email: string, course: Course, cancel_url: string) => {
    const { title, lessonsCollection, imagesCollection, price } = course
    const booking: Booking = {
        totalPrice: course.price,
        course,
    }
    localStorage.setItem('bookingItem', JSON.stringify(booking))
    try {
        await paymentHandler({
            line_items: [
                {
                    name: `${title}`,
                    images: [imagesCollection.items[0].url],
                    amount: price,
                    quantity: 1,
                }
            ],
            customer_email,
            success_url: '/bookings/result',
            cancel_url,
        })
    } catch (error) {
        return alert(error)
    }
    return
}