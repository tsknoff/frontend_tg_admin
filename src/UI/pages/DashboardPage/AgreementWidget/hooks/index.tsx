import {
  fetchAgreement,
  updateAgreement,
} from "../../../../../features/agreement/agreementSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store.ts";

export const useAgreementState = () => {
  const { message, status } = useSelector(
    (state: RootState) => state.agreement,
  );

  return { message, status };
};

export const useAgreementActions = () => {
  const dispatch: AppDispatch = useDispatch();

  const fetchAgreementData = () => {
    dispatch(fetchAgreement());
  };

  const updateAgreementData = async (message: string) => {
    await dispatch(updateAgreement(message));
    fetchAgreementData();
  };

  return { fetchAgreementData, updateAgreementData };
};
