import type { Component } from "solid-js";
import { createEffect, onMount } from "solid-js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface PieData {
  name: string;
  value: number;
}

interface PropPieData {
  pie: PieData[];
}

const ActiveIncident: Component<PropPieData> = (props) => {
  let refDiv: any;
  let root: any;

  createEffect(() => {
    if (root) {
      root.dispose();
    }
    Chart();
  });

  const Chart = () => {
    console.log("ActiveIncident mounted");
    let root = am5.Root.new(refDiv);
    let total = props.pie.reduce((acc, cur) => acc + cur.value, 0);

    root._logo?.dispose();
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(80),
        radius: am5.percent(60),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "name",
        alignLabels: false,
      })
    );

    let colors = series.get("colors");

    series.ticks.template.setAll({
      stroke: am5.color("#fff"),
      strokeOpacity: 1,
      strokeWidth: 2,
    });

    series.labels.template.setAll({
      populateText: true,
      fill: am5.color("#fff"),
      fontSize: 13,
      fontWeight: "500",
      textAlign: "left",
      textType: "adjusted",
      text: `[]{valuePercentTotal.formatNumber('0.00')}%[/]\n{category}\n{value}`,
      radius: 20,
    });

    series.slices.template.setAll({
      cornerRadius: 100,
      stroke: am5.color("#060612"),
      strokeWidth: 4,
    });

    if (colors) {
      colors.set("colors", [am5.color("#796CFF"), am5.color("#69F6EC"), am5.color("#FFB766"), am5.color("#E44F61")]);
    }

    let contain = chart.seriesContainer.children.push(
      am5.Circle.new(root, {
        radius: 50,
        fill: am5.color("#060612"),
        centerX: am5.p50,
        centerY: am5.p50,
        shadowColor: am5.color("#25254"),
        shadowBlur: 18,
        shadowOpacity: 0.6,
      })
    );

    let label = chart.seriesContainer.children.push(
      am5.Label.new(root, {
        fill: am5.color("#fff"),
        textAlign: "center",
        centerY: am5.p50,
        centerX: am5.p50,
        text: `[fontSize:20px fontWeight:700]${total}[/]\n[fontSize:16px #5467BF]100%[/]`,
      })
    );

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(props.pie);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  };

  return <div ref={refDiv} class="h-72 w-72"></div>;
};

export default ActiveIncident;
