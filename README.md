# Chat Application using Angularjs and socket.io

npm: [![Dependency Status](https://www.versioneye.com/user/projects/553a42d21d2989bdd50000a4/badge.svg?style=flat)](https://www.versioneye.com/user/projects/553a42d21d2989bdd50000a4)
Bower: [![Dependency Status](https://www.versioneye.com/user/projects/553a42ce1d2989f7ee0000db/badge.svg?style=flat)](https://www.versioneye.com/user/projects/553a42ce1d2989f7ee0000db)

Features of the application:
1. Connect to a 0.9 socket.io server
2. Messages are printed when pressed and shows a delivered status once an event from the server is received
3. Background color and text color toggle
4. Time 12/24 hour toggle
5. Sound on/off toggle
6. CTRL + Enter to send message toggle
7. Local storage settings storage
8. Missed message counter
9. Tabs support in the message area
10. User rename
11. Responsive design 
12. Auto scroll to bottom of chat window
13. Message sound mute in settings
14. Automatic background change on selection

Prerequiste:
1. Nodejs
2. Bower
3. Jade

Notes:
1. Application runs on nodejs server
2. Supports multi-screen viewing

## Install Dependencies

Install Nodejs

Download and Install:
https://nodejs.org/en/download/

Using a Package Manager:
https://nodejs.org/en/download/package-manager/

## Using the chat app

Create Directory to your project

```shell
mkdir <project_name>
```

Clone the chat_application_socket.io_angularjs

```shell
git clone https://github.com/rimay07/chat_application_socket.io_angularjs.git
```

Go to application folder

```shell
cd <project_name>/chat_application_socket.io_angularjs
```

### Starting the chat app

Installing libraries

```shell
npm install
```

Starting the application
```shell
npm start
```

Open your browser to http://localhost:8081 to view the chat application

### Updating `angular.js`

```shell
bower update angular
```

## Running Node with http server

Application runs on nodejs. Inorder to use it with other servers, proxy all requests requiring node to the node application running on the same server 

Example:
For Apache server:
https://stackoverflow.com/questions/9831594/apache-and-node-js-on-the-same-server

## Directory Layout
    
    app.js                  	--> app config
    bower.json              	--> for bower
    package.json            	--> for npm
    public/                 	--> client side files
      css/                  	--> css files
        app.css             	--> default stylesheet
      js/                   	--> javascript files
        app.js              	--> top-level app module
        socket-service.js		--> angular socket service
        messages-service.js		--> angular message service
        settings-service.js		--> angular settings service
        chat-controller.js		--> angular chat controller
        settings-controller.js	--> angular settings controller
      bower_components/
        angular/            	--> angular.js
        angular-socket-io/  	--> socket.io adapter for angular
    routes/
      index.js              	--> route for serving HTML pages and inner pages
    views/
      index.jade            	--> main page
      layout.jade           	--> doctype, title, head boilerplate
      pages/             		--> angular view pages
        chat.jade
        settings.jade

