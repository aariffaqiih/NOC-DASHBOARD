import type { Component } from "solid-js";
import { For, createEffect, onMount } from "solid-js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_indonesiaLow from "@amcharts/amcharts5-geodata/indonesiaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { toggleit } from "../Layouts/CenterCard";

interface MapData {
  name: string;
  value: number;
}

interface PropMapData {
  pie: MapData[];
}

const Map: Component = (props) => {
  let refDiv: any;
  let root: any;

  createEffect(() => {
    if (root) {
      root.dispose();
    }
    Chart();
  });

  let colors: any = {
    CYAN: am5.color("#1645FF"),
    GREEN: am5.color("#50A93E"),
    BLUE: am5.color("#23CBD8"),
    PURPLE: am5.color("#AE29FF"),
  };

  const idMapas = [
    { id: "ID-AC", colormap: "CYAN" },
    { id: "ID-SU", colormap: "CYAN" },
    { id: "ID-RI", colormap: "CYAN" },
    { id: "ID-KR", colormap: "CYAN" },
    { id: "ID-SB", colormap: "CYAN" },
    { id: "ID-BE", colormap: "CYAN" },
    { id: "ID-JA", colormap: "CYAN" },
    { id: "ID-BB", colormap: "CYAN" },
    { id: "ID-SS", colormap: "CYAN" },
    { id: "ID-LA", colormap: "CYAN" },
    { id: "ID-KT", colormap: "GREEN" },
    { id: "ID-KU", colormap: "GREEN" },
    { id: "ID-KS", colormap: "GREEN" },
    { id: "ID-KB", colormap: "GREEN" },
    { id: "ID-KI", colormap: "GREEN" },
    { id: "ID-SN", colormap: "GREEN" },
    { id: "ID-ST", colormap: "GREEN" },
    { id: "ID-SR", colormap: "GREEN" },
    { id: "ID-SG", colormap: "GREEN" },
    { id: "ID-GO", colormap: "GREEN" },
    { id: "ID-SA", colormap: "GREEN" },
    { id: "ID-MU", colormap: "GREEN" },
    { id: "ID-MA", colormap: "GREEN" },
    { id: "ID-PB", colormap: "GREEN" },
    { id: "ID-PA", colormap: "GREEN" },
    { id: "ID-JK", colormap: "BLUE" },
    { id: "ID-BT", colormap: "BLUE" },
    { id: "ID-JK", colormap: "BLUE" },
    { id: "ID-JT", colormap: "PURPLE" },
    { id: "ID-YO", colormap: "PURPLE" },
    { id: "ID-JI", colormap: "PURPLE" },
    { id: "ID-BA", colormap: "PURPLE" },
    { id: "ID-NT", colormap: "PURPLE" },
    { id: "ID-NB", colormap: "PURPLE" },
    { id: "ID-JB", colormap: "PURPLE" },
  ];

  let indexMap = idMapas.map((items, index) => {
    let settings = {
      fill: colors[idMapas[index].colormap],
      stroke: colors[idMapas[index].colormap],
    };
    return {
      ...items,
      polygonSettings: settings,
    };
  });

  let Chart = () => {
    let root = am5.Root.new(refDiv);
    root._logo?.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_indonesiaLow,
        exclude: ["MY-13", "MY-12", "BN", "TL"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      templateField: "polygonSettings",
      fillOpacity: 0.6,
      strokeWidth: 2,
      strokeOpacity: 0.9,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fillOpacity: 1,
    });

    let previousPolygon: any;

    polygonSeries.mapPolygons.template.on("active", function (active: any, target: any) {
      if (previousPolygon && previousPolygon != target) {
        previousPolygon.set("active", false);
      }
      if (target.get("active")) {
   
        toggleit(true);
      } else {
        closing();
      }
      previousPolygon = target;
    });

    function closing() {
      chart.goHome();
      toggleit(false);
    }

    polygonSeries.data.setAll(indexMap);

    chart.chartContainer.get("background")?.events.on("click", function () {
      chart.goHome();
    });

    // Make stuff animate on load
    chart.appear(1000, 100);
  };

  return <div ref={refDiv} class="h-full w-full absolute bottom-0" />;
};

export default Map;
