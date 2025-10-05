import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChartDialog } from "@/components/Widgets/chart-dialog";
import { ExampleBlocks } from "@/components/Widgets/example-blocks";
import { ExampleChart } from "@/components/Widgets/example-charts";
import { useTranslation } from "react-i18next";



const chartItems = [
  {
    id: 1,
    component: <ExampleChart chart="line" />,
    dialog: <ChartDialog chart="line" />
  },
  {
    id: 2,
    component: <ExampleChart chart="bar" />,
    dialog: <ChartDialog chart="bar" />
  },
  {
    id: 3,
    component: <ExampleChart chart="area" />,
    dialog: <ChartDialog chart="area" />
  },
  {
    id: 4,
    component: <ExampleChart chart="pie" />,
    dialog: <ChartDialog chart="pie" />
  },
  {
    id: 5,
    component: <ExampleChart chart="radar" />,
    dialog: <ChartDialog chart="radar" />
  },
];


export default function Widgets() {
  
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Widgets</h1>
      <h2 className="text-lg font-semibold">{t("widgets.chart.title")}</h2>
      <span className="text-muted-foreground mb-2">
        {t("widgets.chart.description")}
      </span>
      <Carousel
        opts={{
          align: "start",
        }}
        className="ml-16 md:max-w-135 lg:max-w-7xl"
      >
        <CarouselContent>
          {chartItems.map(({component, id, dialog}) => (   
              <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 transition-all">
                <Dialog key={id}>
                  <DialogTrigger className="cursor-pointer hover:scale-[1.02] transition-all">
                  {component}
                  </DialogTrigger>
                  {dialog}
                </Dialog>
              </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <h2 className="text-lg font-semibold">{t("widgets.block.title")}</h2>
      <span className="text-muted-foreground mb-2">
        {t("widgets.block.description")}
      </span>
      <ExampleBlocks />

    </div>
  )
}
