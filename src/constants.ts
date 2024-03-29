export enum PaymentType {
  Spreedly = "spreedly",
  // TODO: Stripe: "stripe",
  // ...others?
}

export enum PaymentFieldName {
  CVV = "cvv",
  NUMBER = "number",
}

export enum ActionTypes {
  CLEAR = "clear",
  SET_3DS_EVENTS = "set_3ds_events",
  SET_CREDIT_CARD = "set_credit_card",
  SET_ERRORS = "set_errors",
  SET_INPUTS = "set_inputs",
  SET_READY = "set_ready",
  SET_SRC_LOADED = "set_src_loaded",
}

export const HIDDEN_IFRAME_ID = "hidden-iframe";
export const CARD_NUMBER_FIELD_ID = "credit-card-number-field";
export const CVV_FIELD_ID = "cvv-field";
export const CHALLENGE_IFRAME_ID = "challenge-iframe";
export const CHALLENGE_IFRAME_CLASS = "TODO";

// App keys
// TODO: figure out where to store keys
export const SPREEDLY_DEMO = "8b01Y9b9sSRkMsbw14aOya8YmQj";
export const SPREEDLY_PROD = "ESu0lNbQpD1i6WGmJHFJIrub5sP";
