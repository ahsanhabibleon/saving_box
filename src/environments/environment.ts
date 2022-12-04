// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const baseURL = 'https://thesavingsbox.com/api/'
export const environment = {
  production: false,
  oneAppID: '2b67e0a3-3119-40bd-9f64-caac292f79f8',
  oneSenderID: '968180464174',
  groupChat: 'https://thesavingsbox.com/api/chat-server/public/api/create-group',
  chatUrl: 'https://thesavingsbox.com/api/chat-server/public/api/chats',
  chatMessagesUrl: 'https://thesavingsbox.com/api/chat-server/public/api/messages',
  socketUrl: 'ws://thesavingsbox.com:9091',
  api_url:'http://thesavingsbox.com/api',
  firebaseConfig : {
    apiKey: 'AIzaSyDe0STnUZroDCGjNCrxCMPewdc3DXlj2b8',
    authDomain: 'savingbox.firebaseapp.com',
    databaseURL: 'https://savingbox.firebaseio.com',
    projectId: 'savingbox',
    storageBucket: 'savingbox.appspot.com',
    messagingSenderId: '240353357660',
    appId: '1:240353357660:web:979a2d654bf049005c5b99',
    measurementId: 'G-9XHW9NMB0E'
  },
  stripe_payment_Key_Live: 'pk_live_51H87fOAzrKeV9fX38ofdYpS9BKIh8jk57Xeh5tpd0Ed6ByRxeTaUh8C50YTzDuo6dx96p4iULfu25TgFhsJwmHj2000U90O91P',
  stripe_payment_key_debug:'pk_test_51H87fOAzrKeV9fX3ulb0pAEfDF1Qcq1bD397x7cgoSxRIbP5ijAi2sw6oKoL9oO2ERMBU3E4iRPVHWFRffnWEIwD00BktKafCb'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
