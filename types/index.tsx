export interface Lesson {
    sys: {
        id: string;
    };
    name: string;
    description: string;
    duration: string;
    price: number;
    teacher: Teacher;
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

