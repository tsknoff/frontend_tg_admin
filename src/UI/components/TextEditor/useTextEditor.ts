import { useEffect, useState } from "react";

export const useTextEditor = (initialMessage: string) => {
  const [draftMessage, setDraftMessage] = useState(initialMessage);

  useEffect(() => {
    setDraftMessage(initialMessage);
  }, [initialMessage]);

  const handleChange = (value: string) => {
    setDraftMessage(value);
  };

  const clearFromPTags = (text: string) => {
    if (!text) return text;

    // Удаление тегов <p> и замена их на перенос строки
    return text
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n")
      .replace(/<br>/g, "\n");
    // .replace(/<[^>]+>/g, ""); // Удаление остальных HTML-тегов
  };

  const revertToPTags = (text: string) => {
    if (!text) return text;

    // Разбиваем текст по переносам строк и оборачиваем в <p>
    return text
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");
  };

  return {
    draftMessage,
    setDraftMessage,
    handleChange,
    clearFromPTags,
    revertToPTags,
  };
};
