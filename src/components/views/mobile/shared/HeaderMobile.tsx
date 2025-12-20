import { Menu } from "lucide-react";
import Link from "next/link";

interface HeaderMobileProps {
  title: string;
  link: string;
  color?: string;
}

export default function HeaderMobile({ title, link, color = "#f97316" }: HeaderMobileProps) {
    return (
        <header 
          className="text-white p-4 sticky top-0 z-10 shadow-lg"
          style={{ background: `linear-gradient(to right, ${color}, ${color}dd)` }}
        >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
            href={link}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </Link>
            <div>
              <h1 className="text-lg font-bold">{title}</h1>
            </div>
          </div>
          
        </div>
      </header>
    );
}