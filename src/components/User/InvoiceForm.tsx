
import React, { useState } from 'react';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import { Invoice } from '../../types/invoice';
import InvoicePDF from './InvoicePDF';
import {
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  Banner,
  DataTable,
  Checkbox,
  Page,
  Layout,
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

// Custom style for date picker visibility in dark mode
const datePickerStyle = {
  background: 'var(--p-surface, #1c1c1c)',
  color: 'var(--p-text, #fff)',
  border: '1px solid var(--p-border, #444)',
};

const clients = [
  { id: 'c1', name: 'Client A', bucketRate: 2000, breakerRate: 1000 },
  { id: 'c2', name: 'Client B', bucketRate: 3000, breakerRate: 1500 },
];

const InvoiceForm: React.FC = () => {
  // Track which type is selected for each entry
  const [entries, setEntries] = useState<any[]>([{}]);
  const [entryTypes, setEntryTypes] = useState<string[]>(['both']);
  const handleEntryTypeChange = (idx: number, value: string) => {
    setEntryTypes(prev => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };
  const handleEntryChange = (idx: number, field: string, value: any) => {
    setEntries(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };
  const addEntry = () => setEntries(prev => [...prev, {}]);
  const removeEntry = (idx: number) => {
    setEntries(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));
  };
  // Live total balance calculation
  const liveTotalBalance = entries.reduce((sum, entry, idx) => {
    const bucketRate = Number(entry.bucketRate || 0);
    const breakerRate = Number(entry.breakerRate || 0);
    const bucketStart = Number(entry.bucketStartMeter || 0);
    const bucketStop = Number(entry.bucketStopMeter || 0);
    const breakerStart = Number(entry.breakerStartMeter || 0);
    const breakerStop = Number(entry.breakerStopMeter || 0);
    const bata = Number(entry.bata || 0);
    const dieselAdvance = Number(entry.dieselAdvance || 0);
    const cashAdvance = Number(entry.cashAdvance || 0);
    const oldBalance = Number(entry.oldBalance || 0);
    const oldAdBalance = Number(entry.oldAdBalance || 0);
    return sum + (bucketRate * (bucketStop - bucketStart) + breakerRate * (breakerStop - breakerStart) + bata - dieselAdvance - cashAdvance + oldBalance + oldAdBalance);
  }, 0);
  return (
    <Page title="Create Invoice">
      <Layout>
        <Layout.Section>
          <Card style={{ boxShadow: '0 4px 24px rgba(37,99,235,0.10)', borderRadius: 16, padding: 32, background: 'var(--p-surface, #18181b)' }}>
            <FormLayout>
              {entries.map((entry, idx) => (
                <div key={idx} style={{
                  marginBottom: 32,
                  padding: '24px 0',
                  borderBottom: idx < entries.length-1 ? '1px solid #2563EB' : 'none',
                  background: 'rgba(37,99,235,0.03)',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(37,99,235,0.04)',
                }}>
                  <div style={{fontWeight:700, fontSize:20, marginBottom:16, color:'#2563EB', letterSpacing:1}}>{`Entry ${idx + 1}`}</div>
                  <Select
                    label="Select Type"
                    options={[{label:'Both', value:'both'},{label:'Bucket', value:'bucket'},{label:'Breaker', value:'breaker'}]}
                    value={entryTypes[idx] || 'both'}
                    onChange={value => handleEntryTypeChange(idx, value)}
                  />
                  <FormLayout.Group>
                    <TextField
                      label="Date"
                      type="date"
                      value={entry.date || ''}
                      onChange={value => handleEntryChange(idx, 'date', value)}
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    {(entryTypes[idx] === 'both' || entryTypes[idx] === 'bucket') && (
                      <>
                        <TextField label="Bucket Rate/hr" type="number" value={String(entry.bucketRate || '')} onChange={value => handleEntryChange(idx, 'bucketRate', Number(value))} autoComplete="off" />
                        <TextField label="Bucket Start Meter" type="number" value={String(entry.bucketStartMeter || '')} onChange={value => handleEntryChange(idx, 'bucketStartMeter', Number(value))} autoComplete="off" />
                        <TextField label="Bucket Stop Meter" type="number" value={String(entry.bucketStopMeter || '')} onChange={value => handleEntryChange(idx, 'bucketStopMeter', Number(value))} autoComplete="off" />
                      </>
                    )}
                    {(entryTypes[idx] === 'both' || entryTypes[idx] === 'breaker') && (
                      <>
                        <TextField label="Breaker Rate/hr" type="number" value={String(entry.breakerRate || '')} onChange={value => handleEntryChange(idx, 'breakerRate', Number(value))} autoComplete="off" />
                        <TextField label="Breaker Start Meter" type="number" value={String(entry.breakerStartMeter || '')} onChange={value => handleEntryChange(idx, 'breakerStartMeter', Number(value))} autoComplete="off" />
                        <TextField label="Breaker Stop Meter" type="number" value={String(entry.breakerStopMeter || '')} onChange={value => handleEntryChange(idx, 'breakerStopMeter', Number(value))} autoComplete="off" />
                      </>
                    )}
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField label="Bata" type="number" value={String(entry.bata || '')} onChange={value => handleEntryChange(idx, 'bata', Number(value))} autoComplete="off" />
                    <TextField label="Diesel Advance" type="number" value={String(entry.dieselAdvance || '')} onChange={value => handleEntryChange(idx, 'dieselAdvance', Number(value))} autoComplete="off" />
                    <TextField label="Cash Advance" type="number" value={String(entry.cashAdvance || '')} onChange={value => handleEntryChange(idx, 'cashAdvance', Number(value))} autoComplete="off" />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField label="Old Balance" type="number" value={String(entry.oldBalance || '')} onChange={value => handleEntryChange(idx, 'oldBalance', Number(value))} autoComplete="off" />
                    <TextField label="Old AD Balance" type="number" value={String(entry.oldAdBalance || '')} onChange={value => handleEntryChange(idx, 'oldAdBalance', Number(value))} autoComplete="off" />
                  </FormLayout.Group>
                  {entries.length > 1 && (
                    <div style={{display:'flex', justifyContent:'flex-end', marginTop:16}}>
                      <Button tone="critical" onClick={() => removeEntry(idx)}>
                        Remove Entry
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div style={{marginTop:24, display:'flex', justifyContent:'center'}}>
                <Button variant="primary" onClick={addEntry} size="large" style={{borderRadius:8, fontWeight:600, fontSize:16, background:'#2563EB', color:'#fff', boxShadow:'0 2px 8px rgba(37,99,235,0.10)'}}>
                  + Add Another Entry
                </Button>
              </div>
              <div style={{marginTop:32, textAlign:'center', fontWeight:700, fontSize:22, color:'#2563EB', letterSpacing:1, background:'rgba(37,99,235,0.05)', borderRadius:8, padding:'12px 0'}}>
                Live Total Balance: ₹{liveTotalBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
              <div style={{marginTop:40, display:'flex', flexDirection:'column', alignItems:'center', gap:12}}>
                {/* PDF Preview CTA below entry form, inline modal preview */}
                <InvoicePDF invoice={{
                  invoiceType: 'daily',
                  id: 'INV-001',
                  date: entries[0]?.date || '',
                  voucherNumber: 'VCH-123',
                  clientId: 'CL-001',
                  clientName: 'Earth Mover Customer',
                  bucketRate: entries[0]?.bucketRate || 0,
                  breakerRate: entries[0]?.breakerRate || 0,
                  bucketStartMeter: entries[0]?.bucketStartMeter || 0,
                  bucketStopMeter: entries[0]?.bucketStopMeter || 0,
                  breakerStartMeter: entries[0]?.breakerStartMeter || 0,
                  breakerStopMeter: entries[0]?.breakerStopMeter || 0,
                  bata: entries[0]?.bata || 0,
                  dieselAdvance: entries[0]?.dieselAdvance || 0,
                  cashAdvance: entries[0]?.cashAdvance || 0,
                  oldBalance: entries[0]?.oldBalance || 0,
                  oldAdBalance: entries[0]?.oldAdBalance || 0,
                  totalBucketHours: (entries[0]?.bucketStopMeter || 0) - (entries[0]?.bucketStartMeter || 0),
                  totalBreakerHours: (entries[0]?.breakerStopMeter || 0) - (entries[0]?.breakerStartMeter || 0),
                  totalBucketAmount: (entries[0]?.bucketRate || 0) * ((entries[0]?.bucketStopMeter || 0) - (entries[0]?.bucketStartMeter || 0)),
                  totalBreakerAmount: (entries[0]?.breakerRate || 0) * ((entries[0]?.breakerStopMeter || 0) - (entries[0]?.breakerStartMeter || 0)),
                  totalAmount: liveTotalBalance,
                  totalBalance: liveTotalBalance,
                  status: 'pending',
                  pdfUrl: ''
                }} />
              </div>
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default InvoiceForm;
