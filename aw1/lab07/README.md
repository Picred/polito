# 01UDF/01TXY Web Applications I (2025/2026)

## Lab 5: Getting Started with React    

In this lab, you will begin developing the front end of your web-based Film Library using React. The design should adhere to the specifications outlined in Lab 4 (see the [lab04 folder](https://github.com/polito-webapp1/lab-2026/tree/main/lab04)). As part of this process, you will restructure the Film Library to leverage React's component-based approach. This involves breaking down the application into distinct components, identifying the necessary state and props for storing and displaying films, and implementing functionality to filter the displayed films. 

------------------------------------------------------------------------

## 1. Create and configure the React application

Create a new React app using Vite. Then, use the React-enabled version of Bootstrap and its components to structure the front end of your web-based Film Library. You can find the documentation at <https://react-bootstrap.github.io/>.

Organize the page using React functional components stored in different files. Your application, for example, might have distinct components to manage the navigation bar, the sidebar, and the list of films.

Finally, add a suitable set of props and states to each component. Similarly to Lab 5, states and props for visualizing films must be initialized using a proper JS data structure (i.e., an array of Films). To display the Film Library, decide which components hold the states, and how information propagates using props.

**Note:** for this exercise, don't make the page interactive yet. Things like the favorite checkbox won't do anything for now. Your focus is on designing and implementing the main components needed to display the layout from Lab 4 accurately.

---

## 2. Implement the filters

Create all the suitable functions to implement the filters described below. Only the films matching the specified filter criteria must be displayed when a filter is clicked. Specifically, filtering should not affect the state(s) used to store the films, but only their visualization. To implement the filtering, you must associate the items in the sidebar with the following actions:

- **All**: display all the films in the Film Library (default filter).
- **Favorite**: display only films marked as favorites.
- **Best Rated**: display only films whose score is five out of five.
- **Seen Last Month**: display only films watched between today and the last 30 days.
- **Unseen**: display only films without a watch date.

---

### Notes:

1. For handling dates and times, you can continue to use Day.js.
2. You can find useful icons on the Bootstrap Icons site: <https://icons.getbootstrap.com>



# Applicazioni Web I / Web Applications I [2025/2026]

## Lab 6: React Forms

In this lab, you will extend your React-based **FilmLibrary** by introducing form-based interactions. In particular, the application should allow users to add new films, edit existing ones, and validate the data entered through the form.

The implementation of the form is left to your choice. You may adopt either **controlled components** or **`useActionState`**, provided that the required behavior and validation mechanisms are correctly implemented.

## 1. Add a New Film

Update the application so that users can dynamically insert a new film. When the user clicks the `+` button, a form should appear below the list of films, and the `+` button should no longer be visible while the form is displayed. The form must allow the user to specify all the properties of a film.

The form must include at least basic validation. In particular, required fields must be enforced, the title must not be empty, and the rating must be limited to the range from `0` to `5`, inclusive.

Once the form is submitted successfully, the newly created film must be added to the application state. If the new film satisfies the currently active filter, it must immediately appear in the displayed list without requiring any further user interaction.

## 2. Edit an Existing Film

The application must also support the editing of films already present in the library. When the user clicks the edit icon associated with a film entry, a form for editing the selected film should be displayed populated with the current values of the selected film.. This functionality can be implemented by reusing the form developed for film creation, suitably adapted where necessary.


After the form is submitted successfully, the corresponding film in the application state must be updated. As in the previous case, if the modified film satisfies the active filter, the updated version must immediately appear in the displayed list.

## 3. Optional: Additional Validation

As an optional extension, the form may include more complete validation beyond the basic checks. If validation fails, the submission should be cancelled, clear error messages should be displayed, and invalid fields should be visually highlighted.

This validation should be applied consistently to both the creation and editing workflows. Suggested additional checks include verifying that the title is not composed only of whitespace characters and that the date is not set in the future.

## Notes

You can find the edit icon, together with other useful icons, on the Bootstrap Icons website: `https://icons.getbootstrap.com`

If needed, you may use the Lab 6 solution as a starting point: `https://github.com/polito-webapp1/lab-2026/tree/main/lab06`