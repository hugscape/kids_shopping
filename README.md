# Hugscape - Kids Shopping Website

A modern, full-stack e-commerce website for kids clothing built with React frontend and Spring Boot backend with H2 in-memory database.

## 🌟 Features

### Frontend (React)
- **Modern UI/UX** with responsive design
- **Product catalog** with search and filtering
- **Shopping cart** with local storage persistence
- **Product detail pages** with image galleries
- **Category-based navigation**
- **Wishlist functionality**
- **Mobile-first responsive design**

### Backend (Spring Boot)
- **RESTful API** endpoints
- **H2 in-memory database** with automatic data initialization
- **JPA/Hibernate** for data persistence
- **Product management** (CRUD operations)
- **Category and brand filtering**
- **Search functionality**
- **Stock management**

### Database (H2)
- **In-memory database** for fast performance
- **Sample data** with kids clothing products
- **Automatic schema creation**
- **H2 console** for database inspection

## 🚀 Tech Stack

### Frontend
- **React 18** with Hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database**
- **Maven** for dependency management
- **Java 17**

### Development Tools
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **Autoprefixer** for CSS compatibility

## 📁 Project Structure

```
kids_shopping/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (Cart, Products)
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── index.html           # HTML template
├── backend/                  # Spring Boot application
│   ├── src/main/java/
│   │   └── com/hugscape/
│   │       ├── controller/  # REST controllers
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data repositories
│   │       ├── service/     # Business logic
│   │       └── config/      # Configuration classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml              # Maven dependencies
└── README.md                # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- **Java 17** or higher
- **Node.js 16** or higher
- **Maven 3.6** or higher

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application:**
   - API: http://localhost:8080/api
   - H2 Console: http://localhost:8080/h2-console
   - Database URL: `jdbc:h2:mem:kids_shopping_db`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - API proxy: Configured to forward `/api` requests to backend

### Build for Production

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build backend:**
   ```bash
   cd backend
   mvn clean package
   ```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?q={term}` - Search products
- `GET /api/products/price-range?minPrice={min}&maxPrice={max}` - Filter by price
- `GET /api/products/size/{size}` - Filter by size
- `GET /api/products/brand/{brand}` - Filter by brand
- `GET /api/products/categories` - Get all categories
- `GET /api/products/brands` - Get all brands

### Admin Operations
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `PATCH /api/products/{id}/stock?quantity={qty}` - Update stock

## 🎨 Sample Data

The application comes pre-loaded with sample kids clothing products:

- **Nightwear Collection**: Cotton nightwear sets, Ikkat print pajamas
- **Boys Collection**: T-shirts, shorts, adventure wear
- **Girls Collection**: Dresses, tops, butterfly prints
- **New Arrivals**: Festive wear, summer collection

## 🔧 Configuration

### Backend Configuration
- **Port**: 8080
- **Context Path**: /api
- **Database**: H2 in-memory
- **CORS**: Enabled for localhost:3000 and localhost:5173

### Frontend Configuration
- **Port**: 3000
- **API Proxy**: Configured to forward requests to backend
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS

## 🚀 Deployment

### Frontend Deployment
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Free tier with automatic deployments
- **Vercel**: Free tier with serverless functions

### Backend Deployment
- **Railway**: Free tier (500 hours/month)
- **Render**: Free tier with automatic deployments
- **Heroku**: Free tier (with limitations)
- **Google Cloud Run**: Free tier (2M requests/month)

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm run lint
```

## 📱 Features

### User Experience
- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized with Vite and H2 database
- **Intuitive Navigation**: Easy-to-use interface
- **Search & Filter**: Find products quickly
- **Shopping Cart**: Persistent cart with local storage

### Product Management
- **Category Organization**: Boys, Girls, Nightwear, New Arrivals
- **Size Selection**: 2T to 6T sizes
- **Color Options**: Multiple color variants
- **Stock Management**: Real-time inventory tracking
- **Image Galleries**: Multiple product images

### Shopping Features
- **Add to Cart**: Select size, color, and quantity
- **Cart Persistence**: Cart saved in browser storage
- **Wishlist**: Save favorite products
- **Product Reviews**: Star ratings and reviews
- **Quick View**: Fast product browsing

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing
- **SQL Injection Protection**: JPA/Hibernate parameterized queries
- **XSS Protection**: React's built-in XSS protection

## 🚀 Performance Optimizations

- **H2 In-Memory Database**: Sub-10ms query times
- **React Virtual DOM**: Efficient UI updates
- **Tailwind CSS**: Optimized CSS framework
- **Image Optimization**: Responsive images with fallbacks
- **Lazy Loading**: Components loaded on demand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Spring Boot Team** for the excellent framework
- **React Team** for the amazing frontend library
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **H2 Database** for the lightweight database solution

## 📞 Support

For support and questions:
- **Email**: hello@hugscape.com
- **GitHub Issues**: Create an issue in this repository

---

**Made with ❤️ for little dreamers**