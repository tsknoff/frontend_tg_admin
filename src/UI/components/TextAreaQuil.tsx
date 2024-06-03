import { FC, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Изменение тегов по умолчанию для bold и italic
const Bold = Quill.import("formats/bold");
// @ts-ignore
Bold.tagName = "b"; // Quill uses <strong> by default
// @ts-ignore
Quill.register(Bold, true);

const Italic = Quill.import("formats/italic");
// @ts-ignore
Italic.tagName = "i"; // Quill uses <em> by default
// @ts-ignore
Quill.register(Italic, true);

const Link = Quill.import("formats/link");
// @ts-ignore
Link.sanitize = (url) => {
  let sanitizedUrl = url;
  // Простая проверка для разрешения только HTTP и HTTPS ссылок
  if (!/^https?:\/\/.*/.test(sanitizedUrl)) {
    sanitizedUrl = `https://${sanitizedUrl}`;
  }
  return sanitizedUrl;
};

interface ITextEditorProps {
  currentValue: string;
  onChange: (value: string) => void;
}

const TextEditor: FC<ITextEditorProps> = ({ currentValue, onChange }) => {
  const [value, setValue] = useState(currentValue);

  const modules = {
    toolbar: [
      [],
      [],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [],
      ["link"],
      ["clean"],
    ],
  };

  const handleChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      theme="snow"
      style={{ height: "calc(100% - 50px)" }}
    />
  );
};

export default TextEditor;
