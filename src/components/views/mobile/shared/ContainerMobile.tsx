import Image from "next/image";
import { getPublicPath } from "@/lib/path";

export default function ContainerMobile({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-4">
            {/* Contenedor del bisel con el móvil */}
            <div className="relative w-[450px] h-[920px] flex-shrink-0">
                {/* Imagen del bisel */}
                <Image
                    src={getPublicPath("/biseles/biselesMovil.svg")}
                    alt="Mobile frame"
                    fill
                    className="z-10 pointer-events-none object-contain"
                    priority
                />
                {/* Contenido de la app dentro del bisel */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[402px] h-[874px] rounded-[50px] overflow-hidden flex flex-col">
                    {/* Barra de estado del móvil */}
                    <div className="h-[62px] w-full flex-shrink-0" style={{ backgroundColor: '#0F1726' }} />
                    {/* Contenido de la app */}
                    <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}