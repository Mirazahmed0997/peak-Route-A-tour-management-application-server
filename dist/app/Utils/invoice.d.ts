export interface InvoiceData {
    transactionId: string;
    bookingDate: Date;
    userName: string;
    guestCount: number;
    totalAmount: number;
    tourTitle: string;
}
export declare const generatePdf: (invoiceData: InvoiceData) => Promise<Buffer>;
//# sourceMappingURL=invoice.d.ts.map