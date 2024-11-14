import { create } from "zustand";
import { getDashBoard } from "@/API/dashboard-api";

const useDashboardStore = create((set) => ({
    userCount: 0,
    newUserCount: 0,
    activePromotions: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    pcBuildCount: 0,
    couponUsedCount: 0,
    orderStatusCounts: [],
    loading: false,
    error: null,

    
    fetchDashboardData: async () => {
        set({ loading: true, error: null })
        try {
            const response = await getDashBoard()
            console.log('API Response', response.data);  // ตรวจสอบว่าได้รับข้อมูลจาก API หรือไม่
            const { userCount, newUserCount, activePromotions, totalOrders, totalRevenue, averageOrderValue, pendingOrders, pcBuildCount, couponUsedCount, orderStatusCounts} = response.data
            set({
                userCount,
                newUserCount,
                activePromotions,
                totalOrders,
                totalRevenue,
                averageOrderValue,
                pendingOrders,
                pcBuildCount,
                couponUsedCount,
                orderStatusCounts,
                loading: false
            })
        } catch (err) {
            console.error('Error fetching dashboard data:', err)
            set({ error: err.message, loading: false })
        }
    }
    
}))

export default useDashboardStore