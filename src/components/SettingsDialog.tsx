import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { ThemeCards } from "./Settings/theme-cards";
import { Languages } from "./Settings/languages";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "react-i18next";
import { DetectionSettings } from "./Settings/detection-settings";

const settingsItems = [
  {
    title: "color.title",
    description: "color.description",
    component: <ThemeCards />,
  },
  {
    title: "language.title",
    description: "language.description",
    component: <Languages />,
  },
  {
    title: "detection.title",
    description: "detection.description",
    component: <DetectionSettings />,
  },
];

export default function SettingsDialog() {
  
  const { t } = useTranslation();
    
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" className="w-auto h-16 flex-col text-xs">
            <Settings style={{ scale: 1.5 }} />
            {t("settings")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Settings className="mr-2" /> {t("settings")}
            </DialogTitle>
            <ScrollArea className="max-h-[60vh] w-full pr-4">
            <DialogDescription asChild>
              <div>
                {settingsItems.map(({ title, description, component }) => (
                  <div key={title}>
                    <h1 className="mt-2 text-lg font-bold text-accent-foreground">{t(title)}</h1>
                    <p className="text-sm text-muted-foreground">
                      {t(description)}
                    </p>
                    {component}
                  </div>
                ))}
              </div>
            </DialogDescription>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>

  )
}

