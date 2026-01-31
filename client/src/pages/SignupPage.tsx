import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      margin="100px auto"
    >
      <Typography variant="h5" textAlign="center">
        Sign Up
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button variant="contained" onClick={handleSignup}>
        Create Account
      </Button>

      <Button onClick={() => navigate("/login")}>
        Already have an account? Login
      </Button>
    </Box>
  );
};

export default SignupPage;
