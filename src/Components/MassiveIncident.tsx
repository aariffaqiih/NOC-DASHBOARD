import type { Component } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const RegionCellRenderer: Component<{ value: string }> = (props) => {
  const regions = props.value.split("\n");
  return (
    <>
      {regions.map((region) => (
        <div>{region}</div>
      ))}
    </>
  );
};

const MassiveIncident: Component = () => {
  const columnDefs = [
    { headerName: "Severity", field: "severity" },
    { headerName: "Title", field: "title" },
    { headerName: "City", field: "city" },
    {
      headerName: "Region",
      field: "region",
      cellRendererFramework: (params: any) => <RegionCellRenderer value={params.value} />,
    },
    { headerName: "Start Time", field: "startTime" },
    { headerName: "Duration", field: "duration" },
    { headerName: "Category", field: "category" },
    { headerName: "Root Cause", field: "rootCause" },
    { headerName: "Action", field: "action" },
  ];

  const rowData = [
    {
      severity: "Critical",
      title: "100 Sites Down (2G, 4G)",
      city: "Kota Surabaya, Kab. Sidoarjo",
      region: "1. Jawa Timur \n 2. Jawa Barat \n 3. Jawa Tengah",
      startTime: "2022-03-08 17:00:00",
      duration: "1h 30m",
      category: "Transmission",
      rootCause: "FO Telkom Cut at KM 30 from",
      action: "On Progress Searching",
    },
    {
      severity: "Critical",
      title: "120 Sites Down (2G)",
      city: "Kab. Morowali",
      region: "1. Sulawesi",
      startTime: "2022-03-08 17:00:00",
      duration: "20h 30m",
      category: "Transmission",
      rootCause: "FO Telkom PRT Cut (Under Investigate)",
      action: "On Progress Measurement",
    },
    {
      severity: "Major",
      title: "50 Sites Down (2G, 3G, 4G, 5G)",
      city: "Kab. Tegal",
      region: "1. Jawa Tengah\n2. DIY",
      startTime: "2022-03-08 17:00:00",
      duration: "20h 30m",
      category: "Power",
      rootCause: "PLN Power outage at Tegal Area",
      action: "On Progress Mobilization",
    },
  ];

  const defaultColDef = {
    flex: 1,
    sortable: true,
  };

  return (
    <div class="ag-theme-alpine-dark h-52 py-3 px-4 rounded-md bg-dark1">
      <AgGridSolid columnDefs={columnDefs} rowData={rowData} defaultColDef={defaultColDef} />
    </div>
  );
};

export default MassiveIncident;
