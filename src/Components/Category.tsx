import type { Component } from "solid-js";
import { For, createEffect, onMount } from "solid-js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { colorforLegend } from "../Dummy";

interface GaugeData {
  name: string;
  value: number;
}

interface PropGaugeData {
  pie: GaugeData[];
}

const Category: Component<PropGaugeData> = (props) => {
  let refDiv: any;
  let root: any;

  createEffect(() => {
    if (root) {
      root.dispose();
    }
    Chart();
  });

  let colorIndex = -1;

  let Chart = () => {
    let totalfull = props.pie.reduce((acc, cur) => acc + cur.value, 0);
    let fullvalue = props.pie.map((items) => ({
      ...items,
      full: totalfull,
    }));

    console.log(fullvalue);
    let root = am5.Root.new(refDiv);
    root._logo?.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        innerRadius: am5.percent(60),
        layout: root.verticalLayout,
        paddingBottom: 0,
        paddingTop: 0,
        centerY: 10,
      })
    );

    let colors = chart.get("colors");
    colors?.set("colors", [am5.color("#4EEFE5"), am5.color("#7D40FF"), am5.color("#D320FF")]);

    let indexMap = fullvalue.map((items) => {
      colorIndex++;
      let settings = {
        fill: chart.get("colors")?.getIndex(colorIndex),
      };
      return {
        ...items,
        columnSettings: settings,
      };
    });

    // Create axes and their renderers
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
    let xRenderer = am5radar.AxisRendererCircular.new(root, {});

    xRenderer.labels.template.setAll({
      radius: 0,
      forceHidden: true,
    });

    xRenderer.grid.template.setAll({
      forceHidden: true,
    });

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: totalfull,
        strictMinMax: true,
      })
    );

    let yRenderer = am5radar.AxisRendererRadial.new(root, {});

    yRenderer.labels.template.setAll({
      forceHidden: true,
    });

    yRenderer.grid.template.setAll({
      forceHidden: true,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: yRenderer,
      })
    );

    yAxis.data.setAll(indexMap);

    let series1 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "full",
        categoryYField: "name",
        fill: am5.color("#1C1C39"),
      })
    );

    series1.columns.template.setAll({
      height: am5.percent(50),
      width: am5.p100,
      fillOpacity: 1,
      strokeOpacity: 0,
      cornerRadius: 100,
    });

    series1.data.setAll(indexMap);

    let series2 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "value",
        categoryYField: "name",
      })
    );

    series2.columns.template.setAll({
      height: am5.percent(50),
      strokeOpacity: 0,
      cornerRadius: 20,
      templateField: "columnSettings",
    });

    series2.data.setAll(indexMap);

    let chartCover = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        position: "relative",
        paddingBottom: 0,
        paddingTop: 0,
        centerY: 10,
      })
    );

    chartCover.seriesContainer.children.push(
      am5.Circle.new(root, {
        radius: 45,
        fill: am5.color("#060612"),
        centerX: am5.p50,
        centerY: am5.p50,
        shadowColor: am5.color("#25254"),
        shadowBlur: 18,
        shadowOpacity: 0.6,
      })
    );

    chartCover.seriesContainer.children.push(
      am5.Label.new(root, {
        fill: am5.color("#fff"),
        textAlign: "center",
        centerY: am5.p50,
        centerX: am5.p50,
        text: `[fontSize:20px fontWeight:700]${totalfull}[/]\n[fontSize:18px fontWeight:400 #5467BF]100%[/]`,
      })
    );

    series1.appear(1000);
    series2.appear(1000, 200);
    chart.appear(1000, 100);
  };

  let colorLegend = props.pie.map((items) => {
    colorIndex++;
    return {
      ...items,
      color: colorforLegend[colorIndex],
    };
  });

  let legendData = colorLegend.map((legend) => (
    <>
      <div class="font-medium">
        <span class="flex items-center text-sm">
          <div class="rounded-full w-2.5 h-2.5 mr-2" style={`background:${legend.color}`} />
          {legend.name}
        </span>
        <span style={`color:#fff`} class="flex items-center text-sm">
          <div class="w-2.5 h-2.5 mr-2" />
          {legend.value}
        </span>
      </div>
    </>
  ));

  return (
    <div class="11 flex flex-col">
      <div ref={refDiv} class="w-72 h-72" />
      <div class="flex justify-center gap-3 relative bottom-3">{legendData}</div>
    </div>
  );
};

export default Category;
