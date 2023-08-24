import { CARD_NUMBER_FIELD_ID, PaymentFieldName } from "../constants";

import Field, { FieldProps } from "./Field";

export const CardNumberField = (props: FieldProps) => (
  <Field
    fieldName={PaymentFieldName.NUMBER}
    id={CARD_NUMBER_FIELD_ID}
    {...props}
  />
);

export type CardNumberFieldType = typeof CardNumberField;
