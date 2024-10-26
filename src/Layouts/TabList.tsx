import { Component } from "solid-js";
import logo from "../Images/LogoINAP.png";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";

const TabListO: Component = () => {
  return (
    <Tabs class="h-full w-full" fitted>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanel class="h-full">
        <b class="text-2xl">Tab 1</b> <br />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi voluptate consequatur velit alias quis officia distinctio perferendis delectus illo, est quasi minus beatae rem? Doloribus, assumenda aut! Quae est nisi atque
        perferendis commodi, repellat quaerat doloribus fugit labore laboriosam voluptatem, praesentium id eaque ipsam, ipsum accusamus consectetur rem quisquam dignissimos.
      </TabPanel>
      <TabPanel class="h-full">
        <b class="text-2xl">Tab 2</b> <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas beatae qui accusamus, sit, nesciunt animi dolorum inventore aperiam nostrum odit iure voluptatum perspiciatis soluta vitae rem? Nesciunt doloremque voluptate libero! Rem,
        amet officia nemo ea necessitatibus deleniti odio! Pariatur similique aliquam repellendus sequi odit exercitationem eius odio molestias, dolorum cum?
      </TabPanel>
    </Tabs>
  );
};

export default TabListO;
