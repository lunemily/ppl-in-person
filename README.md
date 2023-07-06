# PplSite

This project is based on [AngularJS](https://angular.io/), and uses [Angular Material](https://material.angular.io/) for the UI components. Themes are built in [SASS](https://sass-lang.com/).

## Dependencies

1. `npm`
1. [AngularJS](https://angular.io/)
1. [Angular CLI](https://angular.io/cli)
1. `https://github.com/Toastdeib/ppl-webapp-api/tree/combined-api`
1. [Angular Material](https://material.angular.io/)

## How to run it

`npm install --legacy-peer-deps`

Run one of these. A new browser window will open up to http://localhost:4200
`npm run online`
all run options: `(aus|east|west|online)`

## Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build and Push

The deploy script will build the static site and push it to Github. The output will be in `/docs/(aus|east|west|online)` depending on which one you build.

`./deploy.sh (aus|east|west|online)`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
