import React from "react";
import { useTranslation } from "react-i18next";

export default function Localized() {
  const { t } = useTranslation();
  return <div>{t("test_loc", { ns: "resources" })}</div>;
}
