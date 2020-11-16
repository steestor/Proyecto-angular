# iti-core-ng-template

En este repositorio se encuentra el template de ItiCore para hacer proyectos front con Angular.

Inicialmente se basa en usar:
 * Angular 9
 * DevExtreme
 * DevExtreme template como origen del layout propuesto
 * Bootstrap 4

El Layout del template de DevExtreme, su modo de enrutado y su distribución en carpetas ha sido modificado para añadir prestaciones propias de ItiCore.

## Como iniciar un proyecto con las mejoras que aporta ItiCore
Puede descargar o clonar el template de este repositorio, y copiarlo en la carpeta de su proyecto.

Para ponerlo en funcionamiento solo es necesario:
 * npm install
 * npm start

## Como iniciar un proyecto de cero con DevExtreme y su layout limpio
Si no se quiere usar el template, y se prefiere partir de un layout sin las mejoras de ItiCore, solo hay que ejecutar:
* ng new nombre-del-proyecto
* cd nombre-del-proyecto
* devextreme add devextreme-angular
* devextreme add angular-template --layout side-nav-outer-toolbar --resolve-conflicts override


# Distribución en carpetas y archivos

## Estructrura general de carpetas
```
|-- node_modules
|-- src
    |-- app
        |-- core
        |-- modules
            |-- login
            |-- clientes
            |-- ventas
            |-- etc…
        |-- shared            
    |-- assets
    |-- environments	
```
* **node_modules**: paquetes de dependencias 
* **src**: código fuente del proyecto
* **app**: carpeta raíz de la aplicación
* **core**: carpeta donde albergar los elementos que deben instanciarse de forma única
* **modules**: carpeta donde albergar los distintos módulos funcionales
* **shared**: carpeta donde albergar SharedModule con elementos compartidos transversalmente en toda la aplicación
* **assets**: archivos ajenos al empaquetado (imágenes, fuentes, sonidos, etc…)
* **environments**: archivos de definición de entornos
	
## Archivos a nivel raíz

* **.gitignore**: configuración de git para ignorar contenido que no debe subir al repo
* **.angular.json**: configuración de angular para el proyecto
* **package-lock.json**: archivo autogenerado con el árbol de dependencias de paquetes npm
* **package.json**: valores de definición del proyecto como:
    - nombre
    - versión
    - dependencias de paquetes npm
    - dependencias de paquetes npm solo durante el desarrollo
    - otros valores
* **README.md**: documento con sintaxis markdown con información del proyecto
* **tsconfig.json**: configuración de Typescript
* **tslint.json**: definición de las reglas lint que debe cumplir el Typescript del proyecto

## Arhivos a nivel src

* **favicon.ico**: icono que se muestra en la pestaña del navegador
* **index.html**: HTML de entrada de la aplicación
* **main.ts**: punto de entrada de la aplicación
* **styles.scss**: estilos globales de la aplicación
* **polyfills.ts**: compatibilidad con navegadores
* **test.ts**: configuración de Karma

## Arhivos a nivel app

* **app-routing.module.ts**: Módulo con las rutas de primer nivel
* **app.component.ts|html|scss|spec.ts**: Componente para iniciar la aplicación
* **app.module.ts**: Módulo raíz de la aplicación

## Estructura de Core
```
|-- core
    |-- guards
    |-- interceptors
    |-- interfaces
    |-- models
    |-- services
    |-- core.module.ts
```    
* **guards**: guardas de rutas
* **interceptors**: definición de interceptores
* **interfaces**: definición de interfaces usados en core
* **models**: definición de modelos usados en core
* **services**: servicios singleton a nivel global de la aplcicación
* **core.module.ts**: definición de módulo Core que se importará únicamente desde el AppModule

Para asegurarse que CoreModule no se importa más de vez se añade código:
```    
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  imports: [],
  providers: [],
  declarations: []
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() core:CoreModule ){
    if (core) {
        throw new Error("You should import core module only in the root module")
    }
  }
}
```    

## Estructura dentro de un módulo funcional
```
|-- modules
    |-- login
    |-- clientes
    |-- ventas
        |-- components
            |-- lista
                |-- ventas-lista.component.html
                |-- ventas-lista.component.ts
                |-- ventas-lista.component.spec.ts
                |-- ventas-lista.component.scss
            |-- form
                |-- ventas-form.component.html
                |-- ventas-form.component.ts
                |-- ventas-form.component.spec.ts
                |-- ventas-form.component.scss
        |-- services
            |-- ventas-lista.service.ts
            |-- ventas-form.service.ts
        |-- models
        |-- ventas-routing.module.ts
        |-- ventas.module.ts
```        
* **components**: componetes del módulo. Cada componente tendrá su propia subcarpeta con los archivos necesarios para el componente ts|html|scss|spec.ts 

* **services**: servicios propios del módulo.

* **models**: definición de modelos intramodulo

* **xxx-routing.module.ts**: submódulo para definición de rutas

* **xxx.module.ts**: módulo para ofrecer lazy-loading de rutas+componentes+servicios.

## Estructura de Shared
```        
|-- shared
    |-- animations
    |-- components
    |-- directives
    |-- interfaces
    |-- models
    |-- layout
    |-- pipes
    |-- services
    |-- utils
    |-- shared.module.ts
```            
* **animations**: animaciones
* **components**: componentes compartidos 
* **directives**: directivas compartidas
* **interfaces**: interfaces comunes al resto de la aplicación
* **models**: modelos comunes al resto de la aplicación
* **layout**: elementos de definición de layout principal
* **pipes**: pipes compartidas
* **services**: servicios globales compartidos
* **utils**: utilidades para strings, fechas, etc…
* **shared.module.ts**: definición de módulo Shared que se importará en el resto de módulos para llevar la funcionalidad transversalmente a toda la aplicación.

## Estructura de Shared\components
```        
|-- shared
    |-- components
        |-- data-grids
        |-- dynamic
        |-- editors
        |-- layout
        |-- loading
        |-- etc...
```        
* **data-grids**: componentes para factorizar los distintos tipos de grid
* **dynamic**: componente para generar dinámicamente componentes
* **editors**: componentes wrapper para factorizar los editores
* **layout**: componentes para la distribución del layout de la aplicación
* **loading**: componente para mostrar el 'Cargando...' durante las operaciones asíncronas, por ejemplo llamadas al Api.

# Funcionalidades 

ItiCoreNgTemplate preconfigura:
* Gestión de token JWT (interceptor)
* Captura centralizada de errores devueltos por el API (interceptor)
* Guarda para bloquear rutas
* Multiidoma (@ngx-translate/core)
* Ejemplo de Lazy loading en la carga de módulos
* Ejemplo de listado con CRUD
* Navegacion Login -> MainLayout -> Login
* Menú lateral según permisos

ItiCoreNgNpm incluye:
* Directivas:
  * ItiAutofocus
  * ItiClickAndDblClick
* Guardas:
  * ItiAuthGuardService
* Modelos:
  * ItiBaseDto
* Pipes:
  * ItiFieldFilter
  * ItiSumProperty
  * IsNull
  * NotIsNull
* Servicios:
  * ItiCache
  * ItiCacheHttp
  * ItiHttp
  * ItiLoading
  * ItiPermissionService
  * ItiTokenService
  * ItiSignalR 
* Utilidades:
  * AppInjector
  * ItiDatagrid
  * ItiDateTime
  * ItiMessage
  * ItiNumeric
  * ItiString
  * ItiTabs

