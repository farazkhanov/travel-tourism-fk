import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Smartphone, CheckCircle, Copy, Upload, X, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export default function PaymentMethods({ bookingData, totalAmount, onSuccess, onCancel }) {
  const [selectedMethod, setSelectedMethod] = useState('easypaisa');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setScreenshot(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      toast.success('Screenshot uploaded!');
    }
  };

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) {
      toast.error('Please enter transaction ID');
      return;
    }

    setProcessing(true);
    try {
      const bookingPayload = {
        ...bookingData,
        paymentMethod: selectedMethod,
        transactionId: transactionId,
        paymentScreenshot: screenshot ? screenshot.name : null,
        paymentStatus: 'pending',
        status: 'pending',
        totalAmount: totalAmount
      };

      const response = await api.createBooking(bookingPayload);
      toast.success('Booking confirmed! Payment verification pending.');
      onSuccess?.(response);
    } catch (error) {
      toast.error(error.message || 'Booking failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Complete Payment</h2>
        {onCancel && (
          <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
            <X style={{ width: '20px', height: '20px', color: '#94a3b8' }} />
          </button>
        )}
      </div>

      {/* Total Amount */}
      <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '600' }}>Total Amount</span>
        <span style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: '900' }}>PKR {totalAmount?.toLocaleString()}</span>
      </div>

      {/* Payment Methods */}
      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' }}>Select Payment Method</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { id: 'easypaisa', name: 'Easypaisa', icon: Smartphone, color: '#22c55e', bg: '#f0fdf4' },
          { id: 'jazzcash', name: 'JazzCash', icon: Smartphone, color: '#ef4444', bg: '#fef2f2' },
          { id: 'bank', name: 'Bank Transfer', icon: Building2, color: '#3b82f6', bg: '#eff6ff' }
        ].map(method => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <motion.div key={method.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod(method.id)}
              style={{ padding: '1.25rem', borderRadius: '12px', border: `2px solid ${isSelected ? method.color : '#e2e8f0'}`, background: isSelected ? method.bg : '#fff', cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
              <Icon style={{ width: '32px', height: '32px', color: method.color, margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: isSelected ? method.color : '#374151' }}>{method.name}</div>
              {isSelected && <CheckCircle style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', color: method.color }} />}
            </motion.div>
          );
        })}
      </div>
      {/* Payment Instructions */}
      {selectedMethod === 'easypaisa' && <EasypaisaInstructions totalAmount={totalAmount} transactionId={transactionId} setTransactionId={setTransactionId} screenshot={screenshot} screenshotPreview={screenshotPreview} handleFileUpload={handleFileUpload} />}
      {selectedMethod === 'jazzcash' && <JazzCashInstructions totalAmount={totalAmount} transactionId={transactionId} setTransactionId={setTransactionId} screenshot={screenshot} screenshotPreview={screenshotPreview} handleFileUpload={handleFileUpload} />}
      {selectedMethod === 'bank' && <BankInstructions totalAmount={totalAmount} transactionId={transactionId} setTransactionId={setTransactionId} screenshot={screenshot} screenshotPreview={screenshotPreview} handleFileUpload={handleFileUpload} />}

      {/* Submit Button */}
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleConfirmPayment} disabled={processing}
        style={{ width: '100%', padding: '1rem', marginTop: '1.5rem', background: processing ? '#6ee7b7' : 'linear-gradient(135deg, #059669, #047857)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', cursor: processing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(5,150,105,0.35)' }}>
        {processing ? <><Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} /> Processing...</> : <><CheckCircle style={{ width: '20px', height: '20px' }} /> Confirm Payment</>}
      </motion.button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Easypaisa Instructions
function EasypaisaInstructions({ totalAmount, transactionId, setTransactionId, screenshot, screenshotPreview, handleFileUpload }) {
  const accountNumber = '03001234567';
  const copy = () => { navigator.clipboard.writeText(accountNumber); toast.success('Account number copied!'); };

  return (
    <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '14px', padding: '1.5rem', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#15803d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Smartphone style={{ width: '20px', height: '20px' }} /> Easypaisa Payment
      </h3>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.75rem', fontWeight: '600' }}>Send PKR {totalAmount?.toLocaleString()} to:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Easypaisa Account</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', letterSpacing: '1px' }}>{accountNumber}</div>
          </div>
          <button onClick={copy} style={{ padding: '0.5rem 1rem', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Copy style={{ width: '14px', height: '14px' }} /> Copy
          </button>
        </div>
        <ol style={{ fontSize: '0.875rem', color: '#374151', paddingLeft: '1.25rem', marginTop: '1rem', lineHeight: '1.6' }}>
          <li>Open Easypaisa app</li>
          <li>Select "Send Money"</li>
          <li>Enter account: {accountNumber}</li>
          <li>Amount: PKR {totalAmount?.toLocaleString()}</li>
          <li>Complete transaction</li>
          <li>Enter Transaction ID below</li>
        </ol>
      </div>
      <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter Transaction ID (e.g. EP1234567890)"
        style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '1rem', outline: 'none' }} />
      <FileUpload screenshot={screenshot} screenshotPreview={screenshotPreview} handleFileUpload={handleFileUpload} />
    </div>
  );
}

// JazzCash Instructions
function JazzCashInstructions({ totalAmount, transactionId, setTransactionId, screenshot, screenshotPreview, handleFileUpload }) {
  const accountNumber = '03009876543';
  const copy = () => { navigator.clipboard.writeText(accountNumber); toast.success('Account number copied!'); };

  return (
    <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '14px', padding: '1.5rem', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#991b1b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Smartphone style={{ width: '20px', height: '20px' }} /> JazzCash Payment
      </h3>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.75rem', fontWeight: '600' }}>Send PKR {totalAmount?.toLocaleString()} to:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>JazzCash Account</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', letterSpacing: '1px' }}>{accountNumber}</div>
          </div>
          <button onClick={copy} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Copy style={{ width: '14px', height: '14px' }} /> Copy
          </button>
        </div>
        <ol style={{ fontSize: '0.875rem', color: '#374151', paddingLeft: '1.25rem', marginTop: '1rem', lineHeight: '1.6' }}>
          <li>Open JazzCash app or dial *786#</li>
          <li>Select "Send Money" or "Money Transfer"</li>
          <li>Enter account: {accountNumber}</li>
          <li>Amount: PKR {totalAmount?.toLocaleString()}</li>
          <li>Complete transaction with PIN</li>
          <li>Note the Transaction ID from SMS</li>
          <li>Enter Transaction ID below</li>
        </ol>
      </div>
      <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter Transaction ID (e.g. JC1234567890)"
        style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '1rem', outline: 'none' }} />
      <FileUpload screenshot={screenshot} screenshotPreview={screenshotPreview} handleFileUpload={handleFileUpload} />
    </div>
  );
}

// Bank Transfer Instructions
function BankInstructions({ totalAmount, transactionId, setTransactionId, screenshot, screenshotPreview, handleFileUpload }) {
  const bank = { name: 'HBL', title: 'Pakistan Travel & Tourism', account: '12345678901234', iban: 'PK12HABB0012345678901234' };
  const copy = (text) => { navigator.clipboard.writeText(text); toast.success('Copied to clipboard!'); };

  return (
    <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '14px', padding: '1.5rem', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Building2 style={{ width: '20px', height: '20px' }} /> Bank Transfer Details
      </h3>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem' }}>
        {[['Bank', bank.name], ['Account Title', bank.title], ['Account Number', bank.account], ['IBAN', bank.iban], ['Amount', `PKR ${totalAmount?.toLocaleString()}`]].map(([label, value], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{label}</span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: i === 4 ? '800' : '700', color: i === 4 ? '#059669' : '#0f172a' }}>{value}</span>
              {(label === 'Account Number' || label === 'IBAN') && (
                <button onClick={() => copy(value)} style={{ padding: '0.25rem 0.5rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  <Copy style={{ width: '12px', height: '12px' }} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#dbeafe', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle style={{ width: '16px', height: '16px' }} /> Important:
        </p>
        <ul style={{ fontSize: '0.8rem', color: '#374151', paddingLeft: '1.25rem', margin: 0, lineHeight: '1.6' }}>
          <li>Use online banking, ATM, or branch</li>
          <li>Keep transaction receipt</li>
          <li>Verification within 24 hours</li>
        </ul>
      </div>
      <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter Transaction ID / Receipt Number"
        style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '1rem', outline: 'none' }} />
      <FileUpload screenshot={screenshot} screenshotPreview={screenshotPreview} handleFileUpload={handleFileUpload} />
    </div>
  );
}

// File Upload Component
function FileUpload({ screenshot, screenshotPreview, handleFileUpload }) {
  return (
    <div>
      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
        Upload Payment Screenshot (Optional)
      </label>
      <div style={{ position: 'relative' }}>
        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', background: '#f8fafc', transition: 'all 0.2s' }}>
          <Upload style={{ width: '18px', height: '18px', color: '#64748b' }} />
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{screenshot ? screenshot.name : 'Click to upload'}</span>
        </label>
      </div>
      {screenshot && (
        <div style={{ marginTop: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#22c55e', marginBottom: '0.5rem' }}>✓ {screenshot.name} uploaded</p>
          {screenshotPreview && (
            <img src={screenshotPreview} alt="Payment screenshot preview" 
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px', border: '2px solid #e2e8f0', objectFit: 'cover' }} />
          )}
        </div>
      )}
    </div>
  );
}
