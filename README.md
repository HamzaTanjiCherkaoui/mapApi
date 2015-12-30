# Appartoo Web App

## Getting Started

## Contributors
Youssef El Montaser <youssef@elmontaser.com>
Brondon Ung <brondon.ung@gmail.com>
Bastien Malahieude <bastienmalahieude.fr>

### Install Dependencies
```
bower install
```

## Directory Layout
```
app/                    --> all of the source files for the application
    controllers/        -->
    directives/         -->
    filters/            -->
    models/             -->
    services/           -->
    app.js              --> Bootstrap app
partials/               --> the partial template
assets/
    libs/               --> all vendor libs
    css/                --> default stylesheet
index.html              --> app layout file (the main html template file of the app)
tests/                  --> end-to-end tests
  scenarios.js          --> end-to-end scenarios to be run
```

## What To Do ?

- Create a new routing #/map
- Create its controller
- Include angular google maps dependancies <http://angular-ui.github.io/angular-google-maps/#!/>
- Include a google maps on this route using angular google maps
- Create a simple form with this fields
       - Address With Google maps api places (see how to use it with Angular)
       - Number of rooms (from 1 to 4+) usefull for the json search
       - Building period (before 1946, 1946 - 1970, 1971 - 1990, after 1990) usefull for the json search
       - Kind of location (furnished/unfurnished) usefull for the json search
       - flat's size (in square metters)
       - A submit button

- Using ajax calls, get the right json file from the ones located on server/json/ corresponding to the form's data
- Display the position of the building on the map
- Display all the json datas on the map
- Display the property's price
- Based on the flat's size, display the average, min & max prize# mapApi
