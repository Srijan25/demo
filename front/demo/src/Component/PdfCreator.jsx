import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assests/logo.jpg";

export class PdfCreator {
  create(databyid) {
    const { accounts, customerName, amount, sanctionDate, expiryDate } = databyid;

    this.doc = new jsPDF();
    const imgWidth = 10;
    const imgHeight = 10;
    this.doc.addImage(logo, "JPEG", 10, 10, imgWidth, imgHeight);

    this.doc.setTextColor(255, 0, 0);
    this.doc.setFontSize(24);
    this.doc.setFont(undefined, "bold").text("Report", 70, 15);

    this.doc.setFontSize(12);
    this.doc.setTextColor(0, 0, 0);

    const tableData = [
      ["Accounts", accounts],
      ["Customer Name", customerName],
      ["Amount", amount],
      ["Sanction Date", sanctionDate.substring(0, 10)],
      ["Expiry Date", expiryDate.substring(0, 10)],
    ];

    this.doc.autoTable({
      theme: "grid",
      startY: 30,
      head: [["Data", "Details"]],
      body: tableData,
    });

    this.doc.save("Report.pdf");
  }
}
