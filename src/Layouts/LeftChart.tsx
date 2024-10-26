import { Component } from "solid-js";

import { DummyActiveAlarm, DummyActiveIncident } from "../Dummy";
import ActiveIncident from "../Components/ActiveIncident";
import AverageDuration from "../Components/AverageDuration";
import ActiveAlarm from "../Components/ActiveAlarm";
import ActiveEvent from "../Components/ActiveEvent";

const LeftChart: Component = () => {
  return (
    <div class="off:ml-2 md-dashboard:ml-9 1 grid">
      <div>
        <b class="">Active Incident</b>
        <ActiveAlarm pie={DummyActiveAlarm} />
      </div>

      <ActiveEvent pie={DummyActiveAlarm} />
    </div>
  );
};

export default LeftChart;
