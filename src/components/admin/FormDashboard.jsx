import useDashboardStore from "@/stores/dashboard";
import React, { useEffect } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { TrendingUp, Users, Package, Tag, Clock, DollarSign, Gift, Ticket, BarChart2, LayoutDashboard } from "lucide-react";

const FormDashboard = () => {
  const {
    userCount,
    newUserCount,
    activePromotions,
    totalOrders,
    totalRevenue,
    averageOrderValue,
    pcBuildCount,
    pendingOrders,
    couponUsedCount,
    orderStatusCounts,
    loading,
    error,
    fetchDashboardData,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );

  const chartColors = {
    blue: "#3b82f6",
    purple: "#a855f7",
    yellow: "#eab308",
    indigo: "#6366f1"
  };

  const userData = {
    labels: ["Users"],
    datasets: [
      { label: "User Count", data: [userCount], backgroundColor: chartColors.blue },
    ],
  };

  const newUserData = {
    labels: ["New Users in Last 7 Days"],
    datasets: [
      {
        label: "New Registrations",
        data: [newUserCount],
        backgroundColor: chartColors.blue,
      },
    ],
  };

  const promotionData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Active Promotions",
        data: [activePromotions, 100 - activePromotions],
        backgroundColor: [chartColors.indigo, "#E5E7EB"],
      },
    ],
  };

  const orderData = {
    labels: ["Total Orders"],
    datasets: [
      {
        label: "Orders",
        data: [totalOrders],
        borderColor: chartColors.yellow,
        backgroundColor: `${chartColors.yellow}33`,
      },
    ],
  };

  const pendingOrderData = {
    labels: ["Pending Orders"],
    datasets: [
      {
        label: "Pending Orders",
        data: [pendingOrders],
        backgroundColor: chartColors.yellow,
      },
    ],
  };

  const revenueData = {
    labels: ["Revenue", "Target"],
    datasets: [
      {
        label: "Revenue",
        data: [totalRevenue, totalRevenue * 1.2],
        backgroundColor: [chartColors.purple, "#E5E7EB"],
      },
    ],
  };

  const pcBuildData = {
    labels: ["PC Builds"],
    datasets: [
      { label: "PC Builds", data: [pcBuildCount], backgroundColor: chartColors.purple },
    ],
  };

  const averageOrderValueData = {
    labels: ["Average Order Value"],
    datasets: [
      {
        label: "Avg Order Value",
        data: [averageOrderValue],
        backgroundColor: chartColors.yellow,
      },
    ],
  };

  const couponUsedData = {
    labels: ["Used", "Available"],
    datasets: [
      {
        label: "Used Coupons",
        data: [couponUsedCount, couponUsedCount * 1.5],
        backgroundColor: [chartColors.indigo, "#E5E7EB"],
      },
    ],
  };

  const orderStatusData = {
    labels: orderStatusCounts.map((status) => status.status),
    datasets: [
      {
        label: "Order Status Counts",
        data: orderStatusCounts.map((status) => status.count),
        backgroundColor: [chartColors.blue, chartColors.yellow, chartColors.purple, chartColors.indigo],
      },
    ],
  };

  // Chart options with animations and tooltips
  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000, // Animation duration
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const statCards = [
    { title: "User Count", value: userCount, icon: Users, color: "blue" },
    { title: "New Registrations", value: newUserCount, icon: TrendingUp, color: "blue" },
    { title: "Customize Spec", value: pcBuildCount, icon: Package, color: "purple" },
    { title: "Total Orders", value: totalOrders, icon: BarChart2, color: "yellow" },
    { title: "Pending Orders", value: pendingOrders, icon: Clock, color: "yellow" },
    { title: "Avg Order Value", value: averageOrderValue.toLocaleString(), icon: DollarSign, color: "yellow" },
    { title: "Active Promotions", value: activePromotions, icon: Gift, color: "indigo" },
    { title: "Used Coupons", value: couponUsedCount, icon: Ticket, color: "indigo" },
    { title: "Total Revenue", value: totalRevenue.toLocaleString(), icon: Tag, color: "purple" },
  ];

  const getColorClass = (color) => {
    const colorMap = {
      blue: "text-blue-500",
      purple: "text-purple-500",
      yellow: "text-yellow-500",
      indigo: "text-indigo-500"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto">
        <div className="flex flex-col items-start gap-3 mb-8">
          <div className="flex flex-row gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          </div>
          <p className="text-slate-600">Monitor key metrics and performance indicators for your business</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${getColorClass(stat.color)}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${getColorClass(stat.color)}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">User Statistics</h3>
              <Bar data={userData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">New Users Trend</h3>
              <Bar data={newUserData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Customize Spec Statistics</h3>
              <Bar data={pcBuildData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Order Trend</h3>
              <Line data={orderData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Pending Orders</h3>
              <Bar data={pendingOrderData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Average Order Value</h3>
              <Bar data={averageOrderValueData} options={chartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Order Status Distribution</h3>
              <Doughnut data={orderStatusData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Active Promotions</h3>
              <Pie data={promotionData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Coupon Usage</h3>
              <Pie data={couponUsedData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Revenue Distribution</h3>
              <Pie data={revenueData} options={chartOptions} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDashboard;
