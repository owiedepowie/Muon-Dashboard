import { useState, useEffect } from "react";

type Settings = {
  language: "english" | "dutch";
  volume: number;
  led: boolean;
  demo: boolean;
};

const defaultSettings: Settings = {
  language: "english",
  volume: 50,
  led: false,
  demo: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem("settings");
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return [settings, setSettings] as const;
}
