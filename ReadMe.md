// README.md
# Category Best Seller Discovery Tool

A tool for discovering best-selling products by category across different site keys.

## Features

- Select a site key to work with
- Filter categories by minimum product count
- View best-selling products within a category

## Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit, Apollo Client, Tailwind CSS
- **Backend**: Node.js, Express, Apollo Server, GraphQL

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- VS Code (recommended)

## Getting Started

### Setup Instructions

1. Clone the repository
2. Install dependencies with Yarn:

```bash
yarn install
```

3. Start the development server (both client and server):

```bash
yarn dev
```

The application will be available at:
- Frontend: http://localhost:5000
- GraphQL API: http://localhost:4000/graphql

## Project Structure

- `client/`: React frontend application
- `server/`: Node.js/Express backend with GraphQL API

## Available Scripts

- `yarn dev`: Start both client and server in development mode
- `yarn client`: Start only the client
- `yarn server`: Start only the server
- `yarn build`: Build both client and server for production
- `yarn start`: Start the production server