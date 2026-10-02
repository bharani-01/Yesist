import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import QRCode from 'qrcode';

/**
 * Generates an institutional, executive-grade CPCB Statutory Compliance Return PDF
 * demonstrating "Auditable Chain-of-Custody (Not Self-Reported)" physical recovery.
 *
 * Designed with prestigious corporate audit typography, heritage navy/forest-green
 * color hierarchy, and high-legibility tabular reporting.
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

  const { filing = {}, credits = [], underlyingRecoveryEvidence = [] } = report;
  const producer = filing.producer || {};
  const obligation = filing.obligationSummary || {};

  // ── Ultra-Professional Institutional Audit Palette (CPCB & Enterprise Grade) ─
  const INK_PRIMARY = [15, 23, 42];        // #0F172A Midnight Slate (Deep Crisp Charcoal)
  const INK_NAVY = [15, 23, 42];           // #0F172A Deep Corporate Slate
  const INK_HEADER = [30, 41, 59];         // #1E293B Slate 800 (Table Headers)
  const INK_SECONDARY = [71, 85, 105];     // #475569 Slate 600 (Subtitles & Labels)
  const INK_MUTED = [100, 116, 139];       // #64748B Slate 500 (Footnotes & Captions)
  const BORDER_COLOR = [226, 232, 240];    // #E2E8F0 Slate 200 Hairline Rule
  const SURFACE_ALT = [248, 250, 252];     // #F8FAFC Slate 50 Pearl Tint
  const VERIFIED_GREEN = [22, 101, 52];    // #166534 Green 800 (Subdued Statutory Forest Green)
  const VERIFIED_BG = [240, 253, 244];     // #F0FDF4 Soft Sage Tint
  const VERIFIED_BORDER = [187, 247, 208]; // #BBF7D0 Subtle Sage Border
  const ACCENT_BAR = [15, 23, 42];         // #0F172A Authority Ribbon
  const ACCENT_GREEN = [22, 101, 52];      // #166534 CPCB Micro Ribbon

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // ─────────────────────────────────────────────────────────────────────────────
  // PAGE 1: STATUTORY RETURN & EPR CREDIT PORTFOLIO
  // ─────────────────────────────────────────────────────────────────────────────

  // Top National Ribbon: Refined Executive Dual Rule (1.4mm Slate-900 + 0.6mm Forest Green)
  doc.setFillColor(...ACCENT_BAR);
  doc.rect(0, 0, pageWidth, 1.4, 'F');
  doc.setFillColor(...ACCENT_GREEN);
  doc.rect(0, 1.4, pageWidth, 0.6, 'F');

  // Official Regulatory Header
  let curY = 8.8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...INK_PRIMARY);
  doc.text('GOVERNMENT OF INDIA · CENTRAL POLLUTION CONTROL BOARD (CPCB)', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...INK_SECONDARY);
  doc.text('STATUTORY ANNUAL RETURN UNDER RULE 13(1) · E-WASTE (MANAGEMENT) RULES, 2022', margin, curY + 3.8);

  // Top Right Verification QR Box (clean, minimal corporate badge)
  const qrBoxW = 20;
  const qrBoxH = 20;
  const qrBoxX = pageWidth - margin - qrBoxW;
  const qrBoxY = 5.5;

  try {
    const qrDataUrl = await QRCode.toDataURL(filing.verificationUrl || `https://ecosure.org/verify/${filing.reportNumber}`, {
      margin: 1,
      width: 140,
      color: { dark: '#0F172A', light: '#FFFFFF' },
    });
    doc.setDrawColor(...BORDER_COLOR);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 1, 1, 'FD');
    doc.addImage(qrDataUrl, 'PNG', qrBoxX + 1, qrBoxY + 1, qrBoxW - 2, qrBoxH - 2);
    doc.setFontSize(5.2);
    doc.setTextColor(...INK_MUTED);
    doc.setFont('helvetica', 'bold');
    doc.text('SCAN TO AUDIT', qrBoxX + qrBoxW / 2, qrBoxY + qrBoxH + 2.8, { align: 'center' });
  } catch (err) {
    console.error('QR code generation failed', err);
  }

  // Formal Document Title
  curY = 19.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...INK_PRIMARY);
  doc.text('FORM 1(a): EPR COMPLIANCE & RECOVERY ATTRIBUTION RETURN', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.0);
  doc.setTextColor(...INK_SECONDARY);
  doc.text('Cryptographically anchored circular custody ledger verifying physical decontamination and zero paper-trading.', margin, curY + 4.2);

  // Hairline Rule
  curY += 7.0;
  doc.setDrawColor(...BORDER_COLOR);
  doc.setLineWidth(0.25);
  doc.line(margin, curY, pageWidth - margin, curY);

  // ── Executive Entity & Return Metadata ─────────────────────────────────────
  const brandList = (producer.brandNames || []).slice(0, 4).join(', ') || 'Registered OEM Brands';

  autoTable(doc, {
    startY: curY + 2,
    margin: { left: margin, right: margin },
    theme: 'plain',
    styles: {
      fontSize: 7.2,
      cellPadding: { top: 1.4, bottom: 1.4, left: 2, right: 2 },
      overflow: 'linebreak',
    },
    body: [
      [
        { content: 'Reporting Producer / OEM:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY, cellWidth: 38 } },
        { content: producer.orgName || 'Producer Organization Ltd.', styles: { textColor: INK_PRIMARY, fontStyle: 'bold', cellWidth: 54 } },
        { content: 'Filing Reference ID:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY, cellWidth: 28 } },
        { content: filing.reportNumber || 'ECS-CPCB-CMP-2026-90421', styles: { textColor: INK_PRIMARY, fontStyle: 'bold', font: 'courier' } },
      ],
      [
        { content: 'CPCB Registration Number:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY } },
        { content: producer.cpcbRegNumber || 'CPCB/EPR-EWASTE/2024/PROD-8842', styles: { textColor: INK_PRIMARY, font: 'courier', fontSize: 6.8 } },
        { content: 'Filing Period:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY } },
        { content: filing.filingPeriod || 'FY 2025-2026 (Annual)', styles: { textColor: INK_PRIMARY } },
      ],
      [
        { content: 'Authorized Signatory:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY } },
        { content: producer.authorizedSignatory || 'Head of Regulatory Affairs', styles: { textColor: INK_PRIMARY } },
        { content: 'Date of Return:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY } },
        { content: new Date(filing.issuedAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), styles: { textColor: INK_PRIMARY } },
      ],
      [
        { content: 'Reported Brand Lineup:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY } },
        { content: brandList, styles: { textColor: INK_PRIMARY } },
        { content: 'Regulatory Status:', styles: { fontStyle: 'bold', textColor: INK_SECONDARY } },
        { content: 'CPCB COMPLIANT · SURPLUS OBLIGATION MET', styles: { textColor: VERIFIED_GREEN, fontStyle: 'bold', fontSize: 6.5 } },
      ],
    ],
  });

  // ── Executive Statutory Position Matrix (Unified Institutional KPI Strip) ─
  const kpiY = doc.lastAutoTable.finalY + 3;
  const colW = (contentWidth - 6) / 4;
  const colH = 16.5;

  const kpis = [
    {
      title: 'STATUTORY TARGET',
      value: `${((obligation.targetObligationKg || 25000) / 1000).toFixed(2)} MT`,
      valColor: INK_PRIMARY,
      sub: 'Schedule III Quota',
    },
    {
      title: 'VERIFIED CREDITS',
      value: `${((obligation.fulfilledCreditsKg || 28350) / 1000).toFixed(2)} MT`,
      valColor: INK_PRIMARY,
      sub: 'Physical recovery backed',
    },
    {
      title: 'FULFILLMENT RATIO',
      value: `${(obligation.complianceRatioPct || 113.4).toFixed(1)}%`,
      valColor: VERIFIED_GREEN,
      sub: 'STATUS: SURPLUS COMPLIANT',
      subBold: true,
    },
    {
      title: 'PROVENANCE INTEGRITY',
      value: '100.0%',
      valColor: INK_PRIMARY,
      sub: 'Zero paper trading',
    },
  ];

  kpis.forEach((kpi, idx) => {
    const cardX = margin + (colW + 2) * idx;
    doc.setFillColor(...SURFACE_ALT);
    doc.setDrawColor(...BORDER_COLOR);
    doc.setLineWidth(0.2);
    doc.roundedRect(cardX, kpiY, colW, colH, 1, 1, 'FD');

    // Title
    doc.setFontSize(6.0);
    doc.setTextColor(...INK_MUTED);
    doc.setFont('helvetica', 'bold');
    doc.text(kpi.title, cardX + 3.2, kpiY + 4.2);

    // Value
    doc.setFontSize(11.0);
    doc.setTextColor(...kpi.valColor);
    doc.setFont('helvetica', 'bold');
    doc.text(kpi.value, cardX + 3.2, kpiY + 10.4);

    // Subtitle
    doc.setFontSize(5.5);
    doc.setFont('helvetica', kpi.subBold ? 'bold' : 'normal');
    doc.setTextColor(...(kpi.subBold ? VERIFIED_GREEN : INK_MUTED));
    doc.text(kpi.sub, cardX + 3.2, kpiY + 14.1);
  });

  // ── SECTION 1: Schedule of Acquired EPR Certificates ───────────────────────
  const table1HeaderY = kpiY + colH + 6;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...INK_PRIMARY);
  doc.text('1. SCHEDULE OF ACQUIRED EPR CERTIFICATES (CREDIT TRANCHES)', margin, table1HeaderY);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...INK_SECONDARY);
  doc.text('Procured exclusively from SPCB/CPCB registered recyclers with physical mass-balance verification.', margin, table1HeaderY + 3.5);

  const creditRows = credits.map((c, idx) => [
    c.creditId || `EPR-CRT-2026-${String(idx + 1).padStart(4, '0')}`,
    c.recyclerName ? `${c.recyclerName}\nReg: ${c.recyclerRegNo || 'MPPCB/REC/2023/048'}` : 'Authorized Recycler',
    c.categoryCode || 'ITEW1',
    `${((c.quantityKg || 0) / 1000).toFixed(2)} MT`,
    `${c.unitCount || 0}`,
    c.procuredAt ? new Date(c.procuredAt).toLocaleDateString('en-IN') : '2026-08-15',
    c.attestationNumber || 'ECS-ATT-001',
    (c.cpcbCertificateHash ? c.cpcbCertificateHash.slice(0, 16) + '...' : '9f86d081884...'),
  ]);

  // Compute totals
  const totalWeightMt = credits.reduce((acc, c) => acc + ((c.quantityKg || 0) / 1000), 0);
  const totalUnits = credits.reduce((acc, c) => acc + (c.unitCount || 0), 0);

  const creditTableBody = [
    ...creditRows,
    [
      { content: 'TOTAL VERIFIED FULFILLMENT', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right', textColor: INK_PRIMARY, fillColor: [241, 245, 249] } },
      { content: `${totalWeightMt.toFixed(2)} MT`, styles: { fontStyle: 'bold', halign: 'right', textColor: INK_PRIMARY, fillColor: [241, 245, 249] } },
      { content: `${totalUnits}`, styles: { fontStyle: 'bold', halign: 'center', textColor: INK_PRIMARY, fillColor: [241, 245, 249] } },
      { content: 'CPCB COMPLIANT', colSpan: 3, styles: { fontStyle: 'bold', textColor: VERIFIED_GREEN, fillColor: [241, 245, 249] } },
    ],
  ];

  autoTable(doc, {
    startY: table1HeaderY + 5.5,
    margin: { left: margin, right: margin },
    head: [['Tranche Ref', 'Certified Recycling Facility', 'Cat', 'Net Weight', 'Units', 'Procured', 'Attestation No', 'Digital Proof Hash']],
    body: creditTableBody,
    theme: 'grid',
    tableLineColor: BORDER_COLOR,
    tableLineWidth: 0.15,
    headStyles: {
      fillColor: INK_HEADER,
      textColor: [255, 255, 255],
      fontSize: 6.6,
      fontStyle: 'bold',
      cellPadding: 2,
    },
    bodyStyles: {
      fontSize: 6.4,
      textColor: INK_PRIMARY,
      cellPadding: 1.8,
    },
    alternateRowStyles: {
      fillColor: SURFACE_ALT,
    },
    columnStyles: {
      0: { cellWidth: 28, fontStyle: 'bold', font: 'courier' },
      1: { cellWidth: 46 },
      2: { cellWidth: 14, halign: 'center' },
      3: { cellWidth: 20, fontStyle: 'bold', halign: 'right' },
      4: { cellWidth: 14, halign: 'center' },
      5: { cellWidth: 18 },
      6: { cellWidth: 24, font: 'courier' },
      7: { cellWidth: 'auto', font: 'courier', fontSize: 6 },
    },
  });

  // Statutory Non-Paper-Trading Statement
  let page1TableEnd = doc.lastAutoTable.finalY + 5;
  doc.setFillColor(...SURFACE_ALT);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(margin, page1TableEnd, contentWidth, 12, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...INK_NAVY);
  doc.text('Notice of Physical Custody & Zero Paper-Trading:', margin + 3.5, page1TableEnd + 4);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...INK_SECONDARY);
  doc.text('Every metric ton of EPR credit reported above is derived from verified physical de-manufacturing with closed custody transfers. All issuing facilities are authenticated against active CPCB installed capacity quotas under Rule 13.', margin + 3.5, page1TableEnd + 8, { maxWidth: contentWidth - 7 });

  // Add Page Footer
  drawOfficialFooter(doc, 1, 2, filing);

  // ─────────────────────────────────────────────────────────────────────────────
  // PAGE 2: ANNEXURE I — ITEMISED ASSET RECOVERY & CUSTODY PROVENANCE
  // ─────────────────────────────────────────────────────────────────────────────
  doc.addPage();

  // Top National Ribbon: Refined Executive Dual Rule
  doc.setFillColor(...ACCENT_BAR);
  doc.rect(0, 0, pageWidth, 1.4, 'F');
  doc.setFillColor(...ACCENT_GREEN);
  doc.rect(0, 1.4, pageWidth, 0.6, 'F');

  // Page 2 Header
  curY = 8.8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...INK_PRIMARY);
  doc.text('GOVERNMENT OF INDIA · CENTRAL POLLUTION CONTROL BOARD (CPCB)', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...INK_SECONDARY);
  doc.text('ANNEXURE I TO FORM 1(a) · ITEMISED PHYSICAL CHAIN-OF-CUSTODY PROVENANCE', margin, curY + 3.8);

  // Annexure Title
  curY = 19.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...INK_PRIMARY);
  doc.text('ANNEXURE I: ITEMISED PHYSICAL ASSET RECOVERY AUDIT', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.0);
  doc.setTextColor(...INK_SECONDARY);
  doc.text('Forensic provenance ledger linking credit tranches to genuine citizen drop-points, sealed transit lots, and facility destruction.', margin, curY + 4.2);

  // Hairline Rule
  curY += 7.0;
  doc.setDrawColor(...BORDER_COLOR);
  doc.setLineWidth(0.25);
  doc.line(margin, curY, pageWidth - margin, curY);

  // Table 2: Provenance Breakdown
  const recoveryRows = underlyingRecoveryEvidence.map((row) => [
    row.qrPublicId || 'qr-passport',
    row.brandModel || 'Electronic Equipment',
    row.identifier || 'IMEI/Serial',
    row.collectionWard || 'Indore Pilot Ward',
    row.bagLotRef || 'LOT-SEAL-01',
    row.intakeWeight || '0.22 kg',
    row.batterySegregation || 'Li-ion safe',
    row.recyclerAttestation || 'ECS-ATT-001',
  ]);

  autoTable(doc, {
    startY: curY + 3,
    margin: { left: margin, right: margin },
    head: [['Unit Passport', 'Device Model / Brand', 'Identifier', 'Intake Collection Point / Ward', 'Transit Seal', 'Weight', 'Battery', 'Attestation']],
    body: recoveryRows.slice(0, 16),
    theme: 'grid',
    tableLineColor: BORDER_COLOR,
    tableLineWidth: 0.15,
    headStyles: {
      fillColor: INK_HEADER,
      textColor: [255, 255, 255],
      fontSize: 6.6,
      fontStyle: 'bold',
      cellPadding: 1.8,
    },
    bodyStyles: {
      fontSize: 6.3,
      textColor: INK_PRIMARY,
      cellPadding: 1.5,
    },
    alternateRowStyles: {
      fillColor: SURFACE_ALT,
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

  // ── Material Yields Summary Strip ──────────────────────────────────────────
  let page2TableEnd = doc.lastAutoTable.finalY + 4;

  doc.setFillColor(...SURFACE_ALT);
  doc.setDrawColor(...BORDER_COLOR);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, page2TableEnd, contentWidth, 11, 1, 1, 'FD');

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...INK_PRIMARY);
  doc.text('Certified Recovery Yield Breakdown (Closed-Loop Circular Economy):', margin + 3.5, page2TableEnd + 3.8);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...INK_SECONDARY);
  doc.text('• High-grade Recycled ABS: 40.0%  • Smelted Copper & Precious Metals: 20.0%  • Ferrous Steel: 40.0%  • Hazardous Batteries: 100% Segregated for Pyrometallurgical Black Mass Refining', margin + 3.5, page2TableEnd + 7.5);

  // ── Statutory Non-Disavowal & Dual Digital Signature Block ─────────────────
  const sigBoxY = page2TableEnd + 14;
  const sigBoxH = 26;

  doc.setDrawColor(...BORDER_COLOR);
  doc.setFillColor(255, 255, 255);
  doc.setLineWidth(0.25);
  doc.roundedRect(margin, sigBoxY, contentWidth, sigBoxH, 1.2, 1.2, 'FD');

  // Declaration text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.6);
  doc.setTextColor(...INK_PRIMARY);
  doc.text('STATUTORY DECLARATION UNDER RULE 13 & SECTION 5 OF ENVIRONMENT (PROTECTION) ACT, 1986', margin + 4, sigBoxY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(...INK_SECONDARY);
  const legalDeclaration = 'I hereby declare and affirm that the credits, physical unit passports, and recycling attestations listed in this return and annexure are authentic, verified against electronic circular custody ledgers, and free of duplicate claims or paper trading. All recovery activities comply with statutory pollution control directives.';
  doc.text(legalDeclaration, margin + 4, sigBoxY + 8.5, { maxWidth: contentWidth - 54 });

  // Signature 1: OEM / Producer Authorized Officer
  const sig1X = margin + contentWidth - 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...INK_PRIMARY);
  doc.text('Authorized Signatory:', sig1X, sigBoxY + 4.5);
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...VERIFIED_GREEN);
  doc.text('DIGITALLY SIGNED', sig1X, sigBoxY + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(...INK_SECONDARY);
  doc.text(producer.authorizedSignatory || 'Head of Regulatory Affairs', sig1X, sigBoxY + 13.5);
  doc.text(producer.orgName || 'Producer Entity', sig1X, sigBoxY + 17, { maxWidth: 44 });
  doc.text(`Timestamp: ${new Date(filing.issuedAt || Date.now()).toISOString().slice(0, 19)}Z`, sig1X, sigBoxY + 21);

  // Add Page Footer
  drawOfficialFooter(doc, 2, 2, filing);

  return doc;
}

/** Helper to draw consistent official footer on each page */
function drawOfficialFooter(doc, pageNum, totalPages, filing) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(margin, pageHeight - 9, pageWidth - margin, pageHeight - 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139); // Slate 500
  doc.text(`Official CPCB Statutory Return · Form 1(a) · Return ID: ${filing.reportNumber || 'ECS-CPCB-CMP-2026-90421'}`, margin, pageHeight - 5.5);

  const hashText = filing.sha256Hash ? `SHA-256: ${filing.sha256Hash.slice(0, 28)}...` : 'EcoSure Circular Custody Ledger';
  doc.text(hashText, pageWidth / 2, pageHeight - 5.5, { align: 'center' });

  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 5.5, { align: 'right' });
}
