/**
 * DairyPulse — Master JavaScript Application Engine (Revamped Modular Format)
 * Pure Vanilla JavaScript: Fast, Responsive & Clean
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, icon = '🌱', duration = 3400) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-size: 1.1rem;">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }

  // =========================================================================
  // 2. UNIFIED NAVIGATION & VIEW ROUTING ENGINE
  // =========================================================================
  const viewSections = document.querySelectorAll('.view-section');

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileBuyBtn = document.getElementById('mobileBuyBtn');
  const mobileDemoBtn = document.getElementById('mobileDemoBtn');
  const mainBrandLogo = document.getElementById('mainBrandLogo');

  const navMoreDropdownBtn = document.getElementById('navMoreDropdownBtn');
  const navMoreDropdownMenu = document.getElementById('navMoreDropdownMenu');

  function openMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('active');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
  }

  function closeMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('active');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Desktop Dropdown Menu Toggle & Outside Click
  if (navMoreDropdownBtn && navMoreDropdownMenu) {
    navMoreDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMoreDropdownMenu.classList.contains('active');
      navMoreDropdownMenu.classList.toggle('active', !isOpen);
      navMoreDropdownBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!navMoreDropdownMenu.contains(e.target) && !navMoreDropdownBtn.contains(e.target)) {
        navMoreDropdownMenu.classList.remove('active');
        navMoreDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function switchView(targetViewId) {
    viewSections.forEach(sec => {
      const match = sec.id === targetViewId;
      sec.classList.toggle('active-view', match);
    });
    closeMobileNav();
  }

  function handleNavTarget(target) {
    if (!target) return;

    closeMobileNav();
    if (navMoreDropdownMenu) navMoreDropdownMenu.classList.remove('active');
    if (navMoreDropdownBtn) navMoreDropdownBtn.setAttribute('aria-expanded', 'false');

    // Update active highlight on nav buttons
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.navTarget === target);
    });

    switch (target) {
      case 'home':
        switchView('viewOverview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'solution':
        switchView('viewOverview');
        const solSec = document.getElementById('solutionSection');
        if (solSec) solSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 450, behavior: 'smooth' });
        break;

      case 'smart-belt':
        switchView('viewSmartBelt');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'features':
        switchView('viewSmartBelt');
        const featSec = document.getElementById('specsBentoSection') || document.getElementById('smartBeltSection');
        if (featSec) featSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'how-it-works':
        switchView('viewOverview');
        const howSec = document.getElementById('howItWorksSection');
        if (howSec) howSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 600, behavior: 'smooth' });
        break;

      case 'pricing':
        switchView('viewStore');
        const priceSec = document.getElementById('pricingSection');
        if (priceSec) priceSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'about':
        switchView('viewContact');
        const aboutSec = document.getElementById('aboutSection');
        if (aboutSec) aboutSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'contact':
        switchView('viewContact');
        const contactBox = document.getElementById('contactFormBox');
        if (contactBox) contactBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'dashboard':
        switchView('viewDashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'control-center':
        switchView('viewControlCenter');
        if (typeof switchControlCenterTab === 'function') switchControlCenterTab('general');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'control-devices':
        switchView('viewControlCenter');
        if (typeof switchControlCenterTab === 'function') switchControlCenterTab('devices');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'control-alerts':
        switchView('viewControlCenter');
        if (typeof switchControlCenterTab === 'function') switchControlCenterTab('alerts');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'control-ai':
        switchView('viewControlCenter');
        if (typeof switchControlCenterTab === 'function') switchControlCenterTab('ai-insights');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'control-reports':
        switchView('viewControlCenter');
        if (typeof switchControlCenterTab === 'function') switchControlCenterTab('reports');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      default:
        if (document.getElementById(target)) {
          switchView(target);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
    }
  }

  // Hook all data-nav-target elements
  document.querySelectorAll('[data-nav-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavTarget(btn.dataset.navTarget);
    });
  });

  // Support legacy data-view-target buttons if any remain
  document.querySelectorAll('[data-view-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(btn.dataset.viewTarget);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Logo returns to home
  if (mainBrandLogo) {
    mainBrandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavTarget('home');
    });
  }

  // Footer jump links
  document.querySelectorAll('.footer-jump-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const jmp = link.dataset.jump;
      if (jmp) {
        if (jmp.startsWith('view')) switchView(jmp);
        else handleNavTarget(jmp);
      }
    });
  });

  // Dedicated Request Demo Trigger Handler
  function triggerDemoRequest() {
    closeMobileNav();
    switchView('viewContact');
    const contactBox = document.getElementById('contactFormBox');
    if (contactBox) contactBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const nameInput = document.getElementById('inputName');
    if (nameInput) setTimeout(() => nameInput.focus(), 300);
    showToast('Ready to schedule your live farm demo', '📞');
  }

  const topDemoBtn = document.getElementById('topDemoBtn');
  if (topDemoBtn) topDemoBtn.addEventListener('click', triggerDemoRequest);
  if (mobileDemoBtn) mobileDemoBtn.addEventListener('click', triggerDemoRequest);

  // Dedicated Buy Smart Belt Trigger Handler
  function triggerBuySmartBelt() {
    closeMobileNav();
    if (typeof openOrderModal === 'function') {
      openOrderModal(selectedSpec || 'Cow', collarQty || 1);
    } else {
      switchView('viewStore');
    }
    showToast('DairyPulse Smart Belt — Submit Purchase Request', '🛡️');
  }

  const buyButtons = [
    document.getElementById('topBuyBtn'),
    document.getElementById('mobileBuyBtn'),
    document.getElementById('heroBuySmartBeltBtn'),
    document.getElementById('storyBuyBtn'),
    document.getElementById('beltGotoStoreBtn'),
    document.getElementById('videoBuyBeltBtn')
  ];

  buyButtons.forEach(btn => {
    if (btn) btn.addEventListener('click', triggerBuySmartBelt);
  });

  const heroExploreBeltBtn = document.getElementById('heroExploreBeltBtn');
  if (heroExploreBeltBtn) {
    heroExploreBeltBtn.addEventListener('click', () => {
      handleNavTarget('smart-belt');
      showToast('Exploring Smart Belt Hardware Specifications', '🛡️');
    });
  }

  const heroOpenDashBtn = document.getElementById('heroOpenDashBtn');
  const storyExploreDashBtn = document.getElementById('storyExploreDashBtn');
  const beltGotoDashBtn = document.getElementById('beltGotoDashBtn');

  [heroOpenDashBtn, storyExploreDashBtn, beltGotoDashBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        handleNavTarget('dashboard');
        showToast('Opened Live FarmOS Dashboard', '📊');
      });
    }
  });

  // =========================================================================
  // 3. INTERACTIVE FARMOS DASHBOARD
  // =========================================================================
  const animalRows = document.querySelectorAll('#portalAnimalsTable .animal-row');
  const dashSelectedId = document.getElementById('dashSelectedId');
  const dashSelectedPill = document.getElementById('dashSelectedPill');
  const dashTempDisplay = document.getElementById('dashTempDisplay');
  const dashRuminationDisplay = document.getElementById('dashRuminationDisplay');
  const dashAlertText = document.getElementById('dashAlertText');
  const sparkCurve = document.getElementById('sparkCurve');
  const sparkArea = document.getElementById('sparkArea');

  const DASH_DATA = {
    'DP-1024': {
      type: 'Cow',
      status: 'Healthy',
      pillClass: 'healthy',
      temp: '38.5°C',
      rumination: '480 min',
      curve: 'M 0,80 Q 80,60 160,70 T 320,50',
      area: 'M 0,80 Q 80,60 160,70 T 320,50 L 320,120 L 0,120 Z',
      stroke: '#16a34a',
      note: '✅ Animal is ruminating normally. No thermal distress or health deviation detected.'
    },
    'DP-1025': {
      type: 'Cow',
      status: 'Healthy',
      pillClass: 'healthy',
      temp: '38.6°C',
      rumination: '510 min',
      curve: 'M 0,70 Q 80,75 160,65 T 320,60',
      area: 'M 0,70 Q 80,75 160,65 T 320,60 L 320,120 L 0,120 Z',
      stroke: '#16a34a',
      note: '✅ Normal digestive baseline. Scheduled for afternoon milking cycle in Shed 2.'
    },
    'DP-2041': {
      type: 'Buffalo',
      status: 'Attention',
      pillClass: 'attention',
      temp: '39.2°C',
      rumination: '340 min',
      curve: 'M 0,60 Q 80,70 160,40 T 320,30',
      area: 'M 0,60 Q 80,70 160,40 T 320,30 L 320,120 L 0,120 Z',
      stroke: '#d97706',
      note: '⚠️ Rumination dropped by 18% over the last 12 hours. Suggest visual check on water intake & feed.'
    },
    'DP-2042': {
      type: 'Buffalo',
      status: 'Alert',
      pillClass: 'alert',
      temp: '39.8°C',
      rumination: 'Restless Heat',
      curve: 'M 0,90 Q 80,40 160,25 T 320,15',
      area: 'M 0,90 Q 80,40 160,25 T 320,15 L 320,120 L 0,120 Z',
      stroke: '#dc2626',
      note: '🚨 High activity & thermal elevation detected. Probable estrus cycle or acute thermal distress.'
    }
  };

  animalRows.forEach(row => {
    row.addEventListener('click', () => {
      animalRows.forEach(r => r.classList.remove('selected-animal'));
      row.classList.add('selected-animal');

      const id = row.dataset.id;
      const data = DASH_DATA[id];
      if (!data) return;

      dashSelectedId.textContent = `${id} (${data.type})`;
      dashSelectedPill.textContent = data.status;
      dashSelectedPill.className = `badge-status ${data.pillClass}`;
      dashTempDisplay.textContent = data.temp;
      dashRuminationDisplay.textContent = data.rumination;
      dashAlertText.innerHTML = data.note;

      if (sparkCurve && sparkArea) {
        sparkCurve.setAttribute('d', data.curve);
        sparkCurve.setAttribute('stroke', data.stroke);
        sparkArea.setAttribute('d', data.area);
      }

      showToast(`Telemetry updated for ${id}`, '📊');
    });
  });

  // =========================================================================
  // =========================================================================
  // 4. STORE & PRICING LOGIC (DYNAMIC VOLUME DISCOUNTS & SAVINGS)
  // =========================================================================
  let selectedSpec = 'Cow';
  let collarQty = 1;
  const LIST_PRICE = 4499; // Standard MRP before launch/volume discounts

  const btnSpecCow = document.getElementById('btnSpecCow');
  const btnSpecBuffalo = document.getElementById('btnSpecBuffalo');
  const btnQtyMinus = document.getElementById('btnQtyMinus');
  const btnQtyPlus = document.getElementById('btnQtyPlus');
  const displayQtyVal = document.getElementById('displayQtyVal');
  const storePriceTotal = document.getElementById('storePriceTotal');
  const storeOriginalStrike = document.getElementById('storeOriginalStrike');
  const storeDiscountBadge = document.getElementById('storeDiscountBadge');
  const qtyDiscountHint = document.getElementById('qtyDiscountHint');
  const savingsBannerText = document.getElementById('savingsBannerText');

  const tierSingle = document.getElementById('tierSingle');
  const tierHerd = document.getElementById('tierHerd');
  const tierFarm = document.getElementById('tierFarm');

  /**
   * Calculate tiered collar pricing and live savings
   */
  function getCollarPricing(qty) {
    let unitPrice = 3499;
    let tier = 'single';
    let discountPercent = '22%';
    let badgeText = '22% OFF Launch Deal';
    let hintText = '22% Launch Discount (Save ₹1,000/belt)';
    let bannerText = `🎁 Launch Offer: You save ₹${((LIST_PRICE - 3499) * qty).toLocaleString('en-IN')} on your collar order!`;

    if (qty >= 10) {
      unitPrice = 2499;
      tier = 'farm';
      discountPercent = '44%';
      badgeText = '44% OFF Farm Pack + Free Hub';
      hintText = '44% Mega Discount + Free Hub';
      bannerText = `🎉 Mega Farm Deal: You save ₹${((LIST_PRICE - 2499) * qty).toLocaleString('en-IN')} + Free LoRa Gateway Hub (₹8,500 value)!`;
    } else if (qty >= 5) {
      unitPrice = 2999;
      tier = 'herd';
      discountPercent = '33%';
      badgeText = '33% OFF Herd Pack';
      hintText = '33% Herd Discount (Save ₹1,500/belt)';
      bannerText = `🔥 Herd Discount Active: You save ₹${((LIST_PRICE - 2999) * qty).toLocaleString('en-IN')} across ${qty} collars!`;
    }

    const originalTotal = LIST_PRICE * qty;
    const discountedTotal = unitPrice * qty;
    const totalSavings = originalTotal - discountedTotal;

    return {
      unitPrice,
      tier,
      discountPercent,
      badgeText,
      hintText,
      bannerText,
      originalTotal,
      discountedTotal,
      totalSavings
    };
  }

  function updateStorePrice() {
    const pricing = getCollarPricing(collarQty);

    if (storePriceTotal) {
      storePriceTotal.textContent = `₹${pricing.discountedTotal.toLocaleString('en-IN')}`;
    }
    if (storeOriginalStrike) {
      storeOriginalStrike.textContent = `₹${pricing.originalTotal.toLocaleString('en-IN')}`;
    }
    if (storeDiscountBadge) {
      storeDiscountBadge.textContent = pricing.badgeText;
    }
    if (qtyDiscountHint) {
      qtyDiscountHint.textContent = pricing.hintText;
    }
    if (savingsBannerText) {
      savingsBannerText.textContent = pricing.bannerText;
    }

    // Toggle active tier cards
    if (tierSingle) tierSingle.classList.toggle('active', pricing.tier === 'single');
    if (tierHerd) tierHerd.classList.toggle('active', pricing.tier === 'herd');
    if (tierFarm) tierFarm.classList.toggle('active', pricing.tier === 'farm');
  }

  // Animal sizing selector
  if (btnSpecCow && btnSpecBuffalo) {
    btnSpecCow.addEventListener('click', () => {
      btnSpecCow.classList.add('active');
      btnSpecBuffalo.classList.remove('active');
      selectedSpec = 'Cow';
      showToast('Selected Dairy Cow Collar sizing', '🐄');
    });

    btnSpecBuffalo.addEventListener('click', () => {
      btnSpecBuffalo.classList.add('active');
      btnSpecCow.classList.remove('active');
      selectedSpec = 'Buffalo';
      showToast('Selected Water Buffalo Collar sizing', '🐃');
    });
  }

  // Stepper controls
  if (btnQtyMinus && btnQtyPlus && displayQtyVal) {
    btnQtyMinus.addEventListener('click', () => {
      if (collarQty > 1) {
        collarQty--;
        displayQtyVal.textContent = collarQty;
        updateStorePrice();
      }
    });

    btnQtyPlus.addEventListener('click', () => {
      if (collarQty < 100) {
        collarQty++;
        displayQtyVal.textContent = collarQty;
        updateStorePrice();
      }
    });
  }

  // Clickable volume tier cards
  if (tierSingle) {
    tierSingle.addEventListener('click', () => {
      collarQty = 1;
      if (displayQtyVal) displayQtyVal.textContent = collarQty;
      updateStorePrice();
      showToast('Selected 1–4 units Launch Discount tier (₹3,499/belt)', '🏷️');
    });
  }
  if (tierHerd) {
    tierHerd.addEventListener('click', () => {
      collarQty = 5;
      if (displayQtyVal) displayQtyVal.textContent = collarQty;
      updateStorePrice();
      showToast('Applied 5–9 units Herd Discount (₹2,999/belt — Save ₹1,500 each)', '🐄');
    });
  }
  if (tierFarm) {
    tierFarm.addEventListener('click', () => {
      collarQty = 10;
      if (displayQtyVal) displayQtyVal.textContent = collarQty;
      updateStorePrice();
      showToast('Applied 10+ units Mega Farm Discount (₹2,499/belt + Free Hub!)', '🚜');
    });
  }

  // =========================================================================
  // 4B. SUBSCRIPTION BILLING FREQUENCY (MONTHLY vs ANNUAL DISCOUNT)
  // =========================================================================
  const btnBillingMonthly = document.getElementById('btnBillingMonthly');
  const btnBillingAnnual = document.getElementById('btnBillingAnnual');
  const starterStrikePrice = document.getElementById('starterStrikePrice');
  const starterPriceDisplay = document.getElementById('starterPriceDisplay');
  const starterPeriodDisplay = document.getElementById('starterPeriodDisplay');
  const starterDiscountPill = document.getElementById('starterDiscountPill');
  const farmStrikePrice = document.getElementById('farmStrikePrice');
  const farmPriceDisplay = document.getElementById('farmPriceDisplay');
  const farmPeriodDisplay = document.getElementById('farmPeriodDisplay');
  const farmDiscountPill = document.getElementById('farmDiscountPill');
  const planButtons = document.querySelectorAll('.plan-select-btn');

  let isAnnualBilling = true;

  function updateSubscriptionBilling(annual) {
    isAnnualBilling = annual;

    if (btnBillingAnnual && btnBillingMonthly) {
      btnBillingAnnual.classList.toggle('active', isAnnualBilling);
      btnBillingMonthly.classList.toggle('active', !isAnnualBilling);
    }

    if (isAnnualBilling) {
      if (starterStrikePrice) { starterStrikePrice.style.display = 'inline-block'; starterStrikePrice.textContent = '₹1,000'; }
      if (starterPriceDisplay) starterPriceDisplay.textContent = '₹750';
      if (starterPeriodDisplay) starterPeriodDisplay.textContent = '/ month (Billed annually at ₹9,000)';
      if (starterDiscountPill) { starterDiscountPill.style.display = 'inline-block'; starterDiscountPill.textContent = 'SAVE 25%'; }

      if (farmStrikePrice) { farmStrikePrice.style.display = 'inline-block'; farmStrikePrice.textContent = '₹5,000'; }
      if (farmPriceDisplay) farmPriceDisplay.textContent = '₹3,750';
      if (farmPeriodDisplay) farmPeriodDisplay.textContent = '/ month (Billed annually at ₹45,000)';
      if (farmDiscountPill) { farmDiscountPill.style.display = 'inline-block'; farmDiscountPill.textContent = 'SAVE ₹15,000/YR'; }

      if (planButtons[0]) planButtons[0].dataset.plan = 'Starter Plan (₹750/mo Annual Billing)';
      if (planButtons[1]) planButtons[1].dataset.plan = 'Commercial Farm Plan (₹3,750/mo Annual Billing)';
    } else {
      if (starterStrikePrice) starterStrikePrice.style.display = 'none';
      if (starterPriceDisplay) starterPriceDisplay.textContent = '₹1,000';
      if (starterPeriodDisplay) starterPeriodDisplay.textContent = '/ month (Billed monthly)';
      if (starterDiscountPill) starterDiscountPill.style.display = 'none';

      if (farmStrikePrice) farmStrikePrice.style.display = 'none';
      if (farmPriceDisplay) farmPriceDisplay.textContent = '₹5,000';
      if (farmPeriodDisplay) farmPeriodDisplay.textContent = '/ month (Billed monthly)';
      if (farmDiscountPill) farmDiscountPill.style.display = 'none';

      if (planButtons[0]) planButtons[0].dataset.plan = 'Starter Plan (₹1,000/mo Monthly Billing)';
      if (planButtons[1]) planButtons[1].dataset.plan = 'Commercial Farm Plan (₹5,000/mo Monthly Billing)';
    }
  }

  if (btnBillingMonthly) {
    btnBillingMonthly.addEventListener('click', () => {
      updateSubscriptionBilling(false);
      showToast('Switched to Standard Monthly billing', '🗓️');
    });
  }

  if (btnBillingAnnual) {
    btnBillingAnnual.addEventListener('click', () => {
      updateSubscriptionBilling(true);
      showToast('Annual Discount Applied: 25% OFF + 2 Months Free! 🎁', '💰');
    });
  }

  // Pre-fill plan selection into contact form
  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan || 'DairyPulse Subscription';
      switchView('viewContact');
      const inputMessage = document.getElementById('inputMessage');
      if (inputMessage) {
        inputMessage.value = `I am interested in subscribing to the DairyPulse ${plan} for my dairy farm. Please guide me on gateway connection.`;
      }
      const inputName = document.getElementById('inputName');
      if (inputName) inputName.focus();
      showToast(`Selected ${plan}. Please complete the farm request form!`, '📋');
    });
  });

  // =========================================================================
  // 5. CART DRAWER & CHECKOUT MODAL WITH VOLUME DISCOUNTS
  // =========================================================================
  let cart = [];
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartDrawerPanel = document.getElementById('cartDrawerPanel');
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const navCartCount = document.getElementById('navCartCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalText = document.getElementById('cartSubtotalText');
  const btnStoreAddToCart = document.getElementById('btnStoreAddToCart');
  const btnStoreBuyNow = document.getElementById('btnStoreBuyNow');
  const btnCartCheckout = document.getElementById('btnCartCheckout');

  const orderModal = document.getElementById('orderModal');
  const closeOrderModalBtn = document.getElementById('closeOrderModalBtn');
  const orderFormSubmit = document.getElementById('orderFormSubmit');
  const modalSpecType = document.getElementById('modalSpecType');
  const modalQty = document.getElementById('modalQty');
  const modalTotalSum = document.getElementById('modalTotalSum');
  const modalSavingsTag = document.getElementById('modalSavingsTag');

  const invoiceModal = document.getElementById('invoiceModal');
  const closeInvoiceBtn = document.getElementById('closeInvoiceBtn');
  const invoiceDetailsBox = document.getElementById('invoiceDetailsBox');

  function updateCartDisplay() {
    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (navCartCount) navCartCount.textContent = totalCount;

    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    if (cartSubtotalText) cartSubtotalText.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    if (!cartItemsList) return;
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--slate-400);">
          <div style="font-size: 2rem; margin-bottom: 6px;">🛒</div>
          <p style="font-size: 0.9rem;">Your farm cart is empty.</p>
        </div>
      `;
      return;
    }

    cartItemsList.innerHTML = cart.map((item, idx) => {
      let discountTag = '';
      if (item.quantity >= 10) {
        discountTag = '<span style="font-size: 0.72rem; color: #16a34a; font-weight: 700; display: block;">🎉 44% Farm Discount + Free Hub</span>';
      } else if (item.quantity >= 5) {
        discountTag = '<span style="font-size: 0.72rem; color: #16a34a; font-weight: 700; display: block;">🔥 33% Herd Pack Discount</span>';
      } else {
        discountTag = '<span style="font-size: 0.72rem; color: #16a34a; font-weight: 700; display: block;">🏷️ 22% Launch Discount</span>';
      }

      return `
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--slate-100); padding: 12px; border-radius: var(--radius-md);">
          <div>
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--brand-green-dark);">${item.name}</div>
            <div style="font-size: 0.78rem; color: var(--slate-400);">${item.spec} Strap</div>
            ${discountTag}
            <div style="font-size: 0.82rem; font-weight: 600; color: var(--brand-green-primary); margin-top: 2px;">
              ₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}
            </div>
          </div>
          <button class="remove-cart-item" data-idx="${idx}" style="color: #ef4444; font-size: 1.1rem; padding: 6px; cursor: pointer; background: transparent; border: none;">✕</button>
        </div>
      `;
    }).join('');

    cartItemsList.querySelectorAll('.remove-cart-item').forEach(b => {
      b.addEventListener('click', () => {
        cart.splice(parseInt(b.dataset.idx), 1);
        updateCartDisplay();
        showToast('Removed item from cart', '🗑️');
      });
    });
  }

  function openCartDrawer() {
    if (cartDrawerPanel) cartDrawerPanel.classList.add('active');
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add('active');
  }

  function closeCartDrawer() {
    if (cartDrawerPanel) cartDrawerPanel.classList.remove('active');
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('active');
  }

  if (cartTriggerBtn) cartTriggerBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCartDrawer);

  if (btnStoreAddToCart) {
    btnStoreAddToCart.addEventListener('click', () => {
      const pricing = getCollarPricing(collarQty);
      const existing = cart.find(i => i.spec === selectedSpec);

      if (existing) {
        existing.quantity += collarQty;
        // Recalculate tiered unit price based on accumulated quantity
        existing.price = getCollarPricing(existing.quantity).unitPrice;
      } else {
        cart.push({
          name: 'DairyPulse Smart Belt',
          spec: selectedSpec,
          quantity: collarQty,
          price: pricing.unitPrice
        });
      }
      updateCartDisplay();
      openCartDrawer();
      showToast(`Added ${collarQty}x ${selectedSpec} Belt(s) with ${pricing.discountPercent} Discount!`, '🛍️');
    });
  }

  function openOrderModal(spec, qty) {
    if (modalSpecType) modalSpecType.value = spec;
    if (modalQty) modalQty.value = qty;
    updateModalPriceSum();
    if (orderModal) orderModal.classList.add('active');
    closeCartDrawer();
  }

  function updateModalPriceSum() {
    const q = parseInt(modalQty.value) || 1;
    const pricing = getCollarPricing(q);

    if (modalTotalSum) {
      modalTotalSum.textContent = `₹${pricing.discountedTotal.toLocaleString('en-IN')}`;
    }
    if (modalSavingsTag) {
      modalSavingsTag.textContent = `You save ₹${pricing.totalSavings.toLocaleString('en-IN')} (${pricing.discountPercent} OFF MRP ₹4,499)`;
    }
  }

  if (modalQty) modalQty.addEventListener('input', updateModalPriceSum);

  if (btnStoreBuyNow) {
    btnStoreBuyNow.addEventListener('click', () => {
      openOrderModal(selectedSpec, collarQty);
    });
  }

  if (btnCartCheckout) {
    btnCartCheckout.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Cart is empty. Add a belt first!', '⚠️');
        return;
      }
      const totalQ = cart.reduce((s, i) => s + i.quantity, 0);
      const spec = cart[0].spec;
      openOrderModal(spec, totalQ);
    });
  }

  if (closeOrderModalBtn) {
    closeOrderModalBtn.addEventListener('click', () => {
      if (orderModal) orderModal.classList.remove('active');
    });
  }

  // Order submission
  if (orderFormSubmit) {
    orderFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('modalCustomerName');
      const phoneEl = document.getElementById('modalPhone');
      const emailEl = document.getElementById('modalEmail');
      const farmEl = document.getElementById('modalFarm');
      const locEl = document.getElementById('modalLocation');
      const animalsEl = document.getElementById('modalAnimals');

      const errName = document.getElementById('errModalName');
      const errPhone = document.getElementById('errModalPhone');
      const errEmail = document.getElementById('errModalEmail');
      const errFarm = document.getElementById('errModalFarm');
      const errLoc = document.getElementById('errModalLocation');
      const errAnimals = document.getElementById('errModalAnimals');

      [errName, errPhone, errEmail, errFarm, errLoc, errAnimals].forEach(err => {
        if (err) err.style.display = 'none';
      });

      let isValid = true;
      let firstInvalid = null;

      if (!nameEl || !nameEl.value.trim()) {
        if (errName) errName.style.display = 'block';
        isValid = false;
        if (!firstInvalid) firstInvalid = nameEl;
      }

      const phoneClean = phoneEl ? phoneEl.value.replace(/\D/g, '') : '';
      if (!phoneClean || phoneClean.length < 10) {
        if (errPhone) errPhone.style.display = 'block';
        isValid = false;
        if (!firstInvalid) firstInvalid = phoneEl;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailEl || !emailRegex.test(emailEl.value.trim())) {
        if (errEmail) errEmail.style.display = 'block';
        isValid = false;
        if (!firstInvalid) firstInvalid = emailEl;
      }

      if (!farmEl || !farmEl.value.trim()) {
        if (errFarm) errFarm.style.display = 'block';
        isValid = false;
        if (!firstInvalid) firstInvalid = farmEl;
      }

      if (!locEl || !locEl.value.trim()) {
        if (errLoc) errLoc.style.display = 'block';
        isValid = false;
        if (!firstInvalid) firstInvalid = locEl;
      }

      const herdCount = animalsEl ? parseInt(animalsEl.value, 10) : 0;
      if (isNaN(herdCount) || herdCount < 1) {
        if (errAnimals) errAnimals.style.display = 'block';
        isValid = false;
        if (!firstInvalid) firstInvalid = animalsEl;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        showToast('Please fill in all required order fields (*)', '⚠️');
        return;
      }

      const name = nameEl.value.trim();
      const phone = phoneEl.value.trim();
      const email = emailEl.value.trim();
      const farm = farmEl.value.trim();
      const loc = locEl.value.trim();
      const spec = modalSpecType ? modalSpecType.value : 'Cow';
      const q = parseInt(modalQty ? modalQty.value : '1', 10) || 1;
      const addrEl = document.getElementById('modalAddress');
      const addr = addrEl && addrEl.value.trim() ? addrEl.value.trim() : loc;
      const ref = 'DP-ORD-' + Math.floor(100000 + Math.random() * 900000);

      const pricing = getCollarPricing(q);
      const cost = pricing.discountedTotal;
      const savings = pricing.totalSavings;

      if (orderModal) orderModal.classList.remove('active');

      if (invoiceDetailsBox) {
        const bonusHubHtml = q >= 10
          ? `<div style="background: #dcfce7; color: #15803d; font-weight: 700; padding: 6px 10px; border-radius: 4px; margin: 6px 0;">🎁 Bonus Included: Free DairyPulse LoRa Gateway Hub (₹8,500 value)!</div>`
          : '';

        invoiceDetailsBox.innerHTML = `
          <div><b>Request Reference:</b> <span style="color: var(--brand-green-primary); font-weight: 700;">${ref}</span></div>
          <div><b>Farmer Name:</b> ${escapeHtml(name)}</div>
          <div><b>Contact Phone:</b> ${escapeHtml(phone)} &bull; <b>Email:</b> ${escapeHtml(email)}</div>
          <div><b>Farm:</b> ${escapeHtml(farm)} &bull; ${escapeHtml(loc)} (Herd: ${herdCount} animals)</div>
          <div><b>Hardware:</b> ${q}x DairyPulse Smart Belt (${spec} Strap)</div>
          <div><b>Original MRP:</b> <span style="text-decoration: line-through; color: var(--slate-400);">₹${pricing.originalTotal.toLocaleString('en-IN')}</span></div>
          <div><b>Discount Applied:</b> <span style="color: #16a34a; font-weight: 700;">₹${savings.toLocaleString('en-IN')} (${pricing.discountPercent} OFF)</span></div>
          ${bonusHubHtml}
          <div style="font-size: 1.05rem; margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--slate-300);">
            <b>Estimated Payable:</b> <span style="font-weight: 800; color: var(--brand-green-dark);">₹${cost.toLocaleString('en-IN')}</span> (Cash on Delivery / Bank Transfer upon delivery)
          </div>
          <div style="margin-top: 4px; font-size: 0.8rem; color: var(--slate-500);"><b>Delivery Location:</b> ${escapeHtml(addr)}</div>
        `;
      }

      if (invoiceModal) invoiceModal.classList.add('active');
      cart = [];
      updateCartDisplay();
      orderFormSubmit.reset();
      showToast(`Purchase request ${ref} registered! Our team will contact you.`, '🎉', 5000);
    });
  }

  if (closeInvoiceBtn) {
    closeInvoiceBtn.addEventListener('click', () => {
      if (invoiceModal) invoiceModal.classList.remove('active');
    });
  }

  // =========================================================================
  // 6. CONTACT & DEMO FORM SUBMISSION
  // =========================================================================
  const contactInquiryForm = document.getElementById('contactInquiryForm');
  const btnContactSales = document.getElementById('btnContactSales');

  function validateContactForm() {
    const nameEl = document.getElementById('inputName');
    const phoneEl = document.getElementById('inputPhone');
    const emailEl = document.getElementById('inputEmail');
    const farmEl = document.getElementById('inputFarm');
    const animalsEl = document.getElementById('inputAnimals');
    const locEl = document.getElementById('inputLocation');

    const errName = document.getElementById('errInputName');
    const errPhone = document.getElementById('errInputPhone');
    const errEmail = document.getElementById('errInputEmail');
    const errFarm = document.getElementById('errInputFarm');
    const errAnimals = document.getElementById('errInputAnimals');
    const errLoc = document.getElementById('errInputLocation');

    [errName, errPhone, errEmail, errFarm, errAnimals, errLoc].forEach(err => {
      if (err) err.style.display = 'none';
    });

    let isValid = true;
    let firstInvalid = null;

    if (!nameEl || !nameEl.value.trim()) {
      if (errName) errName.style.display = 'block';
      isValid = false;
      if (!firstInvalid) firstInvalid = nameEl;
    }

    const phoneClean = phoneEl ? phoneEl.value.replace(/\D/g, '') : '';
    if (!phoneClean || phoneClean.length < 10) {
      if (errPhone) errPhone.style.display = 'block';
      isValid = false;
      if (!firstInvalid) firstInvalid = phoneEl;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl || !emailRegex.test(emailEl.value.trim())) {
      if (errEmail) errEmail.style.display = 'block';
      isValid = false;
      if (!firstInvalid) firstInvalid = emailEl;
    }

    if (!farmEl || !farmEl.value.trim()) {
      if (errFarm) errFarm.style.display = 'block';
      isValid = false;
      if (!firstInvalid) firstInvalid = farmEl;
    }

    const herdCount = animalsEl ? parseInt(animalsEl.value, 10) : 0;
    if (isNaN(herdCount) || herdCount < 1) {
      if (errAnimals) errAnimals.style.display = 'block';
      isValid = false;
      if (!firstInvalid) firstInvalid = animalsEl;
    }

    if (!locEl || !locEl.value.trim()) {
      if (errLoc) errLoc.style.display = 'block';
      isValid = false;
      if (!firstInvalid) firstInvalid = locEl;
    }

    if (!isValid && firstInvalid) {
      firstInvalid.focus();
    }

    return isValid;
  }

  function handleDemoSubmit() {
    if (!validateContactForm()) {
      showToast('Please fill in all required fields (*)', '⚠️');
      return;
    }

    const name = document.getElementById('inputName').value.trim();
    const farm = document.getElementById('inputFarm').value.trim();
    const animals = document.getElementById('inputAnimals').value.trim();
    const methodEl = document.getElementById('selectContactMethod');
    const method = methodEl ? methodEl.value : 'Phone Call';
    const speciesEl = document.getElementById('selectSpecies');
    const species = speciesEl ? speciesEl.value : 'Both Cows & Buffaloes';

    const banner = document.getElementById('demoSuccessBanner');
    const demoMsg = document.getElementById('demoSuccessMessage');
    if (banner) {
      banner.style.display = 'block';
      if (demoMsg) {
        demoMsg.innerHTML = `Thank you <strong>${escapeHtml(name)}</strong>! Your demo request for <strong>${escapeHtml(farm)}</strong> (${escapeHtml(animals)} animals &bull; ${escapeHtml(species)}) has been registered. Our dairy technology specialist will contact you via <strong>${escapeHtml(method)}</strong> within 24 hours to schedule your on-farm demonstration.`;
      }
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showToast('Demo Request Submitted Successfully', '✅', 5000);
    contactInquiryForm.reset();
  }

  if (contactInquiryForm) {
    contactInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDemoSubmit();
    });
  }

  if (btnContactSales) {
    btnContactSales.addEventListener('click', () => {
      handleDemoSubmit();
    });
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // =========================================================================
  // 7. ⚙️ DAIRYPULSE FARM CONTROL CENTER & QUICK SETTINGS ENGINE
  // =========================================================================

  // --- State Management ---
  const farmGeneralSettings = {
    farmName: 'Gokul Dairy & Cattle Farm',
    ownerName: 'Dairy Farmer',
    location: 'Guntur District, Andhra Pradesh, India - PIN 522001',
    farmSize: '18.5 Acres (2 Covered Sheds, 1 Pasture Area)',
    animalCount: '15 Monitored (10 Cows, 5 Buffaloes)',
    language: 'en',
    timezone: 'IST',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h'
  };

  let farmAnimals = [
    { id: 'DP-1024', name: 'Gauri', species: 'Cow', breed: 'Gir Cow', age: '4.2 Yrs', gender: 'Female', weight: 440, status: 'Healthy', belt: 'BELT-8821', vetNotes: 'FMD vaccinated Oct 2025; Due deworming' },
    { id: 'DP-1025', name: 'Lakshmi', species: 'Cow', breed: 'Sahiwal Cow', age: '3.8 Yrs', gender: 'Female', weight: 420, status: 'Healthy', belt: 'BELT-8822', vetNotes: 'High milk yield 14L/day; Normal chewing' },
    { id: 'DP-1026', name: 'Radha', species: 'Cow', breed: 'Red Sindhi', age: '5.1 Yrs', gender: 'Female', weight: 460, status: 'Healthy', belt: 'BELT-8823', vetNotes: 'Vaccinated HS+BQ; 3rd lactation' },
    { id: 'DP-1027', name: 'Ganga', species: 'Cow', breed: 'Holstein Cross', age: '3.2 Yrs', gender: 'Female', weight: 510, status: 'Healthy', belt: 'BELT-8824', vetNotes: 'Calved 4 months ago; Rumen stable' },
    { id: 'DP-1028', name: 'Nandini', species: 'Cow', breed: 'Jersey Cross', age: '4.0 Yrs', gender: 'Female', weight: 430, status: 'Healthy', belt: 'BELT-8825', vetNotes: 'Dewormed Aug 2026; Standard grazing' },
    { id: 'DP-1029', name: 'Yashoda', species: 'Cow', breed: 'Gir Cow', age: '6.0 Yrs', gender: 'Female', weight: 475, status: 'Healthy', belt: 'BELT-8826', vetNotes: 'Healthy baseline vitals' },
    { id: 'DP-1030', name: 'Kamadhenu', species: 'Cow', breed: 'Sahiwal Cow', age: '4.5 Yrs', gender: 'Female', weight: 455, status: 'Healthy', belt: 'BELT-8827', vetNotes: 'Normal lactation' },
    { id: 'DP-1031', name: 'Saraswati', species: 'Cow', breed: 'Kankrej', age: '3.5 Yrs', gender: 'Female', weight: 410, status: 'Healthy', belt: 'BELT-8828', vetNotes: 'Heifer; First breeding approaching' },
    { id: 'DP-1032', name: 'Bhavani', species: 'Cow', breed: 'Tharparkar', age: '5.2 Yrs', gender: 'Female', weight: 465, status: 'Healthy', belt: 'BELT-8829', vetNotes: 'High heat tolerance' },
    { id: 'DP-1033', name: 'Gayatri', species: 'Cow', breed: 'Rathi', age: '2.9 Yrs', gender: 'Female', weight: 390, status: 'Healthy', belt: 'BELT-8830', vetNotes: 'Regular vitals check' },
    { id: 'DP-2041', name: 'Bheema', species: 'Buffalo', breed: 'Murrah Buffalo', age: '4.8 Yrs', gender: 'Female', weight: 580, status: 'Attention', belt: 'BELT-8831', vetNotes: 'Rumination dropped 18% in last 12h. Check water intake' },
    { id: 'DP-2042', name: 'Kaali', species: 'Buffalo', breed: 'Murrah Buffalo', age: '3.5 Yrs', gender: 'Female', weight: 540, status: 'Alert', belt: 'BELT-8832', vetNotes: 'Restlessness & +0.8°C thermal rise. Estrus detected' },
    { id: 'DP-2043', name: 'Chandi', species: 'Buffalo', breed: 'Jaffarabadi', age: '6.2 Yrs', gender: 'Female', weight: 620, status: 'Healthy', belt: 'BELT-8833', vetNotes: 'Vaccinated; Milk volume steady 16L/day' },
    { id: 'DP-2044', name: 'Yamuna', species: 'Buffalo', breed: 'Mehsana', age: '4.1 Yrs', gender: 'Female', weight: 530, status: 'Healthy', belt: 'BELT-8834', vetNotes: 'Dewormed Aug 2026; Baseline active' },
    { id: 'DP-2045', name: 'Durga', species: 'Buffalo', breed: 'Nili-Ravi', age: '5.0 Yrs', gender: 'Female', weight: 590, status: 'Attention', belt: 'BELT-8835', vetNotes: 'Mild temp variance 39.1°C; Low collar battery' }
  ];

  let farmBelts = [
    { id: 'BELT-8821', animal: 'DP-1024 - Gauri (Cow)', status: 'Connected', battery: 94, sync: 'Just now', diag: 'Therm: 38.5°C | Gyro: OK | RSSI: -68dBm', fw: 'v2.4.1' },
    { id: 'BELT-8822', animal: 'DP-1025 - Lakshmi (Cow)', status: 'Connected', battery: 88, sync: '3m ago', diag: 'Therm: 38.6°C | Gyro: OK | RSSI: -71dBm', fw: 'v2.4.1' },
    { id: 'BELT-8823', animal: 'DP-1026 - Radha (Cow)', status: 'Connected', battery: 91, sync: '5m ago', diag: 'Therm: 38.4°C | Gyro: OK | RSSI: -65dBm', fw: 'v2.4.1' },
    { id: 'BELT-8824', animal: 'DP-1027 - Ganga (Cow)', status: 'Connected', battery: 78, sync: '12m ago', diag: 'Therm: 38.7°C | Gyro: OK | RSSI: -74dBm', fw: 'v2.4.1' },
    { id: 'BELT-8825', animal: 'DP-1028 - Nandini (Cow)', status: 'Connected', battery: 85, sync: '6m ago', diag: 'Therm: 38.5°C | Gyro: OK | RSSI: -69dBm', fw: 'v2.4.1' },
    { id: 'BELT-8826', animal: 'DP-1029 - Yashoda (Cow)', status: 'Connected', battery: 82, sync: '8m ago', diag: 'Therm: 38.5°C | Gyro: OK | RSSI: -70dBm', fw: 'v2.4.1' },
    { id: 'BELT-8827', animal: 'DP-1030 - Kamadhenu (Cow)', status: 'Connected', battery: 90, sync: '4m ago', diag: 'Therm: 38.6°C | Gyro: OK | RSSI: -66dBm', fw: 'v2.4.1' },
    { id: 'BELT-8828', animal: 'DP-1031 - Saraswati (Cow)', status: 'Connected', battery: 95, sync: '2m ago', diag: 'Therm: 38.4°C | Gyro: OK | RSSI: -62dBm', fw: 'v2.4.1' },
    { id: 'BELT-8829', animal: 'DP-1032 - Bhavani (Cow)', status: 'Connected', battery: 76, sync: '14m ago', diag: 'Therm: 38.8°C | Gyro: OK | RSSI: -77dBm', fw: 'v2.4.1' },
    { id: 'BELT-8830', animal: 'DP-1033 - Gayatri (Cow)', status: 'Disconnected', battery: 0, sync: '4 hrs ago', diag: 'Radio Timeout | RSSI: N/A', fw: 'v2.4.1' },
    { id: 'BELT-8831', animal: 'DP-2041 - Bheema (Buffalo)', status: 'Attention', battery: 72, sync: '7m ago', diag: 'Therm: 39.2°C | Weak RSSI: -91dBm', fw: 'v2.4.1' },
    { id: 'BELT-8832', animal: 'DP-2042 - Kaali (Buffalo)', status: 'Connected', battery: 89, sync: '1m ago', diag: 'Therm: 39.8°C | High Pacing | RSSI: -68dBm', fw: 'v2.4.1' },
    { id: 'BELT-8833', animal: 'DP-2043 - Chandi (Buffalo)', status: 'Connected', battery: 84, sync: '9m ago', diag: 'Therm: 38.6°C | Gyro: OK | RSSI: -70dBm', fw: 'v2.4.1' },
    { id: 'BELT-8834', animal: 'DP-2044 - Yamuna (Buffalo)', status: 'Connected', battery: 80, sync: '11m ago', diag: 'Therm: 38.5°C | Gyro: OK | RSSI: -73dBm', fw: 'v2.4.1' },
    { id: 'BELT-8835', animal: 'DP-2045 - Durga (Buffalo)', status: 'Attention', battery: 18, sync: '3m ago', diag: 'Therm: 39.1°C | Low Battery 18% | RSSI: -69dBm', fw: 'v2.4.1' }
  ];

  // --- Quick Settings Drawer Controls ---
  const navSettingsBtn = document.getElementById('navSettingsBtn');
  const closeQuickSettingsBtn = document.getElementById('closeQuickSettingsBtn');
  const quickSettingsDrawer = document.getElementById('quickSettingsDrawer');
  const quickSettingsOverlay = document.getElementById('quickSettingsOverlay');
  const qsBtnManageSettings = document.getElementById('qsBtnManageSettings');
  const qsBtnHelpSupport = document.getElementById('qsBtnHelpSupport');
  const qsBtnBackPublic = document.getElementById('qsBtnBackPublic');
  const qsAlertItem = document.getElementById('qsAlertItem');
  const qsToggleNotif = document.getElementById('qsToggleNotif');
  const qsToggleAutoSync = document.getElementById('qsToggleAutoSync');
  const qsLanguageSelect = document.getElementById('qsLanguageSelect');

  function openQuickSettings() {
    if (quickSettingsDrawer) quickSettingsDrawer.classList.add('active');
    if (quickSettingsOverlay) quickSettingsOverlay.classList.add('active');
  }

  function closeQuickSettings() {
    if (quickSettingsDrawer) quickSettingsDrawer.classList.remove('active');
    if (quickSettingsOverlay) quickSettingsOverlay.classList.remove('active');
  }

  if (navSettingsBtn) navSettingsBtn.addEventListener('click', openQuickSettings);
  if (closeQuickSettingsBtn) closeQuickSettingsBtn.addEventListener('click', closeQuickSettings);
  if (quickSettingsOverlay) quickSettingsOverlay.addEventListener('click', closeQuickSettings);

  if (qsBtnManageSettings) {
    qsBtnManageSettings.addEventListener('click', () => {
      closeQuickSettings();
      switchView('viewControlCenter');
      showToast('Opened DairyPulse Farm Control Center', '⚙️');
    });
  }

  if (qsBtnHelpSupport) {
    qsBtnHelpSupport.addEventListener('click', () => {
      closeQuickSettings();
      switchView('viewControlCenter');
      switchControlCenterTab('help');
      showToast('Opened Help & Support Desk', '🆘');
    });
  }

  if (qsBtnBackPublic) {
    qsBtnBackPublic.addEventListener('click', () => {
      closeQuickSettings();
      switchView('viewOverview');
      showToast('Returned to Public DairyPulse Overview', '🌐');
    });
  }

  if (qsAlertItem) {
    qsAlertItem.addEventListener('click', () => {
      closeQuickSettings();
      switchView('viewControlCenter');
      switchControlCenterTab('alerts');
      showToast('Viewing 3 Active Monitoring Alerts', '🔔');
    });
  }

  if (qsToggleNotif) {
    qsToggleNotif.addEventListener('change', (e) => {
      showToast(`Notifications set to ${e.target.checked ? 'ON' : 'OFF'}`, '🔔');
    });
  }

  if (qsToggleAutoSync) {
    qsToggleAutoSync.addEventListener('change', (e) => {
      showToast(`Auto Sync set to ${e.target.checked ? 'ON (30s interval)' : 'MANUAL'}`, '🔄');
    });
  }

  if (qsLanguageSelect) {
    qsLanguageSelect.addEventListener('change', (e) => {
      const lang = e.target.value;
      applyLanguage(lang);
    });
  }

  // --- Farm Control Center Top Bar & Actions ---
  const fccBackToWebBtn = document.getElementById('fccBackToWebBtn');
  const fccForceSyncBtn = document.getElementById('fccForceSyncBtn');
  const fccQuickAlertsBtn = document.getElementById('fccQuickAlertsBtn');

  if (fccBackToWebBtn) {
    fccBackToWebBtn.addEventListener('click', () => {
      switchView('viewOverview');
      showToast('Returned to DairyPulse Public Website', '🌐');
    });
  }

  if (fccForceSyncBtn) {
    fccForceSyncBtn.addEventListener('click', () => {
      fccForceSyncBtn.innerHTML = '<span>⏳ Syncing...</span>';
      showToast('Polling LoRa gateway AP-GUNTUR-GW01 for 15 smart collars...', '📡');
      setTimeout(() => {
        fccForceSyncBtn.innerHTML = '<span class="sync-icon">🔄</span> Force Sensor Sync';
        showToast('✓ All 15 smart collars synchronized with Gateway Hub!', '✅');
      }, 1200);
    });
  }

  if (fccQuickAlertsBtn) {
    fccQuickAlertsBtn.addEventListener('click', () => {
      switchControlCenterTab('alerts');
    });
  }

  // --- Control Center Sidebar Tab Switching ---
  const fccNavItems = document.querySelectorAll('.fcc-nav-item');
  const fccPanes = document.querySelectorAll('.fcc-pane');

  function switchControlCenterTab(targetTab) {
    fccNavItems.forEach(item => {
      item.classList.toggle('active', item.dataset.tab === targetTab);
    });

    fccPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `fccPane-${targetTab}`);
    });
  }

  fccNavItems.forEach(item => {
    item.addEventListener('click', () => {
      switchControlCenterTab(item.dataset.tab);
    });
  });

  // Settings Search Filter in Sidebar
  const fccSettingsSearch = document.getElementById('fccSettingsSearch');
  if (fccSettingsSearch) {
    fccSettingsSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      fccNavItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // --- Pane 1: General Settings Form ---
  const fccGeneralForm = document.getElementById('fccGeneralForm');
  const btnResetGeneralSettings = document.getElementById('btnResetGeneralSettings');

  if (fccGeneralForm) {
    fccGeneralForm.addEventListener('submit', (e) => {
      e.preventDefault();
      farmGeneralSettings.farmName = document.getElementById('genFarmName').value.trim();
      farmGeneralSettings.ownerName = document.getElementById('genOwnerName').value.trim();
      farmGeneralSettings.location = document.getElementById('genLocation').value.trim();
      farmGeneralSettings.farmSize = document.getElementById('genFarmSize').value.trim();
      farmGeneralSettings.animalCount = document.getElementById('genAnimalCount').value.trim();
      farmGeneralSettings.language = document.getElementById('genLanguage').value;

      const sidebarFarm = document.getElementById('fccSidebarFarmName');
      const sidebarOwner = document.getElementById('fccSidebarFarmerName');
      if (sidebarFarm) sidebarFarm.textContent = farmGeneralSettings.farmName;
      if (sidebarOwner) sidebarOwner.textContent = `${farmGeneralSettings.ownerName} (Owner)`;

      showToast('General Farm Settings saved successfully!', '⚙️');
    });
  }

  if (btnResetGeneralSettings) {
    btnResetGeneralSettings.addEventListener('click', () => {
      document.getElementById('genFarmName').value = 'Gokul Dairy & Cattle Farm';
      document.getElementById('genOwnerName').value = 'Dairy Farmer';
      document.getElementById('genLocation').value = 'Guntur District, Andhra Pradesh, India - PIN 522001';
      document.getElementById('genFarmSize').value = '18.5 Acres (2 Covered Sheds, 1 Pasture Area)';
      document.getElementById('genAnimalCount').value = '15 Monitored (10 Cows, 5 Buffaloes)';
      document.getElementById('genLanguage').value = 'en';
      showToast('General settings restored to defaults', '🔄');
    });
  }

  // --- Pane 2: Animal Management CRUD ---
  const fccAnimalsTableBody = document.getElementById('fccAnimalsTableBody');
  const animalSearchQuery = document.getElementById('animalSearchQuery');
  const animalSpeciesFilter = document.getElementById('animalSpeciesFilter');
  const animalStatusFilter = document.getElementById('animalStatusFilter');
  const animalFilterCountText = document.getElementById('animalFilterCountText');

  const animalKpiTotal = document.getElementById('animalKpiTotal');
  const animalKpiHealthy = document.getElementById('animalKpiHealthy');
  const animalKpiAttention = document.getElementById('animalKpiAttention');
  const animalKpiAlert = document.getElementById('animalKpiAlert');
  const fccAnimalBadge = document.getElementById('fccAnimalBadge');

  function renderAnimalsTable() {
    if (!fccAnimalsTableBody) return;

    const query = animalSearchQuery ? animalSearchQuery.value.toLowerCase().trim() : '';
    const species = animalSpeciesFilter ? animalSpeciesFilter.value : 'all';
    const status = animalStatusFilter ? animalStatusFilter.value : 'all';

    let filtered = farmAnimals.filter(a => {
      const matchQuery = !query || a.id.toLowerCase().includes(query) || a.name.toLowerCase().includes(query) || a.breed.toLowerCase().includes(query);
      const matchSpecies = species === 'all' || a.species.toLowerCase() === species.toLowerCase();
      const matchStatus = status === 'all' || a.status.toLowerCase() === status.toLowerCase();
      return matchQuery && matchSpecies && matchStatus;
    });

    fccAnimalsTableBody.innerHTML = filtered.map(a => {
      let badgeClass = 'green';
      if (a.status === 'Attention') badgeClass = 'amber';
      if (a.status === 'Alert') badgeClass = 'red';

      const icon = a.species === 'Cow' ? '🐄' : '🐃';

      return `
        <tr>
          <td><b>${escapeHtml(a.id)}</b></td>
          <td><b>${escapeHtml(a.name)}</b></td>
          <td>${icon} ${escapeHtml(a.species)}</td>
          <td>${escapeHtml(a.breed)}</td>
          <td>${escapeHtml(a.age)}</td>
          <td>${escapeHtml(a.weight)} kg</td>
          <td><span class="fcc-status-badge ${badgeClass}">${escapeHtml(a.status)}</span></td>
          <td><code style="background: var(--slate-100); padding: 2px 6px; border-radius: 4px; font-size: 0.76rem;">${escapeHtml(a.belt)}</code></td>
          <td style="max-width: 220px; font-size: 0.78rem; color: var(--slate-600);">${escapeHtml(a.vetNotes)}</td>
          <td style="text-align: right;">
            <div class="fcc-table-actions" style="justify-content: flex-end;">
              <button class="btn-icon-xs btn-edit-animal" data-id="${escapeHtml(a.id)}" title="Edit Profile">✏️</button>
              <button class="btn-icon-xs btn-view-animal" data-id="${escapeHtml(a.id)}" title="Inspect Telemetry">📊</button>
              <button class="btn-icon-xs danger btn-archive-animal" data-id="${escapeHtml(a.id)}" title="Archive / Remove Animal">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Update Counters
    const total = farmAnimals.length;
    const healthy = farmAnimals.filter(a => a.status === 'Healthy').length;
    const attention = farmAnimals.filter(a => a.status === 'Attention').length;
    const alert = farmAnimals.filter(a => a.status === 'Alert').length;

    if (animalKpiTotal) animalKpiTotal.textContent = total;
    if (animalKpiHealthy) animalKpiHealthy.textContent = healthy;
    if (animalKpiAttention) animalKpiAttention.textContent = attention;
    if (animalKpiAlert) animalKpiAlert.textContent = alert;
    if (fccAnimalBadge) fccAnimalBadge.textContent = total;
    if (animalFilterCountText) animalFilterCountText.textContent = `Showing ${filtered.length} of ${total} animals`;

    // Attach Row Action Listeners
    document.querySelectorAll('.btn-edit-animal').forEach(btn => {
      btn.addEventListener('click', () => openEditAnimalModal(btn.dataset.id));
    });

    document.querySelectorAll('.btn-view-animal').forEach(btn => {
      btn.addEventListener('click', () => {
        window.DairyPulse.selectDashboardAnimal(btn.dataset.id);
        showToast(`Viewing telemetry curve for ${btn.dataset.id}`, '📊');
      });
    });

    document.querySelectorAll('.btn-archive-animal').forEach(btn => {
      btn.addEventListener('click', () => archiveAnimal(btn.dataset.id));
    });
  }

  if (animalSearchQuery) animalSearchQuery.addEventListener('input', renderAnimalsTable);
  if (animalSpeciesFilter) animalSpeciesFilter.addEventListener('change', renderAnimalsTable);
  if (animalStatusFilter) animalStatusFilter.addEventListener('change', renderAnimalsTable);

  // Animal Modal Elements
  const animalModal = document.getElementById('animalModal');
  const btnAddNewAnimalModal = document.getElementById('btnAddNewAnimalModal');
  const closeAnimalModalBtn = document.getElementById('closeAnimalModalBtn');
  const cancelAnimalModalBtn = document.getElementById('cancelAnimalModalBtn');
  const animalFormSubmit = document.getElementById('animalFormSubmit');
  const animalModalTitle = document.getElementById('animalModalTitle');
  const animalFormEditMode = document.getElementById('animalFormEditMode');

  function openAddAnimalModal() {
    if (!animalModal) return;
    animalModalTitle.textContent = 'Add New Animal Profile';
    animalFormEditMode.value = 'add';
    document.getElementById('animalFormId').value = `DP-${1030 + farmAnimals.length}`;
    document.getElementById('animalFormId').removeAttribute('readonly');
    document.getElementById('animalFormName').value = '';
    document.getElementById('animalFormBreed').value = 'Gir Cow';
    document.getElementById('animalFormAge').value = '3.5 Yrs';
    document.getElementById('animalFormWeight').value = '420';
    document.getElementById('animalFormVetNotes').value = 'FMD vaccinated; Due for routine checkup';
    animalModal.classList.add('active');
  }

  function openEditAnimalModal(animalId) {
    const animal = farmAnimals.find(a => a.id === animalId);
    if (!animal || !animalModal) return;

    animalModalTitle.textContent = `Edit Profile: ${animal.id} (${animal.name})`;
    animalFormEditMode.value = 'edit';
    const idInput = document.getElementById('animalFormId');
    idInput.value = animal.id;
    idInput.setAttribute('readonly', 'true');
    document.getElementById('animalFormName').value = animal.name;
    document.getElementById('animalFormSpecies').value = animal.species;
    document.getElementById('animalFormBreed').value = animal.breed;
    document.getElementById('animalFormAge').value = animal.age;
    document.getElementById('animalFormGender').value = animal.gender;
    document.getElementById('animalFormWeight').value = animal.weight;
    document.getElementById('animalFormBelt').value = animal.belt;
    document.getElementById('animalFormStatus').value = animal.status;
    document.getElementById('animalFormVetNotes').value = animal.vetNotes;

    animalModal.classList.add('active');
  }

  function closeAnimalModal() {
    if (animalModal) animalModal.classList.remove('active');
  }

  if (btnAddNewAnimalModal) btnAddNewAnimalModal.addEventListener('click', openAddAnimalModal);
  if (closeAnimalModalBtn) closeAnimalModalBtn.addEventListener('click', closeAnimalModal);
  if (cancelAnimalModalBtn) cancelAnimalModalBtn.addEventListener('click', closeAnimalModal);

  if (animalFormSubmit) {
    animalFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const mode = animalFormEditMode.value;
      const id = document.getElementById('animalFormId').value.trim();
      const name = document.getElementById('animalFormName').value.trim();
      const species = document.getElementById('animalFormSpecies').value;
      const breed = document.getElementById('animalFormBreed').value.trim();
      const age = document.getElementById('animalFormAge').value.trim();
      const gender = document.getElementById('animalFormGender').value;
      const weight = parseInt(document.getElementById('animalFormWeight').value, 10) || 400;
      let belt = document.getElementById('animalFormBelt').value;
      if (belt === 'Auto-assign') belt = `BELT-${8820 + farmAnimals.length + 1}`;
      const status = document.getElementById('animalFormStatus').value;
      const vetNotes = document.getElementById('animalFormVetNotes').value.trim();

      if (mode === 'add') {
        farmAnimals.push({ id, name, species, breed, age, gender, weight, status, belt, vetNotes });
        showToast(`Registered new animal ${id} (${name})!`, '🐄');
      } else {
        const index = farmAnimals.findIndex(a => a.id === id);
        if (index !== -1) {
          farmAnimals[index] = { id, name, species, breed, age, gender, weight, status, belt, vetNotes };
          showToast(`Updated animal profile ${id} (${name})!`, '✅');
        }
      }

      closeAnimalModal();
      renderAnimalsTable();
    });
  }

  function archiveAnimal(animalId) {
    const animal = farmAnimals.find(a => a.id === animalId);
    if (!animal) return;
    if (confirm(`Are you sure you want to archive / remove ${animal.id} (${animal.name}) from active herd monitoring?`)) {
      farmAnimals = farmAnimals.filter(a => a.id !== animalId);
      renderAnimalsTable();
      showToast(`Archived animal ${animal.id} (${animal.name})`, '🗑️');
    }
  }

  // --- Pane 3: Smart Belt & Device Management ---
  const fccDevicesTableBody = document.getElementById('fccDevicesTableBody');
  const btnPairNewBeltModal = document.getElementById('btnPairNewBeltModal');
  const pairBeltModal = document.getElementById('pairBeltModal');
  const closePairBeltModalBtn = document.getElementById('closePairBeltModalBtn');
  const cancelPairBeltModalBtn = document.getElementById('cancelPairBeltModalBtn');
  const pairBeltFormSubmit = document.getElementById('pairBeltFormSubmit');

  const btnOpenTroubleshootModal = document.getElementById('btnOpenTroubleshootModal');
  const troubleshootModal = document.getElementById('troubleshootModal');
  const closeTroubleshootModalBtn = document.getElementById('closeTroubleshootModalBtn');
  const btnRunDiagnosticPing = document.getElementById('btnRunDiagnosticPing');

  function renderDevicesTable() {
    if (!fccDevicesTableBody) return;

    fccDevicesTableBody.innerHTML = farmBelts.map(b => {
      let statusBadge = `<span class="fcc-status-badge green">🟢 Connected</span>`;
      if (b.status === 'Attention') {
        statusBadge = `<span class="fcc-status-badge amber">🟡 Needs Attention</span>`;
      } else if (b.status === 'Disconnected') {
        statusBadge = `<span class="fcc-status-badge red">🔴 Disconnected</span>`;
      }

      let battLevelClass = 'high';
      if (b.battery <= 20) battLevelClass = 'low';
      else if (b.battery <= 60) battLevelClass = 'med';

      return `
        <tr>
          <td><b><code>${escapeHtml(b.id)}</code></b></td>
          <td><b>${escapeHtml(b.animal)}</b></td>
          <td>${statusBadge}</td>
          <td>
            <div class="battery-indicator">
              <div class="battery-shell">
                <div class="battery-level ${battLevelClass}" style="width: ${b.battery}%;"></div>
              </div>
              <span style="color: ${b.battery <= 20 ? '#dc2626' : 'var(--slate-800)'};">${b.battery}%</span>
            </div>
          </td>
          <td>${escapeHtml(b.sync)}</td>
          <td style="font-size: 0.76rem; color: var(--slate-600);">${escapeHtml(b.diag)}</td>
          <td><span style="font-size: 0.72rem; background: var(--slate-100); padding: 2px 6px; border-radius: 4px;">${escapeHtml(b.fw)}</span></td>
          <td style="text-align: right;">
            <div class="fcc-table-actions" style="justify-content: flex-end;">
              <button class="btn-icon-xs btn-ping-device" data-id="${escapeHtml(b.id)}" title="Send RF Ping">📡</button>
              <button class="btn-icon-xs danger btn-unpair-device" data-id="${escapeHtml(b.id)}" title="Unpair Collar">✕</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Action Listeners
    document.querySelectorAll('.btn-ping-device').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast(`LoRa Ping sent to ${btn.dataset.id} &bull; RSSI: -68 dBm (Ack received in 42ms)`, '📡');
      });
    });

    document.querySelectorAll('.btn-unpair-device').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm(`Unpair ${btn.dataset.id} from assigned animal?`)) {
          farmBelts = farmBelts.filter(belt => belt.id !== btn.dataset.id);
          renderDevicesTable();
          showToast(`Unpaired ${btn.dataset.id}`, '🗑️');
        }
      });
    });
  }

  if (btnPairNewBeltModal) {
    btnPairNewBeltModal.addEventListener('click', () => {
      if (pairBeltModal) pairBeltModal.classList.add('active');
    });
  }

  function closePairModal() {
    if (pairBeltModal) pairBeltModal.classList.remove('active');
  }

  if (closePairBeltModalBtn) closePairBeltModalBtn.addEventListener('click', closePairModal);
  if (cancelPairBeltModalBtn) cancelPairBeltModalBtn.addEventListener('click', closePairModal);

  if (pairBeltFormSubmit) {
    pairBeltFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const collarId = document.getElementById('pairCollarId').value.trim();
      const animal = document.getElementById('pairAnimalSelect').value;

      farmBelts.push({
        id: collarId,
        animal: animal,
        status: 'Connected',
        battery: 100,
        sync: 'Just now',
        diag: 'Therm: 38.5°C | Calibrated | RSSI: -64dBm',
        fw: 'v2.4.1'
      });

      closePairModal();
      renderDevicesTable();
      showToast(`Successfully paired ${collarId} to ${animal}!`, '📡');
    });
  }

  if (btnOpenTroubleshootModal) {
    btnOpenTroubleshootModal.addEventListener('click', () => {
      if (troubleshootModal) troubleshootModal.classList.add('active');
    });
  }

  if (closeTroubleshootModalBtn) {
    closeTroubleshootModalBtn.addEventListener('click', () => {
      if (troubleshootModal) troubleshootModal.classList.remove('active');
    });
  }

  if (btnRunDiagnosticPing) {
    btnRunDiagnosticPing.addEventListener('click', () => {
      btnRunDiagnosticPing.textContent = '⏳ Pinging 15 smart collars across sheds...';
      setTimeout(() => {
        btnRunDiagnosticPing.textContent = 'Ping All 15 Smart Belts Now';
        if (troubleshootModal) troubleshootModal.classList.remove('active');
        showToast('✓ Diagnostic Ping Completed: 14 collars acknowledged, 1 offline (BELT-8830)', '🟢');
      }, 1400);
    });
  }

  // --- Pane 4: Alert Settings & Sensitivity ---
  const alertSensitivitySelector = document.getElementById('alertSensitivitySelector');
  const sensitivityExplanationText = document.getElementById('sensitivityExplanationText');
  const btnSendTestAlert = document.getElementById('btnSendTestAlert');
  const btnSaveAlertSettings = document.getElementById('btnSaveAlertSettings');

  if (alertSensitivitySelector) {
    const sBtns = alertSensitivitySelector.querySelectorAll('.segmented-btn');
    sBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.dataset.val;

        if (val === 'low') {
          sensitivityExplanationText.innerHTML = '<b>Low Sensitivity:</b> Only triggers on extreme deviations (Body temp &gt;40.0°C or Rumen pause &gt;4h). Best for resilient range cattle.';
        } else if (val === 'high') {
          sensitivityExplanationText.innerHTML = '<b>High Sensitivity:</b> Triggers on early subtle deviations (±0.3°C temp rise, 10% rumination dip). Ideal for high-yielding pedigree cows.';
        } else {
          sensitivityExplanationText.innerHTML = '<b>Medium (Default):</b> Balanced agritech sensitivity for early estrus detection and fever warnings without false alarms.';
        }
        showToast(`Alert sensitivity updated to ${val.toUpperCase()}`, '🔔');
      });
    });
  }

  if (btnSendTestAlert) {
    btnSendTestAlert.addEventListener('click', () => {
      showToast('🟢 [WhatsApp & SMS Alert] DP-2042 (Kaali): Restlessness and +0.8°C thermal rise detected. Estrus AI confidence: 94%.', '📲', 5000);
    });
  }

  if (btnSaveAlertSettings) {
    btnSaveAlertSettings.addEventListener('click', () => {
      showToast('Alert notification rules and channels saved successfully!', '💾');
    });
  }

  // --- Pane 5: AI & Smart Insights ---
  const btnGenerateFarmInsights = document.getElementById('btnGenerateFarmInsights');
  const aiAnimalInspectSelect = document.getElementById('aiAnimalInspectSelect');
  const aiSelectedAnimalTitle = document.getElementById('aiSelectedAnimalTitle');
  const aiSelectedAnimalDesc = document.getElementById('aiSelectedAnimalDesc');

  const AI_ANIMAL_INSIGHTS = {
    'DP-1024': {
      title: 'DP-1024 (Gauri - Gir Cow) AI Profile',
      desc: 'Rumen acoustic cadence is steady at 480 min/day (+2% above seasonal curve). Calving recovery 100% complete. Optimal milk production stage.',
      val: '38.5°C'
    },
    'DP-1025': {
      title: 'DP-1025 (Lakshmi - Sahiwal Cow) AI Profile',
      desc: 'Peak lactation digestive baseline (510 min/day). Zero thermal distress detected. Projected milk yield 14.5 Liters/day.',
      val: '38.6°C'
    },
    'DP-2041': {
      title: 'DP-2041 (Bheema - Murrah Buffalo) AI Profile',
      desc: '18% rumination deceleration noted between 10:00 PM and 04:00 AM. Probable mild fodder indigestion. Suggest offering warm hydration with electrolyte buffer.',
      val: '39.2°C'
    },
    'DP-2042': {
      title: 'DP-2042 (Kaali - Murrah Buffalo) AI Profile',
      desc: 'Nighttime pacing surge (3.2x step count) coupled with +0.8°C thermal rise. Estrus confidence is 94%. Recommended AI service window: Next 12–18 hours.',
      val: '39.8°C'
    },
    'DP-2045': {
      title: 'DP-2045 (Durga - Nili-Ravi Buffalo) AI Profile',
      desc: 'Minor thermal deviation (39.1°C) with collar battery advisory (18%). Chewing baseline remains functional at 460 min/day.',
      val: '39.1°C'
    }
  };

  if (aiAnimalInspectSelect) {
    aiAnimalInspectSelect.addEventListener('change', (e) => {
      const selected = AI_ANIMAL_INSIGHTS[e.target.value];
      if (selected && aiSelectedAnimalTitle && aiSelectedAnimalDesc) {
        aiSelectedAnimalTitle.textContent = selected.title;
        aiSelectedAnimalDesc.textContent = selected.desc;
        showToast(`AI telemetry loaded for ${e.target.value}`, '🤖');
      }
    });
  }

  if (btnGenerateFarmInsights) {
    btnGenerateFarmInsights.addEventListener('click', () => {
      btnGenerateFarmInsights.textContent = '✨ Recalculating AI Telemetry...';
      setTimeout(() => {
        btnGenerateFarmInsights.textContent = '✨ Generate Farm Insights';
        showToast('✨ AI Telemetry Model Refreshed: 1 active estrus confirmed, herd baseline 98.4%', '🤖');
      }, 1000);
    });
  }

  // --- Pane 6: Dashboard Preferences ---
  const fccDashboardPrefsForm = document.getElementById('fccDashboardPrefsForm');
  if (fccDashboardPrefsForm) {
    fccDashboardPrefsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Dashboard layout & metric preferences saved!', '📊');
    });
  }

  // --- Pane 7: Veterinary Support & Consultations ---
  const contactVetModal = document.getElementById('contactVetModal');
  const btnContactVetDirect = document.getElementById('btnContactVetDirect');
  const closeContactVetModalBtn = document.getElementById('closeContactVetModalBtn');
  const btnShareVetTelemetry = document.getElementById('btnShareVetTelemetry');
  const btnSendVetWhatsApp = document.getElementById('btnSendVetWhatsApp');
  const btnShareEncryptedVetLink = document.getElementById('btnShareEncryptedVetLink');

  const vetConsultModal = document.getElementById('vetConsultModal');
  const btnBookConsultationModal = document.getElementById('btnBookConsultationModal');
  const closeVetConsultModalBtn = document.getElementById('closeVetConsultModalBtn');
  const cancelVetConsultModalBtn = document.getElementById('cancelVetConsultModalBtn');
  const vetConsultFormSubmit = document.getElementById('vetConsultFormSubmit');
  const fccVetHistoryBody = document.getElementById('fccVetHistoryBody');
  const btnAddNewVetModal = document.getElementById('btnAddNewVetModal');

  if (btnContactVetDirect) {
    btnContactVetDirect.addEventListener('click', () => {
      if (contactVetModal) contactVetModal.classList.add('active');
    });
  }

  if (closeContactVetModalBtn) {
    closeContactVetModalBtn.addEventListener('click', () => {
      if (contactVetModal) contactVetModal.classList.remove('active');
    });
  }

  if (btnShareVetTelemetry) {
    btnShareVetTelemetry.addEventListener('click', () => {
      if (contactVetModal) contactVetModal.classList.add('active');
    });
  }

  if (btnSendVetWhatsApp) {
    btnSendVetWhatsApp.addEventListener('click', () => {
      if (contactVetModal) contactVetModal.classList.remove('active');
      showToast('Encrypted telemetry summary prepared for WhatsApp dispatch to Veterinary Officer!', '🟢');
    });
  }

  if (btnShareEncryptedVetLink) {
    btnShareEncryptedVetLink.addEventListener('click', () => {
      navigator.clipboard?.writeText('https://dairypulse.agri/v/telemetry-token-98214?vet=verified');
      showToast('Secure Telemetry Link copied to clipboard for Veterinarian!', '📋');
    });
  }

  if (btnBookConsultationModal) {
    btnBookConsultationModal.addEventListener('click', () => {
      if (vetConsultModal) vetConsultModal.classList.add('active');
    });
  }

  function closeVetConsultModal() {
    if (vetConsultModal) vetConsultModal.classList.remove('active');
  }

  if (closeVetConsultModalBtn) closeVetConsultModalBtn.addEventListener('click', closeVetConsultModal);
  if (cancelVetConsultModalBtn) cancelVetConsultModalBtn.addEventListener('click', closeVetConsultModal);

  if (vetConsultFormSubmit) {
    vetConsultFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const animal = document.getElementById('consultAnimalSelect').value;
      const priority = document.getElementById('consultPriority').value;
      const notes = document.getElementById('consultNotes').value.trim();

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><b>Today</b></td>
        <td>${escapeHtml(animal.split(' ')[0])}</td>
        <td>Assigned Veterinary Officer</td>
        <td>${escapeHtml(notes.substring(0, 45))}...</td>
        <td>Pending Doctor Examination</td>
        <td><span class="fcc-status-badge amber">Scheduled</span></td>
      `;

      if (fccVetHistoryBody) fccVetHistoryBody.prepend(newRow);
      closeVetConsultModal();
      showToast(`Consultation request for ${animal} booked with Veterinary Officer!`, '👨‍⚕️');
    });
  }

  if (btnAddNewVetModal) {
    btnAddNewVetModal.addEventListener('click', () => {
      showToast('Secondary veterinary dispensary registration is enabled.', '👨‍⚕️');
    });
  }

  // --- Pane 8: Reports & Data Export ---
  const reportPreviewModal = document.getElementById('reportPreviewModal');
  const closeReportPreviewModalBtn = document.getElementById('closeReportPreviewModalBtn');
  const btnGenerateAnimalReport = document.getElementById('btnGenerateAnimalReport');
  const btnGenerateFarmReport = document.getElementById('btnGenerateFarmReport');
  const btnDownloadPDFReport = document.getElementById('btnDownloadPDFReport');
  const btnExportCSVData = document.getElementById('btnExportCSVData');
  const btnConfirmDownloadPDF = document.getElementById('btnConfirmDownloadPDF');
  const btnConfirmDownloadCSV = document.getElementById('btnConfirmDownloadCSV');

  function openReportPreview() {
    if (reportPreviewModal) reportPreviewModal.classList.add('active');
  }

  function closeReportPreview() {
    if (reportPreviewModal) reportPreviewModal.classList.remove('active');
  }

  if (closeReportPreviewModalBtn) closeReportPreviewModalBtn.addEventListener('click', closeReportPreview);
  if (btnGenerateAnimalReport) btnGenerateAnimalReport.addEventListener('click', openReportPreview);
  if (btnGenerateFarmReport) btnGenerateFarmReport.addEventListener('click', openReportPreview);

  function triggerDownloadSimulation(filename, mimeType, content) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }

  if (btnConfirmDownloadPDF || btnDownloadPDFReport) {
    const handler = () => {
      closeReportPreview();
      const fakePdfContent = `%PDF-1.4\n1 0 obj\n<< /Title (DairyPulse FarmOS Telemetry Report) /Author (DairyPulse Agritech) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
      triggerDownloadSimulation('DairyPulse_FarmOS_Health_Report.pdf', 'application/pdf', fakePdfContent);
      showToast('Downloaded official DairyPulse Health Report (PDF)!', '📄');
    };
    if (btnConfirmDownloadPDF) btnConfirmDownloadPDF.addEventListener('click', handler);
    if (btnDownloadPDFReport) btnDownloadPDFReport.addEventListener('click', handler);
  }

  if (btnConfirmDownloadCSV || btnExportCSVData) {
    const csvHandler = () => {
      closeReportPreview();
      let csv = 'Animal_ID,Name,Species,Breed,Age,Weight_kg,Status,Smart_Belt,Veterinary_Notes\n';
      farmAnimals.forEach(a => {
        csv += `"${a.id}","${a.name}","${a.species}","${a.breed}","${a.age}",${a.weight},"${a.status}","${a.belt}","${a.vetNotes.replace(/"/g, '""')}"\n`;
      });
      triggerDownloadSimulation('DairyPulse_Herd_Telemetry.csv', 'text/csv', csv);
      showToast('Exported complete herd telemetry log (CSV)!', '💾');
    };
    if (btnConfirmDownloadCSV) btnConfirmDownloadCSV.addEventListener('click', csvHandler);
    if (btnExportCSVData) btnExportCSVData.addEventListener('click', csvHandler);
  }

  document.querySelectorAll('.table-download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const file = btn.dataset.file || 'Report.pdf';
      showToast(`Downloading file: ${file}`, '⬇️');
    });
  });

  // --- Pane 9: Subscription & Billing ---
  const billingHistoryModal = document.getElementById('billingHistoryModal');
  const btnViewBillingInvoices = document.getElementById('btnViewBillingInvoices');
  const closeBillingHistoryModalBtn = document.getElementById('closeBillingHistoryModalBtn');
  const btnCloseBillingHistoryBtn = document.getElementById('btnCloseBillingHistoryBtn');
  const btnUpgradeSub = document.getElementById('btnUpgradeSub');
  const btnChangeSub = document.getElementById('btnChangeSub');
  const btnCancelSub = document.getElementById('btnCancelSub');
  const btnSelectStarterPlan = document.getElementById('btnSelectStarterPlan');
  const btnSelectCustomPlan = document.getElementById('btnSelectCustomPlan');

  if (btnViewBillingInvoices) {
    btnViewBillingInvoices.addEventListener('click', () => {
      if (billingHistoryModal) billingHistoryModal.classList.add('active');
    });
  }

  function closeBillingModal() {
    if (billingHistoryModal) billingHistoryModal.classList.remove('active');
  }

  if (closeBillingHistoryModalBtn) closeBillingHistoryModalBtn.addEventListener('click', closeBillingModal);
  if (btnCloseBillingHistoryBtn) btnCloseBillingHistoryBtn.addEventListener('click', closeBillingModal);

  if (btnUpgradeSub) {
    btnUpgradeSub.addEventListener('click', () => {
      showToast('Viewing DairyPulse commercial tier upgrade options', '💳');
    });
  }

  if (btnChangeSub) {
    btnChangeSub.addEventListener('click', () => {
      showToast('Select an alternate plan from the tier comparison below', '🔄');
    });
  }

  if (btnCancelSub) {
    btnCancelSub.addEventListener('click', () => {
      if (confirm('Cancel your Farm Plan subscription? Your LoRa gateway alerts and AI estrus predictions will expire at the end of the billing period.')) {
        showToast('Subscription renewal cancelled. Active until 15 Nov 2026.', '⚠️');
      }
    });
  }

  if (btnSelectStarterPlan) {
    btnSelectStarterPlan.addEventListener('click', () => {
      showToast('Switched plan request to Starter (₹1,000/mo). Changes take effect on next cycle.', '💳');
    });
  }

  if (btnSelectCustomPlan) {
    btnSelectCustomPlan.addEventListener('click', () => {
      switchView('viewContact');
      document.getElementById('inputMessage').value = 'Enterprise inquiry for 50+ animals with dedicated LoRa tower setup.';
      showToast('Redirected to Enterprise consultation desk', '📞');
    });
  }

  // --- Pane 10: Security & Privacy ---
  const fccPasswordForm = document.getElementById('fccPasswordForm');
  const toggle2FA = document.getElementById('toggle2FA');
  const btnLogOutOtherDevices = document.getElementById('btnLogOutOtherDevices');

  if (fccPasswordForm) {
    fccPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pNew = document.getElementById('pwdNew').value;
      const pConf = document.getElementById('pwdConfirm').value;
      if (pNew !== pConf) {
        showToast('New passwords do not match!', '⚠️');
        return;
      }
      fccPasswordForm.reset();
      showToast('Account password updated securely!', '🔒');
    });
  }

  if (toggle2FA) {
    toggle2FA.addEventListener('change', (e) => {
      showToast(`Two-Factor Authentication (2FA) is now ${e.target.checked ? 'ENABLED' : 'DISABLED'}`, '🔐');
    });
  }

  if (btnLogOutOtherDevices) {
    btnLogOutOtherDevices.addEventListener('click', () => {
      showToast('Logged out from 1 other active device (DairyPulse Android App).', '🔒');
    });
  }

  // --- Pane 11: Language Switcher ---
  const langCards = document.querySelectorAll('.fcc-lang-card');
  const btnApplyLanguageSettings = document.getElementById('btnApplyLanguageSettings');

  function applyLanguage(langCode) {
    langCards.forEach(c => {
      const isMatch = c.dataset.lang === langCode;
      c.style.borderColor = isMatch ? 'var(--brand-green-primary)' : 'var(--slate-200)';
      c.style.background = isMatch ? '#f0fdf4' : 'white';
    });

    if (qsLanguageSelect) qsLanguageSelect.value = langCode;

    const titleEl = document.querySelector('.fcc-title');
    const subEl = document.querySelector('.fcc-subtitle');

    if (langCode === 'te') {
      if (titleEl) titleEl.textContent = 'డైరీపల్స్ ఫార్మ్ కంట్రోల్ సెంటర్';
      if (subEl) subEl.textContent = 'మీ పాడి క్షేత్రం, పశువులు, హెచ్చరికలు మరియు స్మార్ట్ కాలర్లను సులభంగా నిర్వహించండి.';
      showToast('భాష తెలుగుగా మార్చబడింది (Telugu Language Active)', '🌐');
    } else if (langCode === 'hi') {
      if (titleEl) titleEl.textContent = 'डेयरीपल्स फार्म कंट्रोल सेंटर';
      if (subEl) subEl.textContent = 'अपने डेयरी फार्म, मवेशियों, अलर्ट और स्मार्ट बेल्ट को आसानी से प्रबंधित करें।';
      showToast('भाषा हिन्दी में सेट कर दी गई है (Hindi Language Active)', '🌐');
    } else {
      if (titleEl) titleEl.textContent = 'DairyPulse Farm Control Center';
      if (subEl) subEl.textContent = 'Configure your farm, animals, alerts, devices and monitoring preferences.';
      showToast('Language set to English (Default)', '🌐');
    }
  }

  langCards.forEach(c => {
    c.addEventListener('click', () => {
      applyLanguage(c.dataset.lang);
    });
  });

  if (btnApplyLanguageSettings) {
    btnApplyLanguageSettings.addEventListener('click', () => {
      showToast('Multilingual interface preferences applied across all shed displays!', '✅');
    });
  }

  // --- Pane 12: Help & Support ---
  const fccFaqItems = document.querySelectorAll('.fcc-faq-item');
  fccFaqItems.forEach(item => {
    const head = item.querySelector('.fcc-faq-head');
    if (head) {
      head.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });

  const fccSupportTicketForm = document.getElementById('fccSupportTicketForm');
  if (fccSupportTicketForm) {
    fccSupportTicketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fccSupportTicketForm.reset();
      showToast('Ticket #DP-8921 logged! Our agritech support technician will call you within 2 hours.', '🤝', 5000);
    });
  }

  const btnHelpGuides = document.getElementById('btnHelpGuides');
  const btnContactSupportLine = document.getElementById('btnContactSupportLine');
  const btnRunTroubleshooter = document.getElementById('btnRunTroubleshooter');
  const btnRequestDemoFromHelp = document.getElementById('btnRequestDemoFromHelp');

  if (btnHelpGuides) {
    btnHelpGuides.addEventListener('click', () => {
      showToast('Opening DairyPulse Smart Collar Fitting & Rumination Guide...', '📖');
    });
  }

  if (btnContactSupportLine) {
    btnContactSupportLine.addEventListener('click', () => {
      showToast('Toll-Free Support Line: 1800-DAIRY-PULSE (Active 7 AM – 9 PM)', '📞');
    });
  }

  if (btnRunTroubleshooter) {
    btnRunTroubleshooter.addEventListener('click', () => {
      switchControlCenterTab('devices');
      if (troubleshootModal) troubleshootModal.classList.add('active');
    });
  }

  if (btnRequestDemoFromHelp) {
    btnRequestDemoFromHelp.addEventListener('click', () => {
      switchView('viewContact');
      showToast('Opening Farm Demo Booking Form', '📅');
    });
  }

  // --- Pane 13: Expert-Level Advanced Features Beta Signups ---
  document.querySelectorAll('.btn-join-beta').forEach(btn => {
    btn.addEventListener('click', () => {
      const feat = btn.dataset.feature || 'Advanced Module';
      showToast(`Registered interest for "${feat}"! You will be invited to the university pilot beta.`, '🔬');
    });
  });

  // Initial table rendering
  renderAnimalsTable();
  renderDevicesTable();

  // =========================================================================
  // 14. COMPREHENSIVE AUTHENTICATION ENGINE (SIGN IN & SIGN UP)
  // =========================================================================
  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const navAuthBtn = document.getElementById('navAuthBtn');
  const navAuthBtnText = document.getElementById('navAuthBtnText');
  const authDropdown = document.getElementById('authDropdown');
  const authNavWrapper = document.getElementById('authNavWrapper');

  const mobileAuthBtn = document.getElementById('mobileAuthBtn');
  const mobileAuthLoggedOut = document.getElementById('mobileAuthLoggedOut');
  const mobileAuthLoggedIn = document.getElementById('mobileAuthLoggedIn');
  const mobileSignOutBtn = document.getElementById('mobileSignOutBtn');
  const mobileAuthName = document.getElementById('mobileAuthName');
  const mobileAuthFarm = document.getElementById('mobileAuthFarm');

  const tabSignInBtn = document.getElementById('tabSignInBtn');
  const tabSignUpBtn = document.getElementById('tabSignUpBtn');
  const panelSignIn = document.getElementById('panelSignIn');
  const panelSignUp = document.getElementById('panelSignUp');
  const panelForgotPassword = document.getElementById('panelForgotPassword');
  const authNavTabs = document.getElementById('authNavTabs');
  const authModalHeading = document.getElementById('authModalHeading');
  const authModalSubheading = document.getElementById('authModalSubheading');

  const btnSwitchToSignUp = document.getElementById('btnSwitchToSignUp');
  const btnSwitchToSignIn = document.getElementById('btnSwitchToSignIn');
  const btnForgotPwdTrigger = document.getElementById('btnForgotPwdTrigger');
  const btnBackToSignInFromForgot = document.getElementById('btnBackToSignInFromForgot');

  const quickDemoFarmerBtn = document.getElementById('quickDemoFarmerBtn');
  const quickDemoVetBtn = document.getElementById('quickDemoVetBtn');

  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');

  // Dropdown menu items
  const dropItemDashboard = document.getElementById('dropItemDashboard');
  const dropItemControl = document.getElementById('dropItemControl');
  const dropItemBelts = document.getElementById('dropItemBelts');
  const dropItemStore = document.getElementById('dropItemStore');
  const dropItemSignOut = document.getElementById('dropItemSignOut');

  // Dropdown profile labels
  const authDropdownName = document.getElementById('authDropdownName');
  const authDropdownFarm = document.getElementById('authDropdownFarm');
  const authDropdownBadge = document.getElementById('authDropdownBadge');
  const authDropdownAvatar = document.getElementById('authDropdownAvatar');

  // Preset demo accounts
  const DEMO_PROFILES = {
    farmer: {
      name: 'Dairy Farmer',
      phone: '1800-DAIRY-PULSE',
      email: 'farmer@dairypulse.in',
      farm: 'Sri Lakshmi Dairy Farm',
      role: 'Dairy Owner &bull; 48 Animals',
      herdType: 'Mixed (Cows & Buffaloes)',
      herdSize: '11-50',
      avatar: '👨‍🌾'
    },
    vet: {
      name: 'Veterinary Officer',
      phone: '1800-DAIRY-PULSE',
      email: 'vet.care@dairypulse.in',
      farm: 'District Veterinary Division',
      role: 'Chief Veterinary Officer',
      herdType: 'Multi-Farm Telemetry',
      herdSize: '500+',
      avatar: '🩺'
    }
  };

  // State: current active user (from localStorage if available)
  let activeUser = null;
  try {
    const savedUser = localStorage.getItem('dairypulse_active_user');
    if (savedUser) {
      activeUser = JSON.parse(savedUser);
    }
  } catch (e) {
    console.error('Failed reading user from storage', e);
  }

  function updateAuthUI() {
    if (activeUser) {
      // User is logged in
      if (navAuthBtnText) navAuthBtnText.textContent = activeUser.name.split(' ')[0] + ' ▾';
      if (navAuthBtn) {
        navAuthBtn.classList.add('logged-in');
        navAuthBtn.title = `${activeUser.name} (${activeUser.farm})`;
      }
      if (authDropdownName) authDropdownName.textContent = activeUser.name;
      if (authDropdownFarm) authDropdownFarm.textContent = activeUser.farm;
      if (authDropdownBadge) authDropdownBadge.innerHTML = activeUser.role || 'Dairy Farm Member';
      if (authDropdownAvatar) authDropdownAvatar.textContent = activeUser.avatar || '👨‍🌾';

      // Mobile Drawer UI
      if (mobileAuthLoggedOut) mobileAuthLoggedOut.style.display = 'none';
      if (mobileAuthLoggedIn) mobileAuthLoggedIn.style.display = 'block';
      if (mobileAuthName) mobileAuthName.textContent = activeUser.name;
      if (mobileAuthFarm) mobileAuthFarm.textContent = activeUser.farm;

      // Order modal: keep customer fields clean for fresh user input

    } else {
      // User is logged out
      if (navAuthBtnText) navAuthBtnText.textContent = 'Sign In';
      if (navAuthBtn) {
        navAuthBtn.classList.remove('logged-in');
        navAuthBtn.title = 'Sign In or Register Farm';
      }
      if (authDropdown) authDropdown.style.display = 'none';

      // Mobile Drawer UI
      if (mobileAuthLoggedOut) mobileAuthLoggedOut.style.display = 'block';
      if (mobileAuthLoggedIn) mobileAuthLoggedIn.style.display = 'none';
    }
  }

  function openAuthModal(mode = 'signin') {
    if (!authModal) return;
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchAuthMode(mode);
  }

  function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function switchAuthMode(mode) {
    if (panelSignIn) panelSignIn.style.display = 'none';
    if (panelSignUp) panelSignUp.style.display = 'none';
    if (panelForgotPassword) panelForgotPassword.style.display = 'none';
    if (authNavTabs) authNavTabs.style.display = 'grid';

    if (tabSignInBtn) tabSignInBtn.classList.remove('active');
    if (tabSignUpBtn) tabSignUpBtn.classList.remove('active');

    if (mode === 'signin') {
      if (panelSignIn) panelSignIn.style.display = 'block';
      if (tabSignInBtn) tabSignInBtn.classList.add('active');
      if (authModalHeading) authModalHeading.textContent = 'Sign In to Your Farm';
      if (authModalSubheading) authModalSubheading.textContent = 'Access herd telemetry, smart belts, and livestock insights.';
    } else if (mode === 'signup') {
      if (panelSignUp) panelSignUp.style.display = 'block';
      if (tabSignUpBtn) tabSignUpBtn.classList.add('active');
      if (authModalHeading) authModalHeading.textContent = 'Register Your Dairy Farm';
      if (authModalSubheading) authModalSubheading.textContent = 'Connect cows & buffaloes with smart wearable collar monitoring.';
    } else if (mode === 'forgot') {
      if (panelForgotPassword) panelForgotPassword.style.display = 'block';
      if (authNavTabs) authNavTabs.style.display = 'none';
      if (authModalHeading) authModalHeading.textContent = 'Password Recovery';
      if (authModalSubheading) authModalSubheading.textContent = 'Verify your phone/email to set a new password.';
    }
  }

  function loginUser(userObj, remember = true) {
    activeUser = userObj;
    if (remember) {
      try {
        localStorage.setItem('dairypulse_active_user', JSON.stringify(activeUser));
      } catch (e) {
        console.error('Storage error', e);
      }
    }
    updateAuthUI();
    closeAuthModal();
    showToast(`Welcome, ${activeUser.name}! Farm telemetry is live. 🐄`, '🟢');
  }

  function logoutUser() {
    const prevName = activeUser ? activeUser.name : 'Farmer';
    activeUser = null;
    try {
      localStorage.removeItem('dairypulse_active_user');
    } catch (e) {
      console.error('Storage error', e);
    }
    updateAuthUI();
    if (authDropdown) authDropdown.style.display = 'none';
    showToast(`Signed out successfully. Have a great day, ${prevName}! 🌾`, '👋');
  }

  // Event Listeners for Auth
  if (navAuthBtn) {
    navAuthBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeUser) {
        // Toggle user dropdown menu
        if (authDropdown) {
          authDropdown.style.display = (authDropdown.style.display === 'block') ? 'none' : 'block';
        }
      } else {
        openAuthModal('signin');
      }
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (authDropdown && authDropdown.style.display === 'block') {
      if (authNavWrapper && !authNavWrapper.contains(e.target)) {
        authDropdown.style.display = 'none';
      }
    }
  });

  if (mobileAuthBtn) {
    mobileAuthBtn.addEventListener('click', () => {
      closeMobileNav();
      openAuthModal('signin');
    });
  }

  if (mobileSignOutBtn) {
    mobileSignOutBtn.addEventListener('click', () => {
      closeMobileNav();
      logoutUser();
    });
  }

  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', closeAuthModal);
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  // Tab buttons
  if (tabSignInBtn) {
    tabSignInBtn.addEventListener('click', () => switchAuthMode('signin'));
  }
  if (tabSignUpBtn) {
    tabSignUpBtn.addEventListener('click', () => switchAuthMode('signup'));
  }

  if (btnSwitchToSignUp) {
    btnSwitchToSignUp.addEventListener('click', () => switchAuthMode('signup'));
  }
  if (btnSwitchToSignIn) {
    btnSwitchToSignIn.addEventListener('click', () => switchAuthMode('signin'));
  }
  if (btnForgotPwdTrigger) {
    btnForgotPwdTrigger.addEventListener('click', () => switchAuthMode('forgot'));
  }
  if (btnBackToSignInFromForgot) {
    btnBackToSignInFromForgot.addEventListener('click', () => switchAuthMode('signin'));
  }

  // 1-Click Fast Demo Logins
  if (quickDemoFarmerBtn) {
    quickDemoFarmerBtn.addEventListener('click', () => {
      loginUser(DEMO_PROFILES.farmer, true);
    });
  }

  if (quickDemoVetBtn) {
    quickDemoVetBtn.addEventListener('click', () => {
      loginUser(DEMO_PROFILES.vet, true);
    });
  }

  // Password visibility toggles
  document.querySelectorAll('.auth-toggle-pwd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = '🙈';
        } else {
          input.type = 'password';
          btn.textContent = '👁️';
        }
      }
    });
  });

  // Sign In Form submission
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identityInput = document.getElementById('signInIdentity');
      const passInput = document.getElementById('signInPassword');
      const rememberCheckbox = document.getElementById('signInRemember');
      const identityErr = document.getElementById('signInIdentityErr');
      const passErr = document.getElementById('signInPasswordErr');

      let isValid = true;
      if (identityErr) identityErr.textContent = '';
      if (passErr) passErr.textContent = '';

      const identityVal = identityInput ? identityInput.value.trim() : '';
      const passVal = passInput ? passInput.value.trim() : '';

      if (!identityVal) {
        if (identityErr) identityErr.textContent = 'Please enter your mobile number or email.';
        isValid = false;
      }
      if (!passVal) {
        if (passErr) passErr.textContent = 'Please enter your password.';
        isValid = false;
      } else if (passVal.length < 4) {
        if (passErr) passErr.textContent = 'Password must be at least 4 characters.';
        isValid = false;
      }

      if (!isValid) return;

      // Check preset or generate custom profile
      if (identityVal.includes('farmer') || identityVal.includes('demo') || identityVal.includes('owner')) {
        loginUser(DEMO_PROFILES.farmer, rememberCheckbox ? rememberCheckbox.checked : true);
        return;
      } else if (identityVal.includes('vet') || identityVal.includes('doctor') || identityVal.includes('medic')) {
        loginUser(DEMO_PROFILES.vet, rememberCheckbox ? rememberCheckbox.checked : true);
        return;
      }

      let matchedName = 'Dairy Farmer';
      let matchedFarm = 'DairyPulse Member Farm';
      if (identityVal.includes('@')) {
        matchedName = identityVal.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        matchedFarm = `${matchedName}'s Dairy Farm`;
      } else {
        matchedName = `Farmer (${identityVal.slice(-4)})`;
        matchedFarm = 'Local Dairy Farm';
      }

      const customUser = {
        name: matchedName,
        phone: identityVal.includes('@') ? 'Registered Mobile' : identityVal,
        email: identityVal.includes('@') ? identityVal : `${identityVal}@dairypulse.in`,
        farm: matchedFarm,
        role: 'Registered Herd Owner',
        herdType: 'Mixed Herd',
        herdSize: '11-50',
        avatar: '👨‍🌾'
      };

      loginUser(customUser, rememberCheckbox ? rememberCheckbox.checked : true);
    });
  }

  // Sign Up Form submission
  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('signUpFullName');
      const phoneInput = document.getElementById('signUpPhone');
      const emailInput = document.getElementById('signUpEmail');
      const farmInput = document.getElementById('signUpFarmName');
      const herdTypeSelect = document.getElementById('signUpHerdType');
      const herdSizeSelect = document.getElementById('signUpHerdSize');
      const passInput = document.getElementById('signUpPassword');
      const confirmInput = document.getElementById('signUpConfirmPassword');

      const nameErr = document.getElementById('signUpNameErr');
      const phoneErr = document.getElementById('signUpPhoneErr');
      const farmErr = document.getElementById('signUpFarmErr');
      const passErr = document.getElementById('signUpPasswordErr');
      const confirmErr = document.getElementById('signUpConfirmErr');

      if (nameErr) nameErr.textContent = '';
      if (phoneErr) phoneErr.textContent = '';
      if (farmErr) farmErr.textContent = '';
      if (passErr) passErr.textContent = '';
      if (confirmErr) confirmErr.textContent = '';

      let isValid = true;
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const farmVal = farmInput ? farmInput.value.trim() : '';
      const passVal = passInput ? passInput.value : '';
      const confirmVal = confirmInput ? confirmInput.value : '';

      if (!nameVal) {
        if (nameErr) nameErr.textContent = 'Please enter your name.';
        isValid = false;
      }
      if (!phoneVal || phoneVal.replace(/\D/g, '').length < 10) {
        if (phoneErr) phoneErr.textContent = 'Please enter a valid 10-digit mobile number.';
        isValid = false;
      }
      if (!farmVal) {
        if (farmErr) farmErr.textContent = 'Please enter your farm or dairy name.';
        isValid = false;
      }
      if (!passVal || passVal.length < 6) {
        if (passErr) passErr.textContent = 'Password must be at least 6 characters.';
        isValid = false;
      }
      if (passVal !== confirmVal) {
        if (confirmErr) confirmErr.textContent = 'Passwords do not match.';
        isValid = false;
      }

      if (!isValid) return;

      const newUser = {
        name: nameVal,
        phone: `+91 ${phoneVal}`,
        email: emailInput && emailInput.value.trim() ? emailInput.value.trim() : `${phoneVal}@dairypulse.in`,
        farm: farmVal,
        role: `Dairy Owner &bull; ${herdSizeSelect ? herdSizeSelect.value : '20'} Animals`,
        herdType: herdTypeSelect ? herdTypeSelect.value : 'Mixed Herd',
        herdSize: herdSizeSelect ? herdSizeSelect.value : '11-50',
        avatar: '👨‍🌾'
      };

      loginUser(newUser, true);
      showToast(`Farm registered successfully! Welcome to DairyPulse, ${newUser.name}. 🎉`, '🌿', 4000);
      switchView('viewDashboard');
    });
  }

  // Forgot Password submission
  if (forgotPasswordForm) {
    let otpSent = false;
    const otpSection = document.getElementById('otpVerificationSection');
    const btnForgotText = document.getElementById('btnForgotText');
    const otpCodeInput = document.getElementById('otpCodeInput');

    forgotPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identityInput = document.getElementById('forgotIdentity');
      if (!otpSent) {
        if (!identityInput || !identityInput.value.trim()) {
          showToast('Please enter your mobile or email', '⚠️');
          return;
        }
        otpSent = true;
        if (otpSection) otpSection.style.display = 'block';
        if (btnForgotText) btnForgotText.textContent = 'Verify OTP & Reset Password';
        if (otpCodeInput) otpCodeInput.value = '4829';
        showToast('OTP sent to your device! Code is 4829', '📲', 4500);
      } else {
        showToast('Password updated successfully! Please sign in.', '✅');
        otpSent = false;
        if (otpSection) otpSection.style.display = 'none';
        if (btnForgotText) btnForgotText.textContent = 'Send Recovery OTP Code';
        forgotPasswordForm.reset();
        switchAuthMode('signin');
      }
    });
  }

  // Dropdown navigation actions
  if (dropItemDashboard) {
    dropItemDashboard.addEventListener('click', () => {
      if (authDropdown) authDropdown.style.display = 'none';
      switchView('viewDashboard');
    });
  }
  if (dropItemControl) {
    dropItemControl.addEventListener('click', () => {
      if (authDropdown) authDropdown.style.display = 'none';
      switchView('viewControlCenter');
    });
  }
  if (dropItemBelts) {
    dropItemBelts.addEventListener('click', () => {
      if (authDropdown) authDropdown.style.display = 'none';
      switchView('viewSmartBelt');
    });
  }
  if (dropItemStore) {
    dropItemStore.addEventListener('click', () => {
      if (authDropdown) authDropdown.style.display = 'none';
      switchView('viewStore');
    });
  }
  if (dropItemSignOut) {
    dropItemSignOut.addEventListener('click', logoutUser);
  }

  // Initialize Auth state
  updateAuthUI();

  // Expose global DairyPulse bridge for advanced AI chatbot interactions
  window.DairyPulse = {
    switchView,
    showToast,
    openAuthModal,
    closeAuthModal,
    loginUser,
    logoutUser,
    getCurrentUser: () => activeUser,
    openQuickSettings,
    closeQuickSettings,
    openControlCenter: (tabId) => {
      switchView('viewControlCenter');
      if (tabId) switchControlCenterTab(tabId);
    },
    setCollarQuantity: (qty) => {
      collarQty = Math.max(1, Math.min(100, qty));
      if (displayQtyVal) displayQtyVal.textContent = collarQty;
      updateStorePrice();
    },
    selectSpec: (spec) => {
      if (spec.toLowerCase().includes('buf')) {
        if (btnSpecBuffalo) btnSpecBuffalo.click();
      } else {
        if (btnSpecCow) btnSpecCow.click();
      }
    },
    openStoreAndSelectTier: (tierQty) => {
      switchView('viewStore');
      collarQty = tierQty;
      if (displayQtyVal) displayQtyVal.textContent = collarQty;
      updateStorePrice();
    },
    addCurrentToCart: (spec, qty) => {
      if (spec) window.DairyPulse.selectSpec(spec);
      if (qty) window.DairyPulse.setCollarQuantity(qty);
      if (btnStoreAddToCart) btnStoreAddToCart.click();
    },
    openCheckout: (spec, qty) => {
      openOrderModal(spec || selectedSpec, qty || collarQty);
    },
    toggleBilling: (annual) => {
      updateSubscriptionBilling(annual);
    },
    selectDashboardAnimal: (animalId) => {
      switchView('viewDashboard');
      const row = document.querySelector(`.animal-row[data-id="${animalId}"]`);
      if (row) row.click();
    }
  };

  // =========================================================================
  // 15. MULTILINGUAL TRANSLATION ENGINE (ENGLISH | తెలుగు | हिन्दी)
  // =========================================================================
  const TRANSLATIONS = {
    en: {
      heroTitle: 'Smarter Monitoring. <span>Healthier Animals.</span> Better Farming.',
      heroSub: 'Real-time wearable telemetry for Indian dairy cows & buffaloes. Early illness alerts, estrus heat detection, rumination patterns, and GPS geo-fencing on your phone.',
      btnDemo: 'Request a Demo',
      btnBelt: 'Buy Smart Belt 🛒',
      navHome: 'Home',
      navFeatures: 'Features',
      navSmartBelt: 'Smart Belt',
      navPricing: 'Pricing',
      navDashboard: 'Dashboard',
      navContact: 'Contact',
      toast: 'Language set to English (Default)'
    },
    te: {
      heroTitle: 'తెలివైన పర్యవేక్షణ. <span>ఆరోగ్యకరమైన పశువులు.</span> మెరుగైన పాడి.',
      heroSub: 'భారతీయ పాడి ఆవులు మరియు గేదెల కోసం రియల్-టైమ్ స్మార్ట్ బెల్ట్ పర్యవేక్షణ. ముందస్తు వ్యాధి హెచ్చరికలు, ఎద గుర్తింపు మరియు రూమినేషన్ విశ్లేషణ.',
      btnDemo: 'డెమో అభ్యర్థించండి',
      btnBelt: 'స్మార్ట్ బెల్ట్ కొనండి 🛒',
      navHome: 'హోమ్',
      navFeatures: 'ఫీచర్లు',
      navSmartBelt: 'స్మార్ట్ బెల్ట్',
      navPricing: 'ధరలు',
      navDashboard: 'డ్యాష్‌బోర్డ్',
      navContact: 'సంప్రదించండి',
      toast: 'భాష తెలుగుగా మార్చబడింది (Telugu Language Active)'
    },
    hi: {
      heroTitle: 'स्मार्ट निगरानी। <span>स्वस्थ पशु।</span> बेहतर डेयरी।',
      heroSub: 'भारतीय डेयरी गायों और भैंसों के लिए रीयल-टाइम स्मार्ट बेल्ट कॉलर। प्रारंभिक बीमारी अलर्ट, मद (हीट) का पता लगाना और जुगाली विश्लेषण।',
      btnDemo: 'डेमो बुक करें',
      btnBelt: 'स्मार्ट बेल्ट खरीदें 🛒',
      navHome: 'होम',
      navFeatures: 'सुविधाएं',
      navSmartBelt: 'स्मार्ट बेल्ट',
      navPricing: 'कीमतें',
      navDashboard: 'डैशबोर्ड',
      navContact: 'संपर्क',
      toast: 'भाषा हिन्दी में सेट कर दी गई है (Hindi Language Active)'
    }
  };

  function setAppLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    
    // Update active state on all language buttons
    document.querySelectorAll('.lang-btn, .m-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const heroTitle = document.getElementById('mainHeroTitle');
    const heroSub = document.getElementById('mainHeroSubtitle');
    const heroDemoBtn = document.getElementById('heroRequestDemoBtn');
    const heroBeltBtn = document.getElementById('heroBuySmartBeltBtn') || document.getElementById('heroBuyBeltBtn');

    if (heroTitle) heroTitle.innerHTML = dict.heroTitle;
    if (heroSub) heroSub.textContent = dict.heroSub;
    if (heroDemoBtn) heroDemoBtn.textContent = dict.btnDemo;
    if (heroBeltBtn) heroBeltBtn.innerHTML = `<span>${dict.btnBelt}</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;

    // Also call existing applyLanguage in FCC settings if defined
    if (typeof applyLanguage === 'function') {
      applyLanguage(lang);
    } else {
      showToast(dict.toast, '🌐');
    }
  }

  document.querySelectorAll('.lang-btn, .m-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang || 'en';
      setAppLanguage(lang);
    });
  });

  // =========================================================================
  // 16. DEVICE VIEW OPTIMIZER (DESKTOP WORKSTATION VS MOBILE PHONE SIMULATOR)
  // =========================================================================
  const btnDeviceDesktop = document.getElementById('btnDeviceDesktop');
  const btnDeviceMobile = document.getElementById('btnDeviceMobile');
  const dashDesktopViewContainer = document.getElementById('dashDesktopViewContainer');
  const dashMobileViewContainer = document.getElementById('dashMobileViewContainer');

  function setDeviceView(mode) {
    if (mode === 'mobile') {
      if (btnDeviceMobile) btnDeviceMobile.classList.add('active');
      if (btnDeviceDesktop) btnDeviceDesktop.classList.remove('active');
      if (dashDesktopViewContainer) dashDesktopViewContainer.style.display = 'none';
      if (dashMobileViewContainer) dashMobileViewContainer.style.display = 'block';
      showToast('Switched to Mobile IoT View (Farmer Smartphone Mode)', '📱');
    } else {
      if (btnDeviceDesktop) btnDeviceDesktop.classList.add('active');
      if (btnDeviceMobile) btnDeviceMobile.classList.remove('active');
      if (dashDesktopViewContainer) dashDesktopViewContainer.style.display = 'block';
      if (dashMobileViewContainer) dashMobileViewContainer.style.display = 'none';
      showToast('Switched to Workstation View (Multi-Herd Analytics)', '💻');
    }
  }

  if (btnDeviceDesktop) btnDeviceDesktop.addEventListener('click', () => setDeviceView('desktop'));
  if (btnDeviceMobile) btnDeviceMobile.addEventListener('click', () => setDeviceView('mobile'));

  // =========================================================================
  // 17. MOBILE SMARTPHONE SIMULATOR INTERACTIVITY & ANIMAL PROFILES
  // =========================================================================
  const mobileAnimalProfiles = {
    'DP-1024': {
      avatar: '🐄',
      name: 'Cow #DP-1024 - Gauri',
      breed: 'Gir Indigenous Dairy Cow • 4.2 Years Old',
      status: 'Optimal',
      badgeClass: 'healthy',
      temp: '38.5°C',
      tempColor: '#16a34a',
      rum: '480 m',
      rest: '6.4 hrs',
      alertTitle: 'Vitals Normal',
      alertMsg: 'Continuous thermal and rumen chewing sensors report steady optimal readings.'
    },
    'DP-2042': {
      avatar: '🐃',
      name: 'Buffalo #DP-2042 - Kaali',
      breed: 'Murrah Buffalo • 3.5 Years Old',
      status: 'Estrus Heat',
      badgeClass: 'attention',
      temp: '39.8°C',
      tempColor: '#f59e0b',
      rum: '280 m',
      rest: '4.1 hrs',
      alertTitle: '⚠️ High Estrus Heat Detected (96%)',
      alertMsg: 'Pacing surged 2.4x with +0.8°C thermal rise. Optimal AI Insemination Window: 14:00 - 20:00 today.'
    },
    'DP-2041': {
      avatar: '🐃',
      name: 'Buffalo #DP-2041 - Bheema',
      breed: 'Murrah Buffalo • 4.8 Years Old',
      status: 'Hydration Watch',
      badgeClass: 'attention',
      temp: '39.2°C',
      tempColor: '#f59e0b',
      rum: '340 m',
      rest: '7.8 hrs',
      alertTitle: 'Reduced Water Intake',
      alertMsg: 'Water trough visits down 18% in past 8 hours. Shed worker should check freshwater supply.'
    },
    'DP-1025': {
      avatar: '🐄',
      name: 'Cow #DP-1025 - Lakshmi',
      breed: 'Sahiwal Dairy Cow • 3.8 Years Old',
      status: 'Optimal',
      badgeClass: 'healthy',
      temp: '38.6°C',
      tempColor: '#16a34a',
      rum: '512 m',
      rest: '6.8 hrs',
      alertTitle: 'High Milk Yield Trend',
      alertMsg: 'Chewing stability is at peak 98/100. Average yield projected +1.2L above historical herd baseline.'
    }
  };

  const mAnimalPills = document.querySelectorAll('.mobile-animal-pills-bar .m-animal-pill');
  const mobileAnimalAvatar = document.getElementById('mobileAnimalAvatar');
  const mobileAnimalName = document.getElementById('mobileAnimalName');
  const mobileAnimalBreed = document.getElementById('mobileAnimalBreed');
  const mobileAnimalBadge = document.getElementById('mobileAnimalBadge');
  const mobileTempDisplay = document.getElementById('mobileTempDisplay');
  const mobileRumDisplay = document.getElementById('mobileRumDisplay');
  const mobileRestDisplay = document.getElementById('mobileRestDisplay');
  const mobileAlertTitle = document.getElementById('mobileAlertTitle');
  const mobileAlertMsg = document.getElementById('mobileAlertMsg');

  mAnimalPills.forEach(pill => {
    pill.addEventListener('click', () => {
      mAnimalPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const id = pill.dataset.animal || pill.dataset.animalId;
      const data = mobileAnimalProfiles[id];
      if (data) {
        if (mobileAnimalAvatar) mobileAnimalAvatar.textContent = data.avatar;
        if (mobileAnimalName) mobileAnimalName.textContent = data.name;
        if (mobileAnimalBreed) mobileAnimalBreed.textContent = data.breed;
        if (mobileAnimalBadge) {
          mobileAnimalBadge.textContent = data.status;
          mobileAnimalBadge.className = `badge-status ${data.badgeClass}`;
        }
        if (mobileTempDisplay) {
          mobileTempDisplay.textContent = data.temp;
          mobileTempDisplay.style.color = data.tempColor;
        }
        if (mobileRumDisplay) mobileRumDisplay.textContent = data.rum;
        if (mobileRestDisplay) mobileRestDisplay.textContent = data.rest;
        if (mobileAlertTitle) mobileAlertTitle.textContent = data.alertTitle;
        if (mobileAlertMsg) mobileAlertMsg.textContent = data.alertMsg;

        showToast(`Loaded ${data.name} on Mobile IoT Display`, '📱');
      }
    });
  });

  // Mobile quick actions
  const mobileActionCallVet = document.getElementById('mobileActionCallVet');
  const mobileActionShareWA = document.getElementById('mobileActionShareWA');
  const mobileActionAddNote = document.getElementById('mobileActionAddNote');
  const mobileActionSnooze = document.getElementById('mobileActionSnooze');

  if (mobileActionCallVet) {
    mobileActionCallVet.addEventListener('click', () => {
      showToast('Connecting to Assigned Veterinary Support Helpline (1800-DAIRY-PULSE)...', '🩺', 4000);
      window.location.href = 'tel:18003247978';
    });
  }

  if (mobileActionShareWA) {
    mobileActionShareWA.addEventListener('click', () => {
      const currentName = mobileAnimalName ? mobileAnimalName.textContent : 'Animal';
      const msg = encodeURIComponent(`[DairyPulse Alert] Telemetry update for ${currentName}. Please review shed conditions.`);
      showToast('Opening WhatsApp dispatch for Farm Staff...', '💬');
      window.open(`https://wa.me/?text=${msg}`, '_blank');
    });
  }

  if (mobileActionAddNote) {
    mobileActionAddNote.addEventListener('click', () => {
      const note = prompt('Enter observation note for this animal (e.g., Given electrolyte water, observed lying down):');
      if (note && note.trim()) {
        showToast(`Observation logged: "${note.trim()}"`, '📝', 3500);
      }
    });
  }

  if (mobileActionSnooze) {
    mobileActionSnooze.addEventListener('click', () => {
      showToast('Alert snoozed for 2 hours. Smart collar will re-evaluate telemetry at 16:30.', '⏰');
    });
  }

  // =========================================================================
  // 18. PRODUCT VIDEO SHOWCASE & CHAPTER NAVIGATION ENGINE
  // =========================================================================
  const btnPlayVideoSimulation = document.getElementById('btnPlayVideoSimulation');
  const btnCtrlPlayPause = document.getElementById('btnCtrlPlayPause');
  const videoProgressBar = document.getElementById('videoProgressBar');
  const videoTimeDisplay = document.getElementById('videoTimeDisplay');
  const chapterNoteText = document.getElementById('chapterNoteText');
  const chapterButtons = document.querySelectorAll('.video-chapters-box .chapter-btn');
  const videoRequestDemoBtn = document.getElementById('videoRequestDemoBtn');

  let isVideoPlaying = false;
  let videoPlayInterval = null;
  let currentVideoSeconds = 74; // starts at 1:14

  function toggleVideoPlayback() {
    isVideoPlaying = !isVideoPlaying;
    if (btnPlayVideoSimulation) {
      btnPlayVideoSimulation.innerHTML = isVideoPlaying 
        ? '<span style="font-size:2rem;color:white;">⏸</span>' 
        : '<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span class="play-btn-glow"></span>';
    }
    if (btnCtrlPlayPause) {
      btnCtrlPlayPause.textContent = isVideoPlaying ? '⏸' : '▶';
    }

    if (isVideoPlaying) {
      showToast('Playing DairyPulse Smart Belt on-farm documentary...', '▶️');
      videoPlayInterval = setInterval(() => {
        currentVideoSeconds = (currentVideoSeconds + 1) % 150;
        const mins = Math.floor(currentVideoSeconds / 60);
        const secs = currentVideoSeconds % 60;
        const timeStr = `0${mins}:${secs < 10 ? '0' : ''}${secs} / 02:30`;
        const pct = ((currentVideoSeconds / 150) * 100).toFixed(1) + '%';
        if (videoTimeDisplay) videoTimeDisplay.textContent = timeStr;
        if (videoProgressBar) videoProgressBar.style.width = pct;
      }, 1000);
    } else {
      clearInterval(videoPlayInterval);
      showToast('Video playback paused.', '⏸');
    }
  }

  if (btnPlayVideoSimulation) btnPlayVideoSimulation.addEventListener('click', toggleVideoPlayback);
  if (btnCtrlPlayPause) btnCtrlPlayPause.addEventListener('click', toggleVideoPlayback);

  chapterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chapterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sec = parseInt(btn.dataset.time, 10) || 0;
      currentVideoSeconds = sec;
      const mins = Math.floor(sec / 60);
      const secs = sec % 60;
      const timeStr = `0${mins}:${secs < 10 ? '0' : ''}${secs} / 02:30`;
      const pct = ((sec / 150) * 100).toFixed(1) + '%';

      if (videoTimeDisplay) videoTimeDisplay.textContent = timeStr;
      if (videoProgressBar) videoProgressBar.style.width = pct;

      const note = btn.dataset.note;
      if (chapterNoteText && note) {
        chapterNoteText.textContent = note;
      }
      showToast(`Jumped to: ${btn.querySelector('.chap-title') ? btn.querySelector('.chap-title').textContent : 'Chapter'}`, '🎬');
    });
  });

  // Wiring Request Demo triggers
  const heroRequestDemoBtn = document.getElementById('heroRequestDemoBtn');
  const navRequestDemoBtn = document.getElementById('navRequestDemoBtn');

  function handleDemoRequestClick() {
    switchView('viewContact');
    const msgInput = document.getElementById('inputMessage');
    if (msgInput) {
      msgInput.value = 'Hello DairyPulse team! I would like to request an on-farm demo of the Smart Belt with telemetry for our dairy animals.';
    }
    const nameInput = document.getElementById('inputName');
    if (nameInput) setTimeout(() => nameInput.focus(), 300);
    showToast('Redirected to Demo Consultation Request Form', '📅');
  }

  if (heroRequestDemoBtn) heroRequestDemoBtn.addEventListener('click', handleDemoRequestClick);
  if (navRequestDemoBtn) navRequestDemoBtn.addEventListener('click', handleDemoRequestClick);
  if (videoRequestDemoBtn) videoRequestDemoBtn.addEventListener('click', handleDemoRequestClick);

  // Video Section Buy Belt Button
  const videoBuyBeltBtn = document.getElementById('videoBuyBeltBtn');
  if (videoBuyBeltBtn) {
    videoBuyBeltBtn.addEventListener('click', () => {
      if (typeof openOrderModal === 'function') {
        openOrderModal('Cow', 1);
      } else {
        switchView('viewStore');
      }
      showToast('DairyPulse Smart Belt — Submit Purchase Request', '🛡️');
    });
  }

  // Video Audio Toggle Button
  const btnCtrlMute = document.getElementById('btnCtrlMute');
  let isVideoMuted = false;
  if (btnCtrlMute) {
    btnCtrlMute.addEventListener('click', () => {
      isVideoMuted = !isVideoMuted;
      btnCtrlMute.textContent = isVideoMuted ? '🔇' : '🔊';
      btnCtrlMute.title = isVideoMuted ? 'Unmute Sound' : 'Mute Sound';
      showToast(isVideoMuted ? 'Video audio muted' : 'Video audio active', isVideoMuted ? '🔇' : '🔊');
    });
  }

  // Farm Team: Add Staff Member
  const btnAddNewStaffMember = document.getElementById('btnAddNewStaffMember');
  if (btnAddNewStaffMember) {
    btnAddNewStaffMember.addEventListener('click', () => {
      const name = prompt('Enter staff or veterinary specialist name:');
      if (name && name.trim()) {
        const role = prompt('Enter role (e.g. Field Herdsman, Veterinary Officer):', 'Field Herdsman');
        showToast(`Staff invitation sent to ${name.trim()} (${role || 'Farm Member'})`, '👨‍🌾');
      }
    });
  }

  // Dashboard Preferences & Settings Save Fallbacks
  const btnSaveDashboardPrefs = document.getElementById('btnSaveDashboardPrefs');
  if (btnSaveDashboardPrefs && !btnSaveDashboardPrefs.form) {
    btnSaveDashboardPrefs.addEventListener('click', () => {
      showToast('Dashboard display preferences saved successfully!', '⚙️');
    });
  }

  // General Settings Save Button Fallback
  const btnSaveGeneralSettings = document.getElementById('btnSaveGeneralSettings');
  if (btnSaveGeneralSettings && !btnSaveGeneralSettings.form) {
    btnSaveGeneralSettings.addEventListener('click', () => {
      showToast('General Farm Settings saved successfully!', '⚙️');
    });
  }

  // Initial runs
  updateCartDisplay();
  updateStorePrice();
  updateSubscriptionBilling(true);
  console.log('DairyPulse Modular Agritech Platform & Farm Control Center active.');
});

