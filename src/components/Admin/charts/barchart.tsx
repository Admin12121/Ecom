"use client";
import { Bar, BarChart, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card/Card"
import { Card, CardBody } from "@nextui-org/react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart/Chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function UiChart() {
  return (
    <Card className=" w-full h-full border-0 bg-transparent shadow-none">
      <CardBody>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              isAnimationActive={true}
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={50}
              className="bar"
            />
          </BarChart>
        </ChartContainer>
      </CardBody>
    </Card>
  );
}
