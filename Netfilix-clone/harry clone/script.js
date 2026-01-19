// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Netflix Clone Loaded - By [Your Name]');
    
    // 1. LANGUAGE SELECTOR FUNCTIONALITY
    const languageBtn = document.querySelector('.btn:not(.btn-red-sm)');
    const signInBtn = document.querySelector('.btn-red-sm');
    const getStartedBtn = document.querySelector('.btn-red');
    const emailInput = document.querySelector('input[type="text"]');
    const faqBoxes = document.querySelectorAll('.faqbox');
    const footerLinks = document.querySelectorAll('.footer a');
    
    // 2. SIMULATE BACKEND DATA
    const backendData = {
        userProfiles: [],
        currentLanguage: 'English',
        subscriptionPlan: null,
        watchHistory: [],
        isLoggedIn: false,
        faqData: [
            {
                question: "What is Netflix?",
                answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
            },
            {
                question: "How much does Netflix cost?",
                answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
            },
            {
                question: "Where can I watch?",
                answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
            },
            {
                question: "How do I cancel?",
                answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
            },
            {
                question: "What can I watch on Netflix?",
                answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
            },
            {
                question: "Is Netflix good for kids?",
                answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.\n\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."
            }
        ],
        languages: [
            { code: 'en', name: 'English' },
            { code: 'hi', name: 'हिन्दी' },
            { code: 'ta', name: 'தமிழ்' },
            { code: 'te', name: 'తెలుగు' },
            { code: 'kn', name: 'ಕನ್ನಡ' },
            { code: 'ml', name: 'മലയാളം' },
            { code: 'bn', name: 'বাংলা' }
        ]
    };
    
    // 3. LOCAL STORAGE SIMULATION (Backend-like)
    class NetflixBackend {
        constructor() {
            this.key = 'netflix_clone_data';
            this.loadData();
        }
        
        loadData() {
            const saved = localStorage.getItem(this.key);
            if (saved) {
                try {
                    Object.assign(backendData, JSON.parse(saved));
                } catch (e) {
                    console.log('No saved data found, starting fresh');
                }
            }
        }
        
        saveData() {
            localStorage.setItem(this.key, JSON.stringify(backendData));
        }
        
        // User Management
        createUser(email) {
            const user = {
                id: Date.now(),
                email: email,
                joinedDate: new Date().toISOString(),
                subscription: 'free_trial',
                profiles: [],
                watchlist: []
            };
            
            backendData.userProfiles.push(user);
            backendData.isLoggedIn = true;
            this.saveData();
            return user;
        }
        
        getUserByEmail(email) {
            return backendData.userProfiles.find(user => 
                user.email.toLowerCase() === email.toLowerCase()
            );
        }
        
        // Subscription Management
        updateSubscription(plan) {
            backendData.subscriptionPlan = plan;
            this.saveData();
            return true;
        }
        
        // Language Management
        changeLanguage(langCode) {
            const lang = backendData.languages.find(l => l.code === langCode);
            if (lang) {
                backendData.currentLanguage = lang.name;
                this.saveData();
                return lang;
            }
            return null;
        }
        
        // Watch History
        addToHistory(item) {
            backendData.watchHistory.push({
                ...item,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 50 items
            if (backendData.watchHistory.length > 50) {
                backendData.watchHistory.shift();
            }
            
            this.saveData();
        }
        
        // Get Recommendations (Mock AI)
        getRecommendations() {
            const mockShows = [
                { title: "Stranger Things", genre: "Sci-Fi", rating: 4.8 },
                { title: "Money Heist", genre: "Thriller", rating: 4.7 },
                { title: "The Crown", genre: "Drama", rating: 4.6 },
                { title: "Sacred Games", genre: "Thriller", rating: 4.5 },
                { title: "Mirzapur", genre: "Action", rating: 4.4 }
            ];
            
            return mockShows.sort(() => Math.random() - 0.5).slice(0, 3);
        }
    }
    
    // 4. INITIALIZE BACKEND
    const backend = new NetflixBackend();
    
    // 5. LANGUAGE SELECTOR
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            createLanguageDropdown();
        });
    }
    
    function createLanguageDropdown() {
        // Remove existing dropdown if any
        const existingDropdown = document.querySelector('.language-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #333;
            border-radius: 4px;
            padding: 10px;
            margin-top: 5px;
            z-index: 1000;
            min-width: 150px;
        `;
        
        backendData.languages.forEach(lang => {
            const langItem = document.createElement('div');
            langItem.style.cssText = `
                padding: 8px 12px;
                cursor: pointer;
                color: white;
                border-radius: 3px;
                margin: 2px 0;
                font-size: 14px;
            `;
            
            langItem.textContent = lang.name;
            langItem.addEventListener('mouseenter', () => {
                langItem.style.backgroundColor = '#333';
            });
            langItem.addEventListener('mouseleave', () => {
                langItem.style.backgroundColor = 'transparent';
            });
            
            langItem.addEventListener('click', () => {
                const selected = backend.changeLanguage(lang.code);
                if (selected) {
                    languageBtn.textContent = selected.name;
                    showNotification(`Language changed to ${selected.name}`);
                }
                dropdown.remove();
            });
            
            dropdown.appendChild(langItem);
        });
        
        languageBtn.parentNode.appendChild(dropdown);
        
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && e.target !== languageBtn) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 0);
    }
    
    // 6. SIGN IN FUNCTIONALITY
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            if (backendData.isLoggedIn) {
                showUserProfile();
            } else {
                showLoginModal();
            }
        });
    }
    
    function showLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'loginModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: #141414;
            padding: 40px;
            border-radius: 8px;
            width: 90%;
            max-width: 400px;
            color: white;
        `;
        
        modalContent.innerHTML = `
            <h2 style="margin-bottom: 20px;">Sign In</h2>
            <div style="margin-bottom: 15px;">
                <input type="email" id="loginEmail" placeholder="Email or phone number" 
                    style="width: 100%; padding: 12px; background: #333; border: 1px solid #444; color: white; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <input type="password" id="loginPassword" placeholder="Password" 
                    style="width: 100%; padding: 12px; background: #333; border: 1px solid #444; color: white; border-radius: 4px;">
            </div>
            <button id="submitLogin" style="width: 100%; padding: 12px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Sign In
            </button>
            <div style="margin-top: 15px; text-align: center;">
                <a href="#" id="forgotPassword" style="color: #b3b3b3; text-decoration: none;">Forgot password?</a>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p style="color: #b3b3b3;">New to Netflix? 
                    <a href="#" id="signUpInstead" style="color: white; text-decoration: none;">Sign up now</a>
                </p>
            </div>
            <button id="closeModal" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">
                ✕
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Event listeners for modal
        document.getElementById('closeModal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('submitLogin').addEventListener('click', () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                // Mock login - in real app, this would check against backend
                const user = backend.getUserByEmail(email);
                if (user || email.includes('@')) {
                    backendData.isLoggedIn = true;
                    showNotification('Successfully signed in!');
                    modal.remove();
                    signInBtn.textContent = 'My Account';
                    
                    // Update user in backend
                    if (!user) {
                        backend.createUser(email);
                    }
                } else {
                    showNotification('Invalid credentials. Try "demo@netflix.com" / "password123"', true);
                }
            } else {
                showNotification('Please fill in all fields', true);
            }
        });
        
        document.getElementById('signUpInstead').addEventListener('click', (e) => {
            e.preventDefault();
            modal.remove();
            simulateSignUp();
        });
        
        // Close on escape
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function showUserProfile() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        const user = backendData.userProfiles[0] || { email: 'demo@netflix.com' };
        
        modal.innerHTML = `
            <div style="background: #141414; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; color: white;">
                <h2>My Account</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Member since:</strong> ${new Date(user.joinedDate || Date.now()).toLocaleDateString()}</p>
                    <p><strong>Subscription:</strong> ${backendData.subscriptionPlan || 'Free Trial'}</p>
                </div>
                
                <h3>Recommended for you</h3>
                <div id="recommendations" style="margin: 15px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                    ${backend.getRecommendations().map(show => `
                        <div style="background: #333; padding: 10px; border-radius: 4px; min-width: 120px;">
                            <div style="font-weight: bold;">${show.title}</div>
                            <div style="font-size: 12px; color: #b3b3b3;">${show.genre} • ⭐${show.rating}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 20px;">
                    <button id="logoutBtn" style="padding: 10px 20px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Sign Out
                    </button>
                    <button id="closeAccountModal" style="padding: 10px 20px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('logoutBtn').addEventListener('click', () => {
            backendData.isLoggedIn = false;
            modal.remove();
            signInBtn.textContent = 'Sign In';
            showNotification('Successfully signed out');
        });
        
        document.getElementById('closeAccountModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // 7. GET STARTED / EMAIL SIGNUP
    if (getStartedBtn && emailInput) {
        getStartedBtn.addEventListener('click', simulateSignUp);
        
        // Enter key support
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                simulateSignUp();
            }
        });
    }
    
    function simulateSignUp() {
        const email = emailInput ? emailInput.value.trim() : '';
        
        if (!email) {
            showNotification('Please enter your email address', true);
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', true);
            return;
        }
        
        // Show loading state
        const originalText = getStartedBtn.textContent;
        getStartedBtn.textContent = 'Processing...';
        getStartedBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Check if user exists
            const existingUser = backend.getUserByEmail(email);
            
            if (existingUser) {
                showNotification('Welcome back! Signing you in...');
                backendData.isLoggedIn = true;
                signInBtn.textContent = 'My Account';
            } else {
                // Create new user
                backend.createUser(email);
                showNotification(`Welcome to Netflix! Check your email (${email}) for verification.`);
                
                // Simulate email sent
                console.log(`[SIMULATED EMAIL] Sent verification to: ${email}`);
            }
            
            // Reset form
            if (emailInput) emailInput.value = '';
            getStartedBtn.textContent = originalText;
            getStartedBtn.disabled = false;
            
            // Show subscription plans
            showSubscriptionPlans();
            
        }, 1500);
    }
    
    // 8. FAQ FUNCTIONALITY
    faqBoxes.forEach((box, index) => {
        // Get answer from backend data (cycling through available answers)
        const faqItem = backendData.faqData[index % backendData.faqData.length];
        
        // Create answer element
        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.style.cssText = `
            display: none;
            padding: 20px 0 0 0;
            color: #b3b3b3;
            font-size: 18px;
            line-height: 1.5;
            white-space: pre-line;
            border-top: 1px solid #333;
            margin-top: 15px;
        `;
        answer.textContent = faqItem.answer;
        
        // Wrap original content
        const questionContainer = document.createElement('div');
        questionContainer.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            cursor: pointer;
        `;
        
        while (box.firstChild) {
            questionContainer.appendChild(box.firstChild);
        }
        
        box.appendChild(questionContainer);
        box.appendChild(answer);
        
        // Toggle functionality
        questionContainer.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            document.querySelectorAll('.faqbox svg').forEach(svg => {
                svg.innerHTML = `<path d="M12 4V20" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4 12H20" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`;
            });
            
            if (!isOpen) {
                answer.style.display = 'block';
                // Change SVG to minus
                const svg = box.querySelector('svg');
                svg.innerHTML = `<path d="M4 12H20" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`;
                
                // Track FAQ view in backend
                backend.addToHistory({
                    type: 'faq_view',
                    question: faqItem.question
                });
            }
        });
    });
    
    // 9. FOOTER LINK HANDLING
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            
            // Simulate different backend actions based on link
            switch(linkText) {
                case 'Help Centre':
                    showNotification('Redirecting to Help Centre...');
                    setTimeout(() => {
                        alert('Help Centre would open here. This is a simulation.');
                    }, 500);
                    break;
                    
                case 'Jobs':
                    showNotification('Loading job opportunities...');
                    simulateJobListings();
                    break;
                    
                case 'Terms of Use':
                    showNotification('Showing Terms of Use...');
                    showTermsModal();
                    break;
                    
                case 'Privacy':
                    showNotification('Showing Privacy Policy...');
                    showPrivacyModal();
                    break;
                    
                default:
                    showNotification(`${linkText} page would open here.`, false, 2000);
            }
        });
    });
    
    // 10. HELPER FUNCTIONS
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, isError = false, duration = 3000) {
        // Remove existing notification
        const existing = document.getElementById('netflixNotification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.id = 'netflixNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#E50914' : '#141414'};
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            z-index: 10001;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.3s ease-out;
            border-left: 4px solid ${isError ? '#ff0000' : '#E50914'};
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 20px;">${isError ? '⚠️' : '🎬'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
        
        // Add CSS animations
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function showSubscriptionPlans() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: #141414; padding: 40px; border-radius: 8px; color: white; max-width: 800px; width: 100%;">
                <h2 style="text-align: center; margin-bottom: 30px;">Choose Your Plan</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div style="background: #1f1f1f; padding: 25px; border-radius: 8px; text-align: center; border: 2px solid #333;">
                        <h3>Mobile</h3>
                        <div style="font-size: 32px; font-weight: bold; margin: 15px 0;">₹149</div>
                        <div style="color: #b3b3b3; margin-bottom: 20px;">per month</div>
                        <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 25px;">
                            <li style="margin-bottom: 10px;">✓ Watch on 1 phone or tablet</li>
                            <li style="margin-bottom: 10px;">✓ Unlimited movies and TV shows</li>
                            <li style="margin-bottom: 10px;">✓ Download on 1 phone or tablet</li>
                        </ul>
                        <button class="plan-select" data-plan="mobile" style="width: 100%; padding: 12px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                            Select Plan
                        </button>
                    </div>
                    
                    <div style="background: #1f1f1f; padding: 25px; border-radius: 8px; text-align: center; border: 2px solid #E50914;">
                        <div style="background: #E50914; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-bottom: 10px;">MOST POPULAR</div>
                        <h3>Basic</h3>
                        <div style="font-size: 32px; font-weight: bold; margin: 15px 0;">₹199</div>
                        <div style="color: #b3b3b3; margin-bottom: 20px;">per month</div>
                        <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 25px;">
                            <li style="margin-bottom: 10px;">✓ Watch on 1 screen at a time</li>
                            <li style="margin-bottom: 10px;">✓ HD available</li>
                            <li style="margin-bottom: 10px;">✓ Download on 1 phone or tablet</li>
                        </ul>
                        <button class="plan-select" data-plan="basic" style="width: 100%; padding: 12px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                            Select Plan
                        </button>
                    </div>
                    
                    <div style="background: #1f1f1f; padding: 25px; border-radius: 8px; text-align: center; border: 2px solid #333;">
                        <h3>Premium</h3>
                        <div style="font-size: 32px; font-weight: bold; margin: 15px 0;">₹649</div>
                        <div style="color: #b3b3b3; margin-bottom: 20px;">per month</div>
                        <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 25px;">
                            <li style="margin-bottom: 10px;">✓ Watch on 4 screens at a time</li>
                            <li style="margin-bottom: 10px;">✓ Ultra HD available</li>
                            <li style="margin-bottom: 10px;">✓ Download on 4 phones or tablets</li>
                        </ul>
                        <button class="plan-select" data-plan="premium" style="width: 100%; padding: 12px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                            Select Plan
                        </button>
                    </div>
                </div>
                
                <div style="text-align: center; color: #b3b3b3; font-size: 14px;">
                    <p>All plans include unlimited access to Netflix's library. Cancel anytime.</p>
                </div>
                
                <button id="closePlanModal" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">
                    ✕
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Plan selection
        modal.querySelectorAll('.plan-select').forEach(btn => {
            btn.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                const planNames = {
                    mobile: 'Mobile (₹149/month)',
                    basic: 'Basic (₹199/month)',
                    premium: 'Premium (₹649/month)'
                };
                
                backend.updateSubscription(planNames[plan]);
                showNotification(`Successfully subscribed to ${planNames[plan]}!`);
                modal.remove();
                
                // Update UI if user is logged in
                if (backendData.isLoggedIn) {
                    signInBtn.textContent = 'My Account';
                }
            });
        });
        
        document.getElementById('closePlanModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function simulateJobListings() {
        const jobs = [
            { title: 'Frontend Developer', location: 'Mumbai', type: 'Full-time' },
            { title: 'Backend Engineer', location: 'Remote', type: 'Full-time' },
            { title: 'UX Designer', location: 'Bangalore', type: 'Contract' },
            { title: 'Content Strategist', location: 'Delhi', type: 'Full-time' }
        ];
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: #141414; padding: 30px; border-radius: 8px; color: white; max-width: 600px; width: 100%;">
                <h2>Careers at Netflix</h2>
                <p style="color: #b3b3b3; margin-bottom: 20px;">We're looking for talented people to join our team.</p>
                
                <div style="margin: 20px 0;">
                    ${jobs.map(job => `
                        <div style="background: #1f1f1f; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                            <div style="font-weight: bold; font-size: 18px;">${job.title}</div>
                            <div style="color: #b3b3b3; margin-top: 5px;">
                                <span>📍 ${job.location}</span> • 
                                <span>${job.type}</span>
                            </div>
                            <button class="apply-job" style="margin-top: 10px; padding: 8px 16px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                Apply Now
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <button id="closeJobsModal" style="padding: 10px 20px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelectorAll('.apply-job').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobTitle = this.parentNode.querySelector('div').textContent;
                showNotification(`Application for "${jobTitle}" submitted! (Simulation)`);
            });
        });
        
        document.getElementById('closeJobsModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function showTermsModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: #141414; padding: 30px; border-radius: 8px; color: white; max-width: 800px; width: 100%; max-height: 80vh; overflow-y: auto;">
                <h2>Terms of Use</h2>
                <div style="color: #b3b3b3; line-height: 1.6; margin-top: 20px;">
                    <p>This is a simulated Netflix clone for demonstration purposes only.</p>
                    <p>All content and functionality here is for educational use.</p>
                    <p>Netflix is a registered trademark of Netflix, Inc.</p>
                    <p>This project is not affiliated with, authorized, maintained, sponsored or endorsed by Netflix, Inc.</p>
                </div>
                <button id="closeTerms" style="margin-top: 20px; padding: 10px 20px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    I Understand
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeTerms').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    function showPrivacyModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: #141414; padding: 30px; border-radius: 8px; color: white; max-width: 800px; width: 100%; max-height: 80vh; overflow-y: auto;">
                <h2>Privacy Notice</h2>
                <div style="color: #b3b3b3; line-height: 1.6; margin-top: 20px;">
                    <p>This is a demo application. No real data is collected or stored.</p>
                    <p>All user interactions are simulated and data is stored locally in your browser only.</p>
                    <p>No personal information is transmitted to any server.</p>
                    <p>You can clear all data by clearing your browser's local storage.</p>
                </div>
                <button id="closePrivacy" style="margin-top: 20px; padding: 10px 20px; background: #E50914; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    I Understand
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closePrivacy').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // 11. INITIALIZE DEMO DATA
    function initializeDemoData() {
        // Add some demo users if none exist
        if (backendData.userProfiles.length === 0) {
            backend.createUser('demo@netflix.com');
            backendData.isLoggedIn = false; // Start logged out
        }
        
        // Show welcome message
        setTimeout(() => {
            console.log('Netflix Clone Ready! Try signing in with: demo@netflix.com');
        }, 1000);
    }
    
    initializeDemoData();
    
    // 12. EXTRA FEATURES: Video play simulation
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                showNotification('Playing preview...');
            } else {
                this.pause();
            }
        });
    });
    
    // 13. ADDITIONAL STYLES
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        .language-dropdown div:hover {
            background-color: #333 !important;
        }
        
        .faqbox {
            transition: all 0.3s ease;
        }
        
        .faqbox:hover {
            transform: translateY(-2px);
        }
        
        .btn {
            transition: all 0.2s ease;
        }
        
        .btn:hover {
            transform: scale(1.05);
        }
        
        .btn-red:hover {
            background-color: #ff0a16 !important;
        }
        
        input:focus {
            outline: 2px solid #E50914 !important;
            outline-offset: -2px;
        }
        
        /* Responsive improvements */
        @media (max-width: 768px) {
            #netflixNotification {
                left: 20px !important;
                right: 20px !important;
                max-width: none !important;
            }
        }
    `;
    document.head.appendChild(extraStyles);
});