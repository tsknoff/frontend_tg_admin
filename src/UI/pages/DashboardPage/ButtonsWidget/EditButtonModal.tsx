import Box from "@mui/material/Box";
import { FC } from "react";
import TextEditor from "../../../components/TextEditor";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ImageAttach } from "../../../components/ImageAttach.tsx";
import { useForm, Controller } from "react-hook-form";
import { modalStyle } from "./styles.ts";
import { useTextEditor } from "../../../components/TextEditor/useTextEditor.ts";

interface IEditButtonModal {
  buttonId: number;
}

interface FormData {
  buttonText: string;
  message: string;
  image: File | null;
}

export const EditButtonModal: FC<IEditButtonModal> = ({ buttonId }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { clearFromPTags } = useTextEditor("");

  const handleFileChange = (file: File | null) => {
    setValue("image", file);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Здесь можно добавить логику для отправки данных на сервер
  };

  return (
    <Box
      sx={{ ...modalStyle }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="image"
        control={control}
        defaultValue={null}
        render={() => <ImageAttach onFileChange={handleFileChange} />}
      />
      <Controller
        name="buttonText"
        control={control}
        defaultValue=""
        rules={{ required: "Текст кнопки обязателен для заполнения" }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            placeholder="Текст кнопки"
            variant="outlined"
            style={{ width: "100%" }}
            error={!!errors.buttonText}
          />
        )}
      />
      {errors.buttonText && (
        <p style={{ color: "red" }}>{errors.buttonText.message}</p>
      )}
      <Box
        style={{
          height: "200px",
        }}
      >
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{ required: "Сообщение обязательно для заполнения" }}
          render={({ field }) => (
            // @todo: БАГ: При первом вводе текста в TextEditor он печатается задом наперед!
            <TextEditor
              loading={false}
              currentValue={field.value}
              placeholder="Сообщение которое будет отправлено, когда пользователь нажмет на кнопку"
              style={{ height: "calc(100% - 50px)" }}
              onChange={(value) => {
                if (value == "<p><br></p>") value = "";

                field.onChange(clearFromPTags(value));
              }}
            />
          )}
        />
      </Box>
      {errors.message && (
        <p style={{ color: "red" }}>{errors.message.message}</p>
      )}
      <Button
        disabled={Object.keys(errors).length > 0}
        variant="contained"
        color="primary"
        type="submit"
      >
        Сохранить
      </Button>
      <p
        style={{
          position: "absolute",
          bottom: "5px",
          right: "16px",
          margin: "0",
          padding: "0",
          fontSize: "10px",
          opacity: "0.5",
        }}
      >
        id: {buttonId}
      </p>
    </Box>
  );
};
