<div align="center">
  <h1>LabRegistro</h1>
  <p>
    <strong>Sistema de Gestión de Laboratorios Académicos</strong>
  </p>
  
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
</div>

## 📋 Descripción

LabRegistro es una aplicación web diseñada para la gestión integral de laboratorios académicos. Permite administrar laboratorios, asignaturas, parciales y prácticas de manera eficiente, facilitando el registro y seguimiento de actividades en entornos educativos.

## ✨ Características Principales

- **Gestión de Laboratorios**
  - Registro y administración de espacios de laboratorio
  - Control de capacidad y disponibilidad
  - Historial de uso detallado

- **Administración Académica**
  - Gestión de asignaturas y docentes
  - Control de parciales y evaluaciones
  - Seguimiento de prácticas por asignatura

- **Control de Acceso**
  - Autenticación de usuarios
  - Roles y permisos personalizables
  - Registro de actividades

- **Interfaz Intuitiva**
  - Diseño responsivo con Bootstrap 5
  - Navegación sencilla e intuitiva
  - Panel de control con estadísticas

## 🚀 Comenzando

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar las dependencias de CDN)

### Instalación Local

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Aplicacion-http-lab
   ```

2. Abre el archivo `index.html` en tu navegador o usa un servidor local:
   ```bash
   # Usando Python (si está instalado)
   python -m http.server 8000
   ```
   Luego abre `http://localhost:8000` en tu navegador.

## 🏗 Estructura del Proyecto

```
.
├── index.html      # Punto de entrada de la aplicación
├── app.js          # Lógica principal de la aplicación
├── api.js          # Cliente para la API del backend (AWS API Gateway)
└── styles.css      # Estilos personalizados
```

## 📚 Documentación Técnica

### API Reference

La aplicación se comunica con una API RESTful alojada en AWS. A continuación, se detallan los endpoints principales:

| Endpoint           | Método | Descripción                     |
|--------------------|--------|---------------------------------|
| `/laboratorios`    | GET    | Obtener lista de laboratorios   |
| `/laboratorios`    | POST   | Crear nuevo laboratorio         |
| `/asignaturas`     | GET    | Listar asignaturas              |
| `/parciales`       | GET    | Obtener parciales               |
| `/practicas`       | GET    | Listar prácticas                |
| `/usos`            | POST   | Registrar uso de laboratorio    |


**URL Base de la API:**
```
https://guc9zkb4ee.execute-api.us-east-2.amazonaws.com
```

### Estructura de Datos

#### Laboratorio
```json
{
  "id": "string",
  "nombre": "string",
  "capacidad": number,
  "ubicacion": "string",
  "descripcion": "string"
}
```

#### Asignatura
```json
{
  "id": "string",
  "nombre": "string",
  "codigo": "string",
  "docenteId": "string",
  "horario": "string"
}
```

## 🛠 Desarrollo

### Tecnologías Utilizadas

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

**Backend:**
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- Base de datos (No especificada en el código)

### Variables de Entorno

Para desarrollo local, puedes configurar las siguientes variables:

```env
API_BASE_URL=https://guc9zkb4ee.execute-api.us-east-2.amazonaws.com
ENV=development
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

Por favor, asegúrate de que tus cambios sigan las guías de estilo del proyecto.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

```
MIT License

Copyright (c) 2025 Equipo Edison (BEC)

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y de la documentación asociada (el "Software"), para utilizar
y operar con el Software sin restricciones, incluyendo, sin limitación, los
derechos de uso, copia, modificación, fusión, publicación, distribución, sublicencia
y/o venta de copias del Software, y para permitir a las personas a las que se les
proporcione el Software a hacerlo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas
las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, ADECUACIÓN
PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O
TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS
RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO
MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTRO TIPO DE
ACCIONES EN EL SOFTWARE.
```

---

<div align="center">
  Desarrollado con ❤️ por el equipo <strong>Edison (BEC)</strong>
</div>
