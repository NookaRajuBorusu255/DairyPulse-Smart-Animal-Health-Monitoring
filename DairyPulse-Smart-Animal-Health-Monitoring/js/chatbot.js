/**
 * DairyPulse PulseBot AI — Advanced Agritech & Veterinary Farm Copilot
 * Domain-specific dairy intelligence, real-time quote generation,
 * symptom triage, and bi-directional website control.
 */

document.addEventListener('DOMContentLoaded', () => {

  // State & Memory Context
  const context = {
    farmerHerdSize: null,
    farmerSpecies: null,
    hasGreeted: false
  };

  // DOM Elements
  const chatWrapper = document.getElementById('pulseChatbotWrapper');
  const triggerBtn = document.getElementById('chatbotTriggerBtn');
  const chatWindow = document.getElementById('pulseChatWindow');
  const proactiveBubble = document.getElementById('chatProactiveBubble');
  const dismissBubbleBtn = document.getElementById('dismissProactiveBubble');
  const openFromBubbleBtn = document.getElementById('btnOpenFromBubble');
  const closeChatBtn = document.getElementById('btnCloseChat');
  const clearChatBtn = document.getElementById('btnClearChat');
  const messagesBox = document.getElementById('chatbotMessages');
  const typingIndicator = document.getElementById('chatTypingIndicator');
  const chatForm = document.getElementById('chatbotForm');
  const chatInput = document.getElementById('chatInputMessage');
  const chipsBar = document.getElementById('chatQuickChipsBar');
  const unreadBadge = document.getElementById('chatUnreadBadge');

  let isOpen = false;
  let unreadCount = 0;

  // =========================================================================
  // 1. OPEN / CLOSE / PROACTIVE BUBBLE CONTROLS
  // =========================================================================
  function openChat() {
    isOpen = true;
    chatWindow.classList.add('active');
    proactiveBubble.classList.remove('show');
    unreadCount = 0;
    unreadBadge.style.display = 'none';

    if (messagesBox.children.length === 0) {
      sendBotWelcome();
    }
    setTimeout(() => chatInput.focus(), 300);
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove('active');
  }

  triggerBtn.addEventListener('click', () => {
    if (isOpen) closeChat();
    else openChat();
  });

  if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);

  if (dismissBubbleBtn) {
    dismissBubbleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      proactiveBubble.classList.remove('show');
    });
  }

  if (openFromBubbleBtn) {
    openFromBubbleBtn.addEventListener('click', () => {
      openChat();
    });
  }

  // Clear conversation
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      messagesBox.innerHTML = '';
      sendBotWelcome();
      if (window.DairyPulse && window.DairyPulse.showToast) {
        window.DairyPulse.showToast('Conversation reset', '🔄');
      }
    });
  }

  // Proactive greeting after 3.5 seconds if chat is unopened
  setTimeout(() => {
    if (!isOpen && !context.hasGreeted) {
      proactiveBubble.classList.add('show');
      context.hasGreeted = true;
    }
  }, 3500);

  // Quick prompt chips click listener
  if (chipsBar) {
    chipsBar.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        if (query) {
          handleUserSubmit(query);
        }
      });
    });
  }

  // =========================================================================
  // 2. MESSAGE RENDERING ENGINE
  // =========================================================================
  function appendMessage(sender, textHtml, actions = []) {
    const row = document.createElement('div');
    row.className = `chat-msg-row ${sender}`;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let avatarHtml = '';
    if (sender === 'bot') {
      avatarHtml = `
        <div class="msg-avatar">
          <img src="assets/logo.svg" alt="PulseBot" width="18" height="18">
        </div>
      `;
    }

    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = `
        <div class="bot-action-group">
          ${actions.map((act, i) => `
            <button class="bot-action-btn" data-act-idx="${i}">
              <span>${act.label}</span>
              <span>→</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    row.innerHTML = `
      ${avatarHtml}
      <div class="msg-bubble">
        <div>${textHtml}</div>
        ${actionsHtml}
        <span class="msg-timestamp">${timeStr}</span>
      </div>
    `;

    // Attach click listeners to interactive action buttons
    if (actions && actions.length > 0) {
      row.querySelectorAll('.bot-action-btn').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          const act = actions[idx];
          if (act && typeof act.handler === 'function') {
            act.handler();
          }
        });
      });
    }

    messagesBox.appendChild(row);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    if (!isOpen && sender === 'bot') {
      unreadCount++;
      unreadBadge.textContent = unreadCount;
      unreadBadge.style.display = 'flex';
      proactiveBubble.classList.add('show');
    }
  }

  function showTyping(show, text = 'PulseBot is consulting herd telemetry...') {
    if (show) {
      typingIndicator.querySelector('.typing-text').textContent = text;
      typingIndicator.style.display = 'flex';
      messagesBox.scrollTop = messagesBox.scrollHeight;
    } else {
      typingIndicator.style.display = 'none';
    }
  }

  // Initial welcome greeting from PulseBot
  function sendBotWelcome() {
    const welcomeHtml = `
      <b>Namaste! I am PulseBot 🤖</b><br>
      Your AI agritech &amp; veterinary assistant for <b>DairyPulse</b>.
      <br><br>
      I can help you with:
      <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 0.82rem; line-height: 1.5;">
        <li>🌡️ <b>Vital Symptom Triage</b> (Fever &amp; Rumination alerts)</li>
        <li>🐃 <b>Silent Estrus Detection</b> for Cows &amp; Buffaloes</li>
        <li>💰 <b>Custom Herd Volume Quotes</b> (Up to 44% OFF)</li>
        <li>📡 <b>LoRa Gateway &amp; Battery Telemetry</b></li>
      </ul>
      <p style="margin-top: 6px; font-size: 0.8rem; color: var(--slate-500);">
        Ask me any question, or select a quick topic above!
      </p>
    `;

    const actions = [
      {
        label: '💰 Calculate 10-Collar Mega Farm Deal',
        handler: () => {
          handleUserSubmit('How much does the 10-collar Farm Pack cost?');
        }
      },
      {
        label: '📊 Inspect Live Dashboard Telemetry',
        handler: () => {
          if (window.DairyPulse) {
            window.DairyPulse.selectDashboardAnimal('DP-1024');
            window.DairyPulse.showToast('Navigated to FarmOS Dashboard (Cow DP-1024)', '📊');
          }
        }
      }
    ];

    appendMessage('bot', welcomeHtml, actions);
  }

  // =========================================================================
  // 3. ADVANCED NATURAL LANGUAGE & DOMAIN INTELLIGENCE ENGINE
  // =========================================================================
  function generateBotResponse(userInput) {
    const query = userInput.toLowerCase().trim();

    // 1. Check for herd size and species mentions to remember
    const numberMatch = query.match(/\b(\d+)\s*(cow|cows|buffalo|buffaloes|animals|head|collars|belts)?\b/);
    if (numberMatch) {
      const num = parseInt(numberMatch[1]);
      if (num > 0) context.farmerHerdSize = num;
    }
    if (query.includes('buffalo') || query.includes('murrah')) {
      context.farmerSpecies = 'Water Buffalo';
    } else if (query.includes('cow') || query.includes('jersey') || query.includes('hf') || query.includes('gir')) {
      context.farmerSpecies = 'Dairy Cow';
    }

    // AUTH / LOGIN / SIGNUP INTENT
    if (query.includes('sign in') || query.includes('login') || query.includes('log in') || query.includes('sign up') || query.includes('signup') || query.includes('register') || query.includes('account')) {
      const isLogged = window.DairyPulse && window.DairyPulse.getCurrentUser && window.DairyPulse.getCurrentUser();
      if (isLogged) {
        return {
          text: `
            <b>👤 Farm Account Profile</b><br><br>
            You are currently signed in as <b>${isLogged.name}</b> (${isLogged.farm}).<br>
            Your connected smart collars and animal telemetry are active.
          `,
          actions: [
            {
              label: '📊 Open Farm Dashboard',
              handler: () => {
                if (window.DairyPulse) window.DairyPulse.switchView('viewDashboard');
              }
            },
            {
              label: '🚪 Sign Out',
              handler: () => {
                if (window.DairyPulse) window.DairyPulse.logoutUser();
              }
            }
          ]
        };
      } else {
        return {
          text: `
            <b>🔑 DairyPulse FarmOS Portal</b><br><br>
            You can sign in to view your cows and buffaloes, live rumination charts, and sensor telemetry, or register a new farm in seconds!
          `,
          actions: [
            {
              label: '🔑 Sign In to FarmOS',
              handler: () => {
                if (window.DairyPulse) window.DairyPulse.openAuthModal('signin');
              }
            },
            {
              label: '📝 Register New Farm (Sign Up)',
              handler: () => {
                if (window.DairyPulse) window.DairyPulse.openAuthModal('signup');
              }
            }
          ]
        };
      }
    }

    // A. FEVER / BODY TEMPERATURE
    if (query.includes('fever') || query.includes('temp') || query.includes('hot') || query.includes('39') || query.includes('40') || query.includes('shiver') || query.includes('sick') || query.includes('bukhar')) {
      let resp = `
        <b>🌡️ Vital Telemetry &amp; Fever Detection</b>
        <br><br>
        Normal cattle temperature ranges between <b>38.0°C and 39.0°C</b>:
        <div class="telemetry-preview-card">
          &bull; <b>39.2°C – 39.5°C (Attention Alert):</b> Early indication of subclinical mastitis, digestive inflammation, or thermal heat distress.<br>
          &bull; <b>Above 39.8°C (Critical Alert):</b> High fever! Possible acute bacterial/viral infection or severe heat stroke.
        </div>
        DairyPulse wearable sensors monitor dermal neck blood flow 24/7 and alert you via SMS <b>12–24 hours before milk yields drop</b>!
      `;

      return {
        text: resp,
        actions: [
          {
            label: '📊 Inspect High-Temp Alert Animal (DP-2042: 39.8°C)',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.selectDashboardAnimal('DP-2042');
                window.DairyPulse.showToast('Opened Alert Cow DP-2042 (39.8°C)', '🚨');
              }
            }
          },
          {
            label: '🛍️ Order Smart Belts to Track Temperature',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openStoreAndSelectTier(1);
              }
            }
          }
        ]
      };
    }

    // B. RUMINATION / DIGESTION / FEED DROP
    if (query.includes('rumination') || query.includes('chew') || query.includes('cud') || query.includes('eat') || query.includes('appetite') || query.includes('bloat') || query.includes('acidosis') || query.includes('feed')) {
      return {
        text: `
          <b>🌾 Rumination Monitoring &amp; Digestive Baselines</b>
          <br><br>
          Healthy cows and buffaloes chew cud for <b>450–500 minutes daily</b>.
          <br><br>
          <b>Anomalies Detected by DairyPulse:</b>
          <ul style="margin: 4px 0 0 16px; font-size: 0.8rem;">
            <li><b>A drop &gt;15% in rumination:</b> Earliest sign of metabolic acidosis, displaced abomasum, or poor fodder quality.</li>
            <li><b>Sudden drop during lactation:</b> Warns of impending ketosis before milk depression sets in.</li>
          </ul>
          Our 3D motion accelerometer counts exact chewing regurgitation cycles with 94.6% veterinary accuracy.
        `,
        actions: [
          {
            label: '📊 View Animal DP-2041 with 18% Rumination Drop',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.selectDashboardAnimal('DP-2041');
                window.DairyPulse.showToast('Inspecting Rumination Anomaly for Buffalo DP-2041', '⚠️');
              }
            }
          },
          {
            label: '📋 Book In-Person Farm Trial',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewContact');
              }
            }
          }
        ]
      };
    }

    // C. ESTRUS / SILENT HEAT CYCLE
    if (query.includes('heat') || query.includes('estrus') || query.includes('silent') || query.includes('breed') || query.includes('inseminat') || query.includes('pregnant') || query.includes('mating') || query.includes('semen')) {
      return {
        text: `
          <b>🐃 Silent Heat &amp; Estrus AI Detection</b>
          <br><br>
          <b>The Problem:</b> Over 60% of water buffaloes and high-yielding dairy cows exhibit <i>silent heat</i>—mostly during nocturnal hours without visible mounting behavior.
          <br><br>
          <b>How DairyPulse Solves It:</b>
          <ul style="margin: 4px 0 0 16px; font-size: 0.8rem;">
            <li>Detects nocturnal pacing, restlessness &amp; behavioral agitation.</li>
            <li>Identifies the transient +0.3°C thermal surge.</li>
            <li>Sends an SMS alert indicating the <b>ideal 8-hour window for Artificial Insemination (AI)</b>, reducing costly missed cycles!</li>
          </ul>
        `,
        actions: [
          {
            label: '🐃 Select Water Buffalo Collar Spec',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewStore');
                window.DairyPulse.selectSpec('Buffalo');
                window.DairyPulse.showToast('Selected Water Buffalo Strap in Store', '🐃');
              }
            }
          },
          {
            label: '📊 View Estrus Heat Alert (DP-2042)',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.selectDashboardAnimal('DP-2042');
              }
            }
          }
        ]
      };
    }

    // D. PRICING & VOLUME DISCOUNT CALCULATOR
    if (query.includes('price') || query.includes('cost') || query.includes('discount') || query.includes('how much') || query.includes('rate') || query.includes('quote') || query.includes('offer') || query.includes('deal') || query.includes('buy') || query.includes('collar') || query.includes('kitna')) {
      const q = context.farmerHerdSize || 10;
      let unitPrice = 3499;
      let savingsPerCollar = 1000;
      let discountTag = '22% Launch Discount';
      let bonusHub = '';

      if (q >= 10) {
        unitPrice = 2499;
        savingsPerCollar = 2000;
        discountTag = '44% Mega Farm Deal';
        bonusHub = '<br>🎁 <b>Bonus Included:</b> Free LoRaWAN Gateway Hub (worth ₹8,500)!';
      } else if (q >= 5) {
        unitPrice = 2999;
        savingsPerCollar = 1500;
        discountTag = '33% Herd Pack Discount';
      }

      const totalMRP = 4499 * q;
      const totalDiscounted = unitPrice * q;
      const totalSavings = totalMRP - totalDiscounted;

      return {
        text: `
          <b>💰 DairyPulse Pricing &amp; Volume Discount Quote</b>
          <br><br>
          Standard MRP: <span style="text-decoration: line-through; color: var(--slate-400);">₹4,499</span>
          <br>
          <b>Calculated Quote for ${q} Collar(s):</b>
          <div class="telemetry-preview-card" style="border-left: 3px solid var(--brand-green-primary);">
            &bull; Applied Rate: <b>₹${unitPrice.toLocaleString('en-IN')}/belt</b> (${discountTag})<br>
            &bull; Original Total MRP: <s>₹${totalMRP.toLocaleString('en-IN')}</s><br>
            &bull; <b>Total Payable: ₹${totalDiscounted.toLocaleString('en-IN')}</b><br>
            &bull; <span style="color: #16a34a; font-weight: 700;">You Save ₹${totalSavings.toLocaleString('en-IN')}!</span>
            ${bonusHub}
          </div>
          All collars include a <b>1-Year Full Hardware Replacement Guarantee</b> and Cash on Delivery across India.
        `,
        actions: [
          {
            label: `🛍️ Add ${q} Collar(s) to Cart (₹${totalDiscounted.toLocaleString('en-IN')})`,
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openStoreAndSelectTier(q);
                window.DairyPulse.addCurrentToCart(context.farmerSpecies || 'Cow', q);
              }
            }
          },
          {
            label: `📝 Request Order for ${q} Unit(s)`,
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openCheckout(context.farmerSpecies || 'Cow', q);
              }
            }
          }
        ]
      };
    }

    // E. SUBSCRIPTIONS & ANNUAL PLANS
    if (query.includes('subscript') || query.includes('plan') || query.includes('monthly') || query.includes('annual') || query.includes('starter') || query.includes('commercial') || query.includes('billing')) {
      return {
        text: `
          <b>📱 Digital Dashboard Subscription Plans</b>
          <br><br>
          Smart belts require a cloud connectivity plan for continuous SMS/WhatsApp alerts and AI health baselines:
          <br><br>
          &bull; <b>Starter Plan (Up to 10 animals):</b><br>
          Monthly: ₹1,000/mo | <b>Annual: ₹750/mo</b> (Billed ₹9,000/yr &bull; <span style="color: #16a34a; font-weight:700;">Save ₹3,000/yr</span>)
          <br><br>
          &bull; <b>Commercial Farm Plan (Up to 50 animals):</b><br>
          Monthly: ₹5,000/mo | <b>Annual: ₹3,750/mo</b> (Billed ₹45,000/yr &bull; <span style="color: #16a34a; font-weight:700;">Save ₹15,000/yr</span>)
          <br><br>
          &bull; <b>Custom / Dairy Cooperative:</b> Up to 40% government subsidy eligible!
        `,
        actions: [
          {
            label: '🎁 Switch to Annual Billing (Save 25% + 2 Mo Free)',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewStore');
                window.DairyPulse.toggleBilling(true);
                window.DairyPulse.showToast('Annual Discount Switch Activated (Save 25%)', '💰');
              }
            }
          },
          {
            label: '📋 Choose Starter Plan (₹750/mo)',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewContact');
                const msg = document.getElementById('inputMessage');
                if (msg) msg.value = 'I want to subscribe to the Starter Plan (Annual Billing ₹750/mo).';
              }
            }
          }
        ]
      };
    }

    // F. HARDWARE SPECS / BATTERY / LORA GATEWAY / WATERPROOF
    if (query.includes('battery') || query.includes('waterproof') || query.includes('lora') || query.includes('gateway') || query.includes('spec') || query.includes('hardware') || query.includes('weight') || query.includes('strap') || query.includes('ip68') || query.includes('range')) {
      return {
        text: `
          <b>🛡️ Smart Belt Hardware Specifications</b>
          <div class="telemetry-preview-card">
            &bull; <b>Battery Life:</b> 3-Year sealed military-grade battery (zero daily charging required).<br>
            &bull; <b>Waterproof Rating:</b> 100% IP68 submersible (tested in buffalo wallowing mud ponds &amp; monsoon rains).<br>
            &bull; <b>Wireless Protocol:</b> Long-range LoRaWAN (up to 3 km open shed/farm radius).<br>
            &bull; <b>Collar Strap:</b> Hypoallergenic, anti-chafing medical grade TPU strap (under 380 grams).<br>
            &bull; <b>Warranty:</b> 1-Year Comprehensive Full Hardware Replacement Guarantee.
          </div>
        `,
        actions: [
          {
            label: '🛡️ Explore Smart Belt Specs & Architecture',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewSmartBelt');
              }
            }
          },
          {
            label: '🛍️ Buy Smart Belt Now (₹3,499)',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openStoreAndSelectTier(1);
              }
            }
          }
        ]
      };
    }

    // F2. FARM CONTROL CENTER & SETTINGS
    if (query.includes('setting') || query.includes('control center') || query.includes('farm control') || query.includes('manage animal') || query.includes('add animal') || query.includes('pair') || query.includes('collar status') || query.includes('belt status') || query.includes('alert rule') || query.includes('vet support') || query.includes('password') || query.includes('language') || query.includes('export')) {
      return {
        text: `
          <b>⚙️ DairyPulse Farm Control Center</b>
          <br><br>
          You can configure your entire farm operations, manage cow and buffalo profiles, pair smart collars, customize alert sensitivity, and export telemetry reports:
          <ul style="margin: 4px 0 0 16px; font-size: 0.8rem;">
            <li><b>Animal Management:</b> Register new cows/buffaloes, update veterinary notes &amp; weights.</li>
            <li><b>Smart Collars:</b> Monitor 15 belts, battery levels, RF signal, &amp; diagnostics.</li>
            <li><b>Alert Rules:</b> Customize sensitivity (Low/Medium/High) &amp; multi-channel dispatch (WhatsApp/SMS).</li>
            <li><b>Veterinary Support:</b> Direct hotline to Veterinary Support &amp; encrypted report sharing.</li>
          </ul>
        `,
        actions: [
          {
            label: '⚙️ Open Farm Control Center',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openControlCenter();
                window.DairyPulse.showToast('Opened Farm Control Center', '⚙️');
              }
            }
          },
          {
            label: '🐄 Add / Manage Animals',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openControlCenter('animals');
              }
            }
          },
          {
            label: '📡 Smart Collar Diagnostics',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openControlCenter('devices');
              }
            }
          },
          {
            label: '⚡ Open Quick Settings Panel',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.openQuickSettings();
              }
            }
          }
        ]
      };
    }

    // G. NAVIGATION & DEMO REQUESTS
    if (query.includes('dashboard') || query.includes('portal') || query.includes('screen') || query.includes('telemetry') || query.includes('table')) {
      return {
        text: `<b>📊 Launching Live FarmOS Dashboard!</b><br>You can monitor individual animals, health status, and live rumination/temperature graphs directly.`,
        actions: [
          {
            label: '📊 Open FarmOS Dashboard Now',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewDashboard');
              }
            }
          }
        ]
      };
    }

    if (query.includes('contact') || query.includes('demo') || query.includes('call') || query.includes('phone') || query.includes('visit') || query.includes('trial') || query.includes('address')) {
      return {
        text: `
          <b>🤝 Schedule In-Person Farm Demonstration</b>
          <br><br>
          Our field veterinary engineers visit your farm in Andhra Pradesh &amp; across India with live demonstration collars and test your shed's gateway signal.
          <br><br>
          <b>Helpline:</b> 1800-DAIRY-PULSE (Toll-Free Helpline)<br>
          <b>Email:</b> contact@dairypulse.in
        `,
        actions: [
          {
            label: '📞 Open Demo Request Form',
            handler: () => {
              if (window.DairyPulse) {
                window.DairyPulse.switchView('viewContact');
                const nameInput = document.getElementById('inputName');
                if (nameInput) nameInput.focus();
              }
            }
          }
        ]
      };
    }

    // H. GREETINGS
    if (query.includes('hi') || query.includes('hello') || query.includes('namaste') || query.includes('hey') || query.includes('kaise') || query.includes('who are you')) {
      return {
        text: `
          <b>Namaste! Great to connect with you. 🙏</b><br>
          I'm here to help make your dairy farm more profitable, prevent silent heat misses, and detect sickness early with DairyPulse smart neck collars.
          <br><br>
          What would you like to explore today?
        `,
        actions: [
          {
            label: '🐃 Buffalo Silent Heat Solutions',
            handler: () => handleUserSubmit('How does DairyPulse detect silent heat in buffaloes?')
          },
          {
            label: '💰 Volume Collar Discounts',
            handler: () => handleUserSubmit('Tell me about volume discounts')
          },
          {
            label: '📊 Test Live Dashboard',
            handler: () => {
              if (window.DairyPulse) window.DairyPulse.switchView('viewDashboard');
            }
          }
        ]
      };
    }

    // I. SMART STRUCTURED FALLBACK
    return {
      text: `
        <b>Thanks for your query! 🌾</b>
        <br><br>
        I have analyzed your request regarding <i>"${escapeHtml(userInput)}"</i>. Here are the best recommended actions for your herd:
        <ul style="margin: 6px 0 0 16px; font-size: 0.8rem;">
          <li><b>Animal Health:</b> Ask about fever thresholds or rumination chewing minutes.</li>
          <li><b>Hardware:</b> Ask about battery life, IP68 waterproofing, or LoRa gateway.</li>
          <li><b>Pricing:</b> Mention your herd count (e.g. "Quote for 15 cows") for an automated discount.</li>
        </ul>
      `,
      actions: [
        {
          label: '💰 Calculate Custom Collar Quote',
          handler: () => handleUserSubmit('How much does it cost?')
        },
        {
          label: '📞 Speak with DairyPulse Specialist',
          handler: () => {
            if (window.DairyPulse) window.DairyPulse.switchView('viewContact');
          }
        }
      ]
    };
  }

  // =========================================================================
  // 4. USER INPUT SUBMISSION PIPELINE
  // =========================================================================
  function handleUserSubmit(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    if (!isOpen) {
      openChat();
    }

    appendMessage('user', escapeHtml(cleanText));
    chatInput.value = '';

    showTyping(true);

    // Natural typing delay simulation (450ms - 750ms)
    const delay = Math.floor(450 + Math.random() * 300);

    setTimeout(() => {
      showTyping(false);
      const botResponse = generateBotResponse(cleanText);
      appendMessage('bot', botResponse.text, botResponse.actions);
    }, delay);
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserSubmit(chatInput.value);
  });

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  console.log('DairyPulse PulseBot AI Copilot active.');
});
