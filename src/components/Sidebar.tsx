
import { 
  Bell, 
  FolderOpen, 
  FileText, 
  BarChart3, 
  Users, 
  CreditCard, 
  Settings, 
  HelpCircle,
  Search,
  Bug,
  Gauge
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const topMenuItems = [
    { icon: Search, label: "Search", active: false },
    { icon: Bug, label: "Debug", active: false },
    { icon: Gauge, label: "Performance", active: false },
    { icon: Users, label: "Team", active: false },
  ];

  const mainMenuItems = [
    { icon: Bell, label: "Notifications", active: true },
    { icon: FolderOpen, label: "Campaigns", active: false },
    { icon: BarChart3, label: "Insights", active: false },
    { icon: FileText, label: "Reports", active: false },
    { icon: Users, label: "Audience", active: false },
    { icon: CreditCard, label: "Billing", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: HelpCircle, label: "Help", active: false },
  ];

  return (
    <div 
      className="w-[60px] border-r h-screen flex flex-col items-center"
      style={{ 
        backgroundColor: '#f0f2f5',
        borderRightColor: '#dadde1'
      }}
    >
      {/* Meta Logo */}
      <div className="w-12 h-12 mt-3 mb-4 flex items-center justify-center flex-shrink-0">
        <img 
          src="/lovable-uploads/a1435a9d-80aa-4689-b63a-3fc215d66a7e.png" 
          alt="Meta" 
          className="w-7 h-7"
        />
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 w-full">
        <div className="flex flex-col items-center px-1">
          {/* Top Menu Items */}
          <div className="flex flex-col space-y-1 mb-4">
            {topMenuItems.map((item, index) => (
              <div
                key={index}
                className="w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white"
                style={{ 
                  backgroundColor: item.active ? '#e7f3ff' : 'transparent',
                  color: item.active ? '#1877f2' : '#65676b'
                }}
              >
                <item.icon className="w-5 h-5" />
              </div>
            ))}
          </div>

          {/* Separator */}
          <div 
            className="w-8 h-px mb-4 flex-shrink-0"
            style={{ backgroundColor: '#dadde1' }}
          ></div>

          {/* Main Menu Items */}
          <div className="flex flex-col space-y-1 pb-4">
            {mainMenuItems.map((item, index) => (
              <div
                key={index}
                className="w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white"
                style={{ 
                  backgroundColor: item.active ? '#e7f3ff' : 'transparent',
                  color: item.active ? '#1877f2' : '#65676b'
                }}
              >
                <item.icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
