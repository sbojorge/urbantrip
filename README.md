# Urbantrip

## Project goal

This is a social media for city trip lovers.
![responsive](/readme/images/UI/picture_1.png)

Please visit the [Urbantrip](https://urbantrip-a9f84fe92f01.herokuapp.com/) deployed site.

## Project management

The project was developed using the Kanban Agile management methodology and the MoSCoW prioritisation technique.

It was put in place using different functionalities in GitHub: 
* Issues, for EPICS and user stories;

An epic covers the development of an existing feature in the API.

User stories were linked to the epic to keep track of the progress with the tasks.

In order to better organise the flow of the work to do, I also created an epic for the set up and final deployment of the project.

* Milestone (without due date), for the product backlog;

Ready-for-development epics were stored in the product backlog before starting a sprint.

* Milestone (WITH due date), for each iteration;

I worked 1 epic x sprint.
User stories that couldn't be completed were placed back in the product backlog and on "No status" category of the project for eventually being included in a next sprint.

* Project, for the Kanban board.

Both the Urban-drf and  Urbantrip repositories were linked to the same project, Urbantrip-PP5.

Labels were used to identify epics and user stories of each repo.

Epics were assigned to the "To-do" status and move to "In progress" or "Done" status as the tasks in the user stories were completed.

<!-- add epic and user stories here following the same schema as urbandrf as possible -->

[Back to top](#urbantrip)

---

## Design
### Database structure <!-- if applicable -->
<!--example: 
The database is composed of 3 models (2 are customised, which meets the assessment criteria of a "minimum of one custom model"): 

- User,
- Grocery_list,
- Contact.

The User model is at center, being connected to the 2 others by the id.<br>
There isn't any direct relation between the Grocery_list and Contact models. -->
### Wireframes
Wireframes are created for sketching the UI ideas.<br> The final project may be slightly different. The wireframes of this project are:
- Landing web page

    ![landing-web](/readme/images/mockups/picture_1.png)
- Landing mobile app

    ![landing-mob](/readme/images/mockups/picture_2.png)
- Home web page

    ![home-web](/readme/images/mockups/picture_3.png)
- Home mobile app

    ![home-mob](/readme/images/mockups/picture_4.png)
- Create web page

    ![create-web](/readme/images/mockups/picture_5.png)
- Create mobile app

    ![create-mob](/readme/images/mockups/picture_6.png)
- Contact web page

    ![contact-web](/readme/images/mockups/picture_7.png)
- Contact mobile app

    ![contact-mob](/readme/images/mockups/picture_8.png)

### Typography
The font combination for the project was chosen in this blog article: https://connectivewebdesign.com/blog/best-google-font-combinations

![typography](/readme/images/UI/picture_2.png)

This combination goes well with the intrinsic modern look of this project as well with photographies which are at the heart of this web application.

### Colours
The colour palette was chosen for its contemporanean style.<br>
The palette was created using the [Canva’s color palette generator](https://www.canva.com/colors/color-palette-generator/) and one of the avatars from the [undrawn illustrations collection](https://iconduck.com/sets/undraw-illustrations) at [iconduck](https://iconduck.com/).<br>
Canva used the hues in the avatar to create the palette.

![colours](/readme/images/UI/picture_3.png)

### Features
<!--Review the features per page and CRUD when applicable -->
### Features to be implemented

[Back to top](#urbantrip)

---

## Technologies used

The application was developed using React and the code was written using the JSX syntax.

Below you can find the list of the libraries used for the development of this project:

 * [React-Bootstrap](https://react-bootstrap.netlify.app/), for styling support.
 * [React-Router](https://reactrouter.com/), for enabling "client side routing".
 * [axios](https://axios-http.com/),for fetching and posting data in the Urban-drf backend API. 
 * [React infinite scroll](https://www.npmjs.com/package/react-infinite-scroll-component), for loading post automatically as the user scrolls down.
 * [jwt-decode](https://www.npmjs.com/package/jwt-decode), for decoding JWTs token.
 * [Favicon.io](https://favicon.io/), for generating the favicon of the project.
 * [Canvas](https://www.canva.com/), for designing the logo and creating the color palette.
 * [Balsamiq Wireframes for Desktop](https://balsamiq.com/wireframes/desktop/), for creating the mockups.

 ---
 
 ## Testing

 Follow this link for the documentation related to [tests](/TESTING.md)

## Control version

The site was created using GitPod as editor and pushed to Github to the remote repository urbantrip.

### Early deployement
The web site was early deployed at the beginning of the development following these steps:
#### Repository and workspace
1. Create an empty repository (with no template) in GitHub and name it using lowercase letters as this is required for React apps.
2. In the repository, click the "GitPod" button to create a new workspace.
3. In the workspace, create a React app using the command npx create-react-app with a space and full stop at the end as shown: 
**npx create-react-app .**
This will ensure to create the app in the root directory.
4. Run the command **npm start** to check that the app is working.
5. Commit and push the code to GitHub.
#### Heroku app
1. In your Heroku dashboard, click on the "New" button in order to create a new app.
2. Name your app and select a region according to your location place.
3. Click on the "Create app" button.
4. In your newly created Heroku app, click on the "Deploy" tab.
5. Between the deployment methods, click on "GitHub", enter the name of your repository<br>
If found, a link to the repository will be displayed.
Click the "Connect" button.
6. For automatic deployments after each push to GitHub, scroll down the page and click on the "Enable automatic deploys" button.
7. To finish, click on the "Deploy branch" button.<br>

The app was successfully deploy at first attempt.

#### Connect the backend API with the React application
The Urbandrf backend API should accept requests from the Urbantrip application.
In order to achieve that the following steps were taken:
1. In the urbandrf app on Heroku, click on the "Settings" tab and scroll down to the Config Vars section.
2. Click on "Reveal Config Vars" and create two variables: CLIENT_ORIGIN and CLIENT_ORIGIN_DEV.
3. Assign values for each variable as:
	- CLIENT_ORIGIN: the Heroku app url of the React app;
    - CLIENT_ORIGIN_DEV: the GitPod url of the React app;

![configvars](/readme/images/deployment/picture_1.png)

4. In order for React to send requests to the API, install the axios library.
5. In the src folder, create the api folder and then an axiosDefaults.js file inside it.
6. Import axios at the top of the file.
7. Define the baseURL, which will be the url of the urbandrf API.
8. Set the content-type header to multipart/form-data as the application will be dealing with  images as well as text in its requests. 
9. Set withCredentials to true for avoiding any CORS errors when sending cookies.

![axios](/readme/images/deployment/picture_2.png)

10. Finally, export the axiosDefaults.js file to the App.js component.<br>


The backend, urbandrf, and the frontend, urbantrip, got connected since the first attempt.

### Final deployment
These are the steps to follow for the final deployment of the application:
1. In index.js, remove the <React.StrictMode> component as this is only need during development.<br>
IMPORTANT: Keep the comma after the </Router>:
![strictmode](/readme/images/deployment/picture_3.png)
2. In package.json, in the scripts section, add this command: **heroku-prebuild: npm install -g serve**.
3. Create a Procfile on the root directory and add the web command: **web: serve -s build**
4. Save all changes and push your code to GitHub.
5. In Heroku, as the automatic deploys were enabled during the early deployment, check that the app has been deployed.
6. Click on the "Open app" button.<br>

The application was succesfully deployed at first attempt. 

### Forking

Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point for your own idea.

- Navigate to the GitHub Repository you want to fork.

- On the top right of the page under the header, click the fork button.

- This will create a duplicate of the full project in your GitHub Repository.

### Cloning

Cloning is used to create a local copy of the repository created in GitHub.
Both, the local copy and the remote are syncronized.

- Navigate to the GitHub Repository you want to clone.

- Above the list of files, click Code.

There are 3 possibilities for copying the URL of the repository: HTTPS, SSH key and GitHub CLI.
I'll develop the one that I use.

- Click the HTTPS tab and copy the URL.

- On your machine, open your text editor, go to the Command palette and click on Git Clone.

- Past the URL, hit enter and choose a folder to save the repository.   

---
   
[Back to top](#urbantrip)

## Credits
### Code
- My mentor helped me to refine the code for the contact form.
- Code for hiding the nav bar in the Sign up and Sign in pages was inspired from this article: https://stackoverflow.com/questions/74277306/show-hide-navbar-or-footer-in-routes-with-react-router-dom-v6

- Upload video inspired on: https://www.upbeatcode.com/react/how-to-play-video-in-react/

### Media
- Icons come from [uxwing](https://uxwing.com/)
- Images come from [rawpixel](https://www.rawpixel.com/)

[Back to top](#urbantrip)