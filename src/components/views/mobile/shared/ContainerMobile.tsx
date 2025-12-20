export default function ContainerMobile ({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">
            {children}
        </div>
    );
}