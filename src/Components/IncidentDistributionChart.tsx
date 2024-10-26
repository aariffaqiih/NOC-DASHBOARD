import type { Component } from "solid-js";
import { createEffect, onMount, Index } from "solid-js";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { dummyCardMaps } from "../Dummy";

interface CardListForMapItem {
  coloricon: string;
  title: string;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
}

interface CardListForMapsProp {
  cards: any[];
  startIndex?: number;
  endIndex?: number;
  indexData: number;
}

export function convertArrayOfArrays(datas: any[]): any[] {
  const outputArrayOfArrays: any[] = [];

  const arraydata = datas
    .map((item: any) => {
      const values = [item.value1, item.value2, item.value3, item.value4];
      const name = ["Low", "Minor", "Major", "Critical"];
      return values.map((value: number, index: number) => ({
        name: name[index],
        value: value,
      }));
    })
    .flat();

  for (let i = 0; i < arraydata.length; i += 4) {
    const slicedGroup = arraydata.slice(i, i + 4);
    outputArrayOfArrays.push(slicedGroup);
  }

  return outputArrayOfArrays;
}

export function getDataByIndex(datas: any[], index: number): any[] | undefined {
  if (index >= 0 && index < datas.length) {
    return datas[index];
  }
  return undefined;
}

const CardPieTypeC: Component<CardListForMapsProp> = (props) => {
  const { cards, indexData } = props;

  const data = getDataByIndex(cards, indexData);

  let refDiv: any;
  let root: any;

  createEffect(() => {
    if (root) {
      root.dispose();
    }
    Chart();
  });

  let Chart = () => {
    if (!data) return;

    let root = am5.Root.new(refDiv);
    let total = data.reduce((acc, cur) => acc + cur.value, 0);

    root._logo?.dispose();
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(85),
        radius: am5.percent(95),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
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
      forceHidden: true,
    });

    series.labels.template.setAll({
      forceHidden: true,
    });

    series.slices.template.setAll({
      cornerRadius: 100,
      stroke: am5.color("#060612"),
      strokeWidth: 1,
      toggleKey: "none",
      tooltipText: "",
    });

    series.slices.template.states.create("active", {});

    if (colors) {
      colors.set("colors", [am5.color("#E44F61"), am5.color("#FFB766"), am5.color("#69F6EC")]);
    }

    chart.seriesContainer.children.push(
      am5.Circle.new(root, {
        radius: 15,
        fill: am5.color("#060612"),
        centerX: am5.p50,
        centerY: am5.p50,
        shadowColor: am5.color("#25254"),
        shadowBlur: 18,
        shadowOpacity: 0.6,
      })
    );

    chart.seriesContainer.children.push(
      am5.Label.new(root, {
        fill: am5.color("#fff"),
        textAlign: "center",
        fontFamily: "Barlow",
        centerY: am5.p50,
        centerX: am5.p50,
        text: `[fontSize:13px fontWeight:700]${total}[/]`,
      })
    );

    // Set data
    // https://www.amcharts

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  };

  return <div ref={refDiv} class="xl:w-16 xl:h-16 off:w-10 off:h-10"></div>;
};

export default CardPieTypeC;
