// src/UI/pages/LoginPage.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://nse-work.ru/test/ssb/api/login.php",
        {
          username,
          password,
        },
      );

      if (response.data.status === "success") {
        // Здесь вы можете перенаправить пользователя на другую страницу или выполнить другие действия после успешного входа
        // alert("Вход выполнен успешно!");
        navigate("/");
        // Кладем в localStorage токен, чтобы сохранить авторизацию
        localStorage.setItem("ssb_user", JSON.stringify(response.data.data));
        // Сделаем куку, чтобы сохранить авторизацию
        document.cookie = `ssb_user=${JSON.stringify(response.data.data)}`;
      } else {
        setError("Неверное имя пользователя или пароль");
      }
    } catch (error) {
      setError("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          background: "#fff",
          marginBottom: "5vh",
          padding: "20px",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Войдите в систему</Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Войти"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
