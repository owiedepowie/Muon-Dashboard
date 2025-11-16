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
        "chart": {
          "title": {
            "line": "Line Chart",
            "bar": "Bar Chart",
            "area": "Area Chart",
            "pie": "Pie Chart",
            "radar": "Radar Chart"
          }
        },
        "chart.date.examplerange":"January - June 2024",
        "currenttrend": "Current trend",
        "block.datadescription": "Data description",

        // Chart dialog items
        "chart.title": "Chart Title",
        "chart.label.none": "None",
        "chart.label.label": "Label",
        "chart.label.dots": "Dots",        
        "chart.line.header": "Line type",
        "chart.line.natural": "Natural",
        "chart.line.linear": "Linear",
        "chart.line.step": "Step",
        "chart.dataset.rate": "Muons per second",
        "chart.dataset.ADC": "ADC",
        "chart.dataset.SiPM": "SiPM",
        "chart.dataset.deadtime": "Deadtime",
        "chart.dataset.temperature": "Temperature",
        "chart.dataset.pressure": "Pressure",
        "chart.dataset.acceleration": "Acceleration",
        "chart.dataset.gyro": "Gyro",
        "chart.checkbox.legend": "Enable legend",
        "chart.checkbox.trend": "Enable footer",
        "chart.checkbox.calendar": "Enable calendar",

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
        "chart": {
          "title": {
            "line": "Lijndiagram",
            "bar": "Staafdiagram",
            "area": "Oppervlaktediagram",
            "pie": "Cirkeldiagram",
            "radar": "Radardiagram"
          }
        },
        "chart.date.examplerange":"Januari - Juni 2024",        
        "currenttrend": "Huidige trend",
        "block.datadescription": "Data beschrijving",

        // Chart dialog
        "chart.header": "Voeg een {{chart}} widget toe",
        "chart.description": "Configureer en voeg een {{chart}} widget toe aan je dashboard.",
        "chart.title": "Diagram Titel",
        "chart.label.none": "Geen",
        "chart.label.label": "Label",
        "chart.label.dots": "Punten",
        "chart.line.header": "Lijn type",
        "chart.line.natural": "Natuurlijk",
        "chart.line.linear": "Lineair",
        "chart.line.step": "Stap",
        "chart.dataset.rate": "Muonen per seconde",
        "chart.dataset.ADC": "ADC",
        "chart.dataset.SiPM": "SiPM",
        "chart.dataset.deadtime": "Deadtime",
        "chart.dataset.temperature": "Temperatuur",
        "chart.dataset.pressure": "Druk",
        "chart.dataset.acceleration": "Versnelling",
        "chart.dataset.gyro": "Gyro",
        "chart.checkbox.legend": "Toon legenda",
        "chart.checkbox.trend": "Toon footer",
        "chart.checkbox.calendar": "Toon kalender",
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