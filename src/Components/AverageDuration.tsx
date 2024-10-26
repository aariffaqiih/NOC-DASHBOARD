import { Progress, ProgressIndicator, ProgressLabel } from "@hope-ui/solid";
import { Component } from "solid-js";

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface PropPieData {
  pie: PieData[];
}

let formatHours = (seconds: number): string => {
  if (seconds > 3600) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  } else {
    return `0h`;
  }
};

let formatMinutes = (seconds: number): string => {
  const totalMinutes = Math.floor(seconds / 60);
  const minutes = totalMinutes % 60;
  return `${minutes}m`;
};

const AverageDuration: Component<PropPieData> = (props) => {
  return (
    <div class="2 flex flex-col gap-2.5">
      {props.pie.map((props) => (
        <div class="1 grid gap-1">
          <div class="flex justify-between">
            <p>{props.name}</p>

            <div class="flex gap-1">
              <p class="flex">{formatHours(props.value)}</p>
              <p class="flex">{formatMinutes(props.value)}</p>
            </div>
          </div>

          <Progress trackColor="#1c1c39" value={props.value} max={36000} height={7} borderRadius={10} overflow={"initial"}>
            <ProgressIndicator color={props.color} class="flex items-center flex-row-reverse rounded-full">
              <div class="h-3 w-3 rounded-full" style={`background-color:${props.color}`}></div>
            </ProgressIndicator>
          </Progress>
        </div>
      ))}
    </div>
  );
};

export default AverageDuration;
