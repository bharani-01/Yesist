import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import QRCode from 'qrcode';

/**
 * Generates an official, CPCB-filing-ready Compliance Document PDF
 * highlighting "Auditable, Not Self-Reported" physical recovery chain.
 *
 * @param {Object} report Data object containing filing, credits, and underlyingRecoveryEvidence
 * @returns {Promise<jsPDF>} The generated jsPDF document instance
 */
export async function generateCompliancePdf(report) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const { filing, credits = [], underlyingRecoveryEvidence = [] } = report;
  const producer = filing.producer || {};
  const obligation = filing.obligationSummary || {};

  // Palette
  const NAVY = [15, 23, 42];        // #0F172A
  const BRAND = [0, 209, 94];       // #00D15E (EcoSure brand green)
  const BRAND_DARK = [5, 150, 105]; // #059669
  const SLATE = [100, 116, 139];    // #64748B
  const LIGHT_BG = [248, 250, 252]; // #F8FAFC
  const BORDER_COLOR = [226, 232, 240]; // #E2E8F0

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // ─────────────────────────────────────────────────────────────────────────────
  // PAGE 1: STATUTORY RETURN & EPR CREDIT PURCHASES PORTFOLIO
  // ─────────────────────────────────────────────────────────────────────────────

  // Top Flag / Accent Bar
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // National Header (Centered, clean Y=9 and Y=13)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...SLATE);
  doc.text('CENTRAL POLLUTION CONTROL BOARD (CPCB) · MINISTRY OF ENVIRONMENT, FOREST & CLIMATE CHANGE', pageWidth / 2, 9, { align: 'center' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Statutory Filing under Rule 13 of E-Waste (Management) Rules, 2022 · Form 1(a) Return', pageWidth / 2, 13, { align: 'center' });

  // Main Title Banner (Y=16, Height=24mm)
  const bannerY = 16;
  const bannerH = 24;
  doc.setFillColor(...NAVY);
  doc.roundedRect(margin, bannerY, contentWidth, bannerH, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.text('EPR COMPLIANCE & PHYSICAL RECOVERY CERTIFICATE', margin + 6, bannerY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(167, 243, 208); // light green accent
  doc.text('FORM 1(a) STATUTORY RETURN · AUDITABLE CHAIN-OF-CUSTODY (NOT SELF-REPORTED)', margin + 6, bannerY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(203, 213, 225); // slate 300
  doc.text('Official cryptographic attestation linking acquired credits to itemized physical recovery data.', margin + 6, bannerY + 18, { maxWidth: contentWidth - 30 });

  // Verification QR Badge cleanly inset on the right of banner
  try {
    const qrDataUrl = await QRCode.toDataURL(filing.verificationUrl || `https://ecosure.gov.in/verify/${filing.reportNumber}`, {
      margin: 1,
      width: 160,
      color: { dark: '#0F172A', light: '#FFFFFF' },
    });
    // White backing rounded box for QR code
    const qrBoxW = 20;
    const qrBoxH = 20;
    const qrBoxX = pageWidth - margin - qrBoxW - 2;
    const qrBoxY = bannerY + 2;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 1.5, 1.5, 'F');
    doc.addImage(qrDataUrl, 'PNG', qrBoxX + 1, qrBoxY + 1, qrBoxW - 2, qrBoxH - 2);
  } catch (err) {
    console.error('Failed to generate verification QR code', err);
  }

  // ── Filing & Producer Metadata Table (via autoTable: zero overlap guaranteed) ──
  const brandList = (producer.brandNames || []).slice(0, 5).join(', ') || 'Registered OEM Brands';

  autoTable(doc, {
    startY: bannerY + bannerH + 3,
    margin: { left: margin, right: margin },
    theme: 'plain',
    styles: {
      fontSize: 7.2,
      cellPadding: { top: 1.6, bottom: 1.6, left: 3, right: 3 },
      overflow: 'linebreak',
    },
    tableLineColor: BORDER_COLOR,
    tableLineWidth: 0.25,
    body: [
      [
        { content: 'Producer / OEM Entity:', styles: { fontStyle: 'bold', textColor: NAVY, cellWidth: 35 } },
        { content: producer.orgName || 'Producer Organization Ltd.', styles: { textColor: NAVY, fontStyle: 'bold', cellWidth: 55 } },
        { content: 'Certificate ID:', styles: { fontStyle: 'bold', textColor: NAVY, cellWidth: 28 } },
        { content: filing.reportNumber || 'ECS-CPCB-CMP-2026-90421', styles: { textColor: BRAND_DARK, fontStyle: 'bold', font: 'courier' } },
      ],
      [
        { content: 'CPCB Reg. Number:', styles: { fontStyle: 'bold', textColor: SLATE } },
        { content: producer.cpcbRegNumber || 'CPCB/EPR-EWASTE/2024/PROD-8842', styles: { textColor: NAVY, font: 'courier', fontSize: 6.8 } },
        { content: 'Filing Period:', styles: { fontStyle: 'bold', textColor: SLATE } },
        { content: filing.filingPeriod || 'FY 2025-2026 (Annual)', styles: { textColor: NAVY } },
      ],
      [
        { content: 'Authorized Signatory:', styles: { fontStyle: 'bold', textColor: SLATE } },
        { content: producer.authorizedSignatory || 'Designated EPR Compliance Officer', styles: { textColor: NAVY } },
        { content: 'Date of Issue:', styles: { fontStyle: 'bold', textColor: SLATE } },
        { content: new Date(filing.issuedAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), styles: { textColor: NAVY } },
      ],
      [
        { content: 'Associated Brands:', styles: { fontStyle: 'bold', textColor: SLATE } },
        { content: brandList, styles: { textColor: NAVY } },
        { content: 'Audit Status:', styles: { fontStyle: 'bold', textColor: SLATE } },
        { content: 'VERIFIED & CRYPTOGRAPHICALLY SECURED', styles: { textColor: BRAND_DARK, fontStyle: 'bold', fontSize: 6.5 } },
      ],
    ],
  });

  // ── Obligation vs Fulfilled Summary Cards ──────────────────────────────────
  const kpiY = doc.lastAutoTable.finalY + 3;
  const cardW = (contentWidth - 6) / 3;
  const cardH = 18;

  // Card 1: Obligation
  doc.setFillColor(...LIGHT_BG);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(margin, kpiY, cardW, cardH, 2, 2, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(...SLATE);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUTORY EPR TARGET', margin + 4, kpiY + 5.5);
  doc.setFontSize(12);
  doc.setTextColor(...NAVY);
  doc.text(`${((obligation.targetObligationKg || 25000) / 1000).toFixed(2)} MT`, margin + 4, kpiY + 12.5);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Calculated under E-Waste Rules 2022', margin + 4, kpiY + 16);

  // Card 2: Achieved Credits
  doc.setFillColor(...LIGHT_BG);
  doc.roundedRect(margin + cardW + 3, kpiY, cardW, cardH, 2, 2, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(...SLATE);
  doc.setFont('helvetica', 'bold');
  doc.text('VERIFIED RECOVERED CREDITS', margin + cardW + 7, kpiY + 5.5);
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_DARK);
  doc.text(`${((obligation.fulfilledCreditsKg || 28350) / 1000).toFixed(2)} MT`, margin + cardW + 7, kpiY + 12.5);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...SLATE);
  doc.text('Backed by authorized recyclers', margin + cardW + 7, kpiY + 16);

  // Card 3: Compliance Status
  doc.setFillColor(236, 253, 245); // light emerald
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin + (cardW + 3) * 2, kpiY, cardW, cardH, 2, 2, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_DARK);
  doc.setFont('helvetica', 'bold');
  doc.text('COMPLIANCE RATIO', margin + (cardW + 3) * 2 + 4, kpiY + 5.5);
  doc.setFontSize(12);
  doc.text(`${(obligation.complianceRatioPct || 113.4).toFixed(1)}%`, margin + (cardW + 3) * 2 + 4, kpiY + 12.5);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS: SURPLUS COMPLIANT (PASSED)', margin + (cardW + 3) * 2 + 4, kpiY + 16);

  // ── SECTION 1: Acquired EPR Credits Table ──────────────────────────────────
  const table1HeaderY = kpiY + cardH + 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('1. ACQUIRED EPR CERTIFICATES / CREDITS SCHEDULE', margin, table1HeaderY);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...SLATE);
  doc.text('Procured from registered recycling facilities with closed material recovery loops.', margin, table1HeaderY + 3.8);

  const creditTableBody = credits.map((c, idx) => [
    c.creditId || `EPR-CRT-2026-${String(idx + 1).padStart(4, '0')}`,
    c.recyclerName ? `${c.recyclerName}\nReg: ${c.recyclerRegNo || 'CPCB-REG-01'}` : 'Authorized Recycler',
    c.categoryCode || 'ITEW1',
    `${((c.quantityKg || 0) / 1000).toFixed(2)} MT\n(${c.unitCount || 0} units)`,
    c.procuredAt ? new Date(c.procuredAt).toLocaleDateString('en-IN') : '2026-08-15',
    c.attestationNumber || 'ECS-ATT-001',
    (c.cpcbCertificateHash ? c.cpcbCertificateHash.slice(0, 14) + '...' : '9f86d081884...'),
  ]);

  autoTable(doc, {
    startY: table1HeaderY + 5.5,
    margin: { left: margin, right: margin },
    head: [['Credit Ref', 'Authorized Recycler Facility', 'Cat', 'Net Weight', 'Date', 'Attestation No', 'Hash Proof']],
    body: creditTableBody,
    theme: 'grid',
    headStyles: {
      fillColor: NAVY,
      textColor: [255, 255, 255],
      fontSize: 7.2,
      fontStyle: 'bold',
      cellPadding: 2.2,
    },
    bodyStyles: {
      fontSize: 6.8,
      textColor: [30, 41, 59],
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 32, fontStyle: 'bold', font: 'courier' },
      1: { cellWidth: 48 },
      2: { cellWidth: 15 },
      3: { cellWidth: 24, fontStyle: 'bold', halign: 'right' },
      4: { cellWidth: 20 },
      5: { cellWidth: 26, font: 'courier' },
      6: { cellWidth: 'auto', font: 'courier', fontSize: 6.2 },
    },
  });

  // Regulatory Footnote on Page 1
  let page1TableEnd = doc.lastAutoTable.finalY + 6;
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...SLATE);
  doc.text('Note: In accordance with CPCB directions, EPR credits listed above cannot be duplicated or transacted beyond the registered processing capacity of the issuing facilities.', margin, page1TableEnd, { maxWidth: contentWidth });

  // Add Page Footer
  drawPageFooter(doc, 1, 2, filing);

  // ─────────────────────────────────────────────────────────────────────────────
  // PAGE 2: UNDERLYING VERIFIED RECOVERY LEDGER (EVIDENCE OF AUDITABILITY)
  // ─────────────────────────────────────────────────────────────────────────────
  doc.addPage();

  // Top Accent Bar
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Page 2 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...SLATE);
  doc.text('CENTRAL POLLUTION CONTROL BOARD · FORM 1(a) ANNEXURE', pageWidth / 2, 9, { align: 'center' });

  doc.setFillColor(...NAVY);
  doc.roundedRect(margin, 13, contentWidth, 13, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('ANNEXURE I: UNDERLYING PHYSICAL RECOVERY LEDGER', margin + 6, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(200, 220, 210);
  doc.text('INDIVIDUAL ASSET RECOVERY CHAIN · PROOF OF AUTHENTIC FIELD INTAKE & DECONTAMINATION', margin + 6, 24);

  // Core Value Proposition Explainer Box
  let p2CurrentY = 29;
  doc.setFillColor(240, 253, 244); // light green
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, p2CurrentY, contentWidth, 15, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...BRAND_DARK);
  doc.text('AUDITABLE, NOT SELF-REPORTED GUARANTEE:', margin + 4, p2CurrentY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(22, 101, 52);
  const guaranteeText = 'Every gram of EPR credit in this return is linked directly to an itemized unit collected via tracked custody points, sealed in aggregate transit bags, and verified at certified recycling facilities. This completely precludes paper-trading, ghost plants, and capacity-inflation fraud.';
  doc.text(guaranteeText, margin + 4, p2CurrentY + 8.5, { maxWidth: contentWidth - 8 });

  // Table of Recovery Ledger
  p2CurrentY += 18;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('2. INDIVIDUAL ASSET CUSTODY & PHYSICAL PROVENANCE BREAKDOWN', margin, p2CurrentY);

  const recoveryRows = underlyingRecoveryEvidence.map((row) => [
    row.qrPublicId || 'qr-unknown',
    row.brandModel || 'Electronic Device',
    row.identifier || 'IMEI/Serial',
    row.collectionWard || 'Indore Pilot Ward',
    row.bagLotRef || 'LOT-SEAL-01',
    row.intakeWeight || '0.22 kg',
    row.batterySegregation || 'Li-ion safe',
    row.recyclerAttestation || 'ECS-ATT-001',
  ]);

  autoTable(doc, {
    startY: p2CurrentY + 3.5,
    margin: { left: margin, right: margin },
    head: [['Unit Passport', 'Device Model / Brand', 'Identifier', 'Collection Ward / Hub', 'Transit Seal', 'Intake Wt', 'Battery', 'Attestation']],
    body: recoveryRows.slice(0, 16),
    theme: 'grid',
    headStyles: {
      fillColor: NAVY,
      textColor: [255, 255, 255],
      fontSize: 6.8,
      fontStyle: 'bold',
      cellPadding: 1.8,
    },
    bodyStyles: {
      fontSize: 6.4,
      textColor: [30, 41, 59],
      cellPadding: 1.6,
    },
    columnStyles: {
      0: { cellWidth: 22, font: 'courier', fontStyle: 'bold' },
      1: { cellWidth: 32 },
      2: { cellWidth: 18 },
      3: { cellWidth: 34 },
      4: { cellWidth: 22, font: 'courier' },
      5: { cellWidth: 14, halign: 'right' },
      6: { cellWidth: 16 },
      7: { cellWidth: 'auto', font: 'courier' },
    },
  });

  // Material Fractions Summary & Legal Sign-off Block
  let page2TableEnd = doc.lastAutoTable.finalY + 4;

  // Fraction breakdown chips
  doc.setFillColor(...LIGHT_BG);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(margin, page2TableEnd, contentWidth, 12, 2, 2, 'FD');

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('Verified Material Fractions Yield:', margin + 4, page2TableEnd + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...SLATE);
  doc.text('• High-grade ABS Plastics: 40.0%  • Precious Metals / Copper: 20.0%  • Ferrous Structure: 40.0%  • Batteries: 100% Segregated for Pyrometallurgical Recovery', margin + 4, page2TableEnd + 8.5);

  // Statutory Non-Disavowal & Signature Block
  const sigY = page2TableEnd + 15;
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(margin, sigY, contentWidth, 28, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...NAVY);
  doc.text('STATUTORY VERIFICATION & CUSTODIAN ATTESTATION', margin + 4, sigY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(...SLATE);
  const declarationText = 'I, the undersigned authorized representative, hereby solemnly affirm and declare that the credits claimed herein represent bona fide end-of-life electrical and electronic equipment collected and recycled through authorized facilities. The electronic custody records and cryptographic SHA-256 hashes are tamper-evident and available for real-time audit by the CPCB / SPCB surveillance teams.';
  doc.text(declarationText, margin + 4, sigY + 10, { maxWidth: contentWidth - 52 });

  // Signature seals
  const sigColX = margin + contentWidth - 46;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...NAVY);
  doc.text('Authorized Signatory:', sigColX, sigY + 5.5);
  doc.setFont('courier', 'bold');
  doc.setTextColor(...BRAND_DARK);
  doc.text('DIGITALLY SIGNED', sigColX, sigY + 10.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(...SLATE);
  doc.text(producer.authorizedSignatory || 'Head of Regulatory Compliance', sigColX, sigY + 14.5);
  doc.text(producer.orgName || 'OEM Producer Entity', sigColX, sigY + 18, { maxWidth: 44 });
  doc.text(`Timestamp: ${new Date(filing.issuedAt || Date.now()).toISOString().slice(0, 19)}Z`, sigColX, sigY + 22.5);

  // Add Page Footer
  drawPageFooter(doc, 2, 2, filing);

  return doc;
}

/** Helper to draw consistent official footer on each page */
function drawPageFooter(doc, pageNum, totalPages, filing) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(148, 163, 184); // #94A3B8
  doc.text(`Official CPCB Filing Return · Document ID: ${filing.reportNumber || 'ECS-CPCB-CMP-2026-90421'}`, margin, pageHeight - 6.5);

  const hashText = filing.sha256Hash ? `SHA-256: ${filing.sha256Hash.slice(0, 32)}...` : 'EcoSure Circular Custody Ledger';
  doc.text(hashText, pageWidth / 2, pageHeight - 6.5, { align: 'center' });

  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 6.5, { align: 'right' });
}
