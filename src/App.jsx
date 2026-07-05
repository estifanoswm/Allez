import React, { useState, useMemo, useRef, useEffect } from 'react';


const INVENTORY = [
  // Jerseys
  { id: 0, name: "Home Jersey — Ethiopia", category: "Jersey", country: "Ethiopia", price: 82, flag: "🇪🇹", image: "/images/jersey-ethiopia.jpg", swatch: "#D80621", swatch2: "#FFFFFF", desc: "Bold red, unisex cut, perfect for cheering from home." },
  { id: 1, name: "Home Jersey — Brazil", category: "Jersey", country: "Brazil", price: 89, flag: "🇧🇷", image: "/images/jersey-brazil.jpg", swatch: "#FFD400", swatch2: "#0B7A3E", desc: "Bright supporter colors, relaxed fit, breathable fabric." },
  { id: 2, name: "Home Jersey — Argentina", category: "Jersey", country: "Argentina", price: 89, flag: "🇦🇷", image: "/images/jersey-argentina.jpg", swatch: "#7EC8E3", swatch2: "#FFFFFF", desc: "Classic sky-blue and white stripes, crew neck, durable finish." },
  { id: 3, name: "Home Jersey — France", category: "Jersey", country: "France", price: 89, flag: "🇫🇷", image: "/images/jersey-france.jpg", swatch: "#0055A4", swatch2: "#FFFFFF", desc: "Deep blue with technical paneling, built for match nights." },
  { id: 4, name: "Away Jersey — Japan", category: "Jersey", country: "Japan", price: 85, flag: "🇯🇵", image: "/images/jersey-japan.jpg", swatch: "#12121C", swatch2: "#D6002A", desc: "Understated alternate kit with a bold red accent on navy." },
  { id: 5, name: "Home Jersey — Morocco", category: "Jersey", country: "Morocco", price: 85, flag: "🇲🇦", image: "/images/jersey-morocco.jpg", swatch: "#C1272D", swatch2: "#006233", desc: "Red and green, a subtle pattern inspired by the national flag." },
  { id: 6, name: "Home Jersey — Canada", category: "Jersey", country: "Canada", price: 82, flag: "🇨🇦", image: "/images/jersey-canada.jpg", swatch: "#D80621", swatch2: "#FFFFFF", desc: "Bold red, unisex cut, perfect for cheering from home." },
  { id: 7, name: "Home Jersey — Germany", category: "Jersey", country: "Germany", price: 89, flag: "🇩🇪", image: "/images/jersey-germany.jpg", swatch: "#000000", swatch2: "#FFCE00", desc: "Clean white base with black and gold trim detailing." },
  { id: 8, name: "Home Jersey — Congo", category: "Jersey", country: "Congo", price: 85, flag: "�🇬", image: "/images/jersey-congo.jpg", swatch: "#008751", swatch2: "#FFFFFF", desc: "Vivid green panels with a bold graphic collar." },
  { id: 9, name: "Home Jersey — Spain", category: "Jersey", country: "Spain", price: 87, flag: "🇪🇸", image: "/images/jersey-spain.jpg", swatch: "#AA151B", swatch2: "#F1BF00", desc: "Rich red with gold trim, lightweight performance mesh." },
  { id: 10, name: "Home Jersey — Netherlands", category: "Jersey", country: "Netherlands", price: 85, flag: "🇳🇱", image: "/images/jersey-netherlands.jpg", swatch: "#FF4B00", swatch2: "#FFFFFF", desc: "Bright orange with a subtle tonal pattern and crew neck." },

  // Scarves
  { id: 11, name: "Supporter Scarf — Brazil", category: "Scarf", country: "Brazil", price: 24, flag: "🇧🇷", image: "/images/scarf_brazil.jpg", swatch: "#FFD400", swatch2: "#0B7A3E", desc: "Thick knit scarf with double fringe, keeps you warm in the stands." },
  { id: 12, name: "Supporter Scarf — Argentina", category: "Scarf", country: "Argentina", price: 24, flag: "🇦🇷", image: "/images/scarf_argentina.jpg", swatch: "#7EC8E3", swatch2: "#FFFFFF", desc: "Fine stripes, soft material, generous length for celebrations." },
  { id: 13, name: "Supporter Scarf — France", category: "Scarf", country: "France", price: 22, flag: "🇫🇷", image: "/images/scarf_france.jpg", swatch: "#0055A4", swatch2: "#EF4135", desc: "Blue-white-red, tight weave, great for chilly match nights." },
  { id: 14, name: "Supporter Scarf — Germany", category: "Scarf", country: "Germany", price: 22, flag: "🇩🇪", image: "/images/scarf_germany.jpg", swatch: "#000000", swatch2: "#FFCE00", desc: "Black, red, and gold stripes with a soft brushed finish." },
  { id: 15, name: "Supporter Scarf — Morocco", category: "Scarf", country: "Morocco", price: 22, flag: "🇲🇦", image: "/images/scarf_morocco.jpg", swatch: "#C1272D", swatch2: "#006233", desc: "Red and green knit, lightweight enough for warm evenings too." },

  // miscellaneous
  { id:16, name: "World Cup Trophy Replica", category: "Collectible", country: "General Edition", price: 45, flag: "🏆", image: "/images/trophy.jpg", swatch: "#FFC93C", swatch2: "#12291F", desc: "Miniature replica of the World Cup trophy, a must-have for collectors." },
  { id:17, name: "World Cup Poster", category: "Poster", country: "General Edition", price: 10, flag: "🖼️", image: "/images/poster.jpg", swatch: "#F5F5F0", swatch2: "#111111", desc: "Official World Cup poster, perfect for framing and display." },
  
  // Mini Balls
  { id: 18, name: "Classic Stadium Mini Ball", category: "Mini Ball", country: "General Edition", price: 18, flag: "⚽", image: "/images/ball-classic.jpg", swatch: "#F5F5F0", swatch2: "#111111", desc: "Miniature replica with a traditional panel pattern, great for display." },
  { id: 19, name: "Gold Edition Mini Ball", category: "Mini Ball", country: "Limited Edition", price: 26, flag: "⚽", image: "/images/ball-gold.jpg", swatch: "#FFC93C", swatch2: "#12291F", desc: "Metallic gold finish, a collector's piece for the shelf." },
  { id: 20, name: "Glow Mini Ball", category: "Mini Ball", country: "Limited Edition", price: 22, flag: "⚽", image: "/images/ball-glow.jpg", swatch: "#39FF88", swatch2: "#12291F", desc: "Bright glow-in-the-dark panels, popular with younger fans." },
  { id: 21, name: "Autograph Mini Ball (Blank)", category: "Mini Ball", country: "General Edition", price: 20, flag: "⚽", image: "/images/ball-blank.jpg", swatch: "#FFFFFF", swatch2: "#8FA79A", desc: "Matte white surface designed for signatures and keepsakes." },

  // Flags
  { id: 22, name: "Supporter Flag — Brazil", category: "Flag", country: "Brazil", price: 15, flag: "🇧🇷", image: "/images/flag-brazil.jpg", swatch: "#FFD400", swatch2: "#0B7A3E", desc: "Large 3×5 ft size, metal grommets, built to hold up in the wind." },
  { id: 23, name: "Supporter Flag — Argentina", category: "Flag", country: "Argentina", price: 15, flag: "🇦🇷", image: "/images/flag-argentina.jpg", swatch: "#7EC8E3", swatch2: "#FFFFFF", desc: "Large 3×5 ft size, lightweight and durable polyester." },
  { id: 24, name: "Supporter Flag — Germany", category: "Flag", country: "Germany", price: 15, flag: "🇩🇪", image: "/images/flag-germany.jpg", swatch: "#000000", swatch2: "#FFCE00", desc: "Bold black, red, and gold bands, fade-resistant print." },
  { id: 25, name: "World Flag Bunting Set", category: "Flag", country: "General Edition", price: 28, flag: "🌍", image: "/images/flag-bunting.jpg", swatch: "#FFC93C", swatch2: "#E63946", desc: "String of 20 mini flags to decorate a balcony or living room." },
  { id: 26, name: "Hand Flag Bundle (Set of 4)", category: "Flag", country: "General Edition", price: 19, flag: "🎌", image: "/images/flag-handheld.jpg", swatch: "#F5F5F0", swatch2: "#FFC93C", desc: "Small handheld flags on wooden sticks, easy to wave from the stands." },

  // Wristbands
  { id: 30, name: "Wristband Set — Brazil", category: "Wristband", country: "Brazil", price: 12, flag: "🇧🇷", image: "/images/wristband-brazil.jpg", swatch: "#FFD400", swatch2: "#0B7A3E", desc: "Pack of 2 sweat-wicking bands in supporter colors." },
  { id: 31, name: "Wristband Set — France", category: "Wristband", country: "France", price: 12, flag: "🇫🇷", image: "/images/wristband-france.jpg", swatch: "#0055A4", swatch2: "#EF4135", desc: "Pack of 2 stretch bands, blue-white-red stripe pattern." },
  { id: 32, name: "Wristband Set — Rainbow Nations", category: "Wristband", country: "General Edition", price: 14, flag: "🌍", image: "/images/wristband-rainbow.jpg", swatch: "#FFC93C", swatch2: "#39FF88", desc: "Pack of 6 mixed colors so you can mix and match your look." },


];

const CATEGORIES = ["Jersey", "Scarf", "Mini Ball", "Flag", "Cap", "Wristband"];
const COUNTRIES = [...new Set(INVENTORY.map(i => i.country))];


// HELPERS 
function formatPrice(n) {
  return '$' + n.toLocaleString('en-CA');
}

function isValidExpiry(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value.trim());
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number('20' + match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiry = new Date(year, month);
  return expiry > now;
}

function ProductImage({ item, style }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        style={{
          ...style,
          background: `linear-gradient(135deg, ${item.swatch} 50%, ${item.swatch2} 50%)`,
        }}
      >
        <span style={styles.productFlag} aria-hidden="true">{item.flag}</span>
      </div>
    );
  }
  return (
    <div style={{ ...style, position: 'relative', overflow: 'hidden', background: item.swatch }}>
      <img
        src={item.image}
        alt={item.name}
        onError={() => setFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <span style={styles.flagBadge} aria-hidden="true">{item.flag}</span>
    </div>
  );
}


// APP
export default function App() {
  const [currentStep, setCurrentStep] = useState('shop');
  const [cart, setCart] = useState([]);
  const [surveyRating, setSurveyRating] = useState(0);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [maxPrice, setMaxPrice] = useState(90);

  const [formData, setFormData] = useState({ name: '', card: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const firstErrorRef = useRef(null);
  const liveRegionRef = useRef(null);

  useEffect(() => {
    if (liveRegionRef.current) {
      const labels = { shop: 'Shop', cart: 'Cart', checkout: 'Checkout', confirmation: 'Confirmation' };
      liveRegionRef.current.textContent = `Current page: ${labels[currentStep]}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const filteredProducts = useMemo(() => {
    return INVENTORY.filter(item => {
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchCountry = selectedCountries.length === 0 || selectedCountries.includes(item.country);
      const matchPrice = item.price <= maxPrice;
      return matchCat && matchCountry && matchPrice;
    });
  }, [selectedCategories, selectedCountries, maxPrice]);

  const activeFilterChips = useMemo(() => {
    const chips = [
      ...selectedCategories.map(v => ({ type: 'category', value: v })),
      ...selectedCountries.map(v => ({ type: 'country', value: v })),
    ];
    if (maxPrice < 90) chips.push({ type: 'price', value: `≤ ${formatPrice(maxPrice)}` });
    return chips;
  }, [selectedCategories, selectedCountries, maxPrice]);

  const removeChip = (chip) => {
    if (chip.type === 'category') setSelectedCategories(prev => prev.filter(v => v !== chip.value));
    else if (chip.type === 'country') setSelectedCountries(prev => prev.filter(v => v !== chip.value));
    else if (chip.type === 'price') setMaxPrice(90);
  };

  const toggleFilter = (value, state, setState) => {
    setState(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setMaxPrice(90);
  };

  const addToCart = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) return prev.map(i => i.id === itemId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: itemId, qty: 1 }];
    });
  };

  const changeQty = (itemId, delta) => {
    setCart(prev => prev
      .map(i => i.id === itemId ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const cartItems = cart
    .map(entry => ({ ...INVENTORY.find(w => w.id === entry.id), qty: entry.qty }))
    .filter(Boolean);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!/^\d{16}$/.test(formData.card.trim())) newErrors.card = "Card number must be exactly 16 digits.";
    if (!isValidExpiry(formData.expiry)) newErrors.expiry = "Enter a valid, non-expired date in MM/YY format.";
    if (!/^\d{3}$/.test(formData.cvv.trim())) newErrors.cvv = "Security code must be 3 digits.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLastOrder({ items: cartItems, total: cartTotal, orderNumber: Math.floor(100000 + Math.random() * 900000) });
      setCart([]);
      setCurrentStep('confirmation');
    }
  };

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData(prev => ({ ...prev, [key]: e.target.value })),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    ref: errors[key] && !Object.keys(errors).slice(0, Object.keys(errors).indexOf(key)).some(k => errors[k]) ? firstErrorRef : undefined,
  });

  return (
    <div style={styles.appShell}>
      <div ref={liveRegionRef} aria-live="polite" style={styles.srOnly} />

      <header style={styles.header}>
        <button
          onClick={() => setCurrentStep('shop')}
          style={styles.logoButton}
          aria-label="Return to the ALLEZ. shop"
        >
          ALLEZ<span style={{ color: COLORS.accent }}>.</span>
        </button>
        <center><p></p><img src="/images/pitch-header.png" rel="icon" type="image/png" height="100" width="130" alt="" style={{ marginLeft: 100 }} /></center>
        
        <nav style={styles.nav} aria-label="Main navigation">
          <button
            onClick={() => setCurrentStep('shop')}
            style={{ ...styles.navLink, color: currentStep === 'shop' ? COLORS.accent : COLORS.white }}
            aria-current={currentStep === 'shop' ? 'page' : undefined}
          >
            Shop
          </button>
          <button onClick={() => setCurrentStep('cart')} style={styles.cartButton}>
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      {currentStep !== 'shop' && (
        <ol style={styles.stepper} aria-label="Checkout steps">
          <StepLabel active={currentStep === 'cart'} done={['checkout', 'confirmation'].includes(currentStep)}>
            1. Cart ({cartCount})
          </StepLabel>
          <span style={styles.stepArrow} aria-hidden="true">➔</span>
          <StepLabel active={currentStep === 'checkout'} done={currentStep === 'confirmation'}>
            2. Billing
          </StepLabel>
          <span style={styles.stepArrow} aria-hidden="true">➔</span>
          <StepLabel active={currentStep === 'confirmation'} done={false}>
            3. Confirmation
          </StepLabel>
        </ol>
      )}

      <main style={styles.main}>
        {currentStep === 'shop' && (
          <ShopView
            filteredProducts={filteredProducts}
            totalCount={INVENTORY.length}
            selectedCategories={selectedCategories}
            selectedCountries={selectedCountries}
            maxPrice={maxPrice}
            toggleFilter={toggleFilter}
            setSelectedCategories={setSelectedCategories}
            setSelectedCountries={setSelectedCountries}
            setMaxPrice={setMaxPrice}
            activeFilterChips={activeFilterChips}
            removeChip={removeChip}
            resetFilters={resetFilters}
            addToCart={addToCart}
          />
        )}

        {currentStep === 'cart' && (
          <CartView
            cartItems={cartItems}
            cartTotal={cartTotal}
            changeQty={changeQty}
            removeFromCart={removeFromCart}
            onBackToShop={() => setCurrentStep('shop')}
            onCheckout={() => setCurrentStep('checkout')}
          />
        )}

        {currentStep === 'checkout' && (
          <CheckoutView
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            field={field}
            cartTotal={cartTotal}
            onSubmit={handleCheckoutSubmit}
            onBackToCart={() => setCurrentStep('cart')}
          />
        )}

        {currentStep === 'confirmation' && lastOrder && (
          <ConfirmationView
            order={lastOrder}
            surveyRating={surveyRating}
            setSurveyRating={setSurveyRating}
            surveySubmitted={surveySubmitted}
            setSurveySubmitted={setSurveySubmitted}
            onContinueShopping={() => setCurrentStep('shop')}
          />
        )}
      </main>
    </div>
  );
}

// SHOP VIEW
function ShopView({
  filteredProducts, totalCount, selectedCategories, selectedCountries, maxPrice,
  toggleFilter, setSelectedCategories, setSelectedCountries, setMaxPrice,
  activeFilterChips, removeChip, resetFilters, addToCart,
}) {
  return (
    <div>
      <div style={styles.heroBanner}>
        <p style={styles.heroKicker}><b>WORLD CUP — SUPPORTER EDITION</b></p>
        <p style={styles.heroText}>
          The whole world gathers for one goal. Gear up in your colors before kickoff
          and get free priority shipping on orders over $75.
        </p>
        <p style={{ fontStyle: 'italic' }}>ALLEZ. is a fictional fan gear shop created for educational purposes. All product images and descriptions are for demonstration only.</p>
        <br></br>
        <img src="/images/hero.png" alt="" style={styles.heroImage} /> 
      </div>

      <div style={styles.shopGrid}>
        <aside style={styles.sidebar} aria-label="Search filters">
          <h3 style={styles.sidebarTitle}>Filters</h3>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Category</legend>
            {CATEGORIES.map(cat => (
              <label key={cat} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                  checked={selectedCategories.includes(cat)}
                  style={styles.checkbox}
                />
                {cat}
              </label>
            ))}
          </fieldset>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Team / Edition</legend>
            {COUNTRIES.map(country => (
              <label key={country} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter(country, selectedCountries, setSelectedCountries)}
                  checked={selectedCountries.includes(country)}
                  style={styles.checkbox}
                />
                {country}
              </label>
            ))}
          </fieldset>

          <div>
            <label htmlFor="price-range" style={styles.legend}>
              Max budget: <span style={{ color: COLORS.accent }}>{formatPrice(maxPrice)}</span>
            </label>
            <input
              id="price-range"
              type="range"
              min="12"
              max="90"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-valuetext={formatPrice(maxPrice)}
            />
          </div>
        </aside>

        <section aria-live="polite">
          <div style={styles.resultsHeader}>
            <p style={styles.resultsCount}>
              Showing {filteredProducts.length} of {totalCount} items
            </p>
            {activeFilterChips.length > 0 && (
              <button onClick={resetFilters} style={styles.resetLink}>Reset filters</button>
            )}
          </div>

          {activeFilterChips.length > 0 && (
            <div style={styles.chipRow} aria-label="Active filters">
              {activeFilterChips.map((chip, i) => (
                <button key={i} onClick={() => removeChip(chip)} style={styles.chip}>
                  {chip.value} <span aria-hidden="true">✕</span>
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No items match these filters.</p>
              <button onClick={resetFilters} style={styles.secondaryButton}>Reset filters</button>
            </div>
          ) : (
            <div style={styles.productGrid}>
              {filteredProducts.map(item => (
                <article key={item.id} style={styles.productCard}>
                  <ProductImage item={item} style={styles.productImageBox} />
                  <span style={styles.categoryTag}>{item.category}</span>
                  <h4 style={styles.productName}>{item.name}</h4>
                  <p style={styles.productDesc}>{item.desc}</p>
                  <div style={styles.productFooter}>
                    <span style={styles.productPrice}>{formatPrice(item.price)}</span>
                    <button onClick={() => addToCart(item.id)} style={styles.primaryButtonSmall}>
                      Add
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// CART VIEW
function CartView({ cartItems, cartTotal, changeQty, removeFromCart, onBackToShop, onCheckout }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Your Selection</h2>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <p style={{ color: COLORS.muted }}>Your cart is empty.</p>
          <button onClick={onBackToShop} style={styles.secondaryButton}>Back to shop</button>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={styles.cartRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <ProductImage item={item} style={styles.cartThumb} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{item.name}</h4>
                  <span style={{ color: COLORS.muted, fontSize: '12px' }}>{item.category} · {formatPrice(item.price)} each</span>
                </div>
              </div>
              <div style={styles.qtyControls}>
                <button
                  onClick={() => changeQty(item.id, -1)}
                  style={styles.qtyButton}
                  aria-label={`Remove one unit of ${item.name}`}
                >−</button>
                <span aria-live="polite" style={{ minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                <button
                  onClick={() => changeQty(item.id, 1)}
                  style={styles.qtyButton}
                  aria-label={`Add one unit of ${item.name}`}
                >+</button>
                <span style={{ fontWeight: 500, minWidth: '80px', textAlign: 'right' }}>{formatPrice(item.price * item.qty)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeLink}
                  aria-label={`Remove ${item.name} from cart`}
                >Remove</button>
              </div>
            </div>
          ))}
          <div style={styles.cartTotalRow}>
            <span>Total:</span>
            <span style={{ color: COLORS.accent }}>{formatPrice(cartTotal)}</span>
          </div>
          <div style={styles.buttonRow}>
            <button onClick={onBackToShop} style={styles.secondaryButton}>Continue shopping</button>
            <button onClick={onCheckout} style={styles.primaryButton}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

// CHECKOUT VIEW
function CheckoutView({ formData, setFormData, errors, field, cartTotal, onSubmit, onBackToCart }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Billing Information</h2>
      <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <FormField id="name" label="Full name on card" error={errors.name} {...field('name')} />
        <FormField
          id="card"
          label="Card number (simulation)"
          placeholder="4500 1234 5678 9012"
          maxLength={16}
          error={errors.card}
          {...field('card')}
        />
        <div style={styles.twoCol}>
          <FormField
            id="expiry"
            label="Expiry (MM/YY)"
            placeholder="12/28"
            maxLength={5}
            error={errors.expiry}
            {...field('expiry')}
          />
          <FormField
            id="cvv"
            label="CVV"
            placeholder="321"
            maxLength={3}
            error={errors.cvv}
            {...field('cvv')}
          />
        </div>
        <div style={styles.buttonRow}>
          <button type="button" onClick={onBackToCart} style={styles.secondaryButton}>Back to cart</button>
          <button type="submit" style={styles.primaryButton}>
            Confirm and pay ({formatPrice(cartTotal)})
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ id, label, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} style={styles.label}>{label}</label>
      <input
        id={id}
        type="text"
        style={{ ...styles.input, borderColor: error ? COLORS.error : COLORS.border }}
        {...inputProps}
      />
      {error && (
        <span id={`${id}-error`} role="alert" style={styles.errorText}>{error}</span>
      )}
    </div>
  );
}

// CONFIRMATION VIEW
function ConfirmationView({ order, surveyRating, setSurveyRating, surveySubmitted, setSurveySubmitted, onContinueShopping }) {
  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
      <div style={styles.checkmark} aria-hidden="true">✓</div>
      <h2 style={styles.confirmTitle}>Order Confirmed</h2>
      <p style={styles.confirmSub}>
        Order #{order.orderNumber} — a confirmation email will be sent shortly.
      </p>

      <div style={styles.orderSummary}>
        <h4 style={styles.orderSummaryTitle}>Order Summary</h4>
        {order.items.map(item => (
          <div key={item.id} style={styles.orderRow}>
            <span>{item.flag} {item.name} × {item.qty}</span>
            <span>{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
        <div style={{ ...styles.orderRow, fontWeight: 700, borderTop: `1px solid ${COLORS.border}`, paddingTop: '10px', marginTop: '10px' }}>
          <span>Total paid</span>
          <span style={{ color: COLORS.accent }}>{formatPrice(order.total)}</span>
        </div>
      </div>

      <button onClick={onContinueShopping} style={{ ...styles.secondaryButton, margin: '25px 0' }}>
        Continue shopping
      </button>

      <div style={styles.surveyCard}>
        <h4 style={styles.surveyTitle}>Help us improve</h4>
        <p style={styles.surveyText}>
          How was your visit? Your feedback helps us make the ALLEZ. experience better.
        </p>

        {!surveySubmitted ? (
          <div>
            <div role="radiogroup" aria-label="Rating out of 5 stars" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={star === surveyRating}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  onClick={() => setSurveyRating(star)}
                  style={{ ...styles.star, color: star <= surveyRating ? COLORS.accent : COLORS.border }}
                >★</button>
              ))}
            </div>
            <button
              onClick={() => setSurveySubmitted(true)}
              disabled={surveyRating === 0}
              style={{ ...styles.primaryButtonSmall, opacity: surveyRating > 0 ? 1 : 0.5, cursor: surveyRating > 0 ? 'pointer' : 'not-allowed' }}
            >
              Submit feedback
            </button>
          </div>
        ) : (
          <div role="status" style={styles.surveyConfirmed}>
            Thanks for your feedback — it's been recorded.
          </div>
        )}
      </div>
    </div>
  );
}

function StepLabel({ active, done, children }) {
  return (
    <li style={{ ...styles.stepItem, color: active ? COLORS.accent : done ? COLORS.white : COLORS.muted, fontWeight: active ? 700 : 400 }}>
      {done && !active ? `${children} ✓` : children}
    </li>
  );
}


const COLORS = {
  bg: '#151B3B',
  panel: '#1E2550',
  border: '#31396B',
  accent: '#FF6B35',
  accentDeep: '#E8501F',
  teal: '#2EC4B6',
  white: '#F2F0FF',
  muted: '#8B90B8',
  error: '#FF4757',
  success: '#2EC4B6',
};

const displayFont = "'Anton', 'Arial Narrow', sans-serif";

const styles = {
  appShell: { backgroundColor: COLORS.bg, color: COLORS.white, minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
  srOnly: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' },
  header: { borderBottom: `1px solid ${COLORS.border}`, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoButton: { fontFamily: displayFont, letterSpacing: '2px', color: COLORS.white, background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', padding: 0 },
  nav: { display: 'flex', gap: '30px', alignItems: 'center' },
  navLink: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600 },
  cartButton: { background: COLORS.panel, border: `1px solid ${COLORS.border}`, color: COLORS.white, padding: '9px 16px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 600 },
  stepper: { listStyle: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '18px', padding: '18px', margin: 0, background: '#191F45', borderBottom: `1px solid ${COLORS.border}`, fontSize: '14px' },
  stepItem: { transition: 'color 0.2s' },
  stepArrow: { color: '#3A4180' },
  main: { padding: '40px 40px 80px' },
  heroBanner: { border: `1px solid ${COLORS.accent}`, padding: '30px', marginBottom: '40px', textAlign: 'center', background: 'linear-gradient(180deg, #c5923b, #000000)', borderRadius: '3px' },
  heroKicker: { fontFamily: displayFont, letterSpacing: '3px', color: '#000000', fontSize: '15px', margin: '0 0 10px 0' },
  heroText: { fontSize: '18px', color: '#E5E3FA', margin: 0, lineHeight: 1.5, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' },
  heroImage: { maxWidth: '150px', height: 'auto' },
  shopGrid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' },
  sidebar: { background: COLORS.panel, padding: '25px', borderRadius: '4px', height: 'fit-content', border: `1px solid ${COLORS.border}` },
  sidebarTitle: { fontFamily: displayFont, letterSpacing: '1px', borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '12px', color: COLORS.accent, marginTop: 0, fontSize: '22px' },
  fieldset: { border: 'none', padding: 0, margin: '0 0 25px 0' },
  legend: { fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: COLORS.muted, marginBottom: '10px', padding: 0 },
  checkboxLabel: { display: 'flex', alignItems: 'center', margin: '10px 0', cursor: 'pointer', fontSize: '14px' },
  checkbox: { marginRight: '10px', accentColor: COLORS.accent, width: '16px', height: '16px' },
  resultsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },
  resultsCount: { color: COLORS.muted, margin: 0 },
  resetLink: { background: 'none', border: 'none', color: COLORS.accent, cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' },
  chipRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' },
  chip: { background: '#2A2050', border: `1px solid ${COLORS.accent}`, color: COLORS.accent, borderRadius: '20px', padding: '5px 12px', fontSize: '13px', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: COLORS.muted, border: `1px dashed ${COLORS.border}`, borderRadius: '4px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '28px' },
  productCard: { background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column' },
  productImageBox: { height: '250px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' },
  productFlag: { fontSize: '38px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' },
  flagBadge: { position: 'absolute', top: '8px', right: '8px', fontSize: '20px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' },
  categoryTag: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: COLORS.accent, marginBottom: '4px' },
  productName: { margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700 },
  productDesc: { color: '#C4C2E0', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.5 },
  productFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  productPrice: { fontSize: '19px', fontWeight: 700, color: COLORS.accent },
  panel: { maxWidth: '640px', margin: '0 auto', background: COLORS.panel, padding: '36px', borderRadius: '4px', border: `1px solid ${COLORS.border}` },
  panelTitle: { fontFamily: displayFont, letterSpacing: '1px', fontSize: '26px', borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '15px', marginTop: 0 },
  cartRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: `1px solid ${COLORS.border}`, flexWrap: 'wrap', gap: '10px' },
  cartThumb: { width: '48px', height: '48px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '14px' },
  qtyButton: { width: '28px', height: '28px', borderRadius: '4px', border: `1px solid ${COLORS.border}`, background: '#191F45', color: COLORS.white, cursor: 'pointer', fontSize: '16px', lineHeight: 1 },
  removeLink: { background: 'none', border: 'none', color: COLORS.error, cursor: 'pointer', fontSize: '13px' },
  cartTotalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '25px', fontWeight: 700, fontSize: '19px', borderTop: `1px solid ${COLORS.border}`, paddingTop: '15px' },
  buttonRow: { display: 'flex', gap: '14px', marginTop: '24px' },
  primaryButton: { flex: 1, padding: '15px', backgroundColor: COLORS.accent, border: 'none', color: '#151B3B', fontWeight: 700, cursor: 'pointer', borderRadius: '3px', fontSize: '15px' },
  primaryButtonSmall: { backgroundColor: COLORS.accent, border: 'none', color: '#151B3B', padding: '9px 16px', fontWeight: 700, cursor: 'pointer', borderRadius: '3px', fontSize: '14px' },
  secondaryButton: { flex: 1, padding: '15px', background: 'none', border: `1px solid ${COLORS.accent}`, color: COLORS.accent, fontWeight: 600, cursor: 'pointer', borderRadius: '3px', fontSize: '15px' },
  label: { display: 'block', fontSize: '14px', marginBottom: '6px', color: '#ddd' },
  input: { width: '100%', padding: '12px', background: '#191F45', border: `1px solid ${COLORS.border}`, color: COLORS.white, borderRadius: '3px', boxSizing: 'border-box', fontSize: '14px' },
  errorText: { color: COLORS.error, fontSize: '12px', marginTop: '6px', display: 'block' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' },
  checkmark: { fontSize: '64px', color: COLORS.accent, marginBottom: '10px' },
  confirmTitle: { fontFamily: displayFont, letterSpacing: '1px', fontSize: '34px', marginTop: 0 },
  confirmSub: { color: '#C4C2E0', fontSize: '15px', marginBottom: '30px' },
  orderSummary: { background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: '4px', padding: '24px', textAlign: 'left' },
  orderSummaryTitle: { margin: '0 0 14px 0', fontFamily: displayFont, letterSpacing: '1px', color: COLORS.accent, fontSize: '20px' },
  orderRow: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '6px 0', color: '#ddd' },
  surveyCard: { background: COLORS.panel, padding: '32px', borderRadius: '4px', border: `1px solid ${COLORS.border}`, textAlign: 'left', marginTop: '10px' },
  surveyTitle: { margin: '0 0 8px 0', fontFamily: displayFont, letterSpacing: '1px', color: COLORS.accent, fontSize: '20px' },
  surveyText: { fontSize: '14px', color: COLORS.muted, marginBottom: '20px', lineHeight: 1.5 },
  star: { background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', padding: 0 },
  surveyConfirmed: { padding: '12px', background: '#122E2A', border: `1px solid ${COLORS.success}`, borderRadius: '4px', color: COLORS.success, fontWeight: 500, textAlign: 'center' },
};