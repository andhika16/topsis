import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useAlternatifContext } from "../context/AlternatifContext";

const PopulationChart = () => {
  const { state } = useAlternatifContext();
  const data = state.data;
  const chartRef = useRef(null);
  let myChart = useRef(null);
  useEffect(() => {
    if (myChart.current) {
      myChart.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    myChart.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item.nama_alternatif),
        datasets: [
          {
            label: "Jenis Kelamin",
            data: data.map((item) => 1), // Dummy data, karena data jenis kelamin unik
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
            ], // Warna untuk laki-laki dan perempuan
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return (
                  tooltipItem.label + ": " + tooltipItem.raw.toFixed(2) + "%"
                );
              },
            },
          },
        },
      },
    });
    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PopulationChart;
