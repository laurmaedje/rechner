# Rechner

This is a calculator written in Javascript using the electron framework. 
For the actual calculations the rust library [`leval`][leval] is used.
The [`leval`][leval] crate was compiled with emscripten 
and the resulting file [leval-js](app/leval-js.js) lies inside the app folder, 
so ist does not need to be recompiled when building.

## Get it

Just clone the repository and run
```
cd rechner
npm install
npm run package
```
This will create a directory `build`, 
where inside another folder (depending on your target architecture) is the packaged app.

[leval]: http://github.com/laurmaedje/leval
