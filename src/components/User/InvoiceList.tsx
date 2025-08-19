import React from 'react';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Banner, DataTable, Button } from '@shopify/polaris';

const InvoiceList: React.FC = () => {
  const { invoices, setInvoices } = useInvoiceStore();
  const { role } = useUserStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (role === 'superadmin') {
      navigate('/dashboard');
    }
  }, [role, navigate]);

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  return (
    <Page title="Invoices">
      <Banner tone="info" title="View and manage your invoices." />
      <Card>
        {invoices.length === 0 ? (
          <Banner tone="warning" title="No invoices found.">
            Create a new invoice to get started.
          </Banner>
        ) : (
          <DataTable
            columnContentTypes={["text","text","text","numeric","numeric","numeric","numeric","numeric","numeric","text","text","text"]}
            headings={["Type","Voucher #","Client","Bucket Rate/hr","Breaker Rate/hr","Bucket Hours","Breaker Hours","Total Amount","Total Balance","Date","Status","Action"]}
            rows={invoices.map(inv => [
              inv.invoiceType,
              inv.voucherNumber,
              inv.clientName,
              inv.bucketRate,
              inv.breakerRate,
              inv.totalBucketHours,
              inv.totalBreakerHours,
              `9${inv.totalAmount}`,
              `9${inv.totalBalance}`,
              inv.date,
              <span style={{padding:'2px 8px', borderRadius:4, fontSize:12, fontWeight:600, background:inv.status==='pending'?'#FEF3C7':inv.status==='paid'?'#D1FAE5':'#F3F4F6', color:inv.status==='pending'?'#92400E':inv.status==='paid'?'#065F46':'#374151'}}>{inv.status}</span>,
              <Button tone="critical" onClick={() => handleDelete(inv.id)} size="slim">Delete</Button>
            ])}
          />
        )}
      </Card>
    </Page>
  );
};

export default InvoiceList;
