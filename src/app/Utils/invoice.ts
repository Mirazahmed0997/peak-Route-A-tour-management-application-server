import PDFDocument from "pdfkit"
import AppError from "../errorHelper/AppError"
import { resolve } from "path"


export interface InvoiceData{
    transactionId: string;
    bookingDate:Date;
    userName:string;
    guestCount:number;
    totalAmount:number;
    tourTitle:string;
}


export const generatePdf= async (invoiceData: InvoiceData): Promise<Buffer>=>
{
    try {


        return new Promise((resolve,reject)=>
        {
            const doc= new PDFDocument({size:"A4", margin: 50})
            const buffer:Uint8Array[]=[]

            doc.on("data",(chunk)=>buffer.push(chunk))
            doc.on("end",()=>resolve(Buffer.concat(buffer)))
            doc.on("error",(err)=>reject(err))

            // pdf content

            doc.fontSize(20).text("Invoice", {align:"center"})
            doc.moveDown()
            doc.fontSize(14).text(`Transaction ID : ${invoiceData.transactionId}`)
            doc.text(`Booking Date : ${invoiceData.bookingDate}`)
            doc.text(`Customer  : ${invoiceData.userName}`)

            doc.moveDown()


            doc.text(`Tour  : ${invoiceData.tourTitle}`)
            doc.text(`Guests  : ${invoiceData.guestCount}`)
            doc.text(`Total Amount  : ${invoiceData.totalAmount.toFixed(2)}`)
            doc.moveDown()


            doc.text(`Thannk you for booking with us`,{align: "center"})
            doc.end()



        })
        
    } catch (error) {
        console.log(error)
        throw new AppError(401,"pdf creation error")
    }
}