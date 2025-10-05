import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/hooks/useSettings";

export function Languages() {
    const [settings, setSettings] = useSettings();
    const { t } = useTranslation();

    const handleLanguageChange = (val: "english" | "dutch") => {
    
    setSettings({ ...settings, language: val });

    const langMap = {
    english: "en",
    dutch: "nl",
  };

  i18n.changeLanguage(langMap[val]);

  };

    return (
        <RadioGroup value={settings.language} onValueChange={handleLanguageChange}>
          <div className="flex flex-col gap-4 justify-center mt-4">
            <Label htmlFor="english" className="cursor-pointer">
              <RadioGroupItem value="english" id="english" />
              {t("english")}
            </Label>
            <Label htmlFor="dutch" className="cursor-pointer">
              <RadioGroupItem value="dutch" id="dutch" />
              {t("dutch")}
            </Label>
          </div>
        </RadioGroup>
    );
}