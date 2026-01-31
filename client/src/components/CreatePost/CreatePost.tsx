import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import API from "../../api/api";

interface Props {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: Props) => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCreate = async () => {

    if (!text && !imageFile) return;

    const formData = new FormData();
    formData.append("text", text);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await API.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setText("");
    setImageFile(null);
    onPostCreated();
  };

  return (
    <Box mb={2}>
      <TextField
        fullWidth
        multiline
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImageFile(e.target.files?.[0] || null)
        }
        style={{ marginTop: "8px" }}
      />

      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleCreate}
      >
        Post
      </Button>
    </Box>
  );
};

export default CreatePost;
