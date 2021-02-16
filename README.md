## Contents

- [General](#general)
- [Technologies](#technologies)
- [Setup](#setup)

## General

## Technologies

## Setup

To run this project you have to clone it from git as standard and install npm package on your machine.
You have to have account on MongoDB Atlas

nodemon server.js or npm run test

You need code additional file config.js and put below code:

- module.exports = {
  - db:
    - "mongodb+srv://PUT YOUR ADMIN LOGIN AND PASSWORD CREATED BY MONGODB",
  - keySession: ["YOURKEYSESSION"], // it's can be named by you
- maxAgeSession: 24 x 60 x 60 x 1000, // admin age session is set on 24h - you can change it
- };
