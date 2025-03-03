![Cypress Tests](https://github.com/lucastashan/improved-focus/actions/workflows/cypress.yml/badge.svg)
![Deployment Status](https://img.shields.io/github/deployments/lucastashan/improved-focus/production)

# Improved focus App

## Description
Repository for the improved focus app source code, developed as the final work of "Desenvolvimento Full Stack" postgradutate at PUCRS.

## 🛠 System requirements
- Git
- Node.js 18.18 or later

## ⚙️ Installation
- Open a terminal or git bash, if Windows, to clone the repo, and run:
```
git clone https://github.com/lucastashan/improved-focus.git
cd improved-focus
```
- Create a .env file, with the database config variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
- And finally, run the project:
```
npm i
npm run dev
```

## 🧪 Running Tests

- To open the cypress interface: 
```bash 
npm run cypress:open
```

- To run all the test in command line: 
```bash
npm run cypress:run
```
