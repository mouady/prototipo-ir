"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProgressList } from "../charts";
import { estadisticasCamareros, opcionesOrdenCamareros } from "../mockData";

interface CamarerosViewProps {
  ordenarPor: string;
}

export function CamarerosView({ ordenarPor }: CamarerosViewProps) {
  const data = estadisticasCamareros[ordenarPor] || estadisticasCamareros.horasTrabajadas;
  
  // Obtener la unidad según el criterio de ordenación
  const getUnidad = (key: string): string => {
    switch (key) {
      case "horasTrabajadas":
        return "horas";
      case "mesasAtendidas":
        return "mesas";
      case "diasTrabajados":
        return "días";
      case "propinas":
      case "importeVendido":
        return "€";
      default:
        return "";
    }
  };

  const unidad = getUnidad(ordenarPor);
  const titulo = opcionesOrdenCamareros.find(o => o.value === ordenarPor)?.label || "Horas trabajadas";

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">
          Ranking por {titulo.toLowerCase()}
        </h3>
        <ProgressList
          data={data.map((c) => ({
            nombre: c.nombre,
            valor: c.valor,
            unidad,
          }))}
          showMore={true}
          onShowMore={() => console.log("Ver más camareros")}
        />
      </CardContent>
    </Card>
  );
}
