export interface Like {
  userId: string;
  username: string;
}

export interface Comment {
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  text?: string;
  image?: string;
  author: {
    userId: string;
    username: string;
  };
  likes: Like[];
  comments: Comment[];
  createdAt: string;
}
