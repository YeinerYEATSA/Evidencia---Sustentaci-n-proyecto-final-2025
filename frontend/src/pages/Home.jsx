export default function Home() {
  return (
    <div className="p-6 flex flex-col items-center text-center">
      {/* Logo */}
      <img 
        src="/logo.png" 
        alt="YENIJO Logo" 
        className="h-35 w-35 mb-6" 
      />

      {/* Título */}
      <h1 className="text-3xl font-bold text-blue-600">
        Bienvenido a YENIJO Telecomunicaciones
      </h1>

      {/* Descripción */}
      <p className="mt-2 text-gray-700">
        Gestione servicios, clientes, facturas y pagos en un solo lugar.
      </p>
    </div>
  );
}
