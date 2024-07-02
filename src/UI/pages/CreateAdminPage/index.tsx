import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { apiClient } from "../../../features/apiClient.ts";

export const CreateAdminPage: React.FC = () => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await apiClient.post("/createAdmin.php", {
        id,
        pass,
      });

      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);
        setSnackbarOpen(true);
      } else {
        setError("Ошибка при создании администратора");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setError("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          <Typography variant="h5">Создать администратора</Typography>
          <Box component="form" onSubmit={handleCreateAdmin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID администратора"
              name="id"
              autoComplete="id"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Пароль"
              type="password"
              id="pass"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : "Создать"}
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={successMessage ? "success" : "error"}
          >
            {successMessage || error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};
