import { Component } from "solid-js";
import OutlineSuccess from "../Images/Success.svg";
import ProjectDiagram from "../Images/Diagram.svg";
import RadioTower from "../Images/Tower.svg";
import ObjectMonitoring from "../Components/ObjectMonitoring";
import "../index.css";

const TopCards: Component = () => {
  return (
    <div class="off:mr-2 md-dashboard:mr-7 md-dashboard:ml-9 off:ml-2 mb-7 ">
      <div class="flex mb-5 items-center justify-between" id="TopCards">
        <div class="h-5 w-24"></div>
        <b class="">Object Monitoring</b>
        <div class="flex justify-between h-5 w-24">
          <img src={OutlineSuccess} />
          <img src={ProjectDiagram} />
          <img src={RadioTower} />
        </div>
      </div>

      <ObjectMonitoring />
    </div>
  );
};

export default TopCards;
