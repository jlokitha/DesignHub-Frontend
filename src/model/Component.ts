import Tag from "./Tag.ts";

class Component {
    id?: number;
    title: string;
    code: string;
    description: string;
    userId: number;
    tags: Tag[];
    createdAt?: string;
    image?: File;
    username?: string;

    constructor(id: number, title: string, code: string, tags: [], userId: number, description: string, createdAt?: string, image?: File, username?: string) {
        this.id = id;
        this.title = title;
        this.code = code;
        this.tags = tags;
        this.description = description;
        this.userId = userId;
        this.createdAt = createdAt;
        this.image = image;
        this.username = username;
    }
}

export default Component;
