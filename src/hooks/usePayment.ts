import { useEffect } from "react";

import useScript from "react-script-hook";

import { ActionTypes, PaymentType } from "../constants";

import useAssertWindowGlobal from "./useAssertWindowGlobal";

import useProvider from "./useProvider";

import usePaymentContext from "../context/usePaymentContext";

const { SET_SRC_LOADED, SET_ERRORS } = ActionTypes;

const usePayment = (paymentType: PaymentType) => {
  useAssertWindowGlobal();

  // Initialize context
  const { state, dispatch } = usePaymentContext();

  // Payment provider config
  const { src, initialize, attachEvents, tokenizeCard } =
    useProvider(paymentType);

  // Attach payment provider <script />
  useScript({
    src,
    checkForExisting: true, // prevent multiple script injection
    onload: () => {
      dispatch({
        type: SET_SRC_LOADED,
      });
    },
  });

  // Initialize payment provider
  useEffect(() => {
    if (state.hasLoadedScript) {
      initialize();
      attachEvents({ state, dispatch });
    }
  }, [state.hasLoadedScript]);

  const clearErrors = () => {
    dispatch({
      type: SET_ERRORS,
      error: undefined,
    });
  };

  // Provide state and callback(s)
  return { state, clearErrors, tokenizeCard };
};

export default usePayment;
