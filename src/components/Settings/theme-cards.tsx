import { Card, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/components/ThemeProvider"
import { MonitorCog, Moon, Sun } from "lucide-react"
import { useTranslation } from "react-i18next";

const themes = [
  {
    title: "dark",
    url: "images/ThemeCards/AppCardDark.png",
    icon: Moon,
  },
  {
    title: "light",
    url: "images/ThemeCards/AppCardLight.png",
    icon: Sun,
  },
  {
    title: "system",
    url: "images/ThemeCards/AppCardSystem.png",
    icon: MonitorCog,
  },
]

export function ThemeCards() {
    const { setTheme, theme } = useTheme()
    const { t } = useTranslation();

  return (
    <RadioGroup
  value={theme}
  defaultValue="dark"
>
  <div className="flex gap-4 justify-center mt-4">
    {themes.map(({ title, url, icon: Icon }) => (
      <Card
        key={title}
        className="w-48 h-32 flex flex-col overflow-hidden border-0 bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${url})` }}
        onClick={() => setTheme(title as "light" | "dark" | "system")}
      >
        <div className="flex-1" />
        <CardFooter className="mt-12 bg-accent p-0">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <RadioGroupItem value={title} id={title} />
            <Label htmlFor={title} className="flex items-center gap-2 cursor-pointer">
              <span>{t(title)}</span>
              <Icon style={{ scale: 0.75 }} />
            </Label>
          </div>
        </CardFooter>
      </Card>
    ))}
  </div>
</RadioGroup>
  )
}
