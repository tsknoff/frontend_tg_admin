import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store.ts";
import {
  fetchAgreement,
  updateAgreement,
} from "../../../../features/agreement/agreementSlice.ts";

export const useAgreementViewModel = () => {
  const dispatch: AppDispatch = useDispatch();

  const message = useSelector((state: RootState) => state.agreement.message);
  const status = useSelector((state: RootState) => state.agreement.status);
  const [draftMessage, setDraftMessage] = useState(message);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAgreement());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setDraftMessage(message);
  }, [message, status]);

  const handleChange = (value: string) => {
    setDraftMessage(value);
  };

  const handleFetchAgreement = () => {
    dispatch(fetchAgreement());
  };

  const clearFromPTags = (text: string) => {
    if (!text) return text;

    return text.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  const handleUpdateAgreement = () => {
    if (draftMessage.trim() && draftMessage !== message) {
      dispatch(updateAgreement(clearFromPTags(draftMessage) as string));
    }
  };

  return {
    message,
    status,
    draftMessage,
    handleChange,
    handleFetchAgreement,
    handleUpdateAgreement,
    clearFromPTags,
  };
};
