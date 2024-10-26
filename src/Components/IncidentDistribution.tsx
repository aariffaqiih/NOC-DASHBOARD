import type { Component } from "solid-js";
import { createSignal, For, Index } from "solid-js";

import { colorforBalls, dummyCardMaps } from "../Dummy";
import CardPieTypeC, { convertArrayOfArrays } from "./IncidentDistributionChart";

interface CardListForMapItem {
  coloricon: string;
  title: string;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
}

interface CardListForMapsProp {
  cards: CardListForMapItem[];
  startIndex?: number;
  endIndex?: number;
}

let colorIndex = -1;

const IncidentDistribution: Component<CardListForMapsProp> = (props) => {
  const { cards, startIndex = 0, endIndex = cards.length - 1 } = props;
  const visibleCards = cards.slice(startIndex, endIndex + 1);

  let colorLegend = visibleCards.map((items) => {
    return {
      ...items,
      color: colorforBalls,
    };
  });

  const cardslist = colorLegend.map((propsmap, index) => {
    const processedData = convertArrayOfArrays(cards);
    return (
      <div class={`${startIndex + index + 1} rounded-xl bg-chart`}>
        <div class="gap-1.5 m-2.5 grid">
          <div class="flex gap-1.5 items-center">
            <div class="h-5 w-5" style={`background: ${propsmap.coloricon}`}></div>
            <span class="text-white xl:text-base off: text-xs font-bold">{propsmap.title}</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <CardPieTypeC cards={processedData} indexData={startIndex + index} />
            <div class="off:hidden lg:block  flex flex-col text-xs">
              <div class="1 flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded" style={`background-color:${propsmap.color[0]}`} />
                <p class="w-12">Critical</p>
                <p class="w-6">{propsmap.value1}</p>
              </div>
              <div class="2 flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded" style={`background-color:${propsmap.color[1]}`} />
                <p class="w-12">Major</p>
                <p class="w-6">{propsmap.value2}</p>
              </div>
              <div class="1 flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded" style={`background-color:${propsmap.color[2]}`} />
                <p class="w-12">Minor</p>
                <p class="w-6">{propsmap.value3}</p>
              </div>
              <div class="2 flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded" style={`background-color:${propsmap.color[3]}`} />
                <p class="w-12">Low</p>
                <p class="w-6">{propsmap.value4}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{cardslist}</>;
};

export default IncidentDistribution;
function outputArrayByIndex(arg0: number) {
  throw new Error("Function not implemented.");
}
