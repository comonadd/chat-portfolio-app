import React from "react";
import "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

interface SocialButtonProps {
  type: "google" | "github";
  onClick: (ev: any) => void;
  colored: boolean;
}

export const SocialButton = ({ type, onClick, colored }: SocialButtonProps) => (
  <button
    className={classnames([
      "social-button",
      ...[colored ? "social-button_colored" : null]
    ])}
    social-network-type={type}
  >
    <FontAwesomeIcon icon={["fab", type]} />
  </button>
);

export default SocialButton;
