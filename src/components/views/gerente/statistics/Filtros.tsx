"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { meses, anios, opcionesOrdenCamareros } from "./mockData";

interface FiltrosProps {
  mes: number;
  anio: number;
  onMesChange: (mes: number) => void;
  onAnioChange: (anio: number) => void;
  mostrarMes?: boolean;
}

export function Filtros({
  mes,
  anio,
  onMesChange,
  onAnioChange,
  mostrarMes = true,
}: FiltrosProps) {
  return (
    <div className="flex gap-3">
      {mostrarMes && (
        <Select
          value={mes.toString()}
          onValueChange={(v) => onMesChange(parseInt(v))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            {meses.map((m) => (
              <SelectItem key={m.value} value={m.value.toString()}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select
        value={anio.toString()}
        onValueChange={(v) => onAnioChange(parseInt(v))}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Año" />
        </SelectTrigger>
        <SelectContent>
          {anios.map((a) => (
            <SelectItem key={a} value={a.toString()}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface FiltrosCamarerosProps extends FiltrosProps {
  ordenarPor: string;
  onOrdenarPorChange: (valor: string) => void;
}

export function FiltrosCamareros({
  mes,
  anio,
  onMesChange,
  onAnioChange,
  ordenarPor,
  onOrdenarPorChange,
}: FiltrosCamarerosProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <Filtros
        mes={mes}
        anio={anio}
        onMesChange={onMesChange}
        onAnioChange={onAnioChange}
      />
      
      <Select value={ordenarPor} onValueChange={onOrdenarPorChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {opcionesOrdenCamareros.map((opcion) => (
            <SelectItem key={opcion.value} value={opcion.value}>
              {opcion.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
