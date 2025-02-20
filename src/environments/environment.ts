// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //local
  url_backend: 'http://127.0.0.1:8000/',
    url_servicios: 'http://127.0.0.1:8000/api',
    url_frontend: 'http://localhost:4300/',
    url_media: 'http://127.0.0.1:8000/storage/',
    
    //remoto consultorio
    // url_backend: 'https://consultorio.health-connect.me/backend-api-citas/',
    // url_servicios: 'https://consultorio.health-connect.me/backend-api-consultorio/public/api',
    // url_frontend: 'https://pconsultorio.health-connect.me/',
    // url_media: 'https://consultorio.health-connect.me/backend-api-consultorio/storage/app/public/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
