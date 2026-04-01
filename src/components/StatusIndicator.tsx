import { clsx } from "clsx";
import React from "react";

const StatusIndicator = async () => {
  let statusColor = "bg-green-500";
  let pingColor = "bg-green-400";
  try {
    const response = await fetch("https://api.uptimerobot.com/v2/getMonitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.UPTIMEROBOT_API_KEY,
        monitors: "790776048-796973317-791762453-790867422-790867417",
      }),
      next: { revalidate: 600 },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.stat === "ok") {
        const monitors = data.monitors;
        const upCount = monitors.filter(
          (monitor) => monitor.status === 2
        ).length;
        const downCount = monitors.filter(
          (monitor) => monitor.status === 9 || monitor.status === 8
        ).length;

        if (upCount === monitors.length) {
          statusColor = "bg-green-500"; // All up
          pingColor = "bg-green-400";
        } else if (downCount === monitors.length) {
          statusColor = "bg-red-500"; // All down
          pingColor = "bg-red-400";
        } else if (downCount > 0) {
          statusColor = "bg-yellow-500"; // Some down
          pingColor = "bg-yellow-400";
        } else {
          statusColor = "bg-green-500"; // Default to green if no critical issues
          pingColor = "bg-green-400";
        }
      }
    } else {
      // Fallback to green if API rate limit or other issues
      statusColor = "bg-green-500";
      pingColor = "bg-green-400";
    }
  } catch (error) {
    console.log(error);
    statusColor = "bg-green-500";
    pingColor = "bg-green-400";
  }
  return (
    <span className="relative flex h-3 w-3 mr-1">
      <span
        className={clsx(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          pingColor
        )}
      ></span>
      <span
        className={clsx(
          "relative inline-flex rounded-full h-3 w-3",
          statusColor
        )}
      ></span>
    </span>
  );
};

export default StatusIndicator;
