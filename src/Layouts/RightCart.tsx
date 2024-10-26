import { Component } from "solid-js";

import { AAID, DummyActiveIncident, GaugeData } from "../Dummy";
import ActiveIncident from "../Components/ActiveIncident";
import AverageDuration from "../Components/AverageDuration";
import Category from "../Components/Category";

const RightCarts: Component = () => {
  return (
    <div class="0 grid gap-8 off:mr-2 md-dashboard:mr-9">
      <div>
        <b>
          <p class="">Active Incident</p>
        </b>
        <ActiveIncident pie={DummyActiveIncident} />
      </div>

      <div>
        <b>
          <p class="mb-5">Average Active Incident Duration</p>
        </b>
        <AverageDuration pie={AAID} />
      </div>

      <div>
        <b>
          <p class="">Category</p>
        </b>
        <div class="">
          <Category pie={GaugeData} />
        </div>
      </div>
    </div>
  );
};

export default RightCarts;
