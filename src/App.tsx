import { HopeProvider } from "@hope-ui/solid";
import Navbar from "./Layouts/Navbar";
import TopCards from "./Layouts/TopCards";
import RightCarts from "./Layouts/RightCart";
import BottomTable from "./Layouts/BottomTable";
import CenterCard, { cardMap, setcardMap, toggleit } from "./Layouts/CenterCard";
import LeftChart from "./Layouts/LeftChart";
import Forbidden from "./Layouts/Forbidden";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";

import "./index.css";
import TabListO from "./Layouts/TabList";

const App = () => {
  return (
    <HopeProvider>
      <div class="forbidden:block off:hidden select-none flex flex-col text-white">
        <Navbar />
        <div class="flex flex-col">
          <div class="flex justify-between">
            <div class="flex flex-col w-full">
              <TopCards />
              <div class="flex-auto flex items-start">
                <LeftChart />
                <div class="h-full flex w-full relative">
                  <CenterCard />
                  <div
                    class={cardMap() ? "hidden" : "bg-card flex fixed justify-center items-center border border-white z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden"}
                    style={{ height: "450px", width: "1063px" }}
                  >
                    <div onClick={toggleit(false)}>CLOSE</div>
                    <TabListO />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <RightCarts />
            </div>
          </div>
        </div>
        <BottomTable />
      </div>
      <div class="forbidden:hidden off:block bg-white">
        <Forbidden />
      </div>
    </HopeProvider>
  );
};

export default App;
