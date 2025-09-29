$(document).ready(function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize particles
    initializeParticles();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize contact form
    initializeContactForm();

    var timelineBlock = $(".timeline_block"),
        timeline = $('.timeline'),
        timelineLine = $('.timeline_line'),
        lineProgress = $('.line_progress'),
        cardLogo = $('.card_logo_box'),
        timelineItem = $('.timeline_item');
    
    var windowOuterHeight = $(window).outerHeight(),
        window3_4 = 3*windowOuterHeight/4;
        posY = $(window).scrollTop(),
        oldPosY = -1;
    
    var timelineFlag = false,
        headerHeight = $("#header").outerHeight();
    
    $(window).on('scroll', () => {
        posY = $(window).scrollTop();
        updateFrame();
        updateScrollAnimations();
    });

    $(window).on('resize', () => {
        posY = $(window).scrollTop();
        updateFrame();
        updateScrollAnimations();
    });
    
    function updateFrame() {
        if(timelineFlag == false) requestAnimationFrame(updateWindow); 
        timelineFlag = true;
    }
    
    function updateWindow() {
        timelineFlag = false;
        if(posY !== oldPosY) {
            oldPosY = posY;
            updateProgress();
        }
    }

    function updateProgress() {
        timelineBlock.each(function() {
            var lastItemTop = $(this).find(timelineItem).last().find(cardLogo).offset().top,
                progressTop = $(this).find(lineProgress).offset().top,
                windowMid = posY - progressTop + window3_4;
            
            if(lastItemTop <= posY + window3_4) {
                windowMid = lastItemTop - progressTop;
            }
            $(this).find(lineProgress).css({height: windowMid + "px"});
    
            $(this).find(timelineItem).each(function() {
                var itemTop = $(this).find(cardLogo).offset().top;
                if(itemTop < posY + window3_4) {
                    $(this).addClass('timeline_item_active');
                } else {
                    $(this).removeClass('timeline_item_active');
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    $('.navbar-item[href^="#"]').each(function() {
        $(this).on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if(target.length) {
                var offset = target.offset().top - headerHeight - 20;
                $('html, body').animate({scrollTop: offset}, 800);
            }
        });
    });
    
    // Theme toggle functionality
    $('#theme-toggle').on('click', toggleTheme);
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update particles color
    updateParticlesTheme(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Particles.js Configuration
function initializeParticles() {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const particleColor = theme === 'dark' ? '#ffffff' : '#4b0082';
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: particleColor,
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

function updateParticlesTheme(theme) {
    const particleColor = theme === 'dark' ? '#ffffff' : '#4b0082';
    
    // Reinitialize particles with new color
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.color.value = particleColor;
        window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
        
        // Update existing particles
        window.pJSDom[0].pJS.particles.array.forEach(particle => {
            particle.color.value = particleColor;
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

function updateScrollAnimations() {
    // Add any additional scroll-based animations here
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    const mailtoLink = `mailto:vk369@cornell.edu?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    e.target.reset();
    
    // Show success message
    alert('Thank you for your message! Your email client should open with the pre-filled message.');
}

// Utility function for external links
function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Staggered animation for cards
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * delay);
    });
}

// Initialize staggered animations when elements come into view
document.addEventListener('DOMContentLoaded', () => {
    // Add staggered animation to skill categories
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'skills') {
                staggerAnimation('.category', 200);
                skillsObserver.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});