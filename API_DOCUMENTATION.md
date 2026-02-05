# API Documentation

Complete API reference for the College Event Management System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "count": 10  // (for list endpoints)
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Access:** Public

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@college.edu",
  "password": "password123",
  "role": "student",
  "phone": "9876543210",
  "department": "Computer Science",
  "year": 3,
  "rollNumber": "CS2021001"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@college.edu",
    "role": "student",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
**POST** `/auth/login`

**Access:** Public

**Body:**
```json
{
  "email": "john@college.edu",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@college.edu",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User
**GET** `/auth/me`

**Access:** Private (any authenticated user)

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@college.edu",
    "role": "student",
    "managedClub": {...}
  }
}
```

### Update Profile
**PUT** `/auth/profile`

**Access:** Private (any authenticated user)

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543211",
  "department": "Information Technology",
  "year": 4,
  "rollNumber": "CS2021001"
}
```

---

## User Management Endpoints

### Get All Users
**GET** `/users`

**Access:** Admin only

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@college.edu",
      "role": "student",
      ...
    }
  ]
}
```

### Get Single User
**GET** `/users/:id`

**Access:** Admin only

### Update User
**PUT** `/users/:id`

**Access:** Admin only

**Body:** (any user fields to update)

### Delete User
**DELETE** `/users/:id`

**Access:** Admin only

### Get All Coordinators
**GET** `/users/coordinators`

**Access:** Admin only

---

## Club Endpoints

### Get All Clubs
**GET** `/clubs`

**Access:** Public

**Query Parameters:**
- `isApproved` - Filter by approval status (true/false)
- `isActive` - Filter by active status (true/false)

**Example:** `/clubs?isApproved=true`

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "name": "Code Masters Club",
      "description": "...",
      "category": "Technical",
      "coordinator": {
        "name": "John Doe",
        "email": "john@college.edu"
      },
      "isApproved": true,
      "isActive": true
    }
  ]
}
```

### Get Single Club
**GET** `/clubs/:id`

**Access:** Public

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Code Masters Club",
    "description": "...",
    "category": "Technical",
    "coordinator": {...},
    "members": [...],
    "contactEmail": "codemasters@college.edu"
  }
}
```

### Create Club
**POST** `/clubs`

**Access:** Coordinator or Admin

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "New Tech Club",
  "description": "A club for technology enthusiasts",
  "category": "Technical",
  "contactEmail": "newtech@college.edu",
  "logo": "url_to_logo"
}
```

**Categories:** Technical, Cultural, Sports, Social Service, Arts, Literary, Other

### Update Club
**PUT** `/clubs/:id`

**Access:** Coordinator (own club) or Admin

**Headers:** `Authorization: Bearer <token>`

**Body:** (any club fields to update)

### Delete Club
**DELETE** `/clubs/:id`

**Access:** Admin only

### Approve Club
**PUT** `/clubs/:id/approve`

**Access:** Admin only

**Headers:** `Authorization: Bearer <admin_token>`

### Reject Club
**PUT** `/clubs/:id/reject`

**Access:** Admin only

---

## Event Endpoints

### Get All Events
**GET** `/events`

**Access:** Public

**Query Parameters:**
- `isApproved` - Filter by approval status
- `isActive` - Filter by active status
- `club` - Filter by club ID
- `category` - Filter by category

**Example:** `/events?isApproved=true&category=Workshop`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "Hackathon 2026",
      "description": "...",
      "club": {
        "name": "Code Masters Club",
        "category": "Technical"
      },
      "eventDate": "2026-02-15T00:00:00.000Z",
      "eventTime": "9:00 AM",
      "venue": "Auditorium A",
      "category": "Hackathon",
      "maxParticipants": 100,
      "registrationDeadline": "2026-02-10T00:00:00.000Z",
      "isApproved": true
    }
  ]
}
```

### Get Single Event
**GET** `/events/:id`

**Access:** Public

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Hackathon 2026",
    "description": "...",
    "club": {...},
    "eventDate": "2026-02-15",
    "eventTime": "9:00 AM",
    "venue": "Auditorium A",
    "category": "Hackathon",
    "maxParticipants": 100,
    "registrationDeadline": "2026-02-10",
    "requirements": "Laptop, charger",
    "createdBy": {...},
    "isApproved": true
  }
}
```

### Create Event
**POST** `/events`

**Access:** Coordinator or Admin

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "AI Workshop",
  "description": "Learn about Artificial Intelligence",
  "club": "club_id_here",
  "eventDate": "2026-03-15",
  "eventTime": "2:00 PM",
  "venue": "Lab 201",
  "category": "Workshop",
  "maxParticipants": 50,
  "registrationDeadline": "2026-03-10",
  "requirements": "Basic programming knowledge"
}
```

**Event Categories:** Workshop, Seminar, Competition, Cultural, Sports, Hackathon, Conference, Exhibition, Other

### Update Event
**PUT** `/events/:id`

**Access:** Coordinator (own event) or Admin

**Headers:** `Authorization: Bearer <token>`

**Body:** (any event fields to update)

### Delete Event
**DELETE** `/events/:id`

**Access:** Coordinator (own event) or Admin

### Approve Event
**PUT** `/events/:id/approve`

**Access:** Admin only

**Headers:** `Authorization: Bearer <admin_token>`

### Reject Event
**PUT** `/events/:id/reject`

**Access:** Admin only

---

## Registration Endpoints

### Get All Registrations
**GET** `/registrations`

**Access:** Admin only

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `event` - Filter by event ID
- `student` - Filter by student ID
- `status` - Filter by status

**Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "_id": "...",
      "event": {
        "title": "Hackathon 2026",
        "eventDate": "...",
        "venue": "..."
      },
      "student": {
        "name": "Alice Johnson",
        "email": "alice@college.edu",
        "department": "Computer Science"
      },
      "status": "confirmed",
      "registrationDate": "..."
    }
  ]
}
```

### Get Single Registration
**GET** `/registrations/:id`

**Access:** Private (authenticated users)

### Register for Event
**POST** `/registrations`

**Access:** Student only

**Headers:** `Authorization: Bearer <student_token>`

**Body:**
```json
{
  "event": "event_id_here",
  "comments": "Looking forward to participating!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "event": {...},
    "student": {...},
    "status": "confirmed",
    "registrationDate": "..."
  }
}
```

### Get My Registrations
**GET** `/registrations/my-registrations`

**Access:** Student only

**Headers:** `Authorization: Bearer <student_token>`

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "event": {...},
      "status": "confirmed",
      "registrationDate": "..."
    }
  ]
}
```

### Get My Event Registrations (Coordinator)
**GET** `/registrations/my-events`

**Access:** Coordinator only

**Headers:** `Authorization: Bearer <coordinator_token>`

**Response:** List of registrations for coordinator's events

### Update Registration Status
**PUT** `/registrations/:id`

**Access:** Coordinator or Admin

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "attended"
}
```

**Status values:** pending, confirmed, cancelled, attended

### Cancel Registration
**DELETE** `/registrations/:id`

**Access:** Student (own registration)

**Headers:** `Authorization: Bearer <student_token>`

---

## Error Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request / Validation error |
| 401 | Unauthorized / Invalid token |
| 403 | Forbidden / Insufficient permissions |
| 404 | Resource not found |
| 500 | Server error |

---

## Example API Calls

### Using cURL

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@college.edu",
    "password": "password123",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@college.edu",
    "password": "admin123"
  }'

# Get events (with token)
curl -X GET http://localhost:5000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

// Login
const response = await axios.post('http://localhost:5000/api/auth/login', {
  email: 'admin@college.edu',
  password: 'admin123'
});

const token = response.data.token;

// Get events with authentication
const events = await axios.get('http://localhost:5000/api/events', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding rate limiting middleware.

## Pagination

Currently, all list endpoints return complete results. For production with large datasets, implement pagination:

```
GET /events?page=1&limit=10
```

## Filtering & Sorting

Most list endpoints support basic filtering via query parameters. Sorting can be added:

```
GET /events?sort=-eventDate  // Sort by date descending
GET /events?sort=title       // Sort by title ascending
```

---

## Testing the API

### Using Postman

1. Import this collection structure
2. Create environment variables:
   - `baseUrl`: http://localhost:5000/api
   - `token`: (will be set after login)
3. Test each endpoint

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method, URL, headers, and body
4. Send request

---

**Note:** This API follows REST principles and returns JSON responses. All timestamps are in ISO 8601 format.
