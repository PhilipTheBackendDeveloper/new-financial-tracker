# Finance Tracker Backend

A Flask-based REST API backend for the Finance Tracker web application, built for IB Computer Science Internal Assessment.

## Features

- 🔐 **Firebase Authentication** - Secure token-based authentication
- 💾 **Firestore Database** - Cloud-based NoSQL database
- 📊 **Expense Management** - CRUD operations for expenses
- 💰 **Budget Management** - Set and manage monthly budgets
- 📈 **Analytics** - Financial summaries and reports
- 🔒 **Protected Routes** - Middleware-based authentication
- 🌐 **CORS Support** - Frontend integration ready

## Tech Stack

- **Backend**: Python Flask
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **CORS**: Flask-CORS

## Project Structure

\`\`\`
backend/
├── app.py                 # Main Flask application
├── serviceAccountKey.json # Firebase service account (you provide)
├── requirements.txt       # Python dependencies
└── README.md             # This file
\`\`\`

## Setup Instructions

### 1. Prerequisites

- Python 3.8 or higher
- Firebase project with Firestore enabled
- Firebase service account key

### 2. Installation

1. **Clone and navigate to backend directory**:
   \`\`\`bash
   cd backend
   \`\`\`

2. **Create virtual environment** (recommended):
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install dependencies**:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

### 3. Firebase Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)

2. **Generate Service Account Key**:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Rename it to `serviceAccountKey.json`
   - Place it in the `backend/` directory

3. **Firestore Security Rules** (optional for development):
   \`\`\`javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   \`\`\`

### 4. Run the Application

\`\`\`bash
python app.py
\`\`\`

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication
All endpoints (except `/health`) require Firebase ID token in Authorization header:
\`\`\`
Authorization: Bearer <firebase_id_token>
\`\`\`

### Health Check
- `GET /health` - Server health status

### Expense Management
- `GET /api/users/<user_id>/expenses?month=YYYY-MM` - Get expenses
- `POST /api/users/<user_id>/expenses` - Add expense
- `PUT /api/users/<user_id>/expenses/<expense_id>` - Update expense
- `DELETE /api/users/<user_id>/expenses/<expense_id>` - Delete expense

### Budget Management
- `GET /api/users/<user_id>/budgets?month=YYYY-MM` - Get budgets
- `POST /api/users/<user_id>/budgets` - Set/update budget
- `DELETE /api/users/<user_id>/budgets/<budget_id>` - Delete budget

### Analytics
- `GET /api/summary/<user_id>/<month>` - Financial summary
- `GET /api/report/<user_id>/<month>` - Detailed report

## Data Models

### Expense Document
\`\`\`json
{
  "amount": 25.50,
  "category": "Food & Dining",
  "date": "2024-01-15T00:00:00Z",
  "note": "Lunch at restaurant",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
\`\`\`

### Budget Document
\`\`\`json
{
  "amount": 500.00,
  "month": "2024-01",
  "category": "Food & Dining",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
\`\`\`

## Example Requests

### Add Expense
\`\`\`bash
curl -X POST http://localhost:5000/api/users/USER_ID/expenses \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.50,
    "category": "Food & Dining",
    "date": "2024-01-15",
    "note": "Lunch"
  }'
\`\`\`

### Set Budget
\`\`\`bash
curl -X POST http://localhost:5000/api/users/USER_ID/budgets \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500.00,
    "month": "2024-01",
    "category": "Food & Dining"
  }'
\`\`\`

### Get Summary
\`\`\`bash
curl -X GET http://localhost:5000/api/summary/USER_ID/2024-01 \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN"
\`\`\`

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running in Debug Mode
The application runs in debug mode by default when using `python app.py`.

### Logging
The application uses Python's logging module. Logs are printed to console.

### Testing with Frontend
Make sure your React frontend is running on `http://localhost:3000` for CORS to work properly.

## Security Features

- **Token Verification**: All protected routes verify Firebase ID tokens
- **User Isolation**: Users can only access their own data
- **Input Validation**: All inputs are validated before processing
- **Error Handling**: Secure error messages without sensitive information

## Troubleshooting

### Common Issues

1. **"serviceAccountKey.json not found"**
   - Make sure you've downloaded and placed the Firebase service account key

2. **"CORS error"**
   - Ensure your frontend is running on `http://localhost:3000`
   - Check CORS configuration in `app.py`

3. **"Token verification failed"**
   - Ensure you're sending the correct Firebase ID token
   - Check token format: `Authorization: Bearer <token>`

4. **"Permission denied"**
   - Check Firestore security rules
   - Ensure user authentication is working

### Logs
Check console output for detailed error messages and debugging information.

## Production Deployment

For production deployment:
1. Set `debug=False` in `app.run()`
2. Use a production WSGI server like Gunicorn
3. Set up proper environment variables
4. Configure production Firestore security rules
5. Use HTTPS for all communications

## License

This project is created for educational purposes as part of IB Computer Science Internal Assessment.
