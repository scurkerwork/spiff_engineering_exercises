# Spiff Engineering Candidate Coding Exercise Solution

## Setup and run

The exercise is implemented as a command line utility which is executed by node.js.

Install dependencies and run it in the following way:

```shell
npm i
npm start David 2022-01-01 2024-01-01
```

Where "David" is the name of the sales representative, followed by a start and end date to filter records with.

If you prefer to use Docker instead, use the following commands:

```shell
docker build -t spiff-test .
docker run spiff-test npm start David 2022-01-01 2024-01-01
```

## About Implementation

In a real project, such a task should be solved with a single SQL query,
because databases are highly optimized for filtering and aggregating data,
and it would be much simpler. But for an exercise, I used node.js and TypeScript to showcase my skills.

### Assumptions

Though it wasn't stated in the requirements,
I'm assuming the deal with `has_2x_multiplier: 1` should have a doubled commission.

From examples of output, I see that the program should return the amount with two digits after a dot.

### Structure

The project is structured in a modular way where different parts are decoupled from each other.

- `main.ts` is an entry point, it's only responsible for passing command line arguments into a controller and printing the result.
- `commisionCalculator` module covers the logic of the calculator itself, but it doesn't load nor filter deals and products on its own.
- `deals` module is responsible for loading and filtering deals records
- `products` module is responsible for loading and filtering products records

### File types

File names are suffixed with a file type to clarify and limit their responsibility.

- `controller` is responsible for validating parameters and formatting the result for the end user, the logic is delegated to a `service`.
- `service` is responsible for "busyness" logic
- `dto` (data transfer object) contains a schema of incoming data. It is used in the controller to validate arguments.
- `repo` (repository) - a layer responsible for data access.
  In this project, we load data directly from JSON files, but if we decide to use a real database instead we would only need to modify the `repo` layer, without touching any other code.
- `testFactory` contains object factories to use in tests.

### Tests

All modules are covered with tests.

While developing (with TDD), I'm launching tests in a watch mode for a specific file:

```shell
npm t commissionCalculator.controller
```

Use the `check` command to run all tests:

```shell
npm check
```
