import { ExampleChart } from "@/components/Widgets/example-charts"
import { ExampleTable } from "@/components/Widgets/example-table";

export default function Home() {
  return (
  <div>
  <h1 className="text-2xl font-bold">Home Page</h1>
    <div className="my-4 flex flex-row gap-4">
    <ExampleChart chart="bar" dataset={["rate"]} title="Muonen per seconde" legend={true} />
    <ExampleChart chart="area" dataset={["adc", "sipm"]} title="Muonen per seconde" legend={true} />
    </div>
    <ExampleTable />

  </div>
  );
}  