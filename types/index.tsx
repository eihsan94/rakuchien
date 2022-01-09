export interface Lesson {
    sys: {
        id: string;
    };
    name: string;
    description: string;
    duration: string;
    teacher: Teacher;
    image: {
        url: string;
    };
    categoriesCollection: {
        items: Category[];
    };
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

