import { Component, For, createSignal } from "solid-js";
import RANDevices from "../Images/RANDevices.svg";
import CoreDevices from "../Images/CoreDevices.svg";
import TransportDevices from "../Images/TransportDevices.svg";
import SecurityDevices from "../Images/SecurityDevices.svg";
import "../index.css";

const [card, setCard]: any = createSignal([
  { id: "1", img: RANDevices, title: "RAN Devices", Col1Row1: "BTS 2G/3G/4G/5G", Col1Row2: "SITE LEVEL", Col1Row3: "SITE LEVEL", Col2Row1: "XXXXX", Col2Row2: "XXXXX", Col2Row3: "XXXXX" },

  { id: "2", img: CoreDevices, title: "Core Devices", Col1Row1: "MSS/MGW", Col1Row2: "SGSN/MME", Col1Row3: "HLR", Col1Row4: "SGSN/SPGW", Col2Row1: "XXXXX", Col2Row2: "XXXXX", Col2Row3: "XXXXX", Col2Row4: "XXXXX" },

  {
    id: "3",
    img: TransportDevices,
    title: "Transport Devices",
    Col1Row1: "RAN Routers",
    Col1Row2: "Core Routers",
    Col1Row3: "Backbone Routers",
    Col1Row4: "FOTS Devices",
    Col2Row1: "XXXXX",
    Col2Row2: "XXXXX",
    Col2Row3: "XXXXX",
    Col2Row4: "XXXXX",
  },

  { id: "4", img: SecurityDevices, title: "Security Devices", Col1Row1: "SS7 Firewall", Col1Row2: "Anti DDOS", Col1Row3: "Git Firewall", Col1Row4: "Anti Spam", Col2Row1: "XXXXX", Col2Row2: "XXXXX", Col2Row3: "XXXXX", Col2Row4: "XXXXX" },
]);

const ObjectMonitoring: Component = () => {
  return (
    <div class="flex-wrap flex gap-4">
      <For each={card()}>
        {(item) => (
          <div class="bg-card 2 rounded-md off:h-32 xl-rspnsv-topcard:h-36" id="TopCards">
            <div class="gap-1.5 flex flex-col m-3">
              <div class="flex gap-1.5 items-center">
                <img src={item.img} class="h-5" />
                <b class="w-36">{item.title}</b>
              </div>
              <div class="lg-rspnsv-topcard:mx-6 gap-2 flex lg-rspnsv-topcard:justify-between off:text-xs xl-rspnsv-topcard:text-sm font-medium">
                <div class="flex flex-col gap-0.5 bg-red w-max">
                  <p>{item.Col1Row1}</p>
                  <p>{item.Col1Row2}</p>
                  <p>{item.Col1Row3}</p>
                  <p>{item.Col1Row4}</p>
                </div>
                <div class="flex flex-col gap-0.5 bg-red w-max">
                  <p>{item.Col2Row1}</p>
                  <p>{item.Col2Row2}</p>
                  <p>{item.Col2Row3}</p>
                  <p>{item.Col2Row4}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default ObjectMonitoring;
