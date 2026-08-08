# WanderLux - Premium Travel & Tourism Website

A world-class travel and tourism website built with React, featuring smooth animations, beautiful UI, and modern design principles.

## 🌟 Features

- **Stunning Hero Section** with animated search functionality
- **Interactive Destinations** showcase with 6+ popular locations
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** that works on all devices
- **Modern UI Components** with Tailwind CSS
- **Travel Gallery** with lightbox functionality
- **Customer Testimonials** section
- **Feature Highlights** with icon animations
- **Professional Navigation** with scroll effects

## 🚀 Technologies Used

- React 19
- Vite 8
- Framer Motion (animations)
- Tailwind CSS 4
- React Router DOM
- Lucide React (icons)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit: `http://localhost:5173`

## 🎨 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with scroll effects
│   ├── Hero.jsx            # Hero section with search
│   ├── Features.jsx        # Why choose us section
│   ├── Destinations.jsx    # Popular destinations grid
│   ├── Gallery.jsx         # Photo gallery with lightbox
│   ├── Testimonials.jsx    # Customer reviews
│   └── Footer.jsx          # Footer with links
├── App.jsx                 # Main app component
├── App.css                 # Global styles
├── index.css               # Tailwind imports
└── main.jsx                # Entry point
```

## 🎯 Key Components

### Navbar
- Fixed navigation with scroll effects
- Mobile responsive menu
- Smooth transitions

### Hero Section
- Full-screen background with overlay
- Animated search bar
- Call-to-action buttons

### Destinations
- Grid layout with 6 destinations
- Hover animations
- Rating and pricing display

### Gallery
- Masonry-style photo grid
- Lightbox modal for full-size images
- Smooth transitions

## 🎨 Customization

### Colors
The project uses a blue and purple gradient theme. You can customize colors in:
- `src/App.css` for gradient definitions
- Tailwind classes in components

### Images
Replace Unsplash URLs with your own images in:
- `Hero.jsx`
- `Destinations.jsx`
- `Gallery.jsx`
- `Testimonials.jsx`

### Content
Update text content in each component file to match your brand.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## 📄 License

This project is perfect for your final year bachelor's project!

## 🎓 Tips for Your Project

1. **Add More Pages**: Create separate pages for Tours, About, Contact
2. **Backend Integration**: Connect to a real API for destinations
3. **Booking System**: Add a booking flow with forms
4. **User Authentication**: Implement login/signup
5. **Payment Integration**: Add Stripe or PayPal
6. **Admin Dashboard**: Create a CMS for managing content
7. **Reviews System**: Let users leave reviews
8. **Search Functionality**: Implement real search with filters

## 🌐 Deployment

Deploy to:
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- AWS Amplify

Good luck with your final year project! 🎉
