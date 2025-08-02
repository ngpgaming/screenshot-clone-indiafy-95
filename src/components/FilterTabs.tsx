import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterTabs = () => {
  const tabs = [
    { label: "All ads", active: true, hasIcon: true },
    { label: "Had delivery", icon: "●" },
    { label: "Actions" },
    { label: "Active ads" },
    { label: "See more" },
  ];

  return (
    <div className="bg-white border-b border-table-border">
      {/* Question mark icon */}
      <div className="px-6 py-2 border-b border-table-border">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-facebook-blue rounded-full flex items-center justify-center">
            <span className="text-white text-xs">?</span>
          </div>
          <div className="w-6 h-6 bg-facebook-blue rounded-full flex items-center justify-center">
            <span className="text-white text-xs">?</span>
          </div>
        </div>
      </div>

      {/* Main tabs */}
      <div className="px-6 py-3">
        <div className="flex items-center space-x-1">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              variant={tab.active ? "default" : "ghost"}
              size="sm"
              className={`${
                tab.active
                  ? "bg-facebook-blue text-white hover:bg-facebook-blue-dark"
                  : "text-text-secondary hover:bg-hover-bg"
              }`}
            >
              {tab.icon && <span className="mr-1 text-green-500">{tab.icon}</span>}
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-table-border">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-table-header rounded px-3 py-1">
            <span className="text-sm text-text-secondary">Impressions (campaign) &gt; 0</span>
            <X className="w-4 h-4 text-text-secondary cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2 bg-table-header rounded px-3 py-1">
            <span className="text-sm text-text-secondary">Campaign delivery is</span>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-text-secondary">Active</span>
            <X className="w-4 h-4 text-text-secondary cursor-pointer" />
          </div>
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <Input 
              placeholder="Search by name, ID or metrics" 
              className="pl-10 bg-white border-border-light"
            />
          </div>
          <Button variant="ghost" size="sm" className="text-facebook-blue">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;