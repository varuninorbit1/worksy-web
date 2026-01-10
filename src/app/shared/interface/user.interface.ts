export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number ; // You can expand this union type based on valid roles
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}
