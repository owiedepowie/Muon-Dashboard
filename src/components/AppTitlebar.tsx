import { useEffect, useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { Button } from "./ui/button";

const noDragStyle: React.CSSProperties & { WebkitAppRegion?: string } = {
  WebkitAppRegion: 'no-drag',
};

const DragStyle: React.CSSProperties & { WebkitAppRegion?: string } = {
  WebkitAppRegion: 'drag',
  pointerEvents: 'auto',
};

const AppTitlebar = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        console.log("F11 key pressed");
        e.preventDefault();
        window.electron.toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
  const unsubscribe = window.electron.onFullscreenChange((fullscreen) => {
    setIsFullscreen(fullscreen);
  });

  return () => unsubscribe();
}, []);

  if (isFullscreen) return null;
    return(
        <div className="fixed w-full h-10 flex items-center justify-between select-none bg-accent" style={DragStyle}>
            <div className="font-semibold text-lg">
            </div>
            <div className="flex space-x-1" style={noDragStyle}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.electron.minimizeWindow()}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-2xl text-muted-foreground"

                >
                    <Minus style={{ scale: 1.5 }} />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.electron.maximizeWindow()}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-2xl text-muted-foreground"

                >
                    <Square style={{ scale: 1.5 }} />
                </Button>
                <Button
                variant="ghost"
                    size="icon"
                    onClick={() => window.electron.closeWindow()}
                    className="hover:bg-red-400 dark:hover:bg-red-500/70 transition rounded-2xl text-muted-foreground"

                >
                    <X style={{ scale: 1.5 }} />
                </Button>
            </div>
        </div>
    );
}

export default AppTitlebar;