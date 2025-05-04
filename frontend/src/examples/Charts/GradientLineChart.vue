<template>
  <div class="pb-0 card-header">
    <h6>Data fetched from the database</h6>
    <p class="text-sm">
      <i class="fa fa-arrow-up text-success"></i>
      <span class="font-weight-bold">Verify the data in Swagger API</span> (/api/dashboard/line-chart)
    </p>
  </div>
  <div class="p-3 card-body">
    <div class="chart">
      <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "GradientLineChart",

  mounted() {
    const ctx2 = document.getElementById("chart-line").getContext("2d");

    const gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);
    gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke1.addColorStop(0, "rgba(203,12,159,0)");

    const gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);
    gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
    gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke2.addColorStop(0, "rgba(20,23,39,0)");

    fetch("/api/dashboard/line-chart")
      .then((res) => res.json())
      .then((chartData) => {
        new Chart(ctx2, {
          type: "line",
          data: {
            labels: chartData.labels,
            datasets: chartData.datasets.map((ds) => ({
              ...ds,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 0,
              fill: true,
              borderColor: ds.label === "Mobile apps" ? "#cb0c9f" : "#3A416F",
              backgroundColor: ds.label === "Mobile apps" ? gradientStroke1 : gradientStroke2,
              maxBarThickness: 6,
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  display: true,
                  padding: 10,
                  color: "#b2b9bf",
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  display: true,
                  color: "#b2b9bf",
                  padding: 20,
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
            },
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load chart data:", err);
      });
  },
};
</script>
