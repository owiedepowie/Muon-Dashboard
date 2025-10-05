import { Home, CirclePlus, BookOpenText } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { Separator } from "./ui/separator";
import SettingsDialog from "./SettingsDialog";
import { useTranslation } from "react-i18next";

// Menu items.
const items = [
  {
    title: "home",
    url: "/",
    icon: Home,
  },
  {
    title: "documentation",
    url: "/documentation",
    icon: BookOpenText,
  },
  {
    title: "widgets",
    url: "/widgets",
    icon: CirclePlus,
  },
]

export function AppSidebar({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div className={cn("w-auto bg-sidebar flex flex-col", className)}>
      {items.map((item) => (
        <NavLink to={item.url} key={item.title} className={({ isActive }) => cn(
              "w-auto h-16 bgtext-muted-foreground flex-col flex justify-center rounded-lg",
              isActive
                ? "bg-fuchsia-800 / 50% text-white"
                : ""
            )}
        >
          <Button size="icon" variant="ghost" className="w-auto h-16 flex-col pl-2 pr-2 text-xs">
            <item.icon style={{ scale: 1.5 }} />
            {t(item.title)}
          </Button>
        </NavLink>
      ))}
      <Separator className="justify-center w-auto p-0.5 my-2 mx-3 rounded-4xl" />
      <SettingsDialog />
    </div>
    
  )
}

