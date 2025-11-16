import { ExampleChart } from "@/components/Widgets/example-charts"

export default function Home() {
  return (
  <div>
  <h1 className="text-2xl font-bold">Home Page</h1>
    <ExampleChart chart="line" title="Muons per second" legend={true} />
  </div>
  );
}