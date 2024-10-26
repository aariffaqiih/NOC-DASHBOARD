import { Component } from "solid-js";
import forbidden from "../Images/Forbidden.svg";

const Forbidden: Component = () => {
  return (
    <div class="mx-12">
      <img src={forbidden} class="h-screen" />
    </div>
  );
};

export default Forbidden;
