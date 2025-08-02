import React from 'react';
import { X, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  campaignCount: number;
  totalAmount: number;
}

export const InvoiceConfirmationModal: React.FC<InvoiceConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  campaignCount,
  totalAmount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/37 z-[1000] flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-[450px] w-[90vw] p-6 shadow-lg relative font-[Arial,'Roboto',sans-serif]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-none border-none text-xl text-gray-500 cursor-pointer hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Receipt className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Generate Invoice</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            Kya aap current ads campaigns ka invoice generate karna chahte hain?
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Active Campaigns:</span>
              <span className="font-medium">{campaignCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Amount:</span>
              <span className="font-medium text-green-600">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Generate Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};