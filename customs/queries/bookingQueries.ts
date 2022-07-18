import { getLists, paymentHandler } from "@utils/crudUtil";
import { fmt, parse } from "@utils/dateUtils";
import { Booking, Lesson, PreBooking } from "../types"

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
export const postBookings = async (customer_email: string, lesson: Lesson, preBooking: PreBooking) => {
    const { sys, name, image, description, url, teacher } = lesson
    const { dates: preBookingDates } = preBooking
    // const bookings: Booking[] = preBookingDates.map(date => ({
    //     date,
    //     // totalPrice: lesson.price,
    //     lesson: {
    //         id: sys.id,
    //         name,
    //         description,
    //         image: image.url,
    //         url,
    //         teacher: {
    //             id: teacher.sys.id,
    //             name: teacher.name,
    //             image: teacher.image.url,
    //         }
    //     }
    // }))
    // localStorage.setItem('bookingItems', JSON.stringify(bookings))
    // try {
    //     await paymentHandler({
    //         line_items: preBookingDates.map((d) => ({
    //             name: `${lesson.name} - ${fmt(parse(d), "yyyy年MM月dd日 (eee) HH:mm")}`,
    //             images: [lesson.image.url],
    //             amount: lesson.price,
    //             quantity: 1,
    //         })),
    //         customer_email,
    //         success_url: '/bookings/result',
    //         cancel_url: '/lessons',
    //     })
    // } catch (error) {
    //     return alert(error)
    // }
    // return
}