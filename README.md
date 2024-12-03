# Project README

This project is a Node.js application that provides a RESTful API for managing cars and filters. It uses Express.js as the web framework and supports CRUD operations for both cars and filters.

## Features

* Create, Read, Update, and Delete (CRUD) operations for cars
* CRUD operations for filters
* Support for CORS to enable cross-origin requests
* Error handling for 404 and other errors

## Technologies Used

* Node.js
* Express.js
* Docker

## Running the Application

To run the application, you can use Docker by executing the following command in the project directory:
```
docker-compose up
```
This will start the application on port 3000. You can then use a tool like Postman or cURL to interact with the API.

## API Endpoints

### Cars

* `POST /cars`: Create a new car
* `GET /cars/:id`: Get a car by ID
* `PUT /cars/:id`: Update a car
* `DELETE /cars/:id`: Delete a car
* `GET /cars`: Get all cars

### Filters

* `GET /filters`: Get all filters
* `DELETE /filters/:id`: Delete a filter

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
