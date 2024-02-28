# Food Tracker

## Description

A meal planning and calorie counting web application.

The backend of this project is located [here](https://github.com/earacena/food-tracker-backend.git).

### Features

- Dashboard
  - Calorie goal
  - Daily food activity
- Food items
  - Add food items
  - Delete food items
- Meals
  - Add and remove food items from meal groups
- Activities
  - Add activities
  - Delete activities
  - Activity Calendar for view past food activity

### Technologies

- Typescript
- React
- TailwindCSS
- Shadcn/ui components

## Usage

### Download

First, clone the repository:

```bash
git clone https://github.com/earacena/food-tracker.git
```

### Install dependencies

Inside the project folder, install the project dependencies using npm:

```bash
npm install
```

### Setup environment

The project uses Firebase for authentication, therefore a .env file with the following environment variables must be provided in the root folder:

```text
VITE_FIREBASE_API_KEY= ...
VITE_FIREBASE_AUTH_DOMAIN= ...
VITE_FIREBASE_PROJECT_ID= ...
VITE_FIREBASE_STORAGE_BUCKET= ...
VITE_FIREBASE_MESSAGING_SENDER_ID= ...
VITE_FIREBASE_APP_ID= ...

```

To test the frontend and backend together, an environment variable with the development [backend](https://github.com/earacena/food-tracker-backend.git) URL must be provided as well:

```text
VITE_DEV_BACKEND_URL= ...
```

### Deploy locally

Run the project locally:

```bash
npm run dev

```
