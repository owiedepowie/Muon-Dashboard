import { useEffect, useState } from "react";
import AppTitlebar from "./AppTitlebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = window.electron.onFullscreenChange(setIsFullscreen);
    window.electron.isFullscreen().then(setIsFullscreen);
    return () => unsubscribe?.();
  }, []);

  if (isFullscreen === null) return <div className="h-screen w-screen bg-background" />;

  return (
        <div className="h-screen flex flex-col">
          {isFullscreen !== null && !isFullscreen && (
            <header className="h-10 shrink-0 app-region-drag">
                <AppTitlebar />
            </header>
          )}
        <div className="flex flex-1 overflow-hidden">
        <AppSidebar className="h-full relative z-50" />
        <main className={`flex-1 overflow-y-auto pt-4`}>
          <div className="px-4"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
