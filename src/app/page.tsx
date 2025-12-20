import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center gap-8 py-16 px-8 bg-white dark:bg-black">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            + shadcn/ui
          </span>
        </div>

        {/* Tabs con ejemplos */}
        <Tabs defaultValue="buttons" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buttons">Botones</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="forms">Formularios</TabsTrigger>
          </TabsList>

          {/* Tab de Botones */}
          <TabsContent value="buttons" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Variantes de Botones</CardTitle>
                <CardDescription>
                  Explora las diferentes variantes disponibles del componente Button.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button size="sm">Pequeño</Button>
                <Button size="default">Normal</Button>
                <Button size="lg">Grande</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab de Cards */}
          <TabsContent value="cards" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>shadcn</CardTitle>
                    <CardDescription>@shadcn</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Creador de shadcn/ui, una colección de componentes reutilizables.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Seguir</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Vercel</CardTitle>
                    <CardDescription>@vercel</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plataforma de despliegue para aplicaciones frontend.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Seguir</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Tab de Formularios */}
          <TabsContent value="forms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Crear cuenta</CardTitle>
                <CardDescription>
                  Ingresa tus datos para crear una nueva cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input id="name" placeholder="Tu nombre completo" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" className="flex-1">Cancelar</Button>
                <Button className="flex-1">Crear cuenta</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Componentes construidos con{" "}
            <a
              href="https://ui.shadcn.com"
              className="font-medium underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui
            </a>
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://ui.shadcn.com/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentación
              </a>
            </Button>
            <Button size="sm" asChild>
              <a
                href="https://github.com/shadcn/ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
