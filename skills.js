const skills = [
  {
    "id": "auditoria-seo",
    "nombre": "Auditoría SEO",
    "descripcion": "Revisa si un sitio puede rastrearse e indexarse y prioriza mejoras con evidencias por URL.",
    "categoria": "Código",
    "etiquetas": [
      "seo",
      "indexación",
      "search console"
    ],
    "agentes": [
      "Codex",
      "Claude",
      "ChatGPT"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-23",
    "descargas": 0,
    "entrada": "Revisa mi catálogo en GitHub Pages. Las fichas usan rutas como /#/skill/auditoria-seo.",
    "salida": "Prioridad alta: las fichas dependen de fragmentos. Genera una URL HTML por ficha, enlázala desde el catálogo y comprueba su rastreo en Search Console.",
    "instrucciones": "Audita páginas con evidencias verificables. Separa los bloqueos de rastreo e indexación de las mejoras de contenido y entrega un plan por prioridad.",
    "pasos": [
      "Abre tu proyecto o proporciona las URLs que quieres revisar.",
      "Pide una auditoría inicial sin cambios y confirma las páginas que deben indexarse.",
      "Valida los hallazgos y aplica primero los bloqueos de mayor impacto."
    ],
    "contenido": "---\nname: auditoria-seo\ndescription: Revisa si un sitio puede rastrearse e indexarse y prioriza mejoras con evidencias por URL.\n---\n\n# Auditoría SEO\n\n## Flujo\n1. Pide la URL principal, las páginas que deben aparecer en Google y el público. Si solo tienes archivos locales, identifica cuáles comprobaciones requieren el sitio público o Search Console.\n2. Revisa respuestas HTTP, robots.txt, meta robots, canonical, enlaces internos y sitemap. Distingue las restricciones al rastreo de las directivas de indexación.\n3. Comprueba si cada página importante se abre en una URL independiente. Revisa títulos únicos y descriptivos, encabezados claros y descripciones acordes al contenido.\n4. Por cada hallazgo entrega prioridad, URL, evidencia, corrección y forma de comprobarla. Indica qué requiere acceso a Search Console y evita prometer posiciones.\n\n## Referencias\n- https://developers.google.com/search/docs/fundamentals/seo-starter-guide\n- https://developers.google.com/search/docs/crawling-indexing/url-structure\n"
  },
  {
    "id": "diseno-3d-blender",
    "nombre": "Diseño 3D con Blender",
    "descripcion": "Convierte un encargo en un modelo 3D editable y prepara una exportación GLB para la web.",
    "categoria": "Código",
    "etiquetas": [
      "diseño 3d",
      "blender",
      "glb",
      "modelado"
    ],
    "agentes": [
      "Codex",
      "Claude",
      "ChatGPT"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-23",
    "descargas": 0,
    "entrada": "Diseña una maceta de 18 cm con bordes redondeados para un visor web.",
    "salida": "Plan de modelado con escala real, bisel editable y material mate. Entrega prevista: archivo .blend y .glb, con escala y materiales comprobados tras reimportar.",
    "instrucciones": "Define dimensiones y destino, bloquea la silueta, modela con modificadores editables y revisa la escala, las normales y los materiales antes de exportar.",
    "pasos": [
      "Abre el proyecto de Blender o proporciona referencias, medidas y formato de entrega.",
      "Pide al agente un plan de modelado y acuerda qué herramientas puede ejecutar.",
      "Revisa la malla en Blender y comprueba el GLB en el visor de destino."
    ],
    "contenido": "---\nname: diseno-3d-blender\ndescription: Convierte un encargo en un modelo 3D editable y prepara una exportación GLB para la web.\n---\n\n# Diseño 3D con Blender\n\n## Flujo\n1. Confirma referencias, medidas, destino del modelo y presupuesto de geometría. Para web, acuerda el límite de tamaño y el formato de entrega.\n2. Empieza con formas simples a escala real. Verifica proporciones y silueta antes de agregar detalles.\n3. Usa modificadores editables cuando ayuden. En aristas duras, prueba un bisel con los segmentos necesarios para la distancia de cámara. Revisa normales, sombreado y malla.\n4. Conserva el archivo .blend. Para GLB, usa materiales PBR compatibles y exporta solo los objetos requeridos. Reimporta en una escena vacía o abre el archivo en el visor de destino para comprobar escala, orientación y aspecto.\n5. Si el agente no tiene acceso a Blender, entrega pasos reproducibles y marca las comprobaciones pendientes de realizar.\n\n## Referencias\n- https://docs.blender.org/manual/en/5.1/addons/import_export/scene_gltf2.html\n"
  },
  {
    "id": "plan-semanal",
    "nombre": "Planificador semanal",
    "descripcion": "Ordena pendientes por impacto y conviértelos en un plan semanal realista.",
    "categoria": "Productividad",
    "etiquetas": [
      "planificación",
      "prioridades"
    ],
    "agentes": [
      "ChatGPT",
      "Claude",
      "Codex"
    ],
    "nivel": "Básico",
    "fecha": "2026-11-04",
    "descargas": 1480,
    "entrada": "Tengo 5 h. Debo enviar una propuesta el jueves y responder cuatro correos.",
    "salida": "Lunes: 30 min para correos. Martes y miércoles: 2 h por día para la propuesta. Jueves: 30 min para revisar y enviar.",
    "instrucciones": "Pregunta por fechas límite, tiempo disponible y dependencias. Prioriza hasta tres resultados semanales. Reserva tiempo para imprevistos y marca qué tareas se pueden aplazar.",
    "contenido": "---\nname: plan-semanal\ndescription: Ordena pendientes por impacto y conviértelos en un plan semanal realista.\n---\n\n# Planificador semanal\n\nPregunta por fechas límite, tiempo disponible y dependencias. Prioriza hasta tres resultados semanales. Reserva tiempo para imprevistos y marca qué tareas se pueden aplazar.\n",
    "pasos": [
      "Pide al agente: «Tengo 5 h. Debo enviar una propuesta el jueves y responder cuatro correos.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "revision-codigo",
    "nombre": "Revisor de código",
    "descripcion": "Lee un diff y señala fallos concretos de lógica, regresiones y pruebas que faltan.",
    "categoria": "Código",
    "etiquetas": [
      "revisión",
      "pruebas"
    ],
    "agentes": [
      "Claude",
      "Codex",
      "ChatGPT"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-06",
    "descargas": 1230,
    "entrada": "Revisa un diff que añade una función de paginación.",
    "salida": "Hallazgo: el cursor vacío repite la primera página. Prueba sugerida: solicitar una página después del último elemento.",
    "instrucciones": "Revisa solo el diff y su contexto necesario. Prioriza regresiones reproducibles. Por hallazgo da ubicación, impacto y un caso de prueba. Distingue dudas de errores confirmados.",
    "contenido": "---\nname: revision-codigo\ndescription: Lee un diff y señala fallos concretos de lógica, regresiones y pruebas que faltan.\n---\n\n# Revisor de código\n\nRevisa solo el diff y su contexto necesario. Prioriza regresiones reproducibles. Por hallazgo da ubicación, impacto y un caso de prueba. Distingue dudas de errores confirmados.\n",
    "pasos": [
      "Pide al agente: «Revisa un diff que añade una función de paginación.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "editor-claro",
    "nombre": "Editor de textos claros",
    "descripcion": "Reduce frases enredadas sin perder información ni cambiar el tono del autor.",
    "categoria": "Escritura",
    "etiquetas": [
      "edición",
      "tono"
    ],
    "agentes": [
      "ChatGPT",
      "Claude"
    ],
    "nivel": "Básico",
    "fecha": "2026-11-08",
    "descargas": 1085,
    "entrada": "Procederemos a efectuar la revisión del documento en el transcurso de la semana.",
    "salida": "Revisaremos el documento esta semana.",
    "instrucciones": "Identifica la audiencia y el propósito. Conserva hechos, cifras y compromisos. Acorta frases, usa verbos concretos y devuelve primero el texto editado.",
    "contenido": "---\nname: editor-claro\ndescription: Reduce frases enredadas sin perder información ni cambiar el tono del autor.\n---\n\n# Editor de textos claros\n\nIdentifica la audiencia y el propósito. Conserva hechos, cifras y compromisos. Acorta frases, usa verbos concretos y devuelve primero el texto editado.\n",
    "pasos": [
      "Pide al agente: «Procederemos a efectuar la revisión del documento en el transcurso de la semana.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "limpieza-csv",
    "nombre": "Limpiador de CSV",
    "descripcion": "Detecta duplicados y normaliza fechas y encabezados con un registro de cambios.",
    "categoria": "Datos",
    "etiquetas": [
      "csv",
      "limpieza"
    ],
    "agentes": [
      "ChatGPT",
      "Claude",
      "Codex"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-11",
    "descargas": 742,
    "entrada": "fecha,nombre\n04/11/26,Ana\n04/11/26,Ana",
    "salida": "Una fila duplicada. Confirmar si la fecha está en formato día/mes antes de convertirla a ISO.",
    "instrucciones": "Inspecciona una muestra. Pregunta por formatos ambiguos. Propón reglas de normalización y conserva un registro de filas afectadas. Crea una copia de salida y conserva el original.",
    "contenido": "---\nname: limpieza-csv\ndescription: Detecta duplicados y normaliza fechas y encabezados con un registro de cambios.\n---\n\n# Limpiador de CSV\n\nInspecciona una muestra. Pregunta por formatos ambiguos. Propón reglas de normalización y conserva un registro de filas afectadas. Crea una copia de salida y conserva el original.\n",
    "pasos": [
      "Pide al agente: «fecha,nombre 04/11/26,Ana 04/11/26,Ana»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "minutas",
    "nombre": "Minutas de reunión",
    "descripcion": "Extrae decisiones, responsables y plazos de notas desordenadas.",
    "categoria": "Productividad",
    "etiquetas": [
      "reuniones",
      "seguimiento"
    ],
    "agentes": [
      "ChatGPT",
      "Claude"
    ],
    "nivel": "Básico",
    "fecha": "2026-11-13",
    "descargas": 902,
    "entrada": "Ana envía el borrador el viernes. Se aprueba la opción B. Falta confirmar presupuesto.",
    "salida": "Decisión: opción B. Acción: Ana enviará el borrador el viernes. Pendiente: confirmar el presupuesto.",
    "instrucciones": "Separa decisiones confirmadas, acciones y preguntas abiertas. Registra responsables y fechas solo si aparecen en las notas. Marca los datos faltantes como por confirmar.",
    "contenido": "---\nname: minutas\ndescription: Extrae decisiones, responsables y plazos de notas desordenadas.\n---\n\n# Minutas de reunión\n\nSepara decisiones confirmadas, acciones y preguntas abiertas. Registra responsables y fechas solo si aparecen en las notas. Marca los datos faltantes como por confirmar.\n",
    "pasos": [
      "Pide al agente: «Ana envía el borrador el viernes. Se aprueba la opción B. Falta confirmar presupuesto.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "flujo-archivos",
    "nombre": "Organizador de archivos",
    "descripcion": "Propone reglas repetibles para clasificar archivos y detectar nombres duplicados.",
    "categoria": "Automatización",
    "etiquetas": [
      "archivos",
      "flujos"
    ],
    "agentes": [
      "Claude",
      "Codex"
    ],
    "nivel": "Avanzado",
    "fecha": "2026-11-15",
    "descargas": 358,
    "entrada": "Clasifica los PDF en esta carpeta según año y tema.",
    "salida": "Propuesta: organizar por año/tema; simular cambios y revisar dos nombres duplicados antes de aplicar.",
    "instrucciones": "Define origen y destino. Imprime primero un plan sin cambios. Detecta colisiones y prepara un registro reversible. Aplica el plan únicamente con aprobación explícita.",
    "contenido": "---\nname: flujo-archivos\ndescription: Propone reglas repetibles para clasificar archivos y detectar nombres duplicados.\n---\n\n# Organizador de archivos\n\nDefine origen y destino. Imprime primero un plan sin cambios. Detecta colisiones y prepara un registro reversible. Aplica el plan únicamente con aprobación explícita.\n",
    "pasos": [
      "Pide al agente: «Clasifica los PDF en esta carpeta según año y tema.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "notas-version",
    "nombre": "Redactor de notas de versión",
    "descripcion": "Consolida cambios técnicos en notas que explican qué mejora para el usuario.",
    "categoria": "Escritura",
    "etiquetas": [
      "documentación",
      "versiones"
    ],
    "agentes": [
      "ChatGPT",
      "Claude",
      "Codex"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-17",
    "descargas": 516,
    "entrada": "Cambios: exportación CSV y corrección de un error en filtros.",
    "salida": "Ya puedes exportar resultados en CSV. Corregimos un error que descartaba el filtro al cambiar de página.",
    "instrucciones": "Agrupa cambios en novedades, mejoras y correcciones. Explica el efecto visible. Separa cambios incompatibles y omite detalles internos irrelevantes.",
    "contenido": "---\nname: notas-version\ndescription: Consolida cambios técnicos en notas que explican qué mejora para el usuario.\n---\n\n# Redactor de notas de versión\n\nAgrupa cambios en novedades, mejoras y correcciones. Explica el efecto visible. Separa cambios incompatibles y omite detalles internos irrelevantes.\n",
    "pasos": [
      "Pide al agente: «Cambios: exportación CSV y corrección de un error en filtros.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "analisis-tablas",
    "nombre": "Analista de tablas",
    "descripcion": "Resume tendencias y valores atípicos a partir de una tabla con métricas.",
    "categoria": "Datos",
    "etiquetas": [
      "análisis",
      "tablas"
    ],
    "agentes": [
      "ChatGPT",
      "Claude"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-19",
    "descargas": 429,
    "entrada": "Ventas mensuales: enero 40, febrero 42, marzo 61.",
    "salida": "Marzo subió un 45,2 % frente a febrero. Comprueba si hubo una campaña o cambios de registro.",
    "instrucciones": "Identifica unidades y periodos. Calcula cambios absolutos y relativos. Muestra operaciones verificables, explica limitaciones y evita atribuir causalidad sin evidencia.",
    "contenido": "---\nname: analisis-tablas\ndescription: Resume tendencias y valores atípicos a partir de una tabla con métricas.\n---\n\n# Analista de tablas\n\nIdentifica unidades y periodos. Calcula cambios absolutos y relativos. Muestra operaciones verificables, explica limitaciones y evita atribuir causalidad sin evidencia.\n",
    "pasos": [
      "Pide al agente: «Ventas mensuales: enero 40, febrero 42, marzo 61.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "pruebas-borde",
    "nombre": "Diseñador de casos de prueba",
    "descripcion": "Convierte requisitos en casos normales, de borde y de error.",
    "categoria": "Código",
    "etiquetas": [
      "pruebas",
      "calidad"
    ],
    "agentes": [
      "Claude",
      "Codex",
      "ChatGPT"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-22",
    "descargas": 285,
    "entrada": "El nombre de usuario acepta entre 3 y 20 caracteres.",
    "salida": "Probar 2, 3, 20 y 21 caracteres. Añadir un caso con entrada vacía y verificar qué ocurre con los espacios.",
    "instrucciones": "Enumera reglas comprobables. Diseña casos positivos, de frontera y negativos. Especifica entrada y salida esperada. Señala requisitos ambiguos por separado.",
    "contenido": "---\nname: pruebas-borde\ndescription: Convierte requisitos en casos normales, de borde y de error.\n---\n\n# Diseñador de casos de prueba\n\nEnumera reglas comprobables. Diseña casos positivos, de frontera y negativos. Especifica entrada y salida esperada. Señala requisitos ambiguos por separado.\n",
    "pasos": [
      "Pide al agente: «El nombre de usuario acepta entre 3 y 20 caracteres.»",
      "Compara su respuesta con el ejemplo y añade detalles de tu caso si hacen falta."
    ]
  },
  {
    "id": "remotion",
    "nombre": "Remotion",
    "descripcion": "Crea videos con React y TypeScript, revisa la composición en Studio y exporta el resultado.",
    "categoria": "Código",
    "etiquetas": [
      "video",
      "react",
      "animación"
    ],
    "agentes": [
      "Codex",
      "Claude"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-23",
    "descargas": 0,
    "entrada": "Crea un video vertical de 8 segundos con título animado y cierre de marca.",
    "salida": "Una composición de 1080 × 1920 a 30 fps y 240 fotogramas, con título de entrada y cierre integrado.",
    "comando": "npx skills add remotion-dev/skills",
    "fuente": "https://www.remotion.dev/docs/ai/skills",
    "instrucciones": "Inspecciona las composiciones y dependencias del proyecto. Confirma dimensiones, fps y duración. Anima con el fotograma actual y funciones deterministas. Revisa el inicio, el punto medio y el final en Remotion Studio antes de exportar.",
    "contenido": "---\nname: remotion-quickstart\ndescription: Crea videos con React y TypeScript, revisa la composición en Studio y exporta el resultado.\n---\n\n# Remotion · Guía rápida de Cocorico MD\n\nInspecciona las composiciones y dependencias del proyecto. Confirma dimensiones, fps y duración. Anima con el fotograma actual y funciones deterministas. Revisa el inicio, el punto medio y el final en Remotion Studio antes de exportar.\n\nPara instalar la distribución oficial, consulta https://www.remotion.dev/docs/ai/skills.\n",
    "pasos": [
      "Abre o vuelve a cargar el proyecto en tu agente.",
      "Pídele que use la skill y prueba la entrada de la vista previa.",
      "Compara el resultado con el ejemplo y ajusta el encargo a tu proyecto."
    ]
  },
  {
    "id": "impeccable",
    "nombre": "Impeccable",
    "descripcion": "Diseña y afina interfaces web con revisiones de jerarquía, accesibilidad y diseño responsive.",
    "categoria": "Código",
    "etiquetas": [
      "diseño",
      "ui",
      "accesibilidad",
      "impecable"
    ],
    "agentes": [
      "Codex",
      "Claude"
    ],
    "nivel": "Intermedio",
    "fecha": "2026-11-23",
    "descargas": 0,
    "entrada": "Revisa la página de catálogo y mejora su legibilidad en pantallas pequeñas.",
    "salida": "Una revisión con prioridades concretas y una interfaz comprobada en móvil y escritorio.",
    "comando": "npx impeccable install",
    "fuente": "https://impeccable.style/skills/",
    "instrucciones": "Identifica la tarea principal de la pantalla y revisa el diseño existente. Prioriza jerarquía, estados de interacción, contraste y navegación por teclado. Aplica cambios acotados y verifica el resultado en el navegador en escritorio y móvil.",
    "contenido": "---\nname: impeccable-quickstart\ndescription: Diseña y afina interfaces web con revisiones de jerarquía, accesibilidad y diseño responsive.\n---\n\n# Impeccable · Guía rápida de Cocorico MD\n\nIdentifica la tarea principal de la pantalla y revisa el diseño existente. Prioriza jerarquía, estados de interacción, contraste y navegación por teclado. Aplica cambios acotados y verifica el resultado en el navegador en escritorio y móvil.\n\nPara instalar la distribución oficial, consulta https://impeccable.style/skills/.\n",
    "pasos": [
      "Abre o vuelve a cargar el proyecto en tu agente.",
      "Pídele que use la skill y prueba la entrada de la vista previa.",
      "Compara el resultado con el ejemplo y ajusta el encargo a tu proyecto."
    ]
  }
];
