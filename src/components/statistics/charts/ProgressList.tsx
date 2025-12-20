"use client";

import { Button } from "@/components/ui/button";

interface ProgressListItem {
  nombre: string;
  valor: number;
  unidad?: string;
}

interface ProgressListProps {
  data: ProgressListItem[];
  showMore?: boolean;
  onShowMore?: () => void;
}

export function ProgressList({ data, showMore = true, onShowMore }: ProgressListProps) {
  const maxValue = Math.max(...data.map((d) => d.valor));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.nombre} className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="w-8 text-sm font-medium text-gray-500">
              {index + 1}.
            </span>
            <span className="flex-1 font-medium text-gray-800">
              {item.nombre}
            </span>
            <span className="text-sm text-gray-600">
              {item.valor.toLocaleString("es-ES")}
              {item.unidad && ` ${item.unidad}`}
            </span>
          </div>
          <div className="ml-8 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500"
              style={{ width: `${(item.valor / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}

      {showMore && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onShowMore}>
            Ver más
          </Button>
        </div>
      )}
    </div>
  );
}
