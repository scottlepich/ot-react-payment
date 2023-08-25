import { PaymentType } from "./constants";

import { SPREEDLY_SCRIPT_URL } from "./spreedly/constants";

import useAssertWindowGlobal from "./useAssertWindowGlobal";

import * as spreedly from "./spreedly/client";

// TODO: type for all providers
export interface ProviderReturnType {
  attachEvents: typeof spreedly.attachEvents;
  initialize: typeof spreedly.initializeSpreedly;
  setLabel: typeof spreedly.setLabel;
  setPlaceholder: typeof spreedly.setPlaceholder;
  setStyle: typeof spreedly.setStyle;
  src: typeof SPREEDLY_SCRIPT_URL;
  tokenizeCard: typeof spreedly.tokenizeCard;
}

const useProvider = (paymentType: PaymentType): ProviderReturnType => {
  useAssertWindowGlobal();

  switch (paymentType) {
    case PaymentType.Spreedly:
      return {
        attachEvents: spreedly.attachEvents,
        initialize: spreedly.initializeSpreedly,
        setLabel: spreedly.setLabel,
        setPlaceholder: spreedly.setPlaceholder,
        setStyle: spreedly.setStyle,
        src: SPREEDLY_SCRIPT_URL,
        tokenizeCard: spreedly.tokenizeCard,
      };
    // TODO: case PaymentType.Stripe:
    // TODO: normalize the interface for stripe
    default:
      throw new Error("Unknown PaymentType passed to usePayment.");
  }
};

export default useProvider;
