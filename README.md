
This app need to firebase Realtime Databse in order to work
https://console.firebase.google.com/

Make sure the Rules of the REaltime Database
are not out of date. Otherwise, GET and POST
will be unauthorised
{
  "rules": {
    ".read": "now < 1667260800000",  // 2022-6-9
    ".write": "now < 1667260800000",  // 2022-6-9
  }
}