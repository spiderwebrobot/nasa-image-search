# React + TypeScript + Vite + TanStack Query + Material UI

## Instructions

Open up your terminal and run the following commands inside of the project’s root directory.

1. Install packages `npm install`
2. Create a local environment file `touch .env.local`
3. Edit the local environment file `echo "VITE_API_URL=https://images-api.nasa.gov" >> .env.local`
4. Run the development server `npm run start`

Open up your browser and visit http://localhost:5173/. When you are done reviewing, go back into your terminal and enter `control + c` to stop running the development server.

## Design decisions

I chose to work with the [NASA Image and Video Library](https://images.nasa.gov) API because the “search” endpoint offered plenty of opportunities for filtering and paginating data.

I started the project by making sure I was able to connect to the API. Once that was established, I copied the API response as a static JSON file, and then asked [GitHub Copilot](https://github.com/features/copilot)...

> Could you please help me write TypeScript interfaces for this JSON response?

Once I had the interfaces outlined I began building a functional UI in one component. As I progressed through the basic functionality, I began to break about the one component into subcomponents. Finally I worked on polishing up the UI with Material UI.

## Technologies

I was familiar with React, TypeScript, and Vite before this project. I had no prior experience with TanStack Query and Material UI.

## Assumptions

I assume that...

- You will be able to pull down [nasa-image-search](https://github.com/spiderwebrobot/nasa-image-search) from GitHub
- You have a terminal application and are comfortable with the command line

## Given more time

I would...

- Figure out how NOT to fetch data on initial page load
- Find an elegant solution for loading the overlay-images
- Explore the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- Write more functions for parsing the response data
- Include [Playwright](https://playwright.dev/) tests
- Test the accessibility of the modal-flow
- Look into auto-updating the search results per input change (instead of form submit)
