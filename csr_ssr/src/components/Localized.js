import React from "react";
import { useTranslation } from "react-i18next";

export default function Localized() {
  const { t } = useTranslation("resources");
  return <div>{t("test_loc")}</div>;
}
