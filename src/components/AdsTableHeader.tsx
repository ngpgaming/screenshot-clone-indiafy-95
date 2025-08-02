
import React from 'react';
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const AdsTableHeader: React.FC = () => {
  const tableHeaders = [
    { label: "Off/On", width: "w-16" },
    { label: "Campaign", width: "w-80", sortable: true },
    { label: "Delivery", width: "w-32", sortable: true },
    { label: "Actions", width: "w-24" },
    { label: "Bid strategy", width: "w-40", sortable: true },
    { label: "Budget", width: "w-32", sortable: true },
    { label: "Amount spent", width: "w-32", sortable: true },
    { label: "Reach", width: "w-24", sortable: true },
    { label: "Impressions", width: "w-28", sortable: true },
    { label: "Cost per result", width: "w-32", sortable: true },
  ];

  return (
    <div className="bg-table-header border-b border-table-border">
      <div className="flex items-center py-3 px-6 font-segoe-ui">
        <Checkbox className="mr-4" />
        {tableHeaders.map((header, index) => (
          <div 
            key={index} 
            className={`${header.width} px-3 border-r border-table-border last:border-r-0`}
          >
            <div className="flex items-center space-x-1">
              <span 
                className="font-semibold text-text-secondary text-xs"
                style={{ 
                  fontWeight: '600',
                  textTransform: 'none'
                }}
              >
                {header.label}
              </span>
              {header.sortable && (
                <ArrowUpDown 
                  className="w-3 h-3 cursor-pointer text-text-muted" 
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsTableHeader;
