// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  photo_path:
    'https://firebasestorage.googleapis.com/v0/b/mmmmwhiskey.appspot.com/o/',
  photo_path_param: '?alt=media',
  firebase: {
    apiKey: 'AIzaSyD6HYmXFA20iVvKo5Qwg9LrFKc0FwKyTCs',
    authDomain: 'mmmmwhiskey.firebaseapp.com',
    databaseURL: 'https://mmmmwhiskey.firebaseio.com',
    projectId: 'mmmmwhiskey',
    storageBucket: 'mmmmwhiskey.appspot.com',
    messagingSenderId: '885759238481'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
