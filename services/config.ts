import Constants from "expo-constants";

const DEFAULT_API_BASE_URL = "http://10.113.29.12:5500";

type Extra = {
  API_BASE_URL?: string;
};

const extra = (Constants?.expoConfig?.extra as Extra | undefined) ?? {};

export const API_BASE_URL = extra.API_BASE_URL || DEFAULT_API_BASE_URL;
export const DEFAULT_CONTEST_ID = "6908269279e9ca9b0a4eb4bd";

