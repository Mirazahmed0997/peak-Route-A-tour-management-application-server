export declare const StatsService: {
    getBookingStats: () => Promise<{
        totalBookingCount: number;
        totalBookingByStatus: any[];
        bookingsPerTour: any[];
        avgGuestCountPerBooking: any[];
        bookingLastSevenDays: number;
        bookingLastThirtyDays: number;
        totalBookingForSingleUsers: any;
    }>;
    getUserStat: () => Promise<{
        totalUsers: number;
        totalActiveUsers: number;
        totalInActiveUSer: number;
        totalBlockUSer: number;
        newUSersInLAstSevenDays: number;
        newUSersInLAstThirtyDays: number;
        usersByRole: any[];
    }>;
    getTourStat: () => Promise<{
        totalTour: number;
        totalTourByTourType: any[];
        avgTourCost: any[];
        totalTourByDivision: any[];
        totalHighestBookedTour: any[];
    }>;
    getPaymentStats: () => Promise<{
        totalPayment: number;
        totalRevenueByStatus: any[];
        totalPaymentByStatus: any[];
        avgPayment: any[];
        paymentGetwayData: any[];
    }>;
};
//# sourceMappingURL=StatsService.d.ts.map