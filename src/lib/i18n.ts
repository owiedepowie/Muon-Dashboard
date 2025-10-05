import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const stored = localStorage.getItem("settings");
const settings = stored ? JSON.parse(stored) : { language: "english" };

const langMap: Record<string, string> = {
  english: "en",
  dutch: "nl",
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {

        // Pages
        home: "Home",
        documentation: "Documentation",
        widgets: "Widgets",
        settings: "Settings",

        // Settings - Languages
        english: "English",
        dutch: "Dutch",

        // Settings - Themes
        dark: "Dark",
        light: "Light",
        system: "System",

        // Settings - Color, Language, Detection
        "color.title": "Color theme",
        "color.description": "Select your preferred color theme.",
        "language.title": "Language",
        "language.description": "Select your preferred language.",
        "detection.title": "Detection settings",
        "detection.description": "Select your preferred detection settings.",
        "detection.led": "LED blinks when detecting a muon",
        "detection.beepervolume": "Beeper volume",
        "detection.demo": "Fake muon detection (for demo purposes)",

        // Widgets - Example blocks and charts
        "widgets.chart.title": "Charts",
        "widgets.chart.description": "Select a chart to add to your dashboard.",
        "widgets.block.title": "Blocks",
        "widgets.block.description": "Select a block to add to your dashboard.",

        // Example charts and blocks
        "chart.title.line": "Example Line Chart",
        "chart.title.bar": "Example Bar Chart",
        "chart.title.area": "Example Area Chart",
        "chart.title.pie": "Example Pie Chart",
        "chart.title.radar": "Example Radar Chart",
        "chart.date.examplerange":"January - June 2024",
        "currenttrend": "Current trend",
        "block.datadescription": "Data description",
        

      },
    },
    nl: {
      translation: {

        // Pages
        home: "Start",
        documentation: "Documentatie",
        widgets: "Widgets",
        settings: "Instellingen",

        // Settings - Languages
        english: "Engels",
        dutch: "Nederlands",

        // Settings - Themes
        dark: "Donker",
        light: "Licht",
        system: "Systeem",

        // Settings - Color, Language, Detection
        "color.title": "Kleurthema",
        "color.description": "Selecteer je voorkeur voor kleurthema.",
        "language.title": "Taal",
        "language.description": "Selecteer je voorkeur voor taal.",
        "detection.title": "Detectie-instellingen",
        "detection.description": "Selecteer je voorkeur voor detectie-instellingen.",
        "detection.led": "LED knippert bij detectie van een muon",
        "detection.beepervolume": "Beeper volume",
        "detection.demo": "Nep muon detectie (voor demo-doeleinden)",

        // Widgets - Example blocks and charts
        "widgets.chart.title": "Diagrammen",
        "widgets.chart.description": "Selecteer een diagram om toe te voegen aan je dashboard.",
        "widgets.block.title": "Blokken",
        "widgets.block.description": "Selecteer een blok om toe te voegen aan je dashboard.",

        // Example charts and blocks
        "chart.title.line": "Voorbeeld Lijndiagram",
        "chart.title.bar": "Voorbeeld Staafdiagram",
        "chart.title.area": "Voorbeeld Oppervlaktediagram",
        "chart.title.pie": "Voorbeeld Cirkeldiagram",
        "chart.title.radar": "Voorbeeld Radardiagram",
        "chart.date.examplerange":"Januari - Juni 2024",
        "currenttrend": "Huidige trend",
        "block.datadescription": "Data beschrijving",
      },
    },
  },
  lng: langMap[settings.language], // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;