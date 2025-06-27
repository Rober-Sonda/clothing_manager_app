Sistema de Gestión Integral de Tienda de Ropa y Accesorios
Este proyecto se centra en el desarrollo de una aplicación web de vanguardia para la gestión completa y eficiente de tiendas de ropa y accesorios. Desde la gestión de inventario altamente detallada hasta el análisis financiero y la proyección de compras, esta aplicación busca ser una herramienta indispensable para optimizar las operaciones diarias y estratégicas del negocio.

Construida con HTML5, CSS3 y JavaScript para una experiencia de usuario interactiva y dinámica en el navegador, la aplicación adopta una Arquitectura Limpia para garantizar escalabilidad, mantenibilidad y un desarrollo profesional. Actualmente, los datos son simulados localmente con datastore.js, pero se recomienda una base de datos persistente para una implementación completa.

📋 Tabla de Contenidos
Características Principales y Funcionalidades

1. Control de Usuarios y Roles Seguros

2. Gestión Avanzada de Inventario y Productos

3. Vistas de Artículos Optimizadas

4. Gestión de Compras y Órdenes de Compra

5. Gestión de Ventas y Carrito de Compras (POS)

6. Sistema de Calificación (Rating) Integral

7. Informes y Proyecciones Estratégicas

8. Cuenta Corriente de Clientes

9. Módulo de Gestión Financiera (Ingresos y Egresos)

10. Gestión de Cierre de Caja por Usuario

Arquitectura Técnica y Estructura del Proyecto

Estructura Conceptual de la Base de Datos - Modelos Ampliados

Consideraciones de Escalabilidad y Conectividad

Instalación y Ejecución (Conceptual)

Contribuir

Licencia

✨ Características Principales y Funcionalidades
La aplicación ofrecerá un conjunto de características robustas y bien integradas, cubriendo todos los aspectos críticos de la gestión de una tienda:

1. Control de Usuarios y Roles Seguros

Autenticación y Autorización: Sistema de login seguro con diferentes roles (Administrador, Gerente, Vendedor) y permisos definidos para controlar el acceso a las funcionalidades.

Gestión de Perfiles: Cada usuario tendrá su propio perfil, permitiendo un seguimiento claro de las operaciones realizadas.

2. Gestión Avanzada de Inventario y Productos

Carga de Artículos Inteligente y Flexible:

Producto Base (Modelo): Se definirá el producto principal con propiedades comunes a todas sus variantes (ej., nombre, descripción, imágenes generales).

Variantes de Producto: Para artículos con variaciones (tallas, colores, etc.), se crearán variantes específicas. Cada variante tendrá su propio SKU, código de barras y stock independiente.

Propiedades y Categorías Definibles por el Usuario (Dueño):

Gestión de Categorías y Subcategorías: Los dueños de la tienda podrán crear y gestionar sus propias categorías y subcategorías (ej., "Ropa" > "Remeras" > "Manga Corta", "Accesorios" > "Relojes"). Un producto podrá ser asignado a una o más categorías según sea necesario (ej., un perfume podría estar en "Perfumes" y "Regalos").

Definición Dinámica de Propiedades: Para cada categoría, los dueños podrán definir las propiedades relevantes (ej., para "Remeras": "Talla", "Color", "Tipo de Tela", "Temporada"). Estas propiedades se cargarán desde una lista predefinida o se podrán crear nuevas definiciones de propiedades y sus valores sobre la marcha.

Reutilización de Propiedades y Valores: Una vez que una propiedad (ej., "Talla") y sus valores (ej., "S", "M", "L") son definidos, estos se guardan en colecciones separadas y pueden ser reutilizados en cualquier otro producto o categoría, evitando la replicación de información y garantizando la consistencia y el ahorro de espacio en la base de datos.

Experiencia de Carga Simplificada y Guiada: La interfaz de carga de artículos será intuitiva y adaptable. Al seleccionar una categoría (o categorías), el sistema sugerirá las propiedades relevantes y sus valores preexistentes. Si una propiedad no es necesaria para un producto específico, simplemente no se carga, ofreciendo la flexibilidad de cargar solo la información indispensable o tan detallada como se desee, ajustándose al nivel de granularidad que el dueño prefiera para cada tipo de producto.

Identificación Única: Cada variante tendrá un SKU y Código de Barras (para escaneo rápido).

Precios Flexibles: Definición de Precio de Venta y Precio de Costo por variante. Además, se permitirá añadir múltiples precios personalizados por variante, según las necesidades del usuario (ej. precio minorista, mayorista, etc.).

Manejo de Imágenes: Soporte para múltiples imágenes por producto base y por variante. Si no se carga ninguna, se asignará automáticamente una imagen por defecto a nivel de producto o variante.

Control de Stock en Tiempo Real por Variante: Actualización automática del inventario tras cada transacción (venta, compra, devolución), gestionando el stock a nivel de cada variante específica del producto.

Alertas de Bajo Stock: Notificaciones configurables cuando el inventario de una variante de producto desciende por debajo de un umbral predefinido.

Historial de Movimientos: Registro detallado de entradas, salidas y ajustes de inventario para cada variante de producto.

3. Vistas de Artículos Optimizadas

Listados de Artículos Dinámicos: Muestra el inventario con opciones de filtrado, búsqueda y listado por rating (si el usuario lo desea). Se implementará control de carga para listados extensos, utilizando técnicas como paginación o carga diferida (lazy loading) para asegurar un rendimiento óptimo.

Vista Detalle de Artículo (Producto Base y Variantes): Al seleccionar un artículo, se abrirá una vista dedicada que mostrará todas sus propiedades detalladas (del producto base y sus variantes) y una galería de imágenes.

Historial de Ventas del Artículo (y sus variantes): Incluirá un gráfico visual del historial de ventas de ese producto y sus variantes, permitiendo identificar tendencias.

Proveedores Asociados a Variantes: Mostrará los proveedores que manejan las diferentes variantes del artículo, con la opción de agregar el producto directamente al carrito de pedidos desde esta vista, permitiendo elegir la variante y el proveedor según precio o disponibilidad.

4. Gestión de Compras y Órdenes de Compra

Registro de Compras: Interfaz para registrar la entrada de nueva mercadería al inventario, asociándola a sus proveedores y costos.

Armado de Pedidos (Carrito Unificado Inteligente - Uso Interno):

Un único carrito interno donde los usuarios internos (Gerentes, Administradores) pueden agregar productos (y sus variantes específicas) deseados de diferentes proveedores para reabastecimiento.

Al "desplegar" el carrito, la aplicación generará automáticamente órdenes de compra separadas por proveedor, consolidando los ítems de cada uno.

Edición de Órdenes de Compra: Cuando llegue una compra, las órdenes de compra podrán editarse para ajustar los precios de costo (si hubieran aumentado o cambiado), garantizando la precisión financiera.

Compartir Órdenes de Compra: Desde la pantalla de despliegue de órdenes, se podrán generar y compartir los listados de pedidos en formato PDF a cada proveedor, con opciones para compartir a través de WhatsApp u otros medios disponibles en el sistema.

5. Gestión de Ventas y Carrito de Compras (POS)

Procesamiento de Ventas Rápido: Interfaz intuitiva para registrar transacciones, aplicar descuentos, gestionar métodos de pago múltiples y generar recibos/facturas.

Carrito de Venta: Sistema de carrito para la experiencia de punto de venta.

6. Sistema de Calificación (Rating) Integral

Calificación de Productos: Permite a los usuarios internos asignar una calificación (ej., 1-5 estrellas) a los productos, útil para análisis de popularidad y reposición.

Calificación de Proveedores: Evalúa el rendimiento de los proveedores (calidad, puntualidad, servicio), apoyando decisiones de compra estratégicas.

Calificación de Clientes: Sistema interno para categorizar la fidelidad, volumen de compra o puntualidad en pagos de cuenta corriente de los clientes.

7. Informes y Proyecciones Estratégicas

Paneles de Control (Dashboards): Vistas rápidas de métricas clave del negocio en tiempo real.

Gráficos y Listados Personalizables: Visualización de tendencias de ventas, rendimiento de productos, flujo de caja.

Listados de productos más/menos vendidos.

Análisis de ganancias y pérdidas por período o producto.

Estado de inventario detallado.

Historial de transacciones de clientes y proveedores.

Proyección de Compras: Basado en datos históricos de ventas, stock mínimo, tendencias estacionales y la calificación de proveedores, el sistema generará sugerencias inteligentes para las próximas compras de inventario.

8. Cuenta Corriente de Clientes

Gestión de Crédito/Débito: Permite llevar un registro detallado del saldo actual de cada cliente, registrando pagos y ventas a crédito.

Historial de Transacciones Completo: Acceso a un historial completo de todos los movimientos de la cuenta corriente del cliente.

9. Módulo de Gestión Financiera (Ingresos y Egresos)

Control Exacto del Dinero: Módulo dedicado para registrar todos los ingresos y egresos del negocio.

Registro de Gastos: Clasificación de gastos fijos (alquiler, salarios) y variables (servicios, marketing, mantenimiento).

Cálculo de Ganancias: Generación de informes claros sobre ingresos, egresos y ganancias netas en periodos definidos, proporcionando un control financiero preciso.

10. Gestión de Cierre de Caja por Usuario

Movimiento de Caja por Usuario: Registro detallado de todas las transacciones (ventas, ingresos, egresos, ajustes) asociadas a un usuario específico durante su turno.

Funcionalidad de Cierre de Caja: Permite a cada usuario finalizar su turno, registrando el conteo final de efectivo y las discrepancias.

Listados de Ventas por Turno/Usuario: Generación de informes específicos por usuario que muestren el total de ventas, ingresos y egresos registrados durante su turno o período de cierre de caja. Esto facilita el control y la auditoría individual.

Consolidación Diaria/Periódica: Sumario de los cierres de caja individuales para obtener un balance general de la caja de la tienda.

🛠️ Arquitectura Técnica y Estructura del Proyecto
El proyecto seguirá los principios de Clean Architecture para una separación de preocupaciones clara, facilitando el testing, la escalabilidad y el mantenimiento:

Tecnologías Web (HTML5, CSS3, JavaScript): Frameworks y lenguajes principales para el desarrollo de la aplicación web, aprovechando su universalidad y capacidades interactivas en el navegador.

Base de Datos (Sugerencia):

Para una aplicación web que requiera persistencia de datos y funcionalidades en tiempo real sin una infraestructura de backend compleja, se sugiere Firebase Firestore. Es una base de datos NoSQL basada en la nube, que ofrece sincronización en tiempo real, consultas flexibles y es ideal para datos estructurados con propiedades dinámicas (como tus productos y variantes).

Para escenarios que demanden mayor control sobre el servidor, lógica de negocio compleja en el backend o bases de datos relacionales, una opción sería un stack con Node.js (para el backend) y PostgreSQL o MySQL (como base de datos relacional).

Navegación:

HTML5 History API / Hash Routing: Implementado para una gestión de rutas declarativa y robusta, asegurando una navegación eficiente y una URL limpia dentro de la aplicación de una sola página (SPA).

Estructura del Proyecto (Clean Architecture):

domain: Contiene las entidades de negocio (e.g., Product, ProductVariant, User, Client, PropertyDefinition, ProductProperty), casos de uso (use cases) y contratos (interfaces/repositories). Independiente de la tecnología de UI o persistencia.

data: Implementaciones de los contratos del dominio, lógica para interactuar con la fuente de datos elegida (actualmente datastore.js para simulación; en una implementación real, sería la integración con Firebase Firestore SDK o una API REST de un backend).

presentation: La capa de UI (HTML, CSS), lógica de presentación (JavaScript para manipulación del DOM y eventos) y la configuración de rutas en el navegador.

Diseño y Estilo:

Diseño Moderno y Profesional: Enfoque en una interfaz de usuario limpia, intuitiva y estéticamente agradable, utilizando principios de diseño responsive y la flexibilidad de CSS3.

Gestión de Colores: Todos los colores estarán centralizados en clases y constantes para una fácil gestión y consistencia del tema.

Fuentes Responsivas: Se gestionarán los tamaños de fuente de manera responsiva, asegurando legibilidad en diferentes resoluciones de pantalla.

Vistas Dedicadas por Modelo: Cada modelo de datos principal (Producto, Cliente, Proveedor, Venta, Compra, etc.) tendrá sus propias vistas dedicadas para Agregar, Editar y Listar, garantizando una experiencia de usuario consistente.

Estructura Conceptual de la Base de Datos - Modelos Ampliados

La base de datos se estructuraría con colecciones/tablas robustas para cada entidad, permitiendo la flexibilidad necesaria. Se empleará una combinación de modelos separados y objetos embebidos para optimizar el rendimiento y la consistencia, abordando directamente la eficiencia en la gestión de propiedades y categorías. Estos modelos son conceptuales y adaptables a bases de datos NoSQL (como Firestore) o relacionales.

User Colección: id (identificador único), username, passwordHash, role (String: 'admin', 'manager', 'sales'), isActive (bool), lastLogin (DateTime).

Product Colección (Producto Base / Modelo):

id, name, description.

brandId (String - link a Brand collection).

categoryIds (List - links a Category collection. Permite múltiples categorías para el producto base).

properties (List - objeto embebido. Propiedades comunes a todas las variantes del producto, definidas por PropertyDefinition, como tipo de tela, género. Almacena solo el ID de la definición y el valor específico).

imagePaths (List): Rutas locales o URLs para imágenes del producto base.

defaultImage (String - ruta local o URL de la imagen por defecto para el producto base).

rating (double - promedio de ratings de todas sus variantes), reviewCount (int).

isActive (bool).

ProductVariant Colección (Variante Específica / SKU):

id, productId (String - link a Product collection).

sku (String - único por variante), barcode (String - único por variante).

colorId (String - link a Color collection. Para el color principal de la variante).

variantProperties (List - objeto embebido. Propiedades específicas de esta variante, como talla, temporada, material, etc., definidas por PropertyDefinition. Almacena solo el ID de la definición y el valor específico).

price (double), costPrice (double).

customPrices (List - opcional, para múltiples precios definidos por el usuario para esta variante).

stockQuantity (int), minStockQuantity (int - para alertas de stock de esta variante).

variantImagePaths (List - imágenes específicas de esta variante, ej. la remera en color rojo).

defaultVariantImage (String - ruta local o URL de la imagen por defecto para esta variante).

isActive (bool).

Category Colección:

id, name (String, ej. "Ropa", "Accesorios", "Perfumes", "Remeras", "Relojes de Pulsera").

parentId (String - opcional, link a otra Category para subcategorías anidadas).

description (String).

icon (String - nombre del icono o ruta).

suggestedPropertyDefinitionIds (List - IDs de PropertyDefinition que son comúnmente usadas para esta categoría, para guiar la UI al agregar productos).

PropertyDefinition Colección (Nueva):

id (identificador único)

name (String, ej., "Talla", "Material", "Mecanismo", "Fragancia", "Volumen", "Temporada"). Define la propiedad en sí.

type (String, ej., "text", "number", "selection", "boolean"). Define el tipo de dato del valor.

allowedValues (List - si type es "selection", son los valores predefinidos que el dueño puede gestionar, ej., ["S", "M", "L"], ["Algodón", "Lino"]). Permite reutilizar y gestionar valores.

isGlobal (bool - true si esta propiedad es de uso general, false si es muy específica para una categoría).

description (String - opcional, para ayudar al dueño a entender la propiedad).

ProductProperty Objeto Embebido (Nuevo):

propertyDefinitionId (String - link a PropertyDefinition). Referencia a la definición global de la propiedad.

value (String - el valor específico para esta instancia de la propiedad en un producto o variante. Si PropertyDefinition.type es 'selection', este valor debe ser uno de allowedValues). Almacena solo el valor concreto.

Brand Colección:

id, name (String), logoPath (String - ruta de la imagen o URL).

website (String - opcional).

Color Colección:

id, name (String, ej. "Rojo", "Azul", "Negro").

hexCode (String, ej. "#FF0000").

Purchase Colección: id, date, supplierId (String - link a Supplier), items (List<PurchaseItem - objeto embebido>: productVariantId, quantity, unitCostAtPurchase). totalAmount.

Sale Colección: id, date, customerId (String - link a Client), items (List<SoldItem - objeto embebido>: productVariantId, quantity, unitPriceAtSale), totalAmount, paymentMethod (String), isCompleted (bool), transactionId (String - si aplica), userId (String - el usuario que realizó la venta).

Client Colección: id, name, contactInfo (email, phone), address, balance (double - para cuenta corriente), rating (double - opcional), notes (String).

Supplier Colección: id, name, contactInfo, address, rating (double - opcional), notes (String).

PurchaseOrder Colección: id, orderDate (DateTime), supplierId (String - link a Supplier), status (String: 'pendiente', 'enviado', 'recibido', 'cancelado'), items (List<OrderItem - objeto embebido>: productVariantId, quantityRequested, estimatedCost, finalCost), totalEstimatedAmount (double), totalFinalAmount(double).

ProductReview Colección: id, productVariantId (String - link a ProductVariant), customerId (String - link a Client - opcional), rating (int), comment (String), date (DateTime).

FinancialEntry Colección:

id, date (DateTime), type (String: 'ingreso', 'egreso').

category (String: 'ventas', 'alquiler', 'salarios', 'marketing', 'servicios', 'varios', etc.).

amount (double), description (String).

isFixedExpense (bool - para diferenciar gastos fijos de variables).

relatedSaleId (String - link a Sale - si es un ingreso por venta).

relatedPurchaseId (String - link a Purchase - si es un egreso por compra).

userId (String - el usuario que realizó el registro de ingreso/egreso).

CashRegisterClosure Colección:

id, userId (String - ID del usuario que realiza el cierre).

closureDate (DateTime - fecha y hora del cierre).

openingBalance (double - saldo inicial de la caja al inicio del turno/día).

closingBalance (double - saldo final de la caja reportado por el usuario).

calculatedSalesAmount (double - total de ventas registradas en el período del usuario).

calculatedIncomeAmount (double - total de otros ingresos registrados en el período del usuario).

calculatedExpenseAmount (double - total de egresos registrados en el período del usuario).

cashIn (double - total de efectivo ingresado), cashOut (double - total de efectivo retirado).

cashDifference (double - diferencia entre el saldo calculado y el saldo reportado).

paymentMethodBreakdown (Map<String, double> - desglose de ventas por método de pago: efectivo, tarjeta, etc.).

notes (String - opcional, para comentarios del cierre).

☁️ Consideraciones de Escalabilidad y Conectividad
Esta aplicación, diseñada como una SPA web, utiliza datastore.js para simular la persistencia local. Sin embargo, se ha tenido en cuenta la facilidad de expansión para futuras necesidades reales:

Múltiples Usuarios/Terminales Web: La arquitectura de Clean Architecture y la separación de la capa de datos permitirían una futura integración con una base de datos centralizada en la nube (ej. Firebase Firestore, Supabase, o un backend con PostgreSQL/MongoDB) para sincronizar datos entre múltiples navegadores o dispositivos de forma eficiente.

Acceso desde Aplicación Móvil: La misma estructura de dominio y casos de uso facilitaría el desarrollo de una aplicación móvil complementaria (nativa o híbrida), que podría consumir los mismos datos a través de una API centralizada (si se implementara) o un servicio de sincronización en la nube, permitiendo la consulta y gestión de información en tiempo real desde dispositivos móviles. Esto aseguraría que la inversión inicial en la lógica de negocio se pueda reutilizar en diferentes plataformas.

🚀 Instalación y Ejecución (Conceptual)
Para poner en marcha esta aplicación web (una vez desarrollada, y asumiendo una estructura de archivos HTML/CSS/JS estándar):

Clonar el repositorio:

git clone [URL_DEL_REPOSITORIO]
cd nombre_del_proyecto

Abrir con un servidor local: Puedes usar extensiones como "Live Server" en VS Code, o iniciar un servidor HTTP simple desde la terminal:

Usando Live Server (VS Code): Abre la carpeta del proyecto en VS Code, haz clic derecho en index.html y selecciona "Open with Live Server".

Usando Python (si tienes Python instalado):

python3 -m http.server

Usando http-server (si tienes Node.js y npm instalados):

npm install -g http-server # Instalar una vez
http-server

Acceder en el navegador: Una vez que el servidor esté corriendo, abre tu navegador y ve a la dirección provista por el servidor (ej. http://localhost:5500/ o http://127.0.0.1:8000/).

🤝 Contribuir
Este es un proyecto ambicioso y se valoran enormemente las contribuciones. Si estás interesado en mejorar la aplicación, corregir errores o añadir nuevas funcionalidades, por favor, consulta las directrices de contribución (a ser definidas) y envía un Pull Request.

📄 Licencia
Este proyecto está bajo la Licencia MIT.

