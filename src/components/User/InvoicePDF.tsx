import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Invoice } from '../../types/invoice';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 32,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2563EB',
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  table: {
    width: 'auto',
    marginVertical: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2563EB',
    padding: 8,
    fontSize: 12,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 16,
    textAlign: 'right',
  },
});

const InvoiceDocument: React.FC<{ invoice: Invoice }> = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Earth Mover Invoice</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{invoice.date}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Invoice #:</Text>
        <Text style={styles.value}>{invoice.id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.value}>{invoice.clientName}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Type</Text>
          <Text style={styles.tableCell}>Start Meter</Text>
          <Text style={styles.tableCell}>Stop Meter</Text>
          <Text style={styles.tableCell}>Rate</Text>
          <Text style={styles.tableCell}>Hours</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Bucket</Text>
          <Text style={styles.tableCell}>{invoice.bucketStartMeter}</Text>
          <Text style={styles.tableCell}>{invoice.bucketStopMeter}</Text>
          <Text style={styles.tableCell}>{invoice.bucketRate}</Text>
          <Text style={styles.tableCell}>{invoice.totalBucketHours}</Text>
          <Text style={styles.tableCell}>{invoice.totalBucketAmount}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Breaker</Text>
          <Text style={styles.tableCell}>{invoice.breakerStartMeter}</Text>
          <Text style={styles.tableCell}>{invoice.breakerStopMeter}</Text>
          <Text style={styles.tableCell}>{invoice.breakerRate}</Text>
          <Text style={styles.tableCell}>{invoice.totalBreakerHours}</Text>
          <Text style={styles.tableCell}>{invoice.totalBreakerAmount}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Bata:</Text>
        <Text style={styles.value}>{invoice.bata}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Diesel Advance:</Text>
        <Text style={styles.value}>{invoice.dieselAdvance}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Cash Advance:</Text>
        <Text style={styles.value}>{invoice.cashAdvance}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Old Balance:</Text>
        <Text style={styles.value}>{invoice.oldBalance}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Old Advance Balance:</Text>
        <Text style={styles.value}>{invoice.oldAdBalance}</Text>
      </View>
      <Text style={styles.total}>Total Amount: ₹{invoice.totalAmount}</Text>
      <Text style={styles.total}>Total Balance: ₹{invoice.totalBalance}</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{invoice.status}</Text>
      </View>
    </Page>
  </Document>
);

const InvoicePDF: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  const [showPreview, setShowPreview] = React.useState(false);
  return (
    <div>
      <button
        className="btn btn-primary"
        style={{marginBottom: 16}}
        onClick={() => setShowPreview(true)}
      >
        Preview Final Invoice PDF
      </button>
      <PDFDownloadLink document={<InvoiceDocument invoice={invoice} />} fileName={`Invoice-${invoice.id}.pdf`}>
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download Professional Invoice PDF'
        }
      </PDFDownloadLink>
      {showPreview && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowPreview(false)}
        >
          <div style={{background: '#fff', padding: 16, borderRadius: 8, maxWidth: '80vw', maxHeight: '80vh', overflow: 'auto'}} onClick={e => e.stopPropagation()}>
            <PDFViewer style={{width: '60vw', height: '80vh', border: 'none'}}>
              <InvoiceDocument invoice={invoice} />
            </PDFViewer>
            <div style={{textAlign: 'right', marginTop: 8}}>
              <button className="btn btn-secondary" onClick={() => setShowPreview(false)}>Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePDF;
