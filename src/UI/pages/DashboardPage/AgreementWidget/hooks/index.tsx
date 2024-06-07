import {
  fetchAgreement,
  updateAgreement,
} from "../../../../../features/agreement/agreementSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store.ts";

export const useAgreementState = () => {
  const message = useSelector((state: RootState) => state.agreement.message);
  const status = useSelector((state: RootState) => state.agreement.status);

  return { message, status };
};

export const useAgreementActions = () => {
  const dispatch: AppDispatch = useDispatch();

  const fetchAgreementData = () => {
    dispatch(fetchAgreement());
  };

  const updateAgreementData = (message: string) => {
    dispatch(updateAgreement(message));
  };

  return { fetchAgreementData, updateAgreementData };
};
