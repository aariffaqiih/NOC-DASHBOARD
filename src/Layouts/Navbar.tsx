import { Component } from "solid-js";
import logo from "../Images/LogoINAP.png";

const Navbar: Component = () => {
  return (
    <div class="pt-3 px-3 flex gap-3.5 items-center">
      <img src={logo} class="h-9" />
      <b class="text-2xl">NOC Dashboard</b>
    </div>
  );
};

export default Navbar;
