import useDashboardStore from '@/stores/dashboard';
import React, { useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

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

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      <p>Error: {error}</p>
    </div>
  );

  // Data สำหรับกราฟหลายแบบ
  const userData = {
    labels: ['Users'],
    datasets: [
      {
        label: 'จำนวนผู้ใช้งาน',
        data: [userCount],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const newUserData = {
    labels: ['New Users in Last 7 Days'],
    datasets: [
      {
        label: 'จำนวนผู้ลงทะเบียน 7 วันที่ผ่านมา',
        data: [newUserCount],
        backgroundColor: '#0D9488',
      },
    ],
  };

  const promotionData = {
    labels: ['Active Promotions'],
    datasets: [
      {
        label: 'โปรโมชั่นที่ใช้งาน',
        data: [activePromotions],
        backgroundColor: ['#10B981', '#F3F4F6'],
      },
    ],
  };

  const orderData = {
    labels: ['Total Orders'],
    datasets: [
      {
        label: 'จำนวนออเดอร์',
        data: [totalOrders],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
      },
    ],
  };

  const pendingOrderData = {
    labels: ['Pending Orders'],
    datasets: [
      {
        label: 'คำสั่งซื้อที่ยังไม่ชำระ',
        data: [pendingOrders],
        backgroundColor: '#F87171',
      },
    ],
  };

  const revenueData = {
    labels: ['Total Revenue'],
    datasets: [
      {
        label: 'รายได้รวม',
        data: [totalRevenue],
        backgroundColor: ['#8B5CF6', '#E5E7EB'],
      },
    ],
  };

  const pcBuildData = {
    labels: ['PC Builds'],
    datasets: [
      {
        label: 'จำนวน PC Build',
        data: [pcBuildCount],
        backgroundColor: '#14B8A6',
      },
    ],
  };

  const averageOrderValueData = {
    labels: ['Average Order Value'],
    datasets: [
      {
        label: 'ค่าเฉลี่ยการสั่งซื้อ',
        data: [averageOrderValue],
        backgroundColor: '#6B7280',
      },
    ],
  };

  const couponUsedData = {
    labels: ['Coupons Used'],
    datasets: [
      {
        label: 'จำนวนคูปองที่ใช้แล้ว',
        data: [couponUsedCount],
        backgroundColor: '#FB923C',
      },
    ],
  };

  const orderStatusData = {
    labels: orderStatusCounts.map((status) => status.status),
    datasets: [
      {
        label: 'จำนวนคำสั่งซื้อแยกตามสถานะ',
        data: orderStatusCounts.map((status) => status.count),
        backgroundColor: ['#60A5FA', '#F87171', '#34D399', '#FBBF24'],
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
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center fade-in">Dashboard</h1>

      {/* Cards with hover effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">จำนวนผู้ใช้งาน</h3>
            <p className="text-2xl font-bold text-blue-500">{userCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">จำนวนผู้ลงทะเบียน 7 วันที่ผ่านมา</h3>
            <p className="text-2xl font-bold text-blue-500">{newUserCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">จำนวนโปรโมชั่นที่ใช้งาน</h3>
            <p className="text-2xl font-bold text-green-500">{activePromotions}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">คูปองที่ใช้แล้ว</h3>
            <p className="text-2xl font-bold text-teal-500">{couponUsedCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">จำนวนออเดอร์</h3>
            <p className="text-2xl font-bold text-yellow-500">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">คำสั่งซื้อที่ยังไม่ชำระเงิน</h3>
            <p className="text-2xl font-bold text-yellow-500">{pendingOrders}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">ค่าเฉลี่ยการสั่งซื้อ</h3>
            <p className="text-2xl font-bold text-teal-500">{averageOrderValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">รายได้รวม</h3>
            <p className="text-2xl font-bold text-purple-500">{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between hover:shadow-lg transition-all hover:bg-gray-100 transform hover:scale-105">
          <div>
            <h3 className="text-xl font-medium text-gray-700">จำนวน PC Build</h3>
            <p className="text-2xl font-bold text-teal-500">{pcBuildCount}</p>
          </div>
        </div>

      </div>



      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        {/* จำนวนผู้ใช้งาน */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Bar data={userData} options={chartOptions} />
        </div>

        {/* จำนวนผู้ลงทะเบียน 7 วันที่ผ่านมา */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Bar data={newUserData} options={chartOptions} />
        </div>

        {/* จำนวนโปรโมชั่นที่ใช้งาน */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Pie data={promotionData} options={chartOptions} />
        </div>

        {/* คูปองที่ใช้แล้ว */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Pie data={couponUsedData} options={chartOptions} />
        </div>

        {/* จำนวนออเดอร์ */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Line data={orderData} options={chartOptions} />
        </div>

        {/* คำสั่งซื้อที่ยังไม่ชำระเงิน */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Bar data={pendingOrderData} options={chartOptions} />
        </div>

        {/* ค่าเฉลี่ยการสั่งซื้อ */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Bar data={averageOrderValueData} options={chartOptions} />
        </div>

        {/* รายได้รวม */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Pie data={revenueData} options={chartOptions} />
        </div>

        {/* จำนวน PC Build */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Bar data={pcBuildData} options={chartOptions} />
        </div>

        {/* ข้อมูลคำสั่งซื้อแยกตามสถานะ */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <Doughnut data={orderStatusData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default FormDashboard;