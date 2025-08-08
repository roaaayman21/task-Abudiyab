# 🎯 User Dashboard

A clean and modern user management dashboard that actually works well. Built with Angular 18 and designed to be fast, responsive, and easy to use.

## What it does

This is a simple user dashboard where you can:

- Browse through users in a nice grid layout
- Search for people by name or ID
- Click on anyone to see their full profile
- Everything loads quickly and looks good on any device

## Getting started

You'll need Node.js installed (version 18 or newer works best).

```bash
# Get the code
git clone https://github.com/roaaayman21/task-Abudiyab.git
cd dashboard

# Install everything
npm install

# Start it up
npm start
```

Then open http://localhost:4200 and you're good to go!

## How to use it

**Main page**: Shows all users in cards. Just scroll through or use the search bar up top.

**Search**: Type someone's name or their ID number. Results show up as you type.

**User details**: Click any user card to see their full info - email, phone, address, etc.

**Navigation**: Use the back button or click the logo to get back to the main list.

## What's under the hood

- **Angular 18** - The main framework
- **NgRx** - Keeps track of all the data
- **Angular Material** - Makes everything look nice
- **TypeScript** - Helps catch bugs before they happen
- **SCSS** - Custom styling that's easy to change

## Development stuff

```bash
# Run the dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Generate new components
ng generate component my-component
```

## Project structure

```
src/app/
├── components/     # All the UI pieces
├── services/       # Talks to the API
├── store/          # NgRx state management
├── directives/     # Custom behaviors
└── animations/     # Smooth transitions
```

The code is organized so it's easy to find what you're looking for. Each folder has a specific job and the files are named clearly.

## API

Uses the DummyJSON API (https://dummyjson.com) for user data. It's free and doesn't need any setup - just works out of the box.

## Deployment

### GitHub Pages (Automatic)

This project is set up for automatic deployment to GitHub Pages. When you push to the main branch, GitHub Actions will automatically build and deploy the app.

### Manual Deployment

To create a production build for manual deployment:

```bash
# Build for production
npm run build

# The built files will be in dist/angular-quiz/browser/
# You can serve these files with any static web server
```

## Recent Updates

- ✅ Simplified search to work only with user IDs (no search button needed)
- ✅ Added global loading bar that appears during network requests
- ✅ Simplified highlight directive to use only essential hover effects
- ✅ Set up GitHub Pages deployment with GitHub Actions
