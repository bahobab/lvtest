# SWAPI Exercise

This is an exercice to fetch Star Wars characters from the SWAPI API (https://swapi.dev/).

The exercice has 2 parts:

## 1/ The server is implemented with Node Express.

There are two (2) endpoints:

- http://localhost:4000/people/:page
This will return the page specified from the SWAPI people endpoint that matches the given page.
https://swapi.dev/api/people/?page=page

- http://localhost:4000/people/details/:name
This endpoint will make a call to the SWAPI people endpoint searching for the matching character name
https://swapi.dev/api/people/?search=name


## 2/ The client portion is implemented with create-react-app and is hosted in the /client directory.

Upon application start there is a recursive call to the SWAPI API people endpoint.
The call starts in the useEffect hook.
It then populates the names state that is used to feed the Select component, implemented in the SelectName.js file.

The Select component is fed gradually by the recursive call.
An earlier implementation was made on the server side (ExpressJS) but it was failing due to timeout, as I was trying to compile all the character names before sending the results back to the client.

I read the documentation for the react-select component to see if there is a more elegant way to handle this task. Maybe there's, but it was not obvius to me in the docs.

Once the Select component receives the first batch of character names the "View Details" button becomes active and the details of a character can be fetched.

The results are put in a table and displayed by the ShowDetails component that is a child component of the SelectName component.

## 3/ A basic, smoke test is implemented to make sure the app is run and rendered without crashing.

## How to install and run the exercice?

- 1/ clone the repro from https://github.com/bahobab/lvtest.git
- 2/ cd to the lvtest directory and run yarn to install the dependancies for the server
- 3/ cd to client then run yarn to install the client
- 4/ start the server with:

  lvtest$ yarn start

- 5/ start the client with

  lvtest/client$ yarn start

- 6/ run the test with

  lvtest/client$ yarn run test
