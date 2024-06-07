import Box from "@mui/material/Box";
import { FC, useState } from "react";
import TextEditor from "../../../components/TextEditor";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ImageAttach } from "../../../components/ImageAttach.tsx";

interface IEditButtonModal {
  buttonId: number;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "fit-content",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column" as const,
  gap: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

export const EditButtonModal: FC<IEditButtonModal> = ({ buttonId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    console.log(selectedFile);
    setSelectedFile(file);
  };

  return (
    <Box sx={{ ...style }}>
      <h2 id="parent-modal-title">Button {buttonId}</h2>
      <ImageAttach onFileChange={handleFileChange} />
      <TextField
        id="outlined-basic"
        placeholder={"Текст кнопки"}
        variant="outlined"
        style={{ width: "100%" }}
      />
      <Box
        style={{
          height: "200px",
        }}
      >
        <TextEditor
          loading={false}
          currentValue={""}
          placeholder="Сообщение которое будет отправлено, когда пользователь нажмет на кнопку"
          style={{ height: "calc(100% - 50px)" }}
          onChange={() => {}}
        />
      </Box>
      <Button variant="contained" color="primary">
        Сохранить
      </Button>
    </Box>
  );
};
