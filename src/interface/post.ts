export interface IComment {
    user: string;
    content: string;
    createdAt: Date;
}

export interface IPost {
    _id?: string;
    title: string;
    content: string;
    tags: string[];
    category: string;
    author: string;
    likes: number;
    views: number;
    comments: IComment[];
    images: string[];
    pinned: boolean;
    status: "public" | "hidden" | "deleted";
    createdAt?: Date;
    updatedAt?: Date;
}
