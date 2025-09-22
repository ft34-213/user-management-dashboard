**# **User Management Dashboard****

I have implemented the React-based User Management Dashboard with features like Add/Edit/Delete users, inline editing, search, filter, sorting, pagination, and responsive design.

## Features

Add new users dynamically

Inline edit and delete users

Search by name or email

Filter by first name, last name, email, and department

Sort by ID, Name, Email, or Department

Pagination and rows-per-page selection

Responsive table with mobile-friendly layout

Highlight editing row

## Setup Instructions

Clone the repository:

git clone <your-repo-url>
cd user-management-dashboard


Install dependencies:

npm install


Run the project:

npm start


Open in browser:
Visit http://localhost:3000

## Development Challenges

Handling inline edit while keeping table rows responsive and maintaining state consistency.

Implementing sorting, filtering, and pagination together without breaking performance.

Keeping the Add User form below the buttons and managing form visibility correctly.

Managing unique IDs dynamically for newly added users to ensure ascending order.

## Improvements for Future Development

Implement debounce on search and filter inputs to reduce excessive re-renders and API calls.

Throttle scroll or scroll-based events if infinite scrolling is used.

Infinite Scrolling

Instead of classic pagination, implement infinite scrolling for smoother UX.

Convert the project from JavaScript to TypeScript for type safety and better maintainability. Coming days i will learn typescript and will use it in implementation.

Instead of fetching all users at once, implement API-side pagination.

Fetch 10-20 users per request to avoid memory overload and improve performance.

## Notes

All CRUD operations are client-side only for this version.

User IDs are dynamically generated to maintain ascending order even after deletions.

Sorting, search, and filter work in combination with pagination.