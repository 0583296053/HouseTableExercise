# HouseTableExercise
HouseTable - Full stack engineering exercise.

## Setup and compile the Backend
- Go to the `backend` project directory
- Copy the file `.env.template` and change the name of the copied file to `.env`
- Run the follow command to install the project dependencies:

```
npm install
```

- Create a postgres database on your computer
- Set the database connection string in the `.env` file
- If you do not have sequelize installed on your computer, run:

```
npm install sequelize sequelize-cli pg pg-hstore
```

- Run the follow command to create the project table in the database

```
sequelize db:migrate
```

- Run the follow command to start running the project:

```
npm start
```

## Setup and compile the Frontend
- Go to the `frontend` project directory
- Copy the file `.env.template` and change the name of the copied file to `.env`
- Run the follow command to install the project dependencies:

```
npm install
```

- Run the follow command to start running the project:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
