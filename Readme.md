Notes
=====
* In multiple app environment, working with workspaces and packages makes a lot of sense. Sencha Cmd 5 is to provide with workspace watch methods. Hopefully we won't have to build every app in the workspace individually.
* Creating a deployment script on server side is proven to be very helpful as my Sencha Space native app gets built updates automatically
* 100 - 400ms is the delay between `launch()` and `onSpaceReady()` (on an iPad mini). Varies.
* Camera can float over the app, but the buttons on it are buggy (ios7)
* Swipe from top right for a task manager
* Internally, an app talks to space by sending HTTP GET requests. E.g. `Ext.space.Camera.capture({scope: callbackScope,quality: 75,width: 500,height: 500})` becomes: `?quality=75&width=500&height=500&command=Camera%23capture`

Questions:
============
* How to debug an app inside of Sencha Space? It's not showing up in Safari remote debugger
* It would be great if Space would check for app updates after pin entry. How often are the apps updated anyway?
