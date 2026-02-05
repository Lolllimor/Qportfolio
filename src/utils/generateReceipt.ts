import jsPDF from 'jspdf';

interface ReceiptData {
  orderId: number | string;
  reference: string;
  amount: number; // in kobo
  customerName: string;
  email: string;
  phone?: string;
  artwork?: {
    id: number | string;
    title: string;
    price: string;
    year?: number;
    collection?: string;
  };
  createdAt?: string;
}

export function generateReceipt(data: ReceiptData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  // Colors
  const primaryColor = '#E3591C';
  const secondaryColor = '#57D791';
  const tertiaryColor = '#49B7D9';
  const textColor = '#000000';
  const grayColor = '#7D7A7A';

  // Helper function to add colored line
  const addColoredLine = (y: number, color: string) => {
    doc.setFillColor(color);
    doc.rect(margin, y, pageWidth - 2 * margin, 3, 'F');
  };

  // Header with colored lines
  addColoredLine(yPos, primaryColor);
  yPos += 5;
  addColoredLine(yPos, secondaryColor);
  yPos += 5;
  addColoredLine(yPos, tertiaryColor);
  yPos += 15;

  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(57, 215, 145); // #57D791
  doc.text('Twenty-', margin, yPos);
  doc.setTextColor(235, 93, 29); // #EB5D1D
  const titleWidth = doc.getTextWidth('Twenty-');
  doc.text('II', margin + titleWidth, yPos);
  yPos += 10;

  // Receipt title
  doc.setFontSize(18);
  doc.setTextColor(textColor);
  doc.text('Payment Receipt', margin, yPos);
  yPos += 15;

  // Receipt details section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor);
  
  // Order ID
  doc.text(`Order ID: ${data.orderId}`, margin, yPos);
  yPos += 7;
  
  // Transaction Reference
  doc.text(`Transaction Reference: ${data.reference}`, margin, yPos);
  yPos += 7;
  
  // Date
  const date = data.createdAt 
    ? new Date(data.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
  doc.text(`Date: ${date}`, margin, yPos);
  yPos += 15;

  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Customer Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor);
  doc.text('Customer Information', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor);
  const customerName = data.customerName || 'N/A';
  const email = data.email || 'N/A';
  doc.text(`Name: ${customerName}`, margin, yPos);
  yPos += 7;
  doc.text(`Email: ${email}`, margin, yPos);
  yPos += 7;
  if (data.phone) {
    doc.text(`Phone: ${data.phone}`, margin, yPos);
    yPos += 7;
  }
  yPos += 5;

  // Divider line
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Artwork Information
  if (data.artwork) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor);
    doc.text('Artwork Details', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayColor);
    doc.text(`Title: ${data.artwork.title}`, margin, yPos);
    yPos += 7;
    
    if (data.artwork.year) {
      doc.text(`Year: ${data.artwork.year}`, margin, yPos);
      yPos += 7;
    }
    
    if (data.artwork.collection) {
      doc.text(`Collection: ${data.artwork.collection}`, margin, yPos);
      yPos += 7;
    }
    yPos += 5;

    // Divider line
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
  }

  // Payment Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor);
  doc.text('Payment Summary', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Convert amount from kobo to naira
  const amountValue = data.amount && data.amount > 0 ? data.amount : 0;
  const amountInNaira = (amountValue / 100).toFixed(2);
  
  doc.setTextColor(grayColor);
  doc.text('Amount:', margin, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor);
  const amountText = amountValue > 0 
    ? `${parseFloat(amountInNaira).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} NGN`
    : 'N/A';
  doc.text(amountText, pageWidth - margin - doc.getTextWidth(amountText), yPos);
  yPos += 10;

  // Status
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor);
  doc.text('Status:', margin, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(57, 215, 145); // Green for paid
  doc.text('PAID', pageWidth - margin - doc.getTextWidth('PAID'), yPos);
  yPos += 15;

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor);
  doc.text(
    'Thank you for your purchase. We will contact you shortly regarding delivery.',
    margin,
    yPos,
    { maxWidth: pageWidth - 2 * margin, align: 'left' }
  );
  yPos += 10;
  
  doc.text(
    'Questions? Contact us at Hello.twentyii@gmail.com',
    margin,
    yPos,
    { maxWidth: pageWidth - 2 * margin, align: 'left' }
  );

  // Footer colored lines
  yPos = doc.internal.pageSize.getHeight() - 20;
  addColoredLine(yPos, tertiaryColor);
  yPos += 5;
  addColoredLine(yPos, secondaryColor);
  yPos += 5;
  addColoredLine(yPos, primaryColor);

  // Generate filename
  const filename = `receipt-${data.reference}-${Date.now()}.pdf`;
  
  // Save PDF
  doc.save(filename);
}

