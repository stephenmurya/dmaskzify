export type RadioSourceType = "stationhead" | "custom_stream" | "offline";
export type RadioState = "live" | "offline" | "coming_soon";

export type WeeklyShow = {
  day: string;
  time: string;
  title: string;
  host: string;
  flagship?: boolean;
};

type RadioConfig = {
  radio_source_type: RadioSourceType;
  radio_state: RadioState;
  stationhead: {
    roomName: string;
    deepLink: string;
    browserLink: string;
    embedSupported: boolean;
    embedUrl?: string;
  };
  customStreamUrl: string;
  nextShowLabel: string;
  weeklySchedule: WeeklyShow[];
};

export const radioConfig: RadioConfig = {
  radio_source_type: "stationhead",
  radio_state: "live",
  stationhead: {
    roomName: "@dmaskzify",
    deepLink: "stationhead://room/dmaskzify",
    browserLink: "https://share.stationhead.com/dmaskzify",
    embedSupported: false,
    embedUrl: "",
  },
  customStreamUrl: "https://stream.example.com/live",
  nextShowLabel: "Friday, 9:00 PM WAT",
  weeklySchedule: [
    {
      day: "Monday",
      time: "8:00 PM - 10:00 PM",
      title: "Capital Commute",
      host: "Host: OJ Fade",
    },
    {
      day: "Wednesday",
      time: "9:00 PM - 11:00 PM",
      title: "Afro-Fusion Late Night",
      host: "Host: DJ K-Slaw",
      flagship: true,
    },
    {
      day: "Friday",
      time: "10:00 PM - 12:00 AM",
      title: "Underground Cartel",
      host: "Host: Tunde X",
    },
    {
      day: "Sunday",
      time: "6:00 PM - 8:00 PM",
      title: "Back Alley Sessions",
      host: "Host: Nneka Soul",
    },
  ],
};

export function getRadioStatusCopy() {
  if (radioConfig.radio_state === "live") {
    return {
      label: "Live",
      detail: `On air now via Stationhead room ${radioConfig.stationhead.roomName}`,
    };
  }

  if (radioConfig.radio_state === "coming_soon") {
    return {
      label: "Coming Soon",
      detail: "DMASKZIFY Radio is preparing to launch on Stationhead.",
    };
  }

  return {
    label: "Offline",
    detail: `Next show: ${radioConfig.nextShowLabel}`,
  };
}

export function getRadioSourceLinks() {
  if (radioConfig.radio_state === "coming_soon") {
    return {
      primaryHref: "/radio",
      primaryLabel: "Radio Coming Soon",
      fallbackHref: "/contact",
      fallbackLabel: "Join updates",
    };
  }

  if (radioConfig.radio_state === "offline") {
    return {
      primaryHref: "/radio",
      primaryLabel: "View Schedule",
      fallbackHref:
        radioConfig.radio_source_type === "stationhead"
          ? radioConfig.stationhead.browserLink
          : "/contact",
      fallbackLabel:
        radioConfig.radio_source_type === "stationhead"
          ? "Open Stationhead room"
          : "Get notified when live",
    };
  }

  if (radioConfig.radio_source_type === "custom_stream") {
    return {
      primaryHref: radioConfig.customStreamUrl,
      primaryLabel: "Listen Live",
      fallbackHref: radioConfig.customStreamUrl,
      fallbackLabel: "Open stream link",
    };
  }

  if (radioConfig.radio_source_type === "offline") {
    return {
      primaryHref: "/radio",
      primaryLabel: "View Schedule",
      fallbackHref: "/radio",
      fallbackLabel: "See next show",
    };
  }

  return {
    primaryHref: radioConfig.stationhead.deepLink,
    primaryLabel: "Listen Live on Stationhead",
    fallbackHref: radioConfig.stationhead.browserLink,
    fallbackLabel: "Fallback: open in browser",
  };
}
