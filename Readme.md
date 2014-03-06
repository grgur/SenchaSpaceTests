Notes
=====
* In multiple app environment, working with workspaces and packages makes a lot of sense. Sencha Cmd 5 is to provide with workspace watch methods. Hopefully we won't have to build every app in the workspace individually.
* Creating a deployment script on server side is proven to be very helpful as my Sencha Space native app gets built updates automatically
* 100 - 400ms is the delay between `launch()` and `onSpaceReady()` (on an iPad mini). Varies.
* Camera can float over the app, but the buttons on it are buggy (ios7)
* Swipe from top right for a task manager
* Internally, an app talks to space by sending HTTP GET requests. E.g. `Ext.space.Camera.capture({scope: callbackScope,quality: 75,width: 500,height: 500})` becomes: `?quality=75&width=500&height=500&command=Camera%23capture`

* Unlike LocalStorage, SecureLocalStorage is asynchronous and sports larger memory limits
* SecureLocalStorage uses SqLite, but Space does not offer SqLite storage adapters for public use

Questions:
============
* How to debug an app inside of Sencha Space? It's not showing up in Safari remote debugger
* It would be great if Space would check for app updates after pin entry. How often are the apps updated anyway?


Preso:
========
* BYOD
* What is Sencha Space
* Components: mobile app + web mgmt interface + App + API
* Mobile App: on App stores for Apple, google, blackberry, microsoft, ???
* Secure: secure file storage, can't log in on jailbroken devices
* Web interface: user management, app management, api invoke
* Apps: Any web app distributed online
* Links to web apps are not exposed to the end user
* Any web app or site allowed, doesn't have to be Sencha Touch
* API exposed: Secure file storage, secure localstorage, (minimal) device APIs (vibration, camera, connection, device info), Cross-app comm
* Built on Promises
* Space vs Cordova
* Debugging
* Technicalities
    * Communicates to native APIs through GET and POST requests, serializing JSON as data carrier
    * Apps that want to migrate existing localstorage tu securels will need to adapt to async
    * 100-400ms launch delay
    *