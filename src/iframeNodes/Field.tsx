import { CSSProperties, useEffect } from "react";

import { PaymentType, PaymentFieldName } from "../constants";

import kebabize from "../util/kebabize";

import useProvider from "../useProvider";

// TODO: [BUX-5102] Research if we can leverage an existing library to convert `CSSProperties` to string
const serializeStyles = (css: CSSProperties) =>
  Object.entries(css)
    .map(([key, value]) => `${kebabize(key)}: ${value};`)
    .join(" ");

export interface Props {
  label: string;
  placeholder?: string;
  css?: CSSProperties;
  fieldName: PaymentFieldName;
  id: string;
}

export type FieldProps = Omit<Props, "id" | "fieldName">;

const Field = ({ id, label, placeholder, css, fieldName }: Props) => {
  // TODO: pick provider
  const { setLabel, setPlaceholder, setStyle } = useProvider(
    PaymentType.Spreedly,
  );

  useEffect(() => {
    if (!label) {
      throw new Error(`a11y label is required for ${fieldName} field.`);
    }
    setLabel(fieldName, label);
  }, [label]);

  useEffect(() => {
    if (placeholder) {
      setPlaceholder(fieldName, placeholder);
    }
  }, [placeholder]);

  useEffect(() => {
    if (css) {
      const style = serializeStyles(css);
      setStyle(fieldName, style);
    }
  }, [css]);

  return <div id={id} />;
};

export default Field;
