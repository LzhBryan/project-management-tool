# Core features

-   Todo
-   Favourite projects
-   Today
-   Upcoming
-   User profile page
    -   Upload user image
    -   Set theme color?
    -   Many other misc settings
-   Add notifications
-   Add inbox sections
-   Search bar command
-   Duplicate project
-   Drap & Drop task & Projects & Folders

# Features that can be added

-   Add folder for projects
-   Reminder
-   Board view
-   Calendar view
-   Global keyboard shortcuts

# Design

# Development

-   Sort import
-   Change typescript types to uppercase without I

### Frontend

-   Make project title editable when clicking on it
-   Do the same for task
-   Drawer component from ShadCN doesn't seem to be used, uninstall vaul in package.json as well

#### Long term

-   Deal with stale data, configure react query settings

### Backend

-   Revisit Swagger addBearer and addCookie auth
-   Revisit task type in dto class
-   Type all the function parameters
-   Write tests for authentication
-   Write tests for project service
-   Burn jest and setup Vitest

# Testing

### Integration tests

-   Login workflow
-   Register workflow
-   Switch theme

### E2E tests

# Refactoring

# Misc

-   Set up pre commit (husky)
-   Set up automatic linting
-   Set up github action to have CI/CD pipeline, to run linting, code formatting and testing before committing
