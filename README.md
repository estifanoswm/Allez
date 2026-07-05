# ALLEZ.

This is my e-commerce site for SEG3125 Assignment 4. I went with a World Cup themed fan gear shop selling jerseys, scarves, mini balls, flags, caps, and wristbands.

## Running it

```bash
npm install
npm run dev
```

It opens at `http://localhost:5173`.

## What it does

The shop has a faceted search with filters for category, team, and price, and I added removable filter chips so it's clear what's currently selected. From there you can add items to a cart, change quantities, and go through checkout, which validates the name, card number, expiry, and CVV before letting you submit. After checkout there's an order summary with an order number, and a star rating survey at the end.

## Product photos

Each product references an image path in `public/images/`, like `/images/jersey-brazil.jpg`. If the file isn't there yet, the card falls back to a color block instead of breaking, since I'm still adding photos.

## Structure

Everything is in `src/App.jsx`. The colors and fonts are all defined together at the bottom of that file in the `COLORS` and `styles` objects, which made it easy to change the whole theme in one place when I switched it up partway through.
