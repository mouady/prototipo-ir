"use client";

import { Card, CardContent } from "@/components/ui/card";

interface KPIItem {
  label: string;
  value: string | number;
  suffix?: string;
}

interface KPICardProps {
  items: KPIItem[];
}

export function KPICard({ items }: KPICardProps) {
  return (
    <Card className="h-fit">
      <CardContent className="p-4 space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {item.value}
              {item.suffix && (
                <span className="text-lg font-normal text-gray-500 ml-1">
                  {item.suffix}
                </span>
              )}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
