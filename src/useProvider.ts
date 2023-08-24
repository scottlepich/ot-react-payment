import { PaymentType } from "./constants";

import { SPREEDLY_SCRIPT_URL } from "./spreedly/constants";
// TODO: import { STRIPE_SCRIPT_URL } from "./stripe/constants";

import useAssertWindowGlobal from "./useAssertWindowGlobal";

import * as spreedly from "./spreedly/client";

const useProvider = (paymentType: PaymentType) => {
  useAssertWindowGlobal();

  switch (paymentType) {
    case PaymentType.Spreedly:
      return {
        initialize: spreedly.initializeSpreedly,
        attachEvents: spreedly.attachEvents,
        tokenizeCard: spreedly.tokenizeCard,
        setStyle: spreedly.setStyle,
        setLabel: spreedly.setLabel,
        setPlaceholder: spreedly.setPlaceholder,
        src: SPREEDLY_SCRIPT_URL,
      };
    // TODO: case PaymentType.Stripe:
    // TODO: normalize the interface for stripe
    default:
      throw new Error("Unknown PaymentType passed to usePayment.");
  }
};

export default useProvider;
