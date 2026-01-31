import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import API from "../../api/api";
import { type Post } from "../../types/post";
import CommentBox from "./CommentBox";

interface Props {
  post: Post;
  refreshPosts: () => void;
}

const PostCard = ({ post, refreshPosts }: Props) => {
  const handleLike = async () => {
    await API.put(`/posts/${post._id}/like`);
    refreshPosts();
  };

  console.log("POST IMAGE URL 👉", post.image);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography fontWeight="bold">
          {post.author.username}
        </Typography>

        {post.text && (
          <Typography sx={{ mt: 1 }}>
            {post.text}
          </Typography>
        )}

        {post.image && (
          <Box
            component="img"
            src={
              post.image?.startsWith("http")
                ? post.image
                : `https://mini-social-postapps.onrender.com${post.image}`
            }

            alt="post"
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 1,
              mt: 1,
            }}
          />
        )}

        <Box mt={1}>
          <Button size="small" onClick={handleLike}>
            ❤️ {post.likes.length}
          </Button>
        </Box>

        <CommentBox post={post} refreshPosts={refreshPosts} />
      </CardContent>
    </Card>
  );
};

export default PostCard;
