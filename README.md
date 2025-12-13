# 📚 Gestor de Notas Académicas

## 📋 Descripción del Proyecto
Sistema web moderno para la gestión de calificaciones estudiantiles. Permite a los docentes registrarse, gestionar sus listas de alumnos y calcular promedios de manera segura y privada. El proyecto implementa un modelo **CRUD completo** con aislamiento de datos por usuario.

---

## 🔗 URL de Despliegue
🚀 **Aplicación en Producción:** https://gestor-notas-brayan.web.app/

---

## 🎥 Video Demostrativo
**Contenido:** Funcionalidades, flujo de autenticación, uso de Firestore y explicación del código.

📺 **Ver Video:** 
https://drive.google.com/drive/folders/1Z51eaaUGmND5g8lPD7aAAv3kIxi0jXjz?usp=sharing
---

## 🛠️ Tecnologías y Herramientas
* **Frontend:** Angular 20.
* **Estilos:** SCSS con arquitectura modular.
* **Backend (BaaS):** Firebase.
    * **Authentication:** Gestión de usuarios.
    * **Cloud Firestore:** Base de datos NoSQL.
    * **Hosting:** Despliegue en la nube.
* **Control de Versiones:** Git & GitHub.
* **IDE:** Visual Studio Code.


## 🏗️ Arquitectura del Sistema
La aplicación sigue una arquitectura basada en componentes y servicios inyectables:

1.  **Componentes (Vistas):**
    * `Login/Registro`: Manejan la entrada de usuarios.
    * `MisCursos`: Dashboard principal que lista los estudiantes del usuario logueado.
    * `GestionAcademica`: Formulario reactivo para crear/editar alumnos.
    * `Rendimiento`: Módulo de estadísticas y cálculos.

2.  **Servicios (Lógica de Negocio):**
    * `AuthService`: Maneja la comunicación con Firebase Authentication (Login, Register, Logout, Estado).
    * `EstudiantesService`: CRUD conectado a la colección `estudiantes` en Firestore.
    * `NotasService`: Gestión de sub-colecciones o documentos de notas.

3.  **Guards (Seguridad):**
    * `AuthGuard`: Intercepta la navegación y bloquea el acceso a rutas privadas si no hay sesión activa.

## ⚙️ Requisitos para Instalar y Ejecutar

Si deseas correr este código localmente:

1.  **Requisitos Previos:** Tener instalado Node.js y Angular CLI.
2.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/BrayanPahuara/gestor-notas-angular.git
    
    cd gestor-notas-angular
    ```
3.  **Instalar dependencias:**
    ```bash
    npm install
    ```
4.  **Configuración:**
    * Crear proyecto en [Firebase Console](https://console.firebase.google.com/).
    * Copiar credenciales en `src/environments/environment.ts`.
5.  **Ejecutar:**
    ```bash
    ng serve
    ```
    Abrir `http://localhost:4200` en el navegador.

## 📖 Manual de Usuario

### 1. Autenticación
* **Registro:** Ve a `/registro`, ingresa un correo válido y contraseña (+6 caracteres).
* **Login:** Usa tus credenciales para acceder al sistema.

### 2. Gestión de Estudiantes (Firestore)
* **Crear:** En el dashboard, clic en "Nuevo Alumno". Los datos se guardan vinculados a tu ID (aislamiento de datos).
* **Listar:** Visualiza solo tus alumnos creados.
* **Editar/Eliminar:** Usa los iconos correspondientes en cada tarjeta.

### 3. Registro de Notas
* Accede al detalle del alumno.
* Ingresa materia, nota (0-20) y tipo de evaluación.
* El sistema calcula automáticamente si está Aprobado/Desaprobado.

### 4. Estadísticas
* Ve a la sección "Rendimiento" para ver promedios globales y alumnos destacados.

## 📁 Estructura del Proyecto

```text
src/app/
├── components/          # Navbar dinámico
├── guards/              # Seguridad de rutas
├── interfaces/          # Modelos de datos
├── pages/               
│   ├── login/           # Acceso
│   ├── registro/        # Crear cuenta
│   ├── mis-cursos/      # Lista de alumnos (Dashboard)
│   ├── gestion-academica/ # Formulario de alumnos
│   ├── detalle-curso/   # Gestión de notas individuales
│   └── rendimiento/     # Estadísticas
└── services/            # Conexión con Firebase
```
---
**Autor:** Brayan Pahuara Mondalgo