
import {
  Page,
  Card,
  Layout,
  TextContainer,
  Divider,
  Banner,
} from '@shopify/polaris';
import { useUserStore } from '../../store/useUserStore';
import { useInvoiceStore } from '../../store/useInvoiceStore';

const Dashboard: React.FC = () => {
  const { role } = useUserStore();
  const { invoices } = useInvoiceStore();
  const totalInvoices = invoices.length;
  const pendingPayments = invoices.filter(inv => inv.status === 'pending').length;
  const businessAdmins = 3; // TODO: Replace with actual user count if available

  return (
    <Page title={role === 'superadmin' ? 'Super Admin Dashboard' : 'Business Admin Dashboard'}>
      <Banner tone="info" title="Welcome!">
        {role === 'superadmin'
          ? 'System-wide stats, manage business admins, and approve payments.'
          : 'Track your invoices and payment status. All data is private to your business.'}
      </Banner>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32 }}>
        <Divider />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
          {role === 'superadmin' ? (
            <>
              <Card>
                <TextContainer>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Total Invoices</div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#3f4eae', marginBottom: 8 }}>{totalInvoices}</div>
                </TextContainer>
              </Card>
              <Card>
                <TextContainer>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Business Admins</div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#3f4eae', marginBottom: 8 }}>{businessAdmins}</div>
                </TextContainer>
              </Card>
              <Card>
                <TextContainer>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Pending Payments</div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#3f4eae', marginBottom: 8 }}>{pendingPayments}</div>
                </TextContainer>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <TextContainer>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>My Invoices</div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#3f4eae', marginBottom: 8 }}>{totalInvoices}</div>
                </TextContainer>
              </Card>
              <Card>
                <TextContainer>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>My Pending Payments</div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#3f4eae', marginBottom: 8 }}>{pendingPayments}</div>
                </TextContainer>
              </Card>
            </>
          )}
        </div>
        <Divider />
        <div style={{ textAlign: 'right', fontSize: 16, color: '#888', fontWeight: 500 }}>
          Role: <span style={{ fontWeight: 700, color: '#3f4eae' }}>{role === 'superadmin' ? 'Super Admin' : 'Business Admin'}</span>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
