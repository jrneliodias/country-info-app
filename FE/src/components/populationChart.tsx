import { Bar, BarChart, XAxis } from "recharts";

import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { ChartTooltip } from "./ui/chart";

const chartConfig = {
  value: {
    label: "Population",
    color: "#2563eb",
  },
} satisfies ChartConfig;
const PopulationChart = ({ populationData }: { populationData: { year: number; value: number }[] }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-[400px]">
      <BarChart accessibilityLayer data={populationData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default PopulationChart;
