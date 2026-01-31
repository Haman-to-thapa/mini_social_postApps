import mongoose, {Schema, Document, Types} from "mongoose";

interface ILike {
  userId: Types.ObjectId;
  username: string;
}

interface IComment {
  userId: Types.ObjectId;
  username: string;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  text?: string;
  image?: string;
  author: {
    userId: Types.ObjectId;
    username: string;
  };
  likes: ILike[];
  comments: IComment[];
  createdAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    author: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        username: String,
      },
    ],
    comments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        username: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
