import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import API from "../../api/api";
import { type Post } from "../../types/post";

interface Props {
  post: Post;
  refreshPosts: () => void;
}

const CommentBox = ({ post, refreshPosts }: Props) => {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!comment) return;

    await API.post(`/posts/${post._id}/comment`, {
      text: comment,
    });

    setComment("");
    refreshPosts();
  };

  return (
    <Box mt={2}>
      {post.comments.map((c, i) => (
        <Typography key={i} variant="body2">
          <b>{c.username}:</b> {c.text}
        </Typography>
      ))}

      <TextField
        size="small"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      />

      <Button size="small" onClick={handleComment}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentBox;
