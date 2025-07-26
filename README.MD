# 💼 Portfolio Backend API

This is the backend service powering my personal portfolio. It manages projects and integrates with Cloudinary for image hosting. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, this RESTful API is deployed and publicly accessible.

---

## 🚀 Live API

👉 [https://my-portfolio-backend-ukfv.onrender.com/](https://my-portfolio-backend-ukfv.onrender.com/)

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – Web framework for Node.js
- **TypeScript** – Typed superset of JavaScript
- **MongoDB** – NoSQL database
- **Cloudinary** – Cloud-based image hosting

---

## 📸 Media Hosting

Project images are uploaded and hosted using **Cloudinary**, providing fast and reliable delivery.

---

## 📂 API Routes

### 🔓 Public Endpoints

#### `GET /api/admin/projects`

Returns a list of projects with support for filtering, sorting, and pagination.

##### 🔍 Query Parameters (all optional)

| Parameter     | Type            | Description                                                    |
| ------------- | --------------- | -------------------------------------------------------------- |
| `sortBy`      | `string`        | Field to sort by (e.g. `title`, `createdAt`)                   |
| `sortByOrder` | `asc` or `desc` | Sort direction: ascending (`asc`) or descending (`desc`)       |
| `page`        | `number`        | Current page (defaults to 1)                                   |
| `limit`       | `number`        | Number of items per page (defaults to 10)                      |
| `techs`       | `string`        | Comma-separated list of technologies (e.g. `React,TypeScript`) |

##### 🧪 Example

`GET /api/admin/projects?sortBy=createdAt&sortByOrder=desc&page=1&limit=5&techs=React,TypeScript`

```json
{
  "success": true,
  "message": "Successfully fetched user projects.",
  "currentPage": 1,
  "totalPages": 1,
  "totalProjects": 1,
  "data": [
    {
      "_id": "6883e139093bf0962222ea02",
      "name": "MoviesDB Mobile",
      "description": "A mobile app for finding recommendations for movies and TV shows to watch, built with React Native, JavaScript, and CSS3. It uses the TMDB API for movies and series.",
      "technologies": ["React Native", "JavaScript", "CSS"],
      "projectUrl": "https://gitlab.com/react7094344/moviesdb_reactnative#",
      "imageUrl": "https://res.cloudinary.com/dgdcxlr00/image/upload/v1753473337/ve873q2ltqxcic5rv5yp.png",
      "imagePublicId": "ve873q2ltqxcic5rv5yp",
      "uploadedBy": "6883c8cc6f4a61c49815ea4e",
      "createdAt": "2025-07-25T19:55:37.684Z",
      "updatedAt": "2025-07-25T19:55:37.684Z",
      "__v": 0
    }
  ]
}
```

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---
