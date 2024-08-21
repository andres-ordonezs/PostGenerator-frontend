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

# Usage

1. Open your browser and go to http://localhost:5174
2. Once the backend server is running, enter a prompt in the provided input field. The backend repository can be found here: https://github.com/andres-ordonezs/PostGenerator-backend
3. Submit the prompt to generate a blog post. The generated post will be displayed on the screen.

# Assumptions and Decisions made during development

1. Simplified Prompt Input: The user input is limited to a basic textarea for entering prompts. No additional features, such as fields for tone, style, or temperature adjustments, are included in this version.

2. Fixed Blog Titles: While the content of blog posts can be edited, the titles are currently fixed and cannot be modified. This functionality may be added in a future update.

3. No API Rate Limits: At this stage, there are no API rate limits enforced for generating content.

4. Limited Editing Features: Editing capabilities within the app are minimal but may be expanded in future versions.

5. No Confirmation for Post Deletion/Editing: The app does not currently include confirmation checks when users delete or edit a post. This feature could be implemented in a later iteration.
