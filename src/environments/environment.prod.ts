export const environment = {
  production: true,
  //local
  // url_backend: 'http://127.0.0.1:8000/',
  //   url_servicios: 'http://127.0.0.1:8000/api',
  //   url_frontend: 'http://localhost:4300/',
  //   url_media: 'http://127.0.0.1:8000/storage/',
    
    //remoto consultorio
    url_backend: 'https://consultorio.klyntic.com/backend-api-citas/',
    url_servicios: 'https://consultorio.klyntic.com/backend-api-consultorio/public/api',
    url_frontend: 'https://pconsultorio.klyntic.com/',
    url_media: 'https://consultorio.klyntic.com/backend-api-consultorio/storage/app/public/',
     
    //conexion a node y manejo de notificaciones
    backend_node:"https://back-klyntic-envios.onrender.com/api",
    urlBackedNotification:'https://back-klyntic-envios.onrender.com/api/notipush/save-subscription',
    VAPI_KEY_PUBLIC: 'BG-UDqYJkOikTb0G7nNdKcpqZm__XCl0dwbJsx-kerpEecxL5rp079U7UMZxqo5XA0i60NGOVlezm1RAMyHRTbQ',
  
};
