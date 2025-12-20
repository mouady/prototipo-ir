import { Menu } from "lucide-react";

interface HeaderMobileProps {
  title: string;
  color?: string;
  onMenuClick?: () => void;
}

export default function HeaderMobile({ title, color = "#101828", onMenuClick }: HeaderMobileProps) {
    return (
        <header 
          className="text-white p-4 sticky top-0 z-10 shadow-lg"
          style={{ 
            background: `linear-gradient(to right, ${color}, ${color})`,
            filter: 'brightness(0.95)'
          }}
        >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onMenuClick}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">{title}</h1>
            </div>
          </div>
          
        </div>
      </header>
    );
}