# BookStore API Testing Workshop

โปรเจคนี้เป็น Workshop สำหรับเรียนรู้การเขียน Unit Testing และ Integration Testing โดยใช้ GitHub Copilot ร่วมกับ Express.js, Jest และ Supertest

## เกี่ยวกับโปรเจค

BookStore API เป็น REST API สำหรับจัดการข้อมูลหนังสือ ประกอบด้วย:
- การเพิ่มหนังสือใหม่
- การดูข้อมูลหนังสือ
- การแก้ไขข้อมูลหนังสือ
- การลบหนังสือ

## โครงสร้างโปรเจค

```
src/
├── app.js              # Express application และ API routes
├── server.js           # Entry point สำหรับรันเซิร์ฟเวอร์
├── models/
│   └── Book.js         # Data model สำหรับหนังสือ
├── repositories/
│   └── bookRepository.js   # Data access layer
└── services/
    └── bookService.js      # Business logic layer
```

## การติดตั้งและรันโปรเจค

### ติดตั้ง dependencies

```bash
npm install
```

### รันเซิร์ฟเวอร์

```bash
npm start
```

เซิร์ฟเวอร์จะรันที่ `http://localhost:3000`

### รันการทดสอบ

```bash
# รัน test ทั้งหมด
npm test

# รัน test แบบ watch mode
npm run test:watch

# รัน unit tests เท่านั้น
npm run test:unit

# รัน integration tests เท่านั้น
npm run test:integration
```

## API Endpoints

### 1. เพิ่มหนังสือใหม่
**POST** `/books`

#### ตัวอย่างการใช้งาน:
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0123456789",
    "publishedYear": 1925,
    "price": 12.99
  }'
```

#### Response (201 Created):
```json
{
  "id": "1",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0123456789",
  "publishedYear": 1925,
  "price": 12.99
}
```

### 2. ดูหนังสือทั้งหมด
**GET** `/books`

#### ตัวอย่างการใช้งาน:
```bash
curl -X GET http://localhost:3000/books
```

#### Response (200 OK):
```json
[
  {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0123456789",
    "publishedYear": 1925,
    "price": 12.99
  }
]
```

### 3. ดูหนังสือตาม ID
**GET** `/books/:id`

#### ตัวอย่างการใช้งาน:
```bash
curl -X GET http://localhost:3000/books/1
```

#### Response (200 OK):
```json
{
  "id": "1",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0123456789",
  "publishedYear": 1925,
  "price": 12.99
}
```

### 4. แก้ไขข้อมูลหนังสือ
**PUT** `/books/:id`

#### ตัวอย่างการใช้งาน:
```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0123456789",
    "publishedYear": 1925,
    "price": 15.99
  }'
```

### 5. ลบหนังสือ
**DELETE** `/books/:id`

#### ตัวอย่างการใช้งาน:
```bash
curl -X DELETE http://localhost:3000/books/1
```

#### Response (200 OK):
```json
{
  "message": "Book deleted successfully"
}
```

### 6. ลบหนังสือทั้งหมด (สำหรับการทดสอบ)
**DELETE** `/books`

#### ตัวอย่างการใช้งาน:
```bash
curl -X DELETE http://localhost:3000/books
```

#### Response (200 OK):
```json
{
  "message": "All books cleared"
}
```

## การทดสอบ API ด้วย curl

### ตัวอย่างการทดสอบแบบ step-by-step:

1. **เริ่มต้นด้วยการเพิ่มหนังสือ:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell", 
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "price": 13.99
  }'
```

2. **ตรวจสอบว่าหนังสือถูกเพิ่มแล้ว:**
```bash
curl -X GET http://localhost:3000/books
```

3. **ดูหนังสือตาม ID:**
```bash
curl -X GET http://localhost:3000/books/1
```

4. **แก้ไขราคาหนังสือ:**
```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935", 
    "publishedYear": 1949,
    "price": 16.99
  }'
```

5. **ลบหนังสือ:**
```bash
curl -X DELETE http://localhost:3000/books/1
```

## Error Responses

API จะคืนค่า error codes ดังต่อไปนี้:

- **400 Bad Request**: ข้อมูลที่ส่งมาไม่ถูกต้อง
- **404 Not Found**: ไม่พบหนังสือที่ระบุ
- **409 Conflict**: หนังสือที่มี ISBN นี้มีอยู่แล้ว
- **500 Internal Server Error**: ข้อผิดพลาดภายในเซิร์ฟเวอร์

## วัตถุประสงค์ของ Workshop

Workshop นี้มุ่งเน้นให้ผู้เข้าร่วม:
1. เรียนรู้การเขียน Unit Tests สำหรับ Business Logic
2. เรียนรู้การเขียน Integration Tests สำหรับ API Endpoints
3. ฝึกใช้ GitHub Copilot ในการช่วยเขียนการทดสอบ
4. เข้าใจ Testing Best Practices

## เทคโนโลยีที่ใช้

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Jest**: Testing framework
- **Supertest**: HTTP assertions library สำหรับ integration testing

## หมายเหตุ

- ไฟล์ใน `src/` directory ไม่ควรแก้ไข ให้มุ่งเน้นไปที่การเขียนการทดสอบ
- API นี้ใช้ in-memory storage จึงข้อมูลจะหายไปเมื่อ restart เซิร์ฟเวอร์
