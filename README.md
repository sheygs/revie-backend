# Introduction

Revie is a hypothetical platform where users can sign up with their basic information and post reviews about their apartments they've previously lived in.

## Installation

```bash
$ git clone https://github.com/sheygs13/revie-backend.git

$ cd revie-backend

$ npm install
```

### Rename _.env.sample_ to .env and set database connection

```
DATABASE_URL=mongodb+srv://<USER>:<DATABASE_PASSWORD>@cluster0.orhxc.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority
```

## Run

```bash
$ npm run dev
```

### Available endpoints

`/api/v1/auth/`

| method | route     | description |
| ------ | --------- | ----------- |
| POST   | /register | Create user |
| POST   | /login    | Login user  |

`/api/v1/reviews`

| method | route        | description          |
| ------ | ------------ | -------------------- |
| GET    | /reviews     | Get reviews          |
| POST   | /reviews     | Create reviews       |
| GET    | /reviews/:id | Get reviews by ID    |
| PUT    | /reviews/:id | Update review        |
| DELETE | /reviews/:id | Delete/remove review |
