import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { type Post } from "../types/post";
import PostCard from "../components/Feed/PostCard";
import CreatePost from "../components/CreatePost/CreatePost";

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box maxWidth={600} mx="auto" p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Social Feed</Typography>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <CreatePost onPostCreated={fetchPosts} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refreshPosts={fetchPosts}
        />
      ))}
    </Box>
  );
};

export default FeedPage;
