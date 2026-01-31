import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Post must contain text or image" });
    }

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.create({
      text,
      image,
      author: {
        userId: user._id,
        username: user.username,
      },
      likes: [],
      comments: [],
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};




export const getFeed = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.some(
      (like) => like.userId.toString() === userId?.toString()
    );

    if (alreadyLiked) {
      return res.status(400).json({ message: "Post already liked" });
    }

    const user = await User.findById(userId);

    post.likes.push({
      userId: user!._id,
      username: user!.username,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to like post" });
  }
};


export const commentPost = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(postId);
    const user = await User.findById(req.user?.userId);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or user not found" });
    }

    post.comments.push({
      userId: user._id,
      username: user.username,
      text,
      createdAt: new Date(),
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to comment" });
  }
};
