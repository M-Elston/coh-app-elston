# COH-APP-ELSTON
> This Project is proprietary and not for public use.

---

## Overview
This is a full-stack web application built using **Next.js** and **MongoDB Atlas**.
It will allow users to create and manage posts through a custom API.

This project is for a course final and will evolve as it is being developed.

## Changelog

### [v0.1.0] 04/06/2026 - 04/08/2026
- Next.js initialized and cleaned.
- MongoDB Atlas setup (`/lib/mongodb.js`)
- Environment variables configured (`.env.local`).
- API route created: `/api/posts` (GET/POST ready).
- Frontend page created: `/create-post`.
- README formatted.

### In Progress...
- MongoDB Atlas connection.
- Defining **User** and **Post** data models.
- Connecting frontend form to API.

### Planned Features
- User authentication (login/signup).
- Post feed (view all posts).
- Edit and delete posts.
- UI/UX improvements.

---

## Tech Stack
- **Frontend:** Next.js (app router)
- **Backend:** Next.js API routes
- **Database:** MongoDB Atlas

---

## Project Structure
**/app**
- /api/posts/route.js
- /create-post/page.js

**/lib**
- mongodb.js

**/models *(planned)***
- User.js
- Post.js

**.env.local**

---

## API

### POST `/api/posts`
Create a new post.

```json
{
    "title": "Post title",
    "content": "Post content"
}
```
### GET `/api/posts`
Retrieve all posts.

---

## Screenshots *(coming soon)*
Images will be added as I complete frontend developement.

Planned screenshots:
- Homepage
- Post feed
- SignIn screen/field
- Create Post page

---

## Notes
I will update this README as I continue to develope and add new features.

---

## LICENSE
> This project is proprietary and not open for public use.  
See the LICENSE file for details.