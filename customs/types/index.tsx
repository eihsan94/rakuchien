export interface Lesson {
    sys: {
        id: string;
    };
    name: string;
    description: string;
    duration: string;
    price: number;
    teacher: Teacher;
    url: string;
    image: {
        url: string;
    };
    categoriesCollection: {
        items: Category[];
    };
    schedulesCollection: {
        items: Schedule[];
    }
}

export interface Schedule {
    sys: {
        id: string;
    };
    name: string
    date: string
}

export interface Teacher {
    sys: {
        id: string;
    };
    name: string;
    image: {
        url: string;
    };
}

export interface Category {
    sys: {
        id: string;
    };
    name: string;
    slug: string;
}

export interface Booking {
    pk?: string
    date: string
    totalPrice: number
    lesson: {
        id: string
        name: string
        image: string
        url: string
        teacher: {
            id: string
            name: string
            image: string
        }
    }
}

export interface PreBooking {
    dates: string[],
    totalPrice: number
}