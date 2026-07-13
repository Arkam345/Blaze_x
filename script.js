/* ============================================
   BLAZE_X CAR SHOP - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ======================== CAR DATA ========================
    const cars = [
        {
            name: 'Toyota Supra',
            brand: 'toyota',
            year: 2024,
            price: 56000,
            fuel: 'Petrol',
            transmission: 'Automatic',
            badge: 'New',
            image: 'https://images.unsplash.com/photo-1626668895804-e03c3b9c5f45?w=600&h=400&fit=crop',
            description: 'The Toyota Supra delivers thrilling performance with a turbocharged inline-six engine, sharp handling, and a head-turning design. A true sports car icon reborn.'
        },
        {
            name: 'Nissan GT-R',
            brand: 'nissan',
            year: 2024,
            price: 115000,
            fuel: 'Petrol',
            transmission: 'Automatic',
            badge: 'Premium',
            image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
            description: 'The Nissan GT-R, also known as "Godzilla," offers extraordinary acceleration, advanced all-wheel drive, and race-bred technology for an unparalleled driving experience.'
        },
        {
            name: 'BMW M4',
            brand: 'bmw',
            year: 2024,
            price: 78000,
            fuel: 'Petrol',
            transmission: 'Automatic',
            badge: 'Sport',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
            description: 'The BMW M4 combines luxury and power with its twin-turbo inline-six engine, adaptive suspension, and driver-focused cockpit for the ultimate sport sedan experience.'
        },
        {
            name: 'Mercedes-Benz C63 AMG',
            brand: 'mercedes',
            year: 2023,
            price: 85000,
            fuel: 'Petrol',
            transmission: 'Automatic',
            badge: 'Luxury',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
            description: 'The Mercedes-Benz C63 AMG delivers raw power wrapped in luxury. Its handcrafted engine, aggressive styling, and premium interior make every drive extraordinary.'
        },
        {
            name: 'Audi RS5',
            brand: 'audi',
            year: 2024,
            price: 75000,
            fuel: 'Petrol',
            transmission: 'Automatic',
            badge: 'Quattro',
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
            description: 'The Audi RS5 features a potent twin-turbo V6, the legendary Quattro all-wheel drive system, and a sophisticated interior that blends performance with elegance.'
        },
        {
            name: 'Ford Mustang GT',
            brand: 'ford',
            year: 2024,
            price: 48000,
            fuel: 'Petrol',
            transmission: 'Manual',
            badge: 'Classic',
            image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
            description: 'The Ford Mustang GT embodies American muscle with its roaring V8 engine, iconic design, and modern technology. A legend that continues to inspire.'
        }
    ];

    // ======================== RENDER CAR CARDS ========================
    const carsGrid = document.getElementById('carsGrid');
    const noResults = document.getElementById('noResults');

    function renderCars(filteredCars) {
        carsGrid.innerHTML = '';
        if (filteredCars.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        filteredCars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.innerHTML = `
                <div class="car-card-image">
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                    <span class="car-card-badge">${car.badge}</span>
                </div>
                <div class="car-card-body">
                    <h3>${car.name}</h3>
                    <div class="car-card-specs">
                        <span><i class="fas fa-calendar-alt"></i> ${car.year}</span>
                        <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                        <span><i class="fas fa-cogs"></i> ${car.transmission}</span>
                    </div>
                    <div class="car-card-footer">
                        <span class="car-card-price">$${car.price.toLocaleString()}</span>
                        <button class="car-card-btn" onclick="openModal('${car.name}')">View Details</button>
                    </div>
                </div>
            `;
            carsGrid.appendChild(card);
        });

        // Re-observe new cards for animation
        observeElements();
    }

    renderCars(cars);

    // ======================== SEARCH & FILTER ========================
    const carSearch = document.getElementById('carSearch');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');

    function filterCars() {
        const query = carSearch.value.toLowerCase().trim();
        const brand = brandFilter.value;
        const priceRange = priceFilter.value;

        let filtered = cars.filter(car => {
            // Search match
            const matchesSearch = car.name.toLowerCase().includes(query);
            // Brand match
            const matchesBrand = brand === 'all' || car.brand === brand;
            // Price match
            let matchesPrice = true;
            if (priceRange !== 'all') {
                const [min, max] = priceRange.split('-').map(Number);
                matchesPrice = car.price >= min && car.price <= max;
            }
            return matchesSearch && matchesBrand && matchesPrice;
        });

        renderCars(filtered);
    }

    carSearch.addEventListener('input', filterCars);
    brandFilter.addEventListener('change', filterCars);
    priceFilter.addEventListener('change', filterCars);

    // ======================== CAR DETAIL MODAL ========================
    const modal = document.getElementById('carModal');
    const modalClose = document.getElementById('modalClose');

    window.openModal = function (carName) {
        const car = cars.find(c => c.name === carName);
        if (!car) return;

        document.getElementById('modalImage').src = car.image;
        document.getElementById('modalImage').alt = car.name;
        document.getElementById('modalTitle').textContent = car.name;
        document.getElementById('modalYear').textContent = car.year;
        document.getElementById('modalFuel').textContent = car.fuel;
        document.getElementById('modalTransmission').textContent = car.transmission;
        document.getElementById('modalPrice').textContent = `$${car.price.toLocaleString()}`;
        document.getElementById('modalDescription').textContent = car.description;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ======================== MOBILE NAVIGATION ========================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ======================== NAVBAR SCROLL EFFECT ========================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ======================== ACTIVE NAV LINK ON SCROLL ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ======================== SCROLL ANIMATIONS ========================
    function observeElements() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    observeElements();

    // ======================== BACK TO TOP ========================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ======================== CONTACT FORM ========================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        contactForm.reset();
    });

    // ======================== STAT COUNTER ANIMATION ========================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const firstStat = statNumbers[0];
        if (!firstStat) return;

        const rect = firstStat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();
});
