import React, { useState } from 'react';
import { Card, Banner, FormLayout, Button } from '@shopify/polaris';

const PaymentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setError('');
    setSuccess(false);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFile(null);
    }, 1200);
  };

  return (
    <Card>
      <div style={{fontWeight:600, fontSize:18, marginBottom:12}}>Upload UPI Payment Proof</div>
      <form onSubmit={handleUpload}>
        <FormLayout>
          <Banner tone="info" title="Upload your payment proof (image or PDF)." />
          {error && <Banner tone="critical" title={error} />}
          {loading && <Banner tone="info" title="Uploading payment proof..." />}
          {success && <Banner tone="success" title="Payment proof uploaded! Awaiting admin approval." />}
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} style={{marginBottom:12}} />
          <Button variant="primary" fullWidth loading={loading} disabled={loading} submit>
            Upload
          </Button>
        </FormLayout>
      </form>
    </Card>
  );
};

export default PaymentUpload;
