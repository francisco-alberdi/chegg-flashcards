# Project: Flashcard-o-matic

This is the capstone project for the Chegg Skills Frontend Web Development Course. Please refer to the [requirements markdown file](REQUIREMENTS.md) that contains the instructions provided by Cehegg Skills with the requirements for the project.

## Prerequisites

Make sure you have the following versions installed:

- Node.js: `>= v18.20.8`
- npm: `>= v10.8.2`

## Installation

1. Clone the repository:

2. Use the correct Node.js version:

   ```bash
   nvm use 18.20.8
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development servers.

   The start command will start two servers concurrently:
   - An API server, powered by json-server, running on http://localhost:5000
   - A React application running on http://localhost:3000

   To stop the servers from running, you can press Control+C.:

   ```bash
   npm start
   ```

5. To run the tests, you can run the following command:

   ```
   npm test
   ```

## Whammy Log

### Challenge 1: Home Page State Not Updating After Deck Deletion

Clicking the delete button successfully removed a deck from the JSON server API, but the deleted deck remained visible on the home screen until the entire page was manually refreshed. This occured because the DeleteDeckButton child component was calling the onDeleteDeck() without passing the deckId as an argument. To fix this, I updated DeleteDeckButton to pass deckId back up. This allowed the pagw to correctly identify the deleted deck's ID and filter it out of state, updating the UI without a browser refresh.

### Challenge 2: Bootstrap Layout Alignment and Styling Requirements

Matching the visual layout requirements for the entire site across various screens (like the Deck view and Study screen) was a headache... My lack of familiarity with Bootstrap made it hard to understand how to nest standard Bootstrap classes and display the elements correctly. I spent a significant amount of time studying the official Bootstrap documentation online to learn how layout classes work, and even then it is not perfect.

### Post-Submission Reflection

1. Problem-Solving Approach:
   1. When building this project, I built the application page-by-page, following the requirements doc line by line to ensure I was meeting all the requirements. I started with routing and followed that with a page at a time. My commit history shows this. I tested each page before commiting to ensure that ecerything worked correctly.

3. Key Technical Decision
   1. Resuing components the delete button and keepoing components small(ish). This helped me not get overwhelmed by the magnitude of the project.

4. AI Use Disclosure
   1. I did not use any AI tools.

5. Area for Future Growth
   1. I wish we could further learn about custom React hooks and advanced asynchronous state management.
