const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// Generate PDF document
const generatePDF = async (data, template, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Add content based on template
    switch (template) {
      case 'loan-agreement':
        generateLoanAgreement(doc, data);
        break;
      case 'receipt':
        generateReceipt(doc, data);
        break;
      case 'report':
        generateReport(doc, data);
        break;
      default:
        reject(new Error('Invalid template type'));
        return;
    }

    doc.end();

    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
};

// Generate Excel workbook
const generateExcel = async (data, template, outputPath) => {
  const workbook = new ExcelJS.Workbook();
  
  switch (template) {
    case 'loan-statement':
      await generateLoanStatement(workbook, data);
      break;
    case 'collection-report':
      await generateCollectionReport(workbook, data);
      break;
    case 'expense-report':
      await generateExpenseReport(workbook, data);
      break;
    default:
      throw new Error('Invalid template type');
  }

  await workbook.xlsx.writeFile(outputPath);
  return outputPath;
};

// Generate CSV file
const generateCSV = async (data, headers, outputPath) => {
  const csvWriter = createCsvWriter({
    path: outputPath,
    header: headers.map(header => ({
      id: header.id,
      title: header.title
    }))
  });

  await csvWriter.writeRecords(data);
  return outputPath;
};

// Helper functions for PDF generation
const generateLoanAgreement = (doc, data) => {
  doc
    .fontSize(20)
    .text('Loan Agreement', { align: 'center' })
    .moveDown()
    .fontSize(12);

  // Add loan details
  doc
    .text(`Loan ID: ${data.loanId}`)
    .text(`Customer Name: ${data.customerName}`)
    .text(`Loan Amount: ${data.loanAmount}`)
    .text(`Interest Rate: ${data.interestRate}%`)
    .text(`Tenure: ${data.tenure} months`)
    .text(`EMI Amount: ${data.emiAmount}`)
    .moveDown();

  // Add terms and conditions
  doc
    .fontSize(14)
    .text('Terms and Conditions')
    .moveDown()
    .fontSize(12)
    .text(data.terms);

  // Add signature blocks
  doc
    .moveDown(2)
    .text('Customer Signature: _________________', { align: 'left' })
    .moveDown()
    .text('Authorized Signature: _________________', { align: 'right' });
};

const generateReceipt = (doc, data) => {
  doc
    .fontSize(20)
    .text('Payment Receipt', { align: 'center' })
    .moveDown()
    .fontSize(12);

  // Add receipt details
  doc
    .text(`Receipt No: ${data.receiptNo}`)
    .text(`Date: ${data.date}`)
    .text(`Customer Name: ${data.customerName}`)
    .text(`Amount Paid: ${data.amount}`)
    .text(`Payment Method: ${data.paymentMethod}`)
    .text(`Collected By: ${data.collectedBy}`)
    .moveDown();

  // Add authentication code
  doc
    .moveDown(2)
    .fontSize(10)
    .text(`Authentication Code: ${data.authCode}`, { align: 'center' });
};

const generateReport = (doc, data) => {
  doc
    .fontSize(20)
    .text(data.title, { align: 'center' })
    .moveDown()
    .fontSize(12);

  // Add report content
  data.sections.forEach(section => {
    doc
      .fontSize(14)
      .text(section.title)
      .moveDown()
      .fontSize(12);

    section.content.forEach(item => {
      doc.text(item);
    });

    doc.moveDown();
  });

  // Add summary
  if (data.summary) {
    doc
      .moveDown()
      .fontSize(14)
      .text('Summary')
      .moveDown()
      .fontSize(12)
      .text(data.summary);
  }
};

// Helper functions for Excel generation
const generateLoanStatement = async (workbook, data) => {
  const sheet = workbook.addWorksheet('Loan Statement');

  // Add headers
  sheet.columns = [
    { header: 'EMI No', key: 'emiNo', width: 10 },
    { header: 'Due Date', key: 'dueDate', width: 15 },
    { header: 'Amount', key: 'amount', width: 15 },
    { header: 'Principal', key: 'principal', width: 15 },
    { header: 'Interest', key: 'interest', width: 15 },
    { header: 'Balance', key: 'balance', width: 15 },
    { header: 'Status', key: 'status', width: 12 }
  ];

  // Add data
  sheet.addRows(data.emiSchedule);

  // Add summary
  sheet.addRow([]);
  sheet.addRow(['Total Amount', '', data.totalAmount]);
  sheet.addRow(['Amount Paid', '', data.amountPaid]);
  sheet.addRow(['Balance', '', data.balance]);
};

const generateCollectionReport = async (workbook, data) => {
  const sheet = workbook.addWorksheet('Collection Report');

  // Add headers
  sheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Customer', key: 'customer', width: 20 },
    { header: 'Loan ID', key: 'loanId', width: 15 },
    { header: 'Amount', key: 'amount', width: 15 },
    { header: 'Method', key: 'method', width: 15 },
    { header: 'Collector', key: 'collector', width: 20 }
  ];

  // Add data
  sheet.addRows(data.collections);

  // Add summary
  sheet.addRow([]);
  sheet.addRow(['Total Collections', '', '', data.totalAmount]);
};

const generateExpenseReport = async (workbook, data) => {
  const sheet = workbook.addWorksheet('Expense Report');

  // Add headers
  sheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Category', key: 'category', width: 20 },
    { header: 'Description', key: 'description', width: 30 },
    { header: 'Amount', key: 'amount', width: 15 },
    { header: 'Approved By', key: 'approvedBy', width: 20 }
  ];

  // Add data
  sheet.addRows(data.expenses);

  // Add summary by category
  sheet.addRow([]);
  sheet.addRow(['Category-wise Summary']);
  Object.entries(data.categorySummary).forEach(([category, amount]) => {
    sheet.addRow([category, '', '', amount]);
  });

  // Add total
  sheet.addRow([]);
  sheet.addRow(['Total Expenses', '', '', data.totalAmount]);
};

module.exports = {
  generatePDF,
  generateExcel,
  generateCSV
}; 