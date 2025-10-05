
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/hooks/useSettings";

export function DetectionSettings() {
    const [settings, setSettings] = useSettings();
    const { t } = useTranslation();
  return (
    <div>
        <div className="mt-4 flex items-center justify-between">
            <Label htmlFor="led" className="cursor-pointer">
            {t("detection.led")}
            </Label>
            <Switch
                id="led"
                className="ml-2 mr-4"
                checked={settings.led}
                onCheckedChange={(checked) =>
                    setSettings({ ...settings, led: checked })
                }
            />
        </div>
        <div className="mt-2 flex items-center justify-between">
            <Label htmlFor="beepervolume" className="cursor-pointer">
            {t("detection.beepervolume")} ({settings.volume}%)
            </Label>
            <Slider
                id="beepervolume"
                value={[settings.volume]}
                onValueChange={(val) =>
                    setSettings({ ...settings, volume: val[0] })
                }
                className="ml-4 mr-4 w-50"
                max={100}
            />
        </div>
        <div className="mt-2 flex items-center justify-between">
            <Label htmlFor="demo" className="cursor-pointer">
            {t("detection.demo")}
            </Label>
            <Switch
                id="demo"
                className="ml-2 mr-4"
                checked={settings.demo}
                onCheckedChange={(checked) =>
                    setSettings({ ...settings, demo: checked })
                }
            />
        </div>
    </div>
  );
}
