import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { 
  QRCode,
  QRCodeWithLogo,
  QRCodeScannerFrame
} from './QRCode';
import { Text } from '../../typography/Text';
import { Button } from '../button/Button';
import { Input } from '../input/Input';

const meta: Meta<typeof QRCode> = {
  title: 'Primitives/QRCode',
  component: QRCode,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <QRCode value="https://example.com" />
  ),
};

export const CustomSize: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Small (100px)</Text>
        <QRCode value="Small QR Code" size={100} />
      </View>
      
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Medium (200px)</Text>
        <QRCode value="Medium QR Code" size={200} />
      </View>
      
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Large (300px)</Text>
        <QRCode value="Large QR Code" size={300} />
      </View>
    </View>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Blue QR Code</Text>
        <QRCode 
          value="Blue QR Code" 
          foregroundColor="#3b82f6"
          backgroundColor="#eff6ff"
        />
      </View>
      
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Green QR Code</Text>
        <QRCode 
          value="Green QR Code" 
          foregroundColor="#10b981"
          backgroundColor="#ecfdf5"
        />
      </View>
      
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Red QR Code</Text>
        <QRCode 
          value="Red QR Code" 
          foregroundColor="#ef4444"
          backgroundColor="#fef2f2"
        />
      </View>
    </View>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">QR Code with Emoji Logo</Text>
        <QRCodeWithLogo 
          value="https://example.com/profile" 
          logo={<Text style={{ fontSize: 24 }}>🚀</Text>}
          logoSize={50}
        />
      </View>
      
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">QR Code with Text Logo</Text>
        <QRCodeWithLogo 
          value="https://company.com" 
          logo={<Text style={{ fontSize: 12, fontWeight: 'bold' }}>LOGO</Text>}
          logoSize={40}
          logoBackgroundColor="#ffffff"
        />
      </View>
    </View>
  ),
};

export const ScannerFrame: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Default Scanner Frame</Text>
        <QRCodeScannerFrame />
      </View>
      
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Text variant="label">Custom Scanner Frame</Text>
        <QRCodeScannerFrame 
          size={200}
          cornerLength={40}
          cornerWidth={6}
          borderColor="#10b981"
        />
      </View>
    </View>
  ),
};

export const InteractiveGenerator: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState('https://example.com');
    const [qrValue, setQrValue] = useState('https://example.com');
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text variant="heading-md">QR Code Generator</Text>
        
        <View style={{ width: '100%', maxWidth: 300, gap: 12 }}>
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter text or URL"
          />
          <Button 
            title="Generate QR Code" 
            onPress={() => setQrValue(inputValue)}
          />
        </View>
        
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Generated QR Code:</Text>
          <QRCode value={qrValue} size={200} />
          <Text variant="caption" color="muted" style={{ textAlign: 'center' }}>
            {qrValue}
          </Text>
        </View>
      </View>
    );
  },
};

export const WalletAddress: Story = {
  render: () => {
    const walletAddress = "0x742d35Cc6634C0532925a3b8D4C2C4e4C8b4C8b4";
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text variant="heading-md">Wallet Address QR</Text>
        
        <QRCodeWithLogo 
          value={walletAddress}
          logo={<Text style={{ fontSize: 20 }}>💰</Text>}
          logoSize={45}
          size={250}
        />
        
        <View style={{ gap: 4, alignItems: 'center' }}>
          <Text variant="label">Wallet Address:</Text>
          <Text variant="caption" color="muted" style={{ fontFamily: 'monospace' }}>
            {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
          </Text>
        </View>
      </View>
    );
  },
};

export const ContactCard: Story = {
  render: () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Example Company
TEL:+1-555-123-4567
EMAIL:john@example.com
URL:https://johndoe.com
END:VCARD`;
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text variant="heading-md">Contact Card QR</Text>
        
        <QRCodeWithLogo 
          value={vCard}
          logo={<Text style={{ fontSize: 20 }}>👤</Text>}
          logoSize={45}
          size={250}
        />
        
        <View style={{ gap: 4, alignItems: 'center' }}>
          <Text variant="label">John Doe</Text>
          <Text variant="caption" color="muted">Example Company</Text>
          <Text variant="caption" color="muted">john@example.com</Text>
        </View>
      </View>
    );
  },
};

export const WiFiCredentials: Story = {
  render: () => {
    const wifiConfig = "WIFI:T:WPA;S:MyNetwork;P:MyPassword123;H:false;;";
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text variant="heading-md">WiFi QR Code</Text>
        
        <QRCodeWithLogo 
          value={wifiConfig}
          logo={<Text style={{ fontSize: 20 }}>📶</Text>}
          logoSize={45}
          size={250}
        />
        
        <View style={{ gap: 4, alignItems: 'center' }}>
          <Text variant="label">Network: MyNetwork</Text>
          <Text variant="caption" color="muted">Scan to connect automatically</Text>
        </View>
      </View>
    );
  },
};

export const SocialMedia: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <Text variant="heading-md">Social Media QR Codes</Text>
      
      <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Twitter</Text>
          <QRCodeWithLogo 
            value="https://twitter.com/username"
            logo={<Text style={{ fontSize: 16 }}>🐦</Text>}
            logoSize={35}
            size={150}
            foregroundColor="#1da1f2"
          />
        </View>
        
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Instagram</Text>
          <QRCodeWithLogo 
            value="https://instagram.com/username"
            logo={<Text style={{ fontSize: 16 }}>📷</Text>}
            logoSize={35}
            size={150}
            foregroundColor="#e4405f"
          />
        </View>
        
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">LinkedIn</Text>
          <QRCodeWithLogo 
            value="https://linkedin.com/in/username"
            logo={<Text style={{ fontSize: 16 }}>💼</Text>}
            logoSize={35}
            size={150}
            foregroundColor="#0077b5"
          />
        </View>
      </View>
    </View>
  ),
};

export const EventTicket: Story = {
  render: () => {
    const ticketData = JSON.stringify({
      event: "Tech Conference 2024",
      date: "2024-03-15",
      seat: "A-123",
      price: "$299",
      ticketId: "TC2024-001234"
    });
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text variant="heading-md">Event Ticket QR</Text>
        
        <QRCodeWithLogo 
          value={ticketData}
          logo={<Text style={{ fontSize: 20 }}>🎫</Text>}
          logoSize={45}
          size={250}
        />
        
        <View style={{ gap: 4, alignItems: 'center' }}>
          <Text variant="label">Tech Conference 2024</Text>
          <Text variant="caption" color="muted">March 15, 2024 • Seat A-123</Text>
          <Text variant="caption" color="muted">Ticket ID: TC2024-001234</Text>
        </View>
      </View>
    );
  },
};

export const PaymentQR: Story = {
  render: () => {
    const paymentData = "bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001&label=Coffee";
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text variant="heading-md">Payment QR Code</Text>
        
        <QRCodeWithLogo 
          value={paymentData}
          logo={<Text style={{ fontSize: 20 }}>₿</Text>}
          logoSize={45}
          size={250}
          foregroundColor="#f7931a"
        />
        
        <View style={{ gap: 4, alignItems: 'center' }}>
          <Text variant="label">Bitcoin Payment</Text>
          <Text variant="caption" color="muted">Amount: 0.001 BTC</Text>
          <Text variant="caption" color="muted">Label: Coffee</Text>
        </View>
      </View>
    );
  },
};

export const ErrorCorrectionLevels: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <Text variant="heading-md">Error Correction Levels</Text>
      
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Level L (Low)</Text>
          <QRCode 
            value="Error correction level L"
            errorCorrectionLevel="L"
            size={150}
          />
          <Text variant="caption" color="muted">~7% recovery</Text>
        </View>
        
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Level M (Medium)</Text>
          <QRCode 
            value="Error correction level M"
            errorCorrectionLevel="M"
            size={150}
          />
          <Text variant="caption" color="muted">~15% recovery</Text>
        </View>
        
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Level Q (Quartile)</Text>
          <QRCode 
            value="Error correction level Q"
            errorCorrectionLevel="Q"
            size={150}
          />
          <Text variant="caption" color="muted">~25% recovery</Text>
        </View>
        
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text variant="label">Level H (High)</Text>
          <QRCode 
            value="Error correction level H"
            errorCorrectionLevel="H"
            size={150}
          />
          <Text variant="caption" color="muted">~30% recovery</Text>
        </View>
      </View>
    </View>
  ),
}; 