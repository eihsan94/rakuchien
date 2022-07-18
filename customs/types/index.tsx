export interface Lesson {
    sys: {
        id: string;
    };
    name: string;
    description: {
        json: any
    }
    image: {
        url: string;
    };
    teacher: Teacher;
    duration: string;
    schedulesCollection: {
        items: Schedule[];
    }
    url: string;
    startDate: string;
    endDate: string;
}
export interface Course {
    sys: {
        id: string;
    };
    imagesCollection: {
        items: {
            url: string
        }[]
    }
    title: string;
    description: {
        json: any
    }

    requirements: {
        json: any
    }

    categories: string[]
    lessonsCollection: {
        items: Lesson[];
    };
    price: number;
    teacher: Teacher;
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
        description: string
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