YaTa - Yet Another Todo App
===
This project is dedicated to provide a working example using IBM Worklight and AngularJS.

# IBM Worklight
IBM Worklight is a platform built upon Apache Cordova. It allows you to develop hybrid mobile applications.
The benefits of this are that you can write your entire application using HTML5 and JavaScript (which will work on all devices), 
but still have the possibility to use the native aspects of the device (GPS, camera, accelerometer, ...).

Compared to Cordova it's offering an abstraction layer to your back-end service.
It also has several security based features like HTML5 LocalStorage encryption, adapter authentication, ... .

[Read more](http://www.ibm.com/mobilefirst/us/en/)


# AngularJS
AngularJS is a popular JavaScript **Model-View-Controller** framework. It handles aspects like templating, two-way data binding and much more.
To write large applications, a neat structure will make development a lot easier. AngularJS is providing that structure.

[Read more](http://angularjs.org)


# Ionic framework
One of the recent players in the mobile UI framework market is the Ionic framework. One of the great aspects of the Ionic framework is that it is tested on Apache Cordova and that it's integrated with AngularJS.

[Read more](http://ionicframework.com)


# Bower
The dependencies of this project are managed by Bower. This dependency manager, written in JavaScript (on Node.js) allows you to easily install your packages.

The only thing you need is **Node.js**, then you can install it using:

`npm install -g bower`

Afterwards you can install the project's dependencies using:

`bower install`

[Read more](http://bower.io)


# GruntJS
The test runner (and eventually the entire build process) is ran using Grunt. Just like Bower it's written in JavaScript (on Node.js) and allows you  to execute many tasks.

These tasks come in the form of plugins that you can use and configure to automate your build process. You can install it using:

`npm install -g grunt-cli`

Afterwards you can run the project unit tests using:

`grunt test`

Are make it run continuously using:

`grunt test:continuous`

[Read more](http://gruntjs.com)


# KarmaJS
KarmaJS is the test runner used in this project. It allows you to run your unit tests using Jasmine, but also your functional/e2e tests can be ran on your browser using PhantomJS.

[Read more](http://karma-runner.github.io/0.10/index.html)
