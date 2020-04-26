# React - The Complete Guide - Notes

*Note: These notes are very much incomplete, as taking notes from Udemy courses are a habbit I picked up long after I started this course. Most notes are from section 15 and onwards*

## Routing:
1. npm install --save react-router-dom
2. Wrap every component you want to use routing in with BrowserRouter. Will most likely be done inn App or Index.

## Section 14: Redux

### 268 - Understanding State Types

 - When should Redux be used for state management?
 - We usually have three types of state:
	- Local UI State (Show/Hide backdrop) - (Mostly) Handled within the components
	- Persistent State (All users, all posts...) - Stored on server, relevant slices managed via Redux
	- Client State (Is Authenticated? Filters set?) - Managed via Redux

- In some cases, using Redux is overkill, and it is less used in smaller simple projects.

