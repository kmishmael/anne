export interface Post{
    _id?: number;
    title: string,
    content: string,
    author: string,
    date: Date,
    category: string
}

export interface Num{
    num: number
}