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
      "_id": "686c294c245d0bc9a35a045e",
      "name": "MoviesDB Web",
      "description": "Esse projeto é uma aplicação React JS que utiliza a API do TMDB, com o objetivo de ajudar o usuário a achar filmes e séries para assistir.",
      "technologies": ["React", "CSS3", "React Router"],
      "projectUrl": "https://gitlab.com/react7094344/MoviesDB",
      "imageUrl": "https://res.cloudinary.com/dgdcxlr00/image/upload/v1751918923/vufv2tjpehgyt7eonzij.png",
      "imagePublicId": "vufv2tjpehgyt7eonzij",
      "uploadedBy": "686bfa32db3d11d1fdea682c",
      "createdAt": "2025-07-07T20:08:44.342Z",
      "updatedAt": "2025-07-07T20:08:44.342Z",
      "__v": 0
    }
  ]
}
```

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---
