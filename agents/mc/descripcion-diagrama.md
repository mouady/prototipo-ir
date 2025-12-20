En el diagrama de clases nos encontramos con los siguientes enumerados:

- **TipoContrato**: Define los tipos de contrato laboral que puede tener un empleado en el restaurante. Puede ser INDEFINIDO para contratos sin fecha de finalización o TEMPORAL para contratos con una duración determinada.

- **Genero**: Representa el género de un empleado. Incluye las opciones MASCULINO, FEMENINO y OTRO.

- **TipoProducto**: Categoriza los productos gestionados por el restaurante según su naturaleza. Puede ser INGREDIENTE (usado en recetas), BEBIDA (servida directamente) o RECURSO (material que usa el bar para su funcionamiento pero que no se vende).

- **UnidadMedida**: Especifica las unidades de medida utilizadas para cuantificar productos en el inventario y recetas. Las opciones son KG para peso en kilogramos y UNIDADES para conteo discreto.

- **Zona**: Indica la ubicación física de las mesas en el restaurante. Distingue entre INTERIOR y TERRAZA que son las zonas que actualmente cuenta el bar.

- **DiaSemana**: Enumeración de los siete días de la semana utilizada para gestionar horarios regulares del restaurante y de los empleados.

- **Estado**: Representa el estado de procesamiento de una línea de comanda en la cocina. Puede estar EN_PREPARACION, REALIZADO (listo para servir) o SERVIDO.

- **CategoriaCarta**: Clasifica los productos vendibles según su categoría en la carta del restaurante. Incluye secciones como ENSALADAS, PESCADO_FRITO, CERVEZAS, VINOS, INFUSIONES_Y_CAFE, entre otras, facilitando la organización del menú.

- **FormatoPlato**: Define los diferentes tamaños o presentaciones en que se puede servir un plato. Incluye ESTANDAR (para aquellos platos que no tienen más de un formato), TAPA, MEDIA y RACION.


Y en cuanto a clases, hemos definido:

- **Restaurante**: Representa la entidad principal del negocio, conteniendo la información básica del establecimiento como el nombre, dirección, CIF, teléfono y email. Es la clase central que se asocia al gerente y que tiene asociados los horarios de apertura.

Sobre los usuarios:

- **User**: Clase base que representa cualquier usuario del sistema. Contiene información común a todos los usuarios como nombre, apellidos, imagen de perfil, email, username (único) y contraseña para autenticación.

- **Gerente**: Usuario con máximos privilegios en el sistema que gestiona el restaurante. Tiene acceso completo a la gestión de inventario, horarios de empleados y visualización del dashboard de comandas.

- **Empleado**: Representa a un trabajador del restaurante con información laboral específica como tipo de contrato, fecha de finalización del contrato si es TEMPORAL, fecha de nacimiento, DNI, estado activo/inactivo y género. Estos son los que deben registrar sus fichajes de entrada y salida.

- **Camarero**: Tipo específico de empleado encargado de atender mesas, tomar comandas y cobrar cuentas. Tiene acceso limitado al sistema mediante la aplicación móvil para fichar y gestionar sus comandas asignadas.

- **Cocinero**: Empleado que trabaja en cocina preparando los platos de las comandas. Puede generar avisos de reposición cuando detecta productos con stock bajo y tiene acceso al dashboard de comandas para ver los pedidos pendientes.

- **Fichaje**: Registra la asistencia diaria de un empleado mediante la hora de entrada y salida. De esta forma podemos llevar el control del tiempo trabajado por cada empleado del restaurante.

Sobre los horarios:

- **Horario**: Define los horarios regulares de apertura del restaurante y/o de los empleados para cada día de la semana. Especifica la hora de apertura y cierre para cada día, permitiendo que el restaurante tenga diferentes horarios según el día.

- **HorarioEspecial**: Representa horarios excepcionales que se aplican en fechas específicas, como festivos o eventos especiales. Permite al restaurante modificar temporalmente sus horarios habituales indicando el día especial y sus horas de apertura y cierre. Esto es fue vital por parte de la clienta que ya constantemente
se necesita cambiar los horarios cuando surgen este tipo de eventos.

Sobre las mesas y reservas:

- **Mesa**: Representa una mesa física del restaurante identificada por su número. Tiene asignada una capacidad máxima de comensales y una zona específica (interior o terraza) donde está ubicada.

- **Reserva**: Representa una reserva realizada por un cliente para una mesa específica. Contiene la fecha y hora de la reserva junto con el nombre del anfitrión que realiza la reserva.

Sobre cuentas y comandas:

- **Cuenta**: Representa la factura asociada a una mesa durante su servicio. Registra la fecha, si ha sido cobrada y si está cerrada, agrupando todas las comandas realizadas en esa mesa y opcionalmente una propina.

- **Propina**: Registra la propina voluntaria que un cliente deja al camarero tras el servicio. Contiene el importe del abono y está asociada a una cuenta específica.

- **Comanda**: Actúa como contenedor de las líneas de comanda que especifican los productos solicitados. El estado de una comanda depende del estado de las líneas que la componen.

- **LineaComanda**: Representa un producto específico pedido dentro de una comanda. Indica el producto vendible, la cantidad solicitada y su estado de preparación (en preparación, realizado o servido).

Sobre el inventario:

- **Producto**: Representa cualquier elemento del inventario del restaurante. Incluye ingredientes para cocina, bebidas y recursos auxiliares. Contiene información sobre umbral de reposición si se desea establecer uno, litros (solo para bebidas), unidad de medida y el tipo de producto. Está compuesto por uno o más lotes.

- **ProductoVendible**: Clase abstracta que representa productos que pueden ser vendidos directamente al cliente. Contiene nombre, imagen y categoría de la carta, siendo la base para platos y bebidas del menú.

- **AvisoReposicion**: Solicitud generada por un cocinero cuando detecta que faltan productos del inventario. Registra la fecha de solicitud y si ha sido atendido por el gerente. Está compuesto por una o más líneas de aviso.

- **LineaAvisoReposicion**: Detalla cada producto específico solicitado dentro de un aviso de reposición. Indica el producto y la cantidad solicitada para reponer el stock.

- **Lote**: Representa una compra específica de un producto realizada a un proveedor. Contiene información sobre la fecha de caducidad (si aplica), el precio de compra y la cantidad adquirida.

- **Proveedor**: Representa un suministrador externo que vende productos al restaurante. Contiene información de contacto como nombre, CIF, teléfono y email para gestionar pedidos y facturas.

Sobre lo que se vende en el restaurante:

- **FormatoP**: Define una variación específica de un plato según su formato de servicio. Cada formato tiene un precio diferente, un tiempo de preparación específico y está compuesto por diferentes cantidades de ingredientes según el formato.

- **Plato**: Producto vendible que representa un plato del menú del restaurante. Está compuesto por una receta que define cómo prepararlo y tiene de uno a múltiples formatos.

- **Receta**: Contiene las instrucciones de preparación de un plato específico. Define el nombre de la receta y los pasos detallados para su elaboración en cocina.

- **IngredienteReceta**: Especifica un ingrediente necesario dentro de un formato de plato concreto. Indica el producto (ingrediente) utilizado, la cantidad necesaria y su unidad de medida para esa preparación específica.

- **Bebida**: Producto vendible que representa una bebida disponible en la carta. Contiene el precio de venta y la cantidad en litros, estando vinculada a un producto del inventario.