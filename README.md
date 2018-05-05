# Chat Application using Angularjs and socket.io

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

Prerequiste:
1. Nodejs
2. Bower
3. Jade

Supports multi-screen viewing

## Using the chat app

Clone the chat_application_socket.io_angularjs

```shell
git clone https://github.com/rimay07/chat_application_socket.io_angularjs.git
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

