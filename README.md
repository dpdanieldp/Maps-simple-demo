# Maps simple demo

`Maps simple demo` is a full stack application built with Node Express js, MongoDB on backend and ReactJS on frontend.
#### This is a basic, dev version of the app, lacking many security features.

<hr>

## How to try it out

The project is prepared to be run locally in docker using docker-compose.

Before first run go to `backend/.env.example` and update `REACT_APP_GOOGLE_MAPS_API_KEY=` with your Google Maps API key.

1. Install, setup and run [Docker Desktop](https://www.docker.com/)
2. Open Terminal and `cd` to `Maps-simple-demo`
3. run `make up` -this command will build and run Docker containers for:
   1. Backend - on  http://localhost:8080
   2. Frontend - on http://localhost:3000
   3. MongoDB
   4. MongoDB Express - on http://localhost:8081
4. Go to http://localhost:3000 and try out React UI.
5. To stop all containers press `Ctrl+C` in the Terminal
6. To remove created volumes along with the containers run `make clean`

<hr>
