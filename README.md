# ComunikiME Challenge

This is the implementation of the ComunikiME challenge. The project is divided into 3 parts: API, Database and Web.
The API is responsible for handling the requests and responses of the application, the Database is responsible for storing the data and the Web is responsible for the user interface.

![Comuniniki-me](screenshot.png)

### API
The API was developed using Node.js and Express, leveraging the Routing-Controller library. This combination allows for simplified and efficient creation of endpoints, facilitating route definition and processing of HTTP requests. 

1. Go to folder `cd server`
2. Copy `sample.env` to `.env`
3. Run `npm install`
4. Run `npm run dev`
5. There are only tests written for the API Use cases. To run these tests, you can simply execute the command `npm test`.

### Database
The project was developed using Prisma as the Object-Relational Mapping (ORM) tool and SQLite as the database for the development environment. This combination provides an efficient and simplified approach to handling data persistence during the development phase.

The db is available on `server` folder
- run `npm run db:studio` to open a visual editor for the data the database
- run `npm run db:seed` to populate the database with fake data. It creates 2 users:
- User: `felipe`; Password: `felipe123` with role: `admin`
- User: `comuniki`; Password: `comuniki123` with role: `client`

### Web
1. Go to folder `cd web`
2. Run `npm install`
3. Run `npm run dev`
4. To log in use login and password created by command `npm run seed` (see above)

