# Anne

The project is a MEAN stack application. It uses Angular for frontend, MongoDB for non-relational data storage, Express and finally NodeJS. Thus, the application is 
a full stack application. The appliation is a simple news website illustrating use of non-relational database, data binding, RESTful APIs, CRUD operations, Authentication, and Authorization.
The app has been deployed live on [Heroku Cloud](https://annev1.herokuapp.com/) to demonstrate its performane. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Clone
Run `git clone https://github.com/kmishmael/anne.git` to clone to a folder.

## Install and setup
Run `npm install` to install packages in package.json.

## Folders
The project consist of both Frontend and Backend code. Backen code is found in the server folder.

## Run
## Option 1
Use npm package `concurrently`, already in package.json to run both front end simuntaneously. Change `start` command in package.json to `concurrently -c \"yellow.bold,green.bold\" -n \"BACKEND,FRONTEND\" \"node server\" \"ng serve --port 80\""`. This would run both backend and frontend simuntaneously.

## Option 2
use the `server.js` file in the root folder. The catch with this is it serves static frontend files. This means thet you have to run `ng-build` first and choose public folder
to be `dist/anne`. Atlternatively, choose public folder of your convinience and make necessary changes to `server.js`.

## Development server

Run `ng serve` (`--port 80`) for a dev server on frontend. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Please note that this would launch the front end only.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Licence
The project is licenced for open source under MIT License and is subject to the terms.

