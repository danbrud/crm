# CRM

CRM is a Client Ralationship Management system built with React. It includes a graphic analytics dashboard for company reports.

Demo: [https://dannys-crm.herokuapp.com](https://dannys-crm.herokuapp.com)

## Table Of Contents
- [CRM](#CRM)
  * [Running the project](#running-the-project)
  * [Screenshots](#screenshots)
    + [Client List](#client-list)
    + [Add or Update Client](#add-or-update-client)
    + [Analytics Dashboard](#analytics-dashboard)
  * [Tech Stack](#tech-stack)

## Running the project
1. Clone the repo.
2. Run `npm install`.
3. Run `npm run build`
4. Run `mongod`
5. Run `npm start`.
6. Navigate to `http://localhost:3000`.

## Screenshots

### Client List
An overview of all your clients. You can filter by the different owners, emails, country & name. A client can be double clicked to pull up a popup and update a client.
<p align="center"><img src="assets/client-view.png" width="300" /></p>

<p align="center"><img src="assets/update-modal.png" width="300" /></p>


### Add or Update Client
Fill out the inputs and then click *add* or *update* to add a new client. When adding/updating a snackbar will popup to confirm success.
<p align="center"><img src="assets/add-update-client.png" width="300" /></p>

### Analytics Dashboard
View a report of all the metrics regarding your clients.
<p align="center"><img src="assets/analytics-dashboard.png" width="300" /></p>

## Techstack
1. React, Recharts, Material-UI and Axios.
2. Express (Node.js), Mongoose (MongoDB).