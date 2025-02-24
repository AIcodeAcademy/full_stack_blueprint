# Add Asset API Plan

## Types

```typescript
type Asset = {
  id: string;
  categoryId: string;
  value: number;
  quantity: number;
  acquisitionDate: string; // ISO date string
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type Category = {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  liquidityLevel: 'low' | 'medium' | 'high';
}

type CreateAssetRequest = {
  categoryId: string;
  value: number;
  quantity: number;
  acquisitionDate: string;
}

type CreateAssetResponse = {
  asset: Asset;
}
```

## Endpoints

### POST /api/assets

Creates a new asset for the authenticated user.

#### Request
- Method: POST
- Headers:
  - Authorization: Bearer {jwt}
  - Content-Type: application/json
- Body: CreateAssetRequest

#### Response
- Status: 201 Created
- Body: CreateAssetResponse

#### Error Responses
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Missing or invalid JWT
- 404 Not Found: Category not found
- 500 Internal Server Error: Server-side error

## Validation Rules

### Asset Creation
- `categoryId`: Must be a valid UUID and exist in the categories table
- `value`: Must be a positive number with up to 2 decimal places
- `quantity`: Must be a positive number with up to 6 decimal places
- `acquisitionDate`: Must be a valid ISO date string and not in the future

## Security

- Endpoint requires JWT authentication
- Users can only create assets for themselves
- JWT payload must contain userId

## Database Changes

### Assets Table
```sql
CREATE TABLE assets (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  quantity DECIMAL(16,6) NOT NULL,
  acquisition_date TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Categories Table (if not exists)
```sql
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  liquidity_level TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
``` 