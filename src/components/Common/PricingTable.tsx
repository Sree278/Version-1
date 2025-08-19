import React from 'react';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Banner, Button } from '@shopify/polaris';

const plans = [
  { name: 'Free Trial', price: '₹0', duration: '7 days', features: ['Invoice management', 'Manual UPI payment'] },
  { name: 'Standard', price: '₹499', duration: 'per month', features: ['All Free features', 'PDF download', 'Priority support'] },
  { name: 'Premium', price: '₹999', duration: 'per month', features: ['All Standard features', 'Advanced analytics', 'Custom branding'] },
];

const PricingTable: React.FC = () => {
  const { role } = useUserStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (role === 'superadmin') {
      navigate('/dashboard');
    }
  }, [role, navigate]);

  return (
    <Page title="Choose Your Plan">
      <Banner tone="info" title="Select a subscription plan that fits your business needs.">
        All plans include secure invoice management and UPI payment support.
      </Banner>
      <div style={{display:'flex', gap:32, marginTop:32, justifyContent:'center'}}>
        {plans.map(plan => (
          <Card key={plan.name}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:18, fontWeight:600, marginBottom:8}}>{plan.name}</div>
              <div style={{fontSize:24, fontWeight:700, color:'#3B82F6', marginBottom:8}}>{plan.price}</div>
              <div style={{marginBottom:16}}>{plan.duration}</div>
              <ul style={{marginBottom:24, color:'#374151', fontSize:15, textAlign:'left'}}>
                {plan.features.map(f => <li key={f} style={{marginBottom:4}}>{f}</li>)}
              </ul>
              <Button variant="primary" fullWidth>Select</Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
};

export default PricingTable;
