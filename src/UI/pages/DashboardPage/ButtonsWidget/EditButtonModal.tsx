import Box from "@mui/material/Box";
import { FC } from "react";
import TextEditor from "../../../components/TextEditor";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ImageAttach } from "../../../components/ImageAttach.tsx";
import { useForm, Controller } from "react-hook-form";
import { modalStyle } from "./styles.ts";
import { useTextEditor } from "../../../components/TextEditor/useTextEditor.ts";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store.ts";
import { editButton } from "../../../../features/buttons/buttonSlice.ts";

interface IEditButtonModal {
  buttonId: number;
}

interface FormData {
  buttonText: string;
  buttonUrl: string;
  message: string;
  image: File | null;
}

export const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <Typography variant={"caption"} style={{ color: "red" }}>
    {message}
  </Typography>
);

export const EditButtonModal: FC<IEditButtonModal> = ({ buttonId }) => {
  const dispatch = useDispatch<AppDispatch>();
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
    const formData = new FormData();
    formData.append("id", String(buttonId));
    formData.append("button_name", data.buttonText);
    formData.append("text", clearFromPTags(data.message));
    formData.append("button_url", data.buttonUrl);
    if (data.image) {
      formData.append("image", data.image);
    }

    dispatch(editButton(formData)).then((result) => {
      if (editButton.fulfilled.match(result)) {
        console.log("Button updated successfully");
        // Здесь можно закрыть модальное окно или выполнить другие действия после успешного обновления
      } else {
        console.log("Failed to update button");
      }
    });
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
        rules={{
          validate: {
            lessThan5MB: (file) =>
              !file ||
              file.size <= 5 * 1024 * 1024 || // 5 MB
              "Размер файла не должен превышать 5MB",
          },
        }}
        render={() => <ImageAttach onFileChange={handleFileChange} />}
      />
      {errors.image && <ErrorMessage message={errors.image.message} />}
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
        <ErrorMessage message={errors.buttonText.message} />
      )}
      <Controller
        name="buttonUrl"
        control={control}
        defaultValue=""
        rules={{ required: "URL кнопки обязателен для заполнения" }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            placeholder="URL кнопки"
            variant="outlined"
            style={{ width: "100%" }}
            error={!!errors.buttonUrl}
          />
        )}
      />
      {errors.buttonUrl && <ErrorMessage message={errors.buttonUrl.message} />}
      <Box
        style={{
          height: "200px",
        }}
      >
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{
            required: "Сообщение обязательно для заполнения",
          }}
          render={({ field }) => (
            <TextEditor
              loading={false}
              currentValue={field.value}
              placeholder="Сообщение которое будет отправлено, когда пользователь нажмет на кнопку"
              style={{ height: "calc(100% - 50px)" }}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </Box>
      {errors.message && <ErrorMessage message={errors.message.message} />}
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
