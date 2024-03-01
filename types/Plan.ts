export type Plan = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string;
    description: string;
    dateAlternatives: Date[];
};