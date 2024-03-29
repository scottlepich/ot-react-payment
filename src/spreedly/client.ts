import {
  ActionTypes,
  CARD_NUMBER_FIELD_ID,
  CHALLENGE_IFRAME_CLASS,
  CHALLENGE_IFRAME_ID,
  CVV_FIELD_ID,
  HIDDEN_IFRAME_ID,
  SPREEDLY_DEMO,
} from "../constants";

import { ContextShape } from "../context/PaymentContext";

import { CreditCardData } from "../types/spreedly";

import { SpreedlyEvents } from "./constants";

const { SET_3DS_EVENTS, SET_CREDIT_CARD, SET_ERRORS, SET_INPUTS, SET_READY } =
  ActionTypes;

const { READY, ERRORS, PAYMENT_METHOD, INPUT, THREEDS_STATUS } = SpreedlyEvents;

const environmentKey = SPREEDLY_DEMO;

export const initializeSpreedly = () => {
  if (window.Spreedly) {
    window.Spreedly.init(environmentKey, {
      numberEl: CARD_NUMBER_FIELD_ID,
      cvvEl: CVV_FIELD_ID,
    });
  }
};

export const attachEvents = ({ state, dispatch }: ContextShape) => {
  if (window.Spreedly) {
    window.Spreedly.on(READY, () => {
      dispatch({
        type: SET_READY,
      });
    });

    window.Spreedly.on(ERRORS, (error: Error) => {
      dispatch({
        type: SET_ERRORS,
        error,
      });
    });

    window.Spreedly.on(
      PAYMENT_METHOD,
      (token: string, data: CreditCardData) => {
        dispatch({
          type: SET_CREDIT_CARD,
          card: {
            token,
            data,
          },
        });
      },
    );

    window.Spreedly.on(INPUT, (name: string, value: string) => {
      dispatch({
        type: SET_INPUTS,
        inputs: [...state.inputs, { name, value }],
      });
    });

    // TODO: 3ds status data type
    window.Spreedly.on(THREEDS_STATUS, (data: any) => {
      dispatch({
        type: SET_3DS_EVENTS,
        threeDsEvents: [{ name: data.event, data }, ...state.threeDsEvents],
      });
    });
  }
};

export const tokenizeCard = (creditCard: any) => {
  if (window.Spreedly) {
    window.Spreedly.tokenizeCreditCard(creditCard);
  }
};

export const setLabel = (id: string, label: string) => {
  if (window.Spreedly) {
    window.Spreedly.setLabel(id, label);
  }
};

export const setPlaceholder = (id: string, placeholder: string) => {
  if (window.Spreedly) {
    window.Spreedly.setPlaceholder(id, placeholder);
  }
};

export const setStyle = (id: string, style: string) => {
  if (window.Spreedly) {
    window.Spreedly.setStyle(id, style);
  }
};

export const startThreeDS = (
  transactionToken: string,
  threeDSLifecycle: any,
) => {
  if (window.Spreedly) {
    threeDSLifecycle.current = new window.Spreedly.ThreeDS.Lifecycle({
      environmentKey,
      hiddenIframeLocation: HIDDEN_IFRAME_ID,
      challengeIframeLocation: CHALLENGE_IFRAME_ID,
      transactionToken,
      challengeIframeClasses: CHALLENGE_IFRAME_CLASS,
    });
    // TODO: track when 3ds journey is triggered
    // console.log(`starting 3ds lifecycle for transaction ${transactionToken}`);
    threeDSLifecycle.current.start();
  }
};
