import { ChevronDown, Bell, RefreshCw, Settings, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MetaInvoiceModal } from "./MetaInvoiceModal";

const Header = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const sampleInvoiceData = {
    invoiceNumber: "META-2025-001",
    date: "January 15, 2025",
    dueDate: "February 15, 2025",
    customerName: "TEAM UNITY",
    customerAddress: [
      "Business Street",
      "Mumbai, Maharashtra 400001",
      "India"
    ],
    items: [
      {
        description: "Meta Advertising Services - Campaign Management",
        amount: 85000
      },
      {
        description: "Performance Analytics & Reporting",
        amount: 25000
      }
    ],
    subtotal: 110000,
    tax: 0,
    total: 110000
  };

  return (
    <div className="bg-header-bg border-b border-table-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/f8a7488e-34ba-4510-98ec-cce09f0dc6e5.png" 
              alt="Meta Logo" 
              className="h-10"
              style={{ maxWidth: '160px' }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span 
                className="font-medium"
                style={{
                  fontSize: '14px',
                  color: 'hsl(var(--text-primary))',
                  fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                2111522622603365 (2111...)
              </span>
              <ChevronDown className="w-4 h-4" style={{ color: 'hsl(var(--text-secondary))' }} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span 
              className="text-sm"
              style={{
                color: 'hsl(var(--text-secondary))',
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Opportunity score
            </span>
            <ChevronDown className="w-4 h-4" style={{ color: 'hsl(var(--text-secondary))' }} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">Updated just now</div>
          <RefreshCw className="w-4 h-4 text-text-secondary cursor-pointer" />
          <Button variant="outline" size="sm">
            Review and publish
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsInvoiceModalOpen(true)}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Invoice
          </Button>
          <Settings className="w-4 h-4 text-text-secondary cursor-pointer" />
          <div className="relative">
            <Bell className="w-4 h-4 text-text-secondary cursor-pointer" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full text-xs text-white flex items-center justify-center">2</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-facebook-blue rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="w-4 h-4 bg-facebook-blue rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">f</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <MetaInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoiceData={sampleInvoiceData}
      />
    </div>
  );
};

export default Header;