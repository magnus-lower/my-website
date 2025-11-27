# Magnus Løwer - Personal Portfolio Website

My personal portfolio website showcasing the projects I've built during my studies and the skills I've learned. Built with HTML, CSS, and JavaScript, featuring both English and Norwegian language support along with a dark/light theme toggle.

## Overview

I created this portfolio website to showcase my programming projects and what I've learned as a computer engineering student at NTNU. The website demonstrates the web development skills I've picked up, with clean code and modern design practices I've studied and implemented.

## Features

### What I Built
- **Responsive Design**: The website works well on phones, tablets, and computers
- **Dark/Light Mode**: Users can switch between themes, and the site remembers their choice
- **Two Languages**: Everything can be viewed in English or Norwegian with a simple toggle
- **Accessibility**: I made sure the site works with screen readers and keyboard navigation
- **Works Without JavaScript**: The basic site works even if JavaScript is disabled

### Interactive Stuff
- **Typing Animation**: Cool text animation when pages load
- **Smooth Scrolling**: Navigation feels smooth when jumping between sections
- **Project Cards**: Click on project cards to visit the live websites
- **Contact Form**: Working contact form so people can reach out to me
- **Settings Panel**: Easy way to change language and theme preferences

### Performance Features I Added
- **Lazy Loading**: Images only load when you scroll to them for faster page loads
- **Organized CSS**: I split my styles into separate files to keep things tidy
- **Modular JavaScript**: Used ES6 modules to organize my code better
- **Optimized Fonts**: Made sure Google Fonts load efficiently

## What I Used to Build This

### Main Technologies
- **HTML5**: Used semantic HTML for proper structure and accessibility
- **CSS3**: Modern CSS with variables, Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modular JavaScript with modern features I learned in class

### External Libraries
- **Font Awesome 6.4.2**: For consistent icons throughout the site
- **Google Fonts (Poppins)**: Clean typography that looks professional
- **Form Services**: Integration for handling contact form submissions

### Tools and Techniques
- **Component-Based Structure**: Organized my code into reusable components
- **CSS Variables**: Used custom properties for the theme system
- **Local Storage**: Saves user preferences between visits

## Project Structure

The site now follows a feature-first layout with a single entrypoint (`app.js`) coordinating initialization across modules.

```
/
├── README.md              
├── public/                 # Alt som skal være offentlig tilgjengelig i root
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml          
├── assets/           
│   ├── profile_picture.jpg
│   ├── norwegian_cv.pdf
│   ├── english_cv.pdf
│   ├── dots-pattern.svg
│   ├── norwegian-flag.png
│   └── uk-flag.png
├── pages/               
│   ├── index.html        
│   ├── projects.html     
│   └── about.html        
├── js/                   
│   ├── core/             
│   │   ├── app.js        
│   │   ├── bootstrap.js  
│   │   ├── language.js   
│   │   ├── preferences.js
│   │   └── theme.js      
│   ├── components/       
│   │   ├── navigation.js 
│   │   ├── resumeLink.js 
│   │   └── settingsPanel.js 
│   ├── features/         
│   │   ├── contact/      
│   │   │   └── contactForm.js
│   │   ├── navigation/   
│   │   │   └── navHighlight.js
│   │   ├── projects/     
│   │   │   └── projectLinks.js
│   │   ├── scroll/       
│   │   │   └── fadeInObserver.js
│   │   └── typing/        
│   │       └── typingController.js
│   └── utils/
│       └── dom.js     
├── styles/            
│   ├── app.css        
│   ├── base/          
│   │   ├── reset.css
│   │   ├── tokens.css
│   │   └── base.css
│   ├── components/       
│   │   ├── navigation.css
│   │   ├── hero.css
│   │   ├── footer.css
│   │   ├── ui-components.css
│   │   └── enhancements.css
│   └── features/        
│       ├── dark-mode.css
│       └── responsive.css
├── .github/
│   └── workflows/    
├── .vercel/          
└── .idea/               
```

## My Projects

I've included two main projects that I'm proud of:

- **E-Commerce Platform**: A full online store I built using Java (Spring Boot), PostgreSQL, and Thymeleaf. It has user login, a product catalog, and shopping cart functionality. You can check it out here: [Live Demo](https://demo-store-k4g7.onrender.com/)

- **Weather Dashboard**: A real-time weather app built with Python (Flask), the OpenWeather API, and Bootstrap. It shows current weather and forecasts based on location. See it in action: [Live Demo](https://weather-dashboard-still-leaf-2476.fly.dev/)

## How to Run This Locally

### What You Need
- A modern web browser
- A local web server (optional but recommended for development)

### Getting Started
1. Download or clone the project:
   ```bash
   git clone https://github.com/magnus-lower/my-website.git
   cd my-website
   ```

2. You can either open `index.html` directly in your browser, or run a local server:
   ```bash
   # If you have Python installed
   python -m http.server 8000
   
   # Or if you have Node.js
   npx http-server
   
   # Or with PHP
   php -S localhost:8000
   ```

3. Then go to `http://localhost:8000` in your browser

### Development Notes
I built this with vanilla HTML, CSS, and JavaScript - no build tools needed! The JavaScript modules need to be served over HTTP though (not just opening the file directly), which is why a local server helps during development.

## Browser Compatibility

- **Modern Browsers**: Works great on Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Older Browsers**: The basic functionality still works on older browsers
- **Mobile**: Optimized for mobile browsers like Safari on iOS and Chrome on Android

## Accessibility Features I Implemented

- **Proper HTML Structure**: Used semantic HTML and heading hierarchy
- **Screen Reader Support**: Added ARIA labels where needed
- **Keyboard Navigation**: Everything works with just the keyboard
- **Focus Indicators**: Clear visual focus for keyboard users
- **Color Contrast**: Made sure text is readable with good contrast
- **Alt Text**: All images have descriptive alt text

## Performance

I tested the site with Lighthouse and aimed for good scores across all areas. The site loads quickly and doesn't shift around while loading.

## Contributing

This is my personal portfolio project, but I'm always open to feedback and suggestions! If you have ideas for improvements:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request explaining what you improved

## Get in Touch

Feel free to reach out if you want to discuss my projects or potential opportunities:

- **Email**: Use the contact form on my website
- **LinkedIn**: [Magnus Løwer](https://www.linkedin.com/in/magnus-løwer)
- **GitHub**: [magnus-lower](https://github.com/magnus-lower)

## License

This is my personal portfolio code. You're welcome to look at how I built things and use it as inspiration for your own projects, but please respect that this represents my personal work and experience.

---

**Last Updated**: August 2025  
**Version**: 1.0.0