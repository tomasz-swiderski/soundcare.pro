/**
 * Cookie Banner & GDPR Compliance Script
 * Handles user consent, preferences storage, and tracking initialization
 */

class CookieBanner {
    constructor() {
        this.cookieCategories = {
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        
        this.cookieKey = 'soundcare_cookie_consent';
        this.consentTimestamp = 'soundcare_consent_timestamp';
        this.banner = null;
        this.modal = null;
        this.consentExpiry = 365; // dni
        
        this.init();
    }

    init() {
        // Czekamy na załadowanie DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupBanner());
        } else {
            this.setupBanner();
        }
    }

    setupBanner() {
        this.createBannerHTML();
        this.createModalHTML();
        this.bindEvents();
        this.checkExistingConsent();
    }

    createBannerHTML() {
        const bannerHTML = `
            <div id="cookie-banner" class="cookie-banner">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-header">
                        <div class="cookie-banner-icon">
                            <i class="fas fa-cookie-bite"></i>
                        </div>
                        <h3 class="cookie-banner-title">Używamy plików cookies</h3>
                    </div>
                    <p class="cookie-banner-text">
                        Nasza strona wykorzystuje pliki cookies w celu zapewnienia najlepszego doświadczenia. 
                        Obowiązkowe cookies są konieczne do funkcjonowania strony, opcjonalne cookies pomagają 
                        nam analizować ruch i personalizować treści. 
                        <a href="polityka-prywatnosci.html" target="_blank">Dowiedz się więcej w naszej Polityce Prywatności</a>.
                    </p>
                    <div class="cookie-banner-actions">
                        <button class="cookie-btn cookie-btn-primary" onclick="cookieBanner.acceptAll()">
                            <i class="fas fa-check"></i>
                            <span>Akceptuj wszystkie</span>
                        </button>
                        <button class="cookie-btn cookie-btn-secondary" onclick="cookieBanner.acceptEssential()">
                            <i class="fas fa-shield-alt"></i>
                            <span>Tylko niezbędne</span>
                        </button>
                        <button class="cookie-btn cookie-btn-tertiary" onclick="cookieBanner.showSettings()">
                            <i class="fas fa-cog"></i>
                            <span>Ustawienia</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        this.banner = document.getElementById('cookie-banner');
    }

    createModalHTML() {
        const modalHTML = `
            <div id="cookie-settings-modal" class="cookie-settings-modal">
                <div class="cookie-settings-content">
                    <div class="cookie-settings-header">
                        <h2 class="cookie-settings-title">Ustawienia cookies</h2>
                        <button class="cookie-settings-close" onclick="cookieBanner.hideSettings()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="cookie-category essential">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Niezbędne cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="essential-cookies" checked disabled>
                                <label for="essential-cookies" class="cookie-toggle-slider"></label>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Te pliki cookies są niezbędne do funkcjonowania strony. Umożliwiają podstawowe 
                            funkcje jak nawigację po stronie, dostęp do bezpiecznych obszarów. Nie można ich wyłączyć.
                        </p>
                    </div>

                    <div class="cookie-category analytics">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Analityczne cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies" onchange="cookieBanner.updateCategory('analytics', this.checked)">
                                <label for="analytics-cookies" class="cookie-toggle-slider"></label>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony. Zbierają informacje 
                            anonimowo o najczęściej odwiedzanych stronach i pomagają nam ulepszać działanie serwisu.
                        </p>
                    </div>

                    <div class="cookie-category marketing">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Marketingowe cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies" onchange="cookieBanner.updateCategory('marketing', this.checked)">
                                <label for="marketing-cookies" class="cookie-toggle-slider"></label>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Używane do śledzenia odwiedzających w różnych witrynach w celu wyświetlania reklam 
                            dopasowanych do zainteresowań użytkownika. Pozwalają również na pomiar skuteczności kampanii reklamowych.
                        </p>
                    </div>

                    <div class="cookie-category functional">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Funkcjonalne cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="functional-cookies" onchange="cookieBanner.updateCategory('functional', this.checked)">
                                <label for="functional-cookies" class="cookie-toggle-slider"></label>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Umożliwiają zapamiętywanie wyborów użytkownika (np. język, region) i zapewniają 
                            ulepszone, bardziej spersonalizowane funkcje strony.
                        </p>
                    </div>

                    <div class="cookie-settings-actions">
                        <button class="cookie-btn cookie-btn-tertiary" onclick="cookieBanner.rejectAll()">
                            <i class="fas fa-times"></i>
                            <span>Odrzuć wszystkie</span>
                        </button>
                        <button class="cookie-btn cookie-btn-primary" onclick="cookieBanner.saveSettings()">
                            <i class="fas fa-save"></i>
                            <span>Zapisz ustawienia</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('cookie-settings-modal');
    }

    bindEvents() {
        // Zamykanie modalu po kliknięciu w tło
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideSettings();
            }
        });

        // Obsługa ESC dla modalu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.hideSettings();
            }
        });
    }

    checkExistingConsent() {
        if (!this.validateConsent()) {
            console.log('🍪 No valid consent found, showing banner');
            this.showBanner();
            return;
        }
        
        const consent = localStorage.getItem(this.cookieKey);
        const consentData = JSON.parse(consent);
        const consentTime = new Date(consentData.timestamp);
        const now = new Date();
        const daysPassed = (now - consentTime) / (1000 * 60 * 60 * 24);
        
        if (daysPassed < this.consentExpiry) {
            // Zgoda jest aktualna
            this.cookieCategories = consentData.categories;
            this.initializeTracking();
            console.log('🍪 Valid consent found, initializing tracking');
            return;
        }
        
        // Zgoda wygasła
        console.log('🍪 Consent expired, showing banner');
        this.showBanner();
    }

    showBanner() {
        setTimeout(() => {
            this.banner.classList.add('show');
            document.body.classList.add('cookie-banner-visible');
        }, 1000); // Opóźnienie 1 sekunda po załadowaniu strony
    }

    hideBanner() {
        this.banner.classList.remove('show');
        this.banner.classList.add('hide');
        document.body.classList.remove('cookie-banner-visible');
        
        setTimeout(() => {
            this.banner.style.display = 'none';
        }, 400);
    }

    showSettings() {
        this.updateModalSettings();
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideSettings() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    updateModalSettings() {
        // Aktualizuj checkboxy zgodnie z aktualnym stanem
        document.getElementById('analytics-cookies').checked = this.cookieCategories.analytics;
        document.getElementById('marketing-cookies').checked = this.cookieCategories.marketing;
        document.getElementById('functional-cookies').checked = this.cookieCategories.functional;
    }

    updateCategory(category, enabled) {
        this.cookieCategories[category] = enabled;
    }

    acceptAll() {
        this.cookieCategories = {
            essential: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        this.saveConsent();
        this.initializeTracking();
        this.hideBanner();
    }

    acceptEssential() {
        this.cookieCategories = {
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.saveConsent();
        this.initializeTracking();
        this.hideBanner();
    }

    rejectAll() {
        this.cookieCategories = {
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.saveConsent();
        this.initializeTracking();
        this.hideSettings();
        this.hideBanner();
    }

    saveSettings() {
        this.saveConsent();
        this.initializeTracking();
        this.hideSettings();
        this.hideBanner();
    }

    saveConsent() {
        const consentData = {
            categories: this.cookieCategories,
            timestamp: new Date().toISOString(),
            version: '1.0',
            userAgent: navigator.userAgent,
            url: window.location.href,
            consentMethod: 'explicit' // explicit consent given by user
        };
        
        localStorage.setItem(this.cookieKey, JSON.stringify(consentData));
        localStorage.setItem(this.consentTimestamp, new Date().toISOString());
        
        console.log('🍪 Consent saved:', consentData);
    }

    // Validate existing consent
    validateConsent() {
        const consent = localStorage.getItem(this.cookieKey);
        if (!consent) return false;
        
        try {
            const consentData = JSON.parse(consent);
            
            // Check if consent has required fields
            if (!consentData.categories || !consentData.timestamp) {
                console.warn('🍪 Invalid consent data structure');
                return false;
            }
            
            // Check consent version (for future compatibility)
            if (consentData.version !== '1.0') {
                console.warn('🍪 Outdated consent version');
                return false;
            }
            
            return true;
        } catch (e) {
            console.error('🍪 Error validating consent:', e);
            return false;
        }
    }

    initializeTracking() {
        console.log('🍪 Initializing tracking with consent:', this.cookieCategories);
        
        // Google Analytics
        if (this.cookieCategories.analytics) {
            this.initGoogleAnalytics();
            console.log('✅ Google Analytics initialized');
        } else {
            console.log('❌ Google Analytics blocked by user consent');
        }

        // Facebook Pixel
        if (this.cookieCategories.marketing) {
            this.initFacebookPixel();
            console.log('✅ Facebook Pixel initialized');
        } else {
            console.log('❌ Facebook Pixel blocked by user consent');
        }

        // Inne narzędzia śledzące
        if (this.cookieCategories.functional) {
            this.initFunctionalTools();
            console.log('✅ Functional tools initialized');
        } else {
            console.log('❌ Functional tools blocked by user consent');
        }

        // Wywołaj zdarzenie dla innych skryptów
        this.dispatchConsentEvent();
    }

    initGoogleAnalytics() {
        // Inicjalizacja Google Analytics jeśli jeszcze nie jest załadowana
        if (typeof gtag === 'undefined') {
            // Set up Google Analytics with consent mode
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Configure consent mode before GA loads
            gtag('consent', 'default', {
                'ad_storage': this.cookieCategories.marketing ? 'granted' : 'denied',
                'analytics_storage': this.cookieCategories.analytics ? 'granted' : 'denied',
                'functionality_storage': this.cookieCategories.functional ? 'granted' : 'denied',
                'personalization_storage': this.cookieCategories.functional ? 'granted' : 'denied',
                'security_storage': 'granted'
            });
            
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script);

            script.onload = () => {
                gtag('js', new Date());
                gtag('config', 'GA_MEASUREMENT_ID', {
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=Strict;Secure',
                    allow_google_signals: this.cookieCategories.marketing,
                    allow_ad_personalization_signals: this.cookieCategories.marketing
                });
            };
        } else {
            // Update consent if GA is already loaded
            gtag('consent', 'update', {
                'ad_storage': this.cookieCategories.marketing ? 'granted' : 'denied',
                'analytics_storage': this.cookieCategories.analytics ? 'granted' : 'denied',
                'functionality_storage': this.cookieCategories.functional ? 'granted' : 'denied',
                'personalization_storage': this.cookieCategories.functional ? 'granted' : 'denied'
            });
        }
    }

    initFacebookPixel() {
        // Inicjalizacja Facebook Pixel
        if (typeof fbq === 'undefined') {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
            fbq('track', 'PageView');
        }
    }

    initFunctionalTools() {
        // Inicjalizacja narzędzi funkcjonalnych (np. chat widget)
        console.log('Initializing functional tools...');
    }

    dispatchConsentEvent() {
        // Wyślij zdarzenie o zmianie zgody
        const event = new CustomEvent('cookieConsentChanged', {
            detail: {
                categories: this.cookieCategories,
                timestamp: new Date().toISOString()
            }
        });
        window.dispatchEvent(event);
    }

    // Publiczne API
    hasConsent(category) {
        return this.cookieCategories[category] || false;
    }

    revokeConsent() {
        localStorage.removeItem(this.cookieKey);
        localStorage.removeItem(this.consentTimestamp);
        this.cookieCategories = {
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.showBanner();
    }

    getConsent() {
        const consent = localStorage.getItem(this.cookieKey);
        if (!consent) return { ...this.cookieCategories };
        
        try {
            const consentData = JSON.parse(consent);
            return consentData.categories ? consentData.categories : { ...this.cookieCategories };
        } catch (e) {
            console.error('🍪 Error parsing consent data:', e);
            return { ...this.cookieCategories };
        }
    }

    // Export consent data for GDPR compliance
    exportConsentData() {
        const consent = localStorage.getItem(this.cookieKey);
        if (!consent) return null;
        
        try {
            const consentData = JSON.parse(consent);
            return {
                ...consentData,
                exportedAt: new Date().toISOString(),
                domain: window.location.hostname
            };
        } catch (e) {
            console.error('🍪 Error exporting consent data:', e);
            return null;
        }
    }

    // Generate compliance report
    generateComplianceReport() {
        const consentData = this.exportConsentData();
        if (!consentData) return null;
        
        return {
            domain: window.location.hostname,
            consentStatus: 'active',
            consentDate: consentData.timestamp,
            consentMethod: consentData.consentMethod,
            consentVersion: consentData.version,
            categories: consentData.categories,
            userAgent: consentData.userAgent,
            originalUrl: consentData.url,
            reportGeneratedAt: new Date().toISOString(),
            gdprRights: {
                rightToAccess: 'Available via exportConsentData()',
                rightToRectification: 'Available via cookie settings',
                rightToErasure: 'Available via revokeConsent()',
                rightToPortability: 'Available via exportConsentData()',
                rightToWithdrawConsent: 'Available via revokeConsent()'
            }
        };
    }
}

// Inicjalizacja globalnego obiektu cookie banner
window.cookieBanner = new CookieBanner();

// Eksport dla użycia w innych skryptach
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieBanner;
}

// Dodaj funkcje pomocnicze do window
window.cookieUtils = {
    hasConsent: (category) => window.cookieBanner.hasConsent(category),
    revokeConsent: () => window.cookieBanner.revokeConsent(),
    getConsent: () => window.cookieBanner.getConsent(),
    exportData: () => window.cookieBanner.exportConsentData(),
    complianceReport: () => window.cookieBanner.generateComplianceReport(),
    // Debug functions
    forceShowBanner: () => {
        localStorage.removeItem(window.cookieBanner.cookieKey);
        localStorage.removeItem(window.cookieBanner.consentTimestamp);
        window.cookieBanner.showBanner();
    },
    clearAllData: () => {
        localStorage.removeItem(window.cookieBanner.cookieKey);
        localStorage.removeItem(window.cookieBanner.consentTimestamp);
        console.log('Cookie consent data cleared');
    },
    debugInfo: () => {
        const consentData = window.cookieBanner.exportConsentData();
        console.log('Cookie Banner Debug Info:', {
            consent: window.cookieBanner.getConsent(),
            fullConsentData: consentData,
            bannerVisible: window.cookieBanner.banner.classList.contains('show'),
            complianceReport: window.cookieBanner.generateComplianceReport()
        });
    }
};

// Nasłuchuj na zmiany zgody
window.addEventListener('cookieConsentChanged', (e) => {
    console.log('Cookie consent changed:', e.detail);
    
    // Tutaj możesz dodać dodatkową logikę, np.:
    // - Włączenie/wyłączenie innych narzędzi
    // - Wysłanie informacji do analytics
    // - Odświeżenie reklam
});

// Debug mode for development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🍪 Cookie Banner Debug Mode Active');
    console.log('Available debug functions:');
    console.log('- cookieUtils.forceShowBanner() - Force show banner');
    console.log('- cookieUtils.clearAllData() - Clear all consent data');
    console.log('- cookieUtils.debugInfo() - Show debug information');
    console.log('- cookieUtils.exportData() - Export consent data (GDPR)');
    console.log('- cookieUtils.complianceReport() - Generate compliance report');
} 