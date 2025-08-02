
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { exportToCSV, exportToExcel, exportToJSON, ExportData } from "@/utils/exportUtils";
import { Download, FileSpreadsheet, FileText, Braces } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportData: ExportData;
}

const ExportModal = ({ isOpen, onClose, exportData }: ExportModalProps) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'json'>('csv');
  const [includeInactive, setIncludeInactive] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);

  const handleExport = () => {
    const filteredData = {
      ...exportData,
      campaigns: includeInactive ? exportData.campaigns : exportData.campaigns.filter(c => c.active)
    };
    
    switch (exportFormat) {
      case 'csv':
        exportToCSV(filteredData);
        break;
      case 'excel':
        exportToExcel(filteredData);
        break;
      case 'json':
        exportToJSON(filteredData);
        break;
    }
    
    onClose();
  };

  const getFormatIcon = () => {
    switch (exportFormat) {
      case 'csv': return <FileText className="h-4 w-4" />;
      case 'excel': return <FileSpreadsheet className="h-4 w-4" />;
      case 'json': return <Braces className="h-4 w-4" />;
    }
  };

  const campaignCount = includeInactive ? exportData.campaigns.length : exportData.campaigns.filter(c => c.active).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Campaign Data
          </DialogTitle>
          <DialogDescription>
            Choose your export format and options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={exportFormat} onValueChange={(value: 'csv' | 'excel' | 'json') => setExportFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Export Options</label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-inactive" 
                checked={includeInactive}
                onCheckedChange={(checked) => setIncludeInactive(checked as boolean)}
              />
              <label htmlFor="include-inactive" className="text-sm">
                Include inactive campaigns
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-summary" 
                checked={includeSummary}
                onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
              />
              <label htmlFor="include-summary" className="text-sm">
                Include summary statistics
              </label>
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <div className="flex justify-between">
              <span>Total campaigns:</span>
              <span className="font-medium">{campaignCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-medium flex items-center gap-1">
                {getFormatIcon()}
                {exportFormat.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleExport} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
