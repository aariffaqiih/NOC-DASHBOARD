import { Component, createEffect, createSignal, For } from "solid-js";
import { DummyIncidentDistribution } from "../Dummy";
import blue from "../Images/BlueIncident.svg";
import green from "../Images/GreenIncident.svg";
import { dummyCardMaps } from "../Dummy";
import Map from "../Components/Map";
import IncidentDistribution from "../Components/IncidentDistribution";

export const [cardMap, setcardMap] = createSignal(true);
export const [toggleInput, setToggleinput] = createSignal(true);

export function toggleit(toggle: boolean) {
  if (toggle) {
    setToggleinput(false);
    console.log("iniconsole");
  } else {
    setToggleinput(true);
    return setToggleinput;
  }
}

createEffect(() => {
  setcardMap(toggleInput());
});

const [incidentCardTop, setIncidentCardTop]: any = createSignal([
  { id: "1", img: blue, area: "Sumbagut", desc: "xxxx" },
  { id: "2", img: blue, area: "Sumbagteng", desc: "xxxx" },
  { id: "3", img: blue, area: "Sumbagsel", desc: "xxxx" },
  { id: "4", img: green, area: "Kalimantan", desc: "xxxx" },
  { id: "5", img: green, area: "Sulawesi", desc: "xxxx" },
  { id: "6", img: green, area: "Puma", desc: "xxxx" },
]);

const [incidentCardBottom, setIncidentCardBottom]: any = createSignal([
  { id: "7", img: blue, area: "Sumbagut", desc: "xxxx" },
  { id: "8", img: blue, area: "Sumbagteng", desc: "xxxx" },
  { id: "9", img: blue, area: "Sumbagsel", desc: "xxxx" },
  { id: "10", img: green, area: "Kalimantan", desc: "xxxx" },
  { id: "11", img: green, area: "Sulawesi", desc: "xxxx" },
  { id: "12", img: green, area: "Puma", desc: "xxxx" },
]);

const CenterCard: Component = () => {
  return (
    <div class="h-full relative w-full flex md:mx-7 off:mx-2">
      <b class="bg-dark2 absolute z-40 text-center pb-5 w-full">Incident Distribution</b>

      <Map />

      <div class="flex flex-col justify-between h-full pb-11 pointer-events-none">
        <div class="flex gap-2 flex-wrap justify-end absolute top-11">
          <IncidentDistribution cards={dummyCardMaps} startIndex={0} endIndex={5} />
        </div>

        <div class="flex gap-2 flex-wrap-reverse absolute bottom-0">
          <IncidentDistribution cards={dummyCardMaps} startIndex={6} endIndex={12} />
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
