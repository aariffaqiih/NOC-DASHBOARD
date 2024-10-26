import type { Component } from "solid-js";
import styles from "./card_pietypea.module.css";
import { createEffect, onMount } from "solid-js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface PieData {
  name: string;
  value: number;
}

interface PropPieData {
  pie: PieData[];
}

const ActiveEvent: Component<PropPieData> = (props) => {
  let refDiv: any;
  let root: any;

  createEffect(() => {
    if (root) {
      root.dispose();
    }
    Chart();
  });

  const Chart = () => {
    console.log("CardPieTypeA mounted");
    let root = am5.Root.new(refDiv);
    let total = props.pie.reduce((acc, cur) => acc + cur.value, 0);

    root._logo?.dispose();
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(85),
        radius: am5.percent(60),
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "name",
        alignLabels: false,
      })
    );

    let colors = series.get("colors");

    series.ticks.template.setAll({
      forceHidden: true,
    });

    series.labels.template.setAll({
      populateText: true,
      fill: am5.color("#fff"),
      fontSize: 13,
      fontWeight: "500",
      textAlign: "left",
      textType: "adjusted",
      text: `[]{valuePercentTotal.formatNumber('0.00')}%[/]\n{category}\n{value}`,
    });

    if (colors) {
      colors.set("colors", [am5.color("#3CACFF"), am5.color("#FCB439"), am5.color("#DA3CF5"), am5.color("#80FFAB"), am5.color("#801FFF")]);
    }

    let chartCover = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
      })
    );

    let label = chartCover.seriesContainer.children.push(
      am5.Label.new(root, {
        fill: am5.color("#fff"),
        textAlign: "center",
        centerY: am5.p50,
        centerX: am5.p50,
        text: `[fontSize:20px fontWeight:700]${total}[/]\n[fontSize:18px fontWeight:400 #5467BF]100%[/]`,
      })
    );

    let secondAxisRenderer = am5radar.AxisRendererCircular.new(root, {
      radius: am5.percent(70),
      strokeOpacity: 0,
      minGridDistance: 1,
    });

    let secondXAxis = chartCover.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 60,
        strictMinMax: true,
        renderer: secondAxisRenderer,
        maxPrecision: 0,
      })
    );

    secondAxisRenderer.labels.template.setAll({
      fill: am5.color("#fff"),
      forceHidden: true,
    });

    secondAxisRenderer.ticks.template.setAll({
      stroke: am5.color("#060612"),
      strokeOpacity: 1,
      strokeWidth: 3,
      visible: true,
      length: 18,
    });

    series.data.setAll(props.pie);
  };

  return <div ref={refDiv} class="h-72 w-72"></div>;
};

export default ActiveEvent;
