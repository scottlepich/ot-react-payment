import { CVV_FIELD_ID, PaymentFieldName } from "../constants";

import Field, { FieldProps } from "./Field";

export const CVVField = (props: FieldProps) => (
  <Field fieldName={PaymentFieldName.CVV} id={CVV_FIELD_ID} {...props} />
);

export type CVVFieldType = typeof CVVField;
