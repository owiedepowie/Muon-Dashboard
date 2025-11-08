import { useParsedData } from "@/Data/parseData";


export default function Documentation() {

  const { data, loading, error } = useParsedData();

  if (loading) return <div>Loading data…</div>;
  if (error) return <div>Error: {error}</div>;

  return ( 
   <div>
  <h1 className="text-2xl font-bold">Documentation Page</h1>
  <span className="text-muted-foreground">This is the documentation page.</span> 
      <h2>First 5 rows</h2>
      <pre>{JSON.stringify(data.slice(0, 5), null, 2)}</pre>
  </div>
  );
}