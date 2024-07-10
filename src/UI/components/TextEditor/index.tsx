// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CSSProperties, FC, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { use } from "msw/lib/core/utils/internal/requestHandlerUtils";

// Изменение тегов по умолчанию для bold и italic
const Bold = Quill.import("formats/bold") as any;
Bold.tagName = "b"; // Quill uses <strong> by default
Quill.register(Bold, true);

const Italic = Quill.import("formats/italic") as any;
Italic.tagName = "i"; // Quill uses <em> by default
Quill.register(Italic, true);

const Link = Quill.import("formats/link") as any;
Link.sanitize = (url) => {
  let sanitizedUrl = url;
  // Простая проверка для разрешения только HTTP и HTTPS ссылок
  if (!/^https?:\/\/.*/.test(sanitizedUrl)) {
    sanitizedUrl = `https://${sanitizedUrl}`;
  }
  return sanitizedUrl;
};

const modules = {
  toolbar: [["bold", "italic", "underline", "strike"], ["link"], ["clean"]],
};

interface ITextEditorProps {
  loading: boolean;
  currentValue: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: CSSProperties;
  textOnly?: boolean;
  readonly?: boolean;
}

const TextEditor: FC<ITextEditorProps> = ({
  loading,
  currentValue,
  placeholder,
  style,
  onChange,
  textOnly = false,
  readonly = false,
}) => {
  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ReactQuill
      readOnly={readonly}
      placeholder={placeholder}
      value={currentValue}
      onChange={onChange}
      modules={textOnly ? { toolbar: false } : modules}
      theme="snow"
      style={style}
    />
  );
};

export default TextEditor;
