export interface User {
    id: string;
    username: string;
    password: string;
}

export interface Author {
    id: string;
    avatar: string;
    username: string;
}

export interface Post {
    id: string;
    title: string;
    author: Author;
    description: string;
    cover: string;
    created_at: string;
    avatar: string;
    comments: Comment[];
    highlighted: boolean
}

export interface Comment {
    id: string;
    content: string;
    postId: string;
    authorId: string;
}