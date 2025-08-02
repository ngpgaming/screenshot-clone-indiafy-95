import React from 'react';
import { X } from 'lucide-react';

interface InvoiceItem {
  description: string;
  amount: number;
}

interface MetaInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    customerName: string;
    customerAddress: string[];
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
  };
}

export const MetaInvoiceModal: React.FC<MetaInvoiceModalProps> = ({
  isOpen,
  onClose,
  invoiceData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/37 z-[1001] flex items-center justify-content-center">
      <div className="bg-white rounded-lg max-w-[670px] w-[97vw] p-9 shadow-[0_8px_38px_rgba(0,0,0,0.23)] relative font-[Arial,'Roboto',sans-serif] text-[#222] animate-in fade-in duration-180">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 bg-none border-none text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
        >
          <X size={26} />
        </button>

        <div className="flex justify-between items-start mb-3 max-md:flex-col">
          <div>
            <img 
              src="/lovable-uploads/35921c5e-bc10-48d1-abf1-45438f00676d.png" 
              alt="Meta" 
              className="h-8 mb-2 mt-1"
            />
            <div className="text-[15px] text-[#222] mb-2 leading-6 mt-0">
              <div className="font-bold text-[15px] text-[#222]">Meta Platforms, Inc.</div>
              <div>1 Hacker Way</div>
              <div>Menlo Park, CA 94025</div>
              <div>United States</div>
            </div>
          </div>
          
          <div className="text-right max-md:text-left">
            <h1 className="font-normal text-2xl m-0 mb-4 tracking-wide text-[#333]">
              Invoice
            </h1>
            <div className="text-[15px] text-[#222] leading-[1.56]">
              <div>
                <span className="text-[#222] font-normal mr-1.5">Invoice #:</span>
                {invoiceData.invoiceNumber}
              </div>
              <div>
                <span className="text-[#222] font-normal mr-1.5">Date:</span>
                {invoiceData.date}
              </div>
              <div>
                <span className="text-[#222] font-normal mr-1.5">Due Date:</span>
                {invoiceData.dueDate}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-4">
          <div className="text-[15px] text-[#222] leading-6">
            <div className="font-bold text-[15px] text-[#222] mb-1">Bill To:</div>
            <div>{invoiceData.customerName}</div>
            {invoiceData.customerAddress.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>

        <table className="border-collapse w-full mt-8 mb-2">
          <thead>
            <tr>
              <th className="border border-[#222] p-2 text-base text-left bg-white font-normal">
                Description
              </th>
              <th className="border border-[#222] p-2 text-base text-right bg-white font-normal">
                Amount (INR)
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-[#222] p-2 text-base">
                  {item.description}
                </td>
                <td className="border border-[#222] p-2 text-base text-right">
                  ₹{item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <div className="w-64">
            <div className="flex justify-between py-2 border-t border-[#222] font-bold">
              <span>Total:</span>
              <span>₹{invoiceData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>Thank you for your business with Meta Advertising Services.</p>
          <p>Payment terms: Net 30 days</p>
        </div>
      </div>
    </div>
  );
};