This simple CRUD application use express.js and MySQL as backend and React Bootstrap as frontend.

### running app locally

-> npm install

-> nodemon server.js (or node server.js without auto update) to run express server at port 3000 or just npm serve

-> npm start to run app



Using multiple environments you may need to set the PORTs, so in scripts section use 'start': 'cross-env PORT={port} {command}' or 'start': 'set PORT={port} && {command}' 
or in .env file partly
