# Post Generator - Frontend

by: Andres Ordonez
Demo video: https://www.loom.com/share/6b119327557e458cb43e60ff645174bc?sid=e46ccd1c-bd6f-4f02-86a3-e015f13861c8

To run the frontend locally:

1. Clone the Repository

   Open a new terminal window and navigate to the frontend folder. Clone the project repository to your local machine:

```
git clone <repository-url>
cd <repository-folder>
```

2. Install Dependencies

   Make sure you have Node.js and npm installed on your machine. If not, you can download them from nodejs.org.

Install the required npm packages by running:

```
npm install
```

3. Run the Application

   Start the application using npm:

```
npm run dev
```

The frontend should now be running on port 5174. Open your browser and navigate to http://localhost:5174 to access the application.

#Usage

1. Open your browser and go to http://localhost:5174 .
2. Once the backend server is running, enter a prompt in the provided input field.
3. Submit the prompt to generate a blog post. The generated post will be displayed on the screen.

# Assumptions and Decisions made during development

1. The user’s prompt uses a simple textarea and no other features are included to further specify the prompt (e.g. fields for tone, style, temperature, etc. )

2. Although blog posts’ content can be edited, the blogs’ titles cannot be modified at this time. This feature can be developed in a future iteration.

3. We are not setting API rate limits at this point

4. Editing options are limited, but could be expanded on a future version of the app
