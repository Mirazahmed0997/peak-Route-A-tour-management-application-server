export declare const PaymentService: {
    successPayment: (query: Record<string, string>) => Promise<{
        success: boolean;
        message: string;
    }>;
    failPayment: (query: Record<string, string>) => Promise<{
        success: boolean;
        message: string;
    }>;
    cancelPayment: (query: Record<string, string>) => Promise<{
        success: boolean;
        message: string;
    }>;
    initPayment: (bookingId: string) => Promise<{
        paymentUrl: any;
    }>;
    getInvoiceDownloadUrl: (paymentId: string) => Promise<string>;
};
//# sourceMappingURL=Payment.secvice.d.ts.map