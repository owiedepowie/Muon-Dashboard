type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
};

type StaticData = {
    totalStorage: number; // in GB
    cpuModel: string;
    totalMemoryGB: number; // in GB
};

type EvenPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
};

type UnsubscribeFunction = () => void;

interface Window {
    electron: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunction;
        getStaticData: () => Promise<StaticData>;
        minimizeWindow: () => void;
        maximizeWindow: () => void;
        closeWindow: () => void;
        toggleFullscreen: () => void;
        onFullscreenChange: (callback: (isFullscreen: boolean) => void) => UnsubscribeFunction;
        isFullscreen: () => Promise<boolean>;
    };
}