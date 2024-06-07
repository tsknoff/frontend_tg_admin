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
    return text.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  return { draftMessage, setDraftMessage, handleChange, clearFromPTags };
};
