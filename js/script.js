/**
 * ============================================================================
 * DUNE: ARRAKIS CHRONICLES // THE MERON GHIRMAI PORTFOLIO
 * Core Interactive Logic & Spice Melange Physics Simulation
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------------
       1. PRELOADER & INITIALIZATION
       ------------------------------------------------------------------------ */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 800);
        });
        // Fallback safety timeout
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 2500);
    }

    /* ------------------------------------------------------------------------
       2. REAL-TIME ARRAKIS TELEMETRY CLOCK
       ------------------------------------------------------------------------ */
    const cycleTimeEl = document.getElementById('cycle-time');
    function updateCycleClock() {
        if (!cycleTimeEl) return;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        cycleTimeEl.textContent = `${hours}:${minutes}:${seconds} EAT`;
    }
    updateCycleClock();
    setInterval(updateCycleClock, 1000);

    /* ------------------------------------------------------------------------
       3. SPICE MELANGE PARTICLE CANVAS SYSTEM (Atmospheric Physics)
       ------------------------------------------------------------------------ */
    const canvas = document.getElementById('spice-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particleCount = Math.min(Math.floor((width * height) / 14000), 95);
        const particles = [];
        const mouse = { x: -1000, y: -1000, radius: 120 };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        class SpiceParticle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + 10;
                this.baseSize = Math.random() * 2.2 + 0.6;
                this.size = this.baseSize;
                this.speedY = -(Math.random() * 0.45 + 0.15);
                this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.25;
                this.hue = Math.random() > 0.15 ? 38 + Math.random() * 8 : 190; // mostly spice gold, rare fremen cyan
                this.baseAlpha = Math.random() * 0.55 + 0.25;
                this.alpha = this.baseAlpha;
                this.pulseSpeed = Math.random() * 0.03 + 0.01;
                this.pulseAngle = Math.random() * Math.PI * 2;
            }

            update() {
                this.pulseAngle += this.pulseSpeed;
                this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.2;
                if (this.alpha < 0.1) this.alpha = 0.1;

                // Ambient drift
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.pulseAngle * 0.5) * 0.2;

                // Mouse vortex interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);

                if (distance < mouse.radius) {
                    const force = (1 - distance / mouse.radius) * 1.8;
                    const angle = Math.atan2(dy, dx);
                    // Swirl perpendicular vector
                    this.x -= Math.cos(angle + Math.PI / 3) * force * 2;
                    this.y -= Math.sin(angle + Math.PI / 3) * force * 2;
                }

                // Recycle particle
                if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.alpha})`;
                ctx.shadowBlur = this.size * 3.5;
                ctx.shadowColor = `hsla(${this.hue}, 90%, 60%, 0.8)`;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new SpiceParticle());
        }

        function animateSpice() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateSpice);
        }
        animateSpice();
    }

    /* ------------------------------------------------------------------------
       4. DUNE AMBIENT SOUND CONTROLLER & EQUALIZER
       ------------------------------------------------------------------------ */
    const audioPlayer = document.getElementById('audioPlayer');
    const audioController = document.getElementById('audioController');
    const audioLabel = document.getElementById('audioLabel');

    if (audioPlayer && audioController) {
        audioPlayer.volume = 0.45;

        audioController.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play().then(() => {
                    audioController.classList.add('playing');
                    if (audioLabel) audioLabel.textContent = 'AMBIENCE: ACTIVE';
                }).catch(err => {
                    console.log('Audio autoplay prevented:', err);
                });
            } else {
                audioPlayer.pause();
                audioController.classList.remove('playing');
                if (audioLabel) audioLabel.textContent = 'SOUNDSCAPE // DUNE';
            }
        });
    }

    /* ------------------------------------------------------------------------
       5. THUMPER (SANDWORM CALLER) SHOCKWAVE MICRO-INTERACTION
       ------------------------------------------------------------------------ */
    const thumperBtn = document.getElementById('thumperTrigger');
    const thumperShockwave = document.getElementById('thumperShockwave');
    const thumperBanner = document.getElementById('thumperBanner');
    const thumperQuoteText = document.getElementById('thumperQuoteText');

    const duneQuotes = [
        "\"The sleeper has awakened. The spice must flow.\"",
        "\"A process cannot be understood by stopping it. Understanding must move with the flow of the process.\"",
        "\"Fear is the mind-killer. Fear is the little-death that brings total obliteration.\"",
        "\"He who controls the spice controls the universe.\"",
        "\"The mystery of life isn't a problem to solve, but a reality to experience.\"",
        "\"Bless the Maker and His water. Bless the coming and going of Him.\""
    ];

    if (thumperBtn && thumperShockwave && thumperBanner) {
        let quoteIndex = 0;
        thumperBtn.addEventListener('click', () => {
            // Trigger shockwave
            thumperShockwave.classList.remove('active');
            void thumperShockwave.offsetWidth; // trigger reflow
            thumperShockwave.classList.add('active');

            // Screen subtle rumble
            document.body.style.transform = 'translateY(2px)';
            setTimeout(() => { document.body.style.transform = 'translateY(-2px)'; }, 70);
            setTimeout(() => { document.body.style.transform = 'translateY(1px)'; }, 140);
            setTimeout(() => { document.body.style.transform = 'none'; }, 210);

            // Cycle quote banner
            if (thumperQuoteText) {
                thumperQuoteText.textContent = duneQuotes[quoteIndex];
                quoteIndex = (quoteIndex + 1) % duneQuotes.length;
            }

            thumperBanner.classList.add('show');
            setTimeout(() => {
                thumperBanner.classList.remove('show');
            }, 4500);
        });
    }

    /* ------------------------------------------------------------------------
       6. NAVIGATION, STICKY HEADER & MOBILE DRAWER
       ------------------------------------------------------------------------ */
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active navigation link tracking
        let currentId = '';
        sections.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (top >= offset && top < offset + height) {
                currentId = id;
            }
        });

        if (currentId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('bx-menu');
                icon.classList.toggle('bx-x');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bx-menu');
                    icon.classList.remove('bx-x');
                }
            });
        });
    }

    /* ------------------------------------------------------------------------
       7. PROJECT DATA ARCHIVE & TRANSMISSION INSPECTOR MODAL
       ------------------------------------------------------------------------ */
    const projectDatabase = {
        'geez-nlp': {
            badge: 'AI / NLP RESEARCH // OPEN SOURCE',
            title: "Ge'ez NLP Corpus & Custom Tokenizer",
            banner: 'images/geez_nlp.jpg',
            summary: "Curated, cleaned, and annotated over 25,000 sentences (~350,000 tokens) from digitized historical manuscripts, educational texts, and community archives to power natural language processing research for under-resourced Ethiopic languages.",
            highlights: [
                "Constructed high-quality training corpus of 350K+ Ge'ez script tokens with semantic metadata",
                "Engineered custom morphological tokenizer handling complex Ge'ez agglutinative grammar and syllabary characters",
                "Open-sourced dataset and preprocessing pipeline on GitHub to foster AI research across East Africa",
                "Overcame severe data scarcity hurdles through automated linguistic cleaning pipelines"
            ],
            stack: ['Python', 'PyTorch', 'NLP', 'Data Engineering', 'Ethiopic Syllabary', 'Tokenization', 'Git'],
            github: 'https://github.com/MeronGhirmai',
            live: '#'
        },
        'mekane-hiwet': {
            badge: 'MOBILE ENGINEERING // ONLINE & OFFLINE',
            title: 'Mekane Hiwet Android Application',
            banner: 'images/mekane_hiwet.jpg',
            summary: "A robust digital library and scripture text-processing Android application engineered specifically for the Tigrinya-speaking community to address persistent local connectivity constraints and complex Ge'ez script rendering challenges.",
            highlights: [
                "Engineered offline-first architecture with SQLite caching and bidirectional real-time Firebase synchronization",
                "Developed custom text-rendering and font rasterization engine for accurate Ge'ez script typography",
                "Built interactive Daily Bread, Scripture readers (መንበቢ መጽሓፍ ቅዱስ), and Daily Verse cards (ጥቕሲ ዕለት)",
                "Integrated custom image-rendering engine for generating high-resolution excerpt quote cards for social sharing",
                "Incorporated official Mekane Hiwet Cross and Heart emblem and Material Design 3 tactile dark mode",
                "Scheduled for public production release: October 2026"
            ],
            stack: ['Android SDK', 'Java', 'SQLite', 'Firebase Firestore', 'Material Design 3', 'Ge\'ez Rendering Engine'],
            github: 'https://github.com/MeronGhirmai',
            live: '#'
        },
        'eritrean-postal': {
            badge: 'ENTERPRISE SYSTEMS // LOGISTICS & SMS PIPELINE',
            title: 'Eritrean Postal Service Digital Platform',
            banner: 'images/postal_logistics.jpg',
            summary: "Co-led a four-person engineering team to develop a centralized web-based database system and automated SMS notification pipeline digitizing legacy paper workflows across 14 regional post office branches.",
            highlights: [
                "Designed the normalized relational database schema handling over 5,000 monthly transactions",
                "Engineered automated SMS notification pipeline reducing customer package arrival notice times from days to seconds",
                "Architected secure backend REST APIs and role-based staff authorization across regional terminals",
                "Optimized SQL query performance slashes database search turnaround time by over 75%"
            ],
            stack: ['SQL / Relational DBs', 'Python / Backend APIs', 'SMS Gateway Integration', 'Web Dashboard', 'Security Protocols'],
            github: 'https://github.com/MeronGhirmai',
            live: '#'
        },
        'qr-gen': {
            badge: 'WEB UTILITY // VECTOR GENERATION ENGINE',
            title: 'Dynamic QR Code Generation Engine',
            banner: 'images/qqe.png',
            summary: "A modern web application platform that empowers individuals and enterprises to instantly synthesize custom QR codes for marketing campaigns, inventory management, dynamic URLs, and digital asset tracking.",
            highlights: [
                "Real-time client-side QR matrix computation with customizable error correction levels",
                "Instant SVG and PNG export capabilities with high-resolution vector scaling",
                "Responsive HUD-inspired UI built with pure JavaScript and modern CSS",
                "Live and actively deployed on GitHub Pages"
            ],
            stack: ['JavaScript (ES6+)', 'HTML5 Canvas', 'SVG Engine', 'CSS3 Glassmorphism', 'GitHub Pages'],
            github: 'https://github.com/MeronGhirmai/QR-code-gen',
            live: 'https://meronghirmai.github.io/QR-code-gen/'
        },
        'netflix-clone': {
            badge: 'FRONTEND ARCHITECTURE // STREAMING UI',
            title: 'Cinematic Streaming Interface (Netflix Clone)',
            banner: 'images/net.jpg',
            summary: "A responsive, pixel-accurate web recreation of modern streaming architectures focusing on dynamic carousel mechanics, media banner hero headers, and clean responsive design.",
            highlights: [
                "Pixel-perfect media card carousels with smooth horizontal scroll snaps",
                "Dynamic media modal inspection with synchronized preview playback",
                "Fully responsive layout optimized for mobile, tablet, and ultra-wide cinematic displays"
            ],
            stack: ['HTML5', 'CSS3 Grid/Flexbox', 'JavaScript', 'Responsive Web Design'],
            github: 'https://github.com/MeronGhirmai',
            live: '#'
        },
        'weather-app': {
            badge: 'METEOROLOGICAL TELEMETRY // REST API',
            title: 'Atmospheric Weather Telemetry App',
            banner: 'images/wa.jpg',
            summary: "A clean atmospheric telemetry application that retrieves live weather data, atmospheric barometric pressures, humidity indices, and multi-day forecasts for global coordinates.",
            highlights: [
                "Real-time asynchronous REST API integration with OpenWeather services",
                "Dynamic UI environmental theming adapting to daytime, night, and severe atmospheric states",
                "Geolocation coordinate detection and instant city search"
            ],
            stack: ['JavaScript Fetch API', 'RESTful Services', 'CSS3 Transitions', 'JSON Data Parsing'],
            github: 'https://github.com/MeronGhirmai',
            live: '#'
        }
    };

    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalBanner = document.getElementById('modalBanner');
    const modalSummary = document.getElementById('modalSummary');
    const modalHighlights = document.getElementById('modalHighlights');
    const modalTags = document.getElementById('modalTags');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const modalLiveLink = document.getElementById('modalLiveLink');

    function openProjectModal(projectId) {
        const data = projectDatabase[projectId];
        if (!data || !projectModal) return;

        if (modalBadge) modalBadge.textContent = data.badge;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalBanner) {
            modalBanner.src = data.banner;
            modalBanner.alt = data.title;
        }
        if (modalSummary) modalSummary.textContent = data.summary;

        if (modalHighlights) {
            modalHighlights.innerHTML = '';
            data.highlights.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalHighlights.appendChild(li);
            });
        }

        if (modalTags) {
            modalTags.innerHTML = '';
            data.stack.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'tag-chip';
                span.textContent = tech;
                modalTags.appendChild(span);
            });
        }

        if (modalGithubLink) {
            modalGithubLink.href = data.github;
            modalGithubLink.style.display = data.github ? 'inline-flex' : 'none';
        }

        if (modalLiveLink) {
            modalLiveLink.href = data.live;
            modalLiveLink.style.display = (data.live && data.live !== '#') ? 'inline-flex' : 'none';
        }

        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Attach click listeners to inspect triggers
    document.querySelectorAll('[data-inspect]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-inspect');
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
            closeProjectModal();
        }
    });

    /* ------------------------------------------------------------------------
       8. PROJECT FILTER CONTROLS
       ------------------------------------------------------------------------ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ------------------------------------------------------------------------
       9. SKILL METER BARS ANIMATION ON SCROLL
       ------------------------------------------------------------------------ */
    const skillBars = document.querySelectorAll('.skill-meter-fill');
    let skillsAnimated = false;

    function checkSkillsScroll() {
        if (skillsAnimated) return;
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                if (targetWidth) {
                    bar.style.width = targetWidth;
                }
            });
            skillsAnimated = true;
        }
    }
    window.addEventListener('scroll', checkSkillsScroll);
    checkSkillsScroll();

    /* ------------------------------------------------------------------------
       10. QUICK COPY TELEMETRY (Email & Phone)
       ------------------------------------------------------------------------ */
    const copyTriggers = document.querySelectorAll('[data-copy]');
    copyTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = `<i class='bx bx-check'></i> COPIED`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Copy failed:', err);
            });
        });
    });

});
