import Box from "@mui/material/Box";
import { FC, useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor";
import { CircularProgress, TextField } from "@mui/material";
import { ImageAttach } from "../../components/ImageAttach.tsx";
import { useForm, Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "../../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { useTextEditor } from "../../components/TextEditor/useTextEditor.ts";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { fetchGroups } from "../../../features/groups/groupsSlice.ts";
import { sendMessage } from "../../../features/messages/messagesSlice.ts";

interface FormData {
  group: string;
  buttonText: string;
  buttonUrl: string;
  message: string;
  image: File | null;
}

export const MailFormWidget: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const { clearFromPTags } = useTextEditor("");
  const { groups } = useSelector((state: RootState) => state.groups);
  const [loading, setLoading] = useState(true);
  const { status } = useSelector((state: RootState) => state.messages);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(fetchGroups()).then(() => setLoading(false));
  }, [dispatch]);

  const handleFileChange = (file: File | null) => {
    setValue("image", file);
  };

  const validateButtonFields = (value: string, allValues: FormData) => {
    const { buttonText, buttonUrl } = allValues;
    if (value && !buttonUrl) {
      return "URL кнопки обязателен для заполнения, если указано название кнопки";
    }
    if (buttonUrl && !buttonText) {
      return "Название кнопки обязательно для заполнения, если указан URL кнопки";
    }
    return true;
  };

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("group_id", data.group);
    formData.append("button_name", data.buttonText);
    formData.append("text", clearFromPTags(data.message));
    formData.append("button_url", data.buttonUrl);
    if (data.image) {
      formData.append("image", data.image);
    }

    dispatch(sendMessage(formData)).then((result) => {
      if (sendMessage.fulfilled.match(result)) {
        setSnackbarMessage("Сообщение успешно отправлено");
        setSnackbarOpen(true);
        reset();
      } else {
        setSnackbarMessage("Ошибка при отправке сообщения");
        setSnackbarOpen(true);
      }
    });
  };

  useEffect(() => {
    if (!errors.buttonText && !errors.buttonUrl) {
      setValue("buttonText", getValues("buttonText"));
      setValue("buttonUrl", getValues("buttonUrl"));
    }
  }, [errors.buttonText, errors.buttonUrl, setValue, getValues]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper
      sx={{ maxWidth: 500, margin: "auto", alignSelf: "flex-start", zIndex: 0 }}
    >
      {loading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "500px",
          }}
        >
          <Typography variant="h6">Сообщение участникам</Typography>
          <Box style={{ padding: "10px", height: "200px" }}>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: "Сообщение обязательно для заполнения" }}
              render={({ field }) => (
                <TextEditor
                  loading={false}
                  currentValue={field.value}
                  placeholder="Сообщение участникам группы"
                  style={{ height: "calc(100% - 50px)" }}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </Box>
          {errors.message && <ErrorMessage message={errors.message.message} />}
          <Controller
            name="group"
            control={control}
            defaultValue=""
            // rules={{ required: "Выбор группы обязателен для заполнения" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                variant="outlined"
                style={{ width: "100%" }}
                SelectProps={{ native: true }}
                error={!!errors.group}
              >
                <option value="" disabled>
                  Выберите группу
                </option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </TextField>
            )}
          />
          {errors.group && <ErrorMessage message={errors.group.message} />}
          <Controller
            name="buttonText"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => validateButtonFields(value, getValues()),
            }}
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
          <Controller
            name="buttonUrl"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => validateButtonFields(value, getValues()),
            }}
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
          {(errors.buttonText || errors.buttonUrl) && (
            <ErrorMessage message="Заполните оба поля или оба оставьте пустыми" />
          )}
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            rules={{
              validate: {
                lessThan5MB: (file) =>
                  !file ||
                  file.size <= 5 * 1024 * 1024 ||
                  "Размер файла не должен превышать 5MB",
              },
            }}
            render={() => (
              <ImageAttach imageSrc="" onFileChange={handleFileChange} />
            )}
          />
          {errors.image && <ErrorMessage message={errors.image.message} />}
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar>
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <Grid xs></Grid>
                <Grid item>
                  <Tooltip title="Отправить сообщение">
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid || loading}
                    >
                      {status === "loading" ? (
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                          }}
                        >
                          <CircularProgress size={24} />
                        </Box>
                      ) : (
                        "Отправить"
                      )}
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("успешно") ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <Typography variant={"caption"} style={{ color: "red" }}>
    {message}
  </Typography>
);
