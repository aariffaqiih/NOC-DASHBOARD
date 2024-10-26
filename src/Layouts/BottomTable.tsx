import { Component } from "solid-js";

import MassiveIncident from "../Components/MassiveIncident";

const BottomTable: Component = () => {
  return (
    <div class="off:mx-2 md-dashboard:mx-9">
      <b class="">Massive Incident</b>
      <MassiveIncident />
    </div>
  );
};

export default BottomTable;
