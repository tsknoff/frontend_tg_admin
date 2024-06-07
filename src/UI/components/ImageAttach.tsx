import React, { useState, FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface IImageAttachProps {
  onFileChange: (file: File | null) => void;
}

export const ImageAttach: FC<IImageAttachProps> = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileChange(file);

    // Создание предварительного просмотра изображения
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target || !e.target.result) return;

        setImagePreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setImagePreview("");
    onFileChange(null);

    const fileInput = document.getElementById(
      "raised-button-file",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Box
      style={{
        padding: "10px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        {!selectedFile && (
          <Button
            variant="outlined"
            component="span"
            endIcon={<AttachFileIcon />}
            style={{
              color: "darkslategray",
            }}
          >
            Прикрепить изображение
          </Button>
        )}
      </label>
      {imagePreview && (
        <Paper
          style={{
            position: "relative",
            padding: "10px",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "200px",
            }}
          />
          <IconButton
            onClick={handleClearImage}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: "50%",
              animation: "none",
              ":hover": {
                backgroundColor: "white",
              },
            }}
          >
            <ClearIcon />
          </IconButton>
        </Paper>
      )}
    </Box>
  );
};
