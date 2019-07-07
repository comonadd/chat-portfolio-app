import { User } from "+/store/types";

declare var process: {
  env: {
    NODE_ENV: string;
  };
};

// The style (CSS) class that all application
// scene components should have.
export const SCENE_STYLE_CLASS = "scene";
export const MIN_USERNAME_LENGTH = 4;
export const MAX_USERNAME_LENGTH = 24;
export const MIN_PASSWORD_LENGTH = 4;
export const MAX_PASSWORD_LENGTH = 64;
export const AMOUNT_OF_MESSAGES_TO_LOAD = 12;
export const PROJ_GITHUB_LINK =
  "https://github.com/wrongway4you/chat-portfolio-app";
export const DEBUG = process.env.NODE_ENV !== "production";
export const MESSAGES_PANE_SCROLL_GAP = 240;

export const UNKNOWN_USER = {
  username: "unknown",
  firstName: "Unknown",
  lastName: "Unknown",
  email: "unknown@unknown.com"
};

export default {
  SCENE_STYLE_CLASS,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MESSAGES_PANE_SCROLL_GAP,
  AMOUNT_OF_MESSAGES_TO_LOAD,
  DEBUG
};
