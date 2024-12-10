# KB-E2E-TESTS
UI tests to verify trello board feature

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Directory Structure](#directory-structure)

## Introduction
This project is a testing framework built using [Playwright](https://playwright.dev/) for UI E2E (E2E) testing & API testing. 

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- Docker (if using Docker to run tests)
- Git 
- VS code

## Installation
### Cloning the Repository
1. Clone this repository to your local machine:
    ```
    https://github.com/rohithravi08/KB-E2E-TESTS.git
    ```

2. Navigate to the root folder and execute:
    ```
    npm ci
    npx playwright install --with-deps
    ```
    Then follow the default steps


## Running Tests
### Running Tests Locally

To execute the tests, pass the following environment variables:

- `NODE_ENV`: Set to `production` or `stage` to execute the tests against the desired environment. Currently it     will work only against production env as the application test env details are not available. 
- `USERNAME`: Set to username email
- `PASSWORD`: Set password

```
#Execute all the test locally in GUI mode against chromium browser
npx cross-env NODE_ENV="production" USERNAME="xxxx" PASSWORD="xxxx" playwright test --ui --project=chromium

#Execute all the test locally against chromium browser in headed mode
npx cross-env NODE_ENV="production" USERNAME="xxxx" PASSWORD="xxxx" playwright test --project=chromium --headed

#Execute all the test locally in GUI mode against chromium browser in headed mode with tags
npx cross-env NODE_ENV="production" USERNAME="xxxx" PASSWORD="xxxx" playwright test --ui --project=chromium --grep "@regression"

```
### Running Tests in Docker

```
npx cross-env NODE_ENV="production" USERNAME="xxxx" PASSWORD="xxxx" docker-compose up --build 
```
## Test Reporting

After each test run, an HTML report is generated to provide detailed insights into the execution results. The HTML report includes the following key information:

- **Test Results**: Displays the status of each test (Pass/Fail) along with the duration.
- **Error Details**: If a test fails, the report includes detailed logs, screenshots, and videos for easy debugging.
- **Traceability**: Links to specific test cases and steps, making it easier to identify issues.
- **Browser Logs**: Includes network requests, console logs, and browser events captured during test execution.

### How to View the Report

After running the tests, you can find the HTML report in the `playwright-report` directory (or another location as configured). Simply open the `index.html` file in your browser to view the detailed test results.

## Directory Structure
```
KB-E2E-Automation/
├── config                  # base URL and userdata for a specific environment
├── page-objects            # methods and locator for the specif pages
├── tests\UI                # Test files for UI
│   └── createBoard.spec.ts
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker compose config
├── playwright.config.js    # Playwright configuration
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation

```


