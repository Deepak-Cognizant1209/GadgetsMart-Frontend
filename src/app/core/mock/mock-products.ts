import { Product } from '../models';

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&auto=format&q=80`;

export const MOCK_PRODUCTS: Product[] = [
  // ── Tablets ──────────────────────────────────────────────
  {
    id: 1, name: 'iPad Pro 12.9"', category: 'Tablets',
    price: 89999, discountPrice: 82999,
    images: [U('1544244015-0df4b3ffc6b0'), U('1544244015-0df4b3ffc6b0')],
    rating: 4.8, reviewCount: 4, brand: 'Apple',
    colors: ['Space Gray', 'Silver'], inStock: true,
    description: 'The iPad Pro 12.9" features the powerful M2 chip, a stunning Liquid Retina XDR display, and up to 2TB of storage.',
    specs: { 'Display': '12.9-inch Liquid Retina XDR', 'Chip': 'Apple M2', 'Storage': '128GB–2TB', 'Battery': 'Up to 10 hours', 'Camera': '12MP Wide + 10MP Ultra Wide', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3' }
  },
  {
    id: 2, name: 'Samsung Galaxy Tab S9', category: 'Tablets',
    price: 64999,
    images: [U('1623126908029-58cb08a2b272'), U('1623126908029-58cb08a2b272')],
    rating: 4.6, reviewCount: 4, brand: 'Samsung',
    colors: ['Graphite', 'Beige', 'Lavender'], inStock: true,
    description: 'Samsung Galaxy Tab S9 with Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, and S Pen included.',
    specs: { 'Display': '11-inch Dynamic AMOLED 2X', 'Processor': 'Snapdragon 8 Gen 2', 'Storage': '128GB / 256GB', 'Battery': '8400mAh', 'Camera': '13MP + 12MP Front', 'S Pen': 'Included' }
  },
  {
    id: 3, name: 'Microsoft Surface Pro 9', category: 'Tablets',
    price: 82999, discountPrice: 74999,
    images: [U('1617780421515-08fae9caa171'), U('1617780421515-08fae9caa171')],
    rating: 4.5, reviewCount: 4, brand: 'Microsoft',
    colors: ['Platinum', 'Graphite', 'Sapphire'], inStock: true,
    description: 'Microsoft Surface Pro 9: versatile 2-in-1 powered by Intel 12th Gen. Supports Surface Pen and Type Cover.',
    specs: { 'Display': '13-inch PixelSense Flow', 'Processor': 'Intel Core i5/i7 12th Gen', 'RAM': '8GB–32GB', 'Storage': '128GB–1TB', 'Battery': 'Up to 15.5 hours', 'OS': 'Windows 11 Home' }
  },
  {
    id: 4, name: 'Lenovo Tab P12 Pro', category: 'Tablets',
    price: 57999,
    images: [U('1561154464-82e9adf32764'), U('1561154464-82e9adf32764')],
    rating: 3.8, reviewCount: 4, brand: 'Lenovo',
    colors: ['Storm Grey'], inStock: true,
    description: 'Lenovo Tab P12 Pro: 12.6-inch AMOLED display, Snapdragon 870, quad-speaker system tuned by JBL.',
    specs: { 'Display': '12.6-inch AMOLED', 'Processor': 'Snapdragon 870', 'RAM': '8GB', 'Storage': '256GB', 'Battery': '10200mAh', 'Speakers': 'Quad JBL' }
  },

  // ── Laptops ──────────────────────────────────────────────
  {
    id: 5, name: 'MacBook Pro 14"', category: 'Laptops',
    price: 164999, discountPrice: 152999,
    images: [U('1517336714731-489689fd1ca8'), U('1517336714731-489689fd1ca8')],
    rating: 4.9, reviewCount: 4, brand: 'Apple',
    colors: ['Space Gray', 'Silver'], inStock: true,
    description: 'MacBook Pro 14" with M3 Pro chip. Liquid Retina XDR display, up to 18-hour battery.',
    specs: { 'Chip': 'Apple M3 Pro', 'Display': '14.2-inch Liquid Retina XDR', 'RAM': '18GB/36GB Unified', 'Storage': '512GB–2TB SSD', 'Battery': 'Up to 18 hours', 'Ports': '3x Thunderbolt 4, HDMI, MagSafe 3' }
  },
  {
    id: 6, name: 'Dell XPS 15', category: 'Laptops',
    price: 149999,
    images: [U('1496181133206-80ce9b88a853'), U('1496181133206-80ce9b88a853')],
    rating: 4.7, reviewCount: 4, brand: 'Dell',
    colors: ['Platinum Silver', 'Frost'], inStock: true,
    description: 'Dell XPS 15 with Intel 13th Gen Core and NVIDIA RTX 4060. OLED touchscreen.',
    specs: { 'Processor': 'Intel Core i7-13700H', 'Display': '15.6-inch OLED Touch', 'RAM': '16GB/32GB DDR5', 'Storage': '512GB–1TB SSD', 'GPU': 'NVIDIA RTX 4060', 'Battery': 'Up to 13 hours' }
  },
  {
    id: 7, name: 'HP Spectre x360 14', category: 'Laptops',
    price: 124999, discountPrice: 107999,
    images: [U('1663354027456-ce6a7e07d212'), U('1663354027456-ce6a7e07d212')],
    rating: 4.6, reviewCount: 4, brand: 'HP',
    colors: ['Nightfall Black', 'Poseidon Blue'], inStock: true,
    description: 'HP Spectre x360 14: premium 2-in-1 with OLED display, Intel Evo, 360-degree hinge.',
    specs: { 'Processor': 'Intel Core Ultra 7', 'Display': '14-inch 2.8K OLED Touch', 'RAM': '16GB/32GB LPDDR5', 'Storage': '1TB/2TB SSD', 'Battery': 'Up to 17 hours', 'Weight': '1.39 kg' }
  },
  {
    id: 8, name: 'ASUS ZenBook 14 OLED', category: 'Laptops',
    price: 89999,
    images: [U('1636211990414-8edec17ba047'), U('1636211990414-8edec17ba047')],
    rating: 3.7, reviewCount: 4, brand: 'ASUS',
    colors: ['Ponder Blue', 'Jasper Gray'], inStock: true,
    description: 'ASUS ZenBook 14 OLED: AMD Ryzen 7, ultra-thin, 2.8K OLED display.',
    specs: { 'Processor': 'AMD Ryzen 7 7745HX', 'Display': '14-inch 2.8K OLED', 'RAM': '16GB LPDDR5', 'Storage': '512GB–1TB SSD', 'Battery': 'Up to 13 hours', 'Weight': '1.2 kg' }
  },

  // ── Mouse ────────────────────────────────────────────────
  {
    id: 9, name: 'Logitech MX Master 3S', category: 'Mouse',
    price: 7999, discountPrice: 6499,
    images: [U('1527864550417-7fd91fc51a46'), U('1527864550417-7fd91fc51a46')],
    rating: 4.8, reviewCount: 4, brand: 'Logitech',
    colors: ['Graphite', 'Pale Gray', 'Midnight'], inStock: true,
    description: 'Logitech MX Master 3S: MagSpeed scrolling, 8000 DPI, near-silent click.',
    specs: { 'Sensor': '8000 DPI optical', 'Buttons': '7 programmable', 'Battery': 'USB-C, up to 70 days', 'Connectivity': 'Bluetooth, Logi Bolt', 'Compatibility': 'Win/Mac/Linux', 'Weight': '141g' }
  },
  {
    id: 10, name: 'Razer DeathAdder V3', category: 'Mouse',
    price: 5999,
    images: [U('1629121291243-7b5e885cce9b'), U('1629121291243-7b5e885cce9b')],
    rating: 4.7, reviewCount: 4, brand: 'Razer',
    colors: ['Black', 'White'], inStock: true,
    description: 'Razer DeathAdder V3: 59g ultra-lightweight, Focus Pro 30K sensor.',
    specs: { 'Sensor': 'Focus Pro 30K DPI', 'Weight': '59g', 'Buttons': '6 programmable', 'Cable': 'Razer SpeedFlex', 'Polling Rate': '1000Hz', 'Switches': 'Razer Optical Gen-3' }
  },
  {
    id: 11, name: 'Apple Magic Mouse', category: 'Mouse',
    price: 6499,
    images: [U('1643829434278-f5a36be79c43'), U('1643829434278-f5a36be79c43')],
    rating: 4.2, reviewCount: 4, brand: 'Apple',
    colors: ['Space Gray', 'Silver', 'Black'], inStock: true,
    description: 'Apple Magic Mouse with seamless Multi-Touch surface for gestures.',
    specs: { 'Surface': 'Multi-Touch', 'Connectivity': 'Bluetooth 5.0', 'Battery': 'Lightning rechargeable', 'Compatibility': 'macOS 10.15+', 'Weight': '99g', 'Height': '2.15 cm' }
  },
  {
    id: 12, name: 'Microsoft Arc Mouse', category: 'Mouse',
    price: 4999, discountPrice: 3999,
    images: [U('1617233083187-be4925d699d6'), U('1617233083187-be4925d699d6')],
    rating: 3.6, reviewCount: 4, brand: 'Microsoft',
    colors: ['Black', 'Platinum', 'Poppy Red'], inStock: true,
    description: 'Microsoft Arc Mouse snaps flat to carry, curves for comfort.',
    specs: { 'Scroll': 'Touch scroll strip', 'Connectivity': 'Bluetooth 5.0', 'Battery': '2x AAA', 'Compatibility': 'Windows, macOS', 'Weight': '87g', 'Form': 'Flat-to-arc design' }
  },

  // ── Headphones ───────────────────────────────────────────
  {
    id: 13, name: 'Sony WH-1000XM5', category: 'Headphones',
    price: 29990, discountPrice: 24990,
    images: [U('1583394838336-acd977736f90'), U('1583394838336-acd977736f90')],
    rating: 4.9, reviewCount: 4, brand: 'Sony',
    colors: ['Black', 'Silver'], inStock: true,
    description: 'Sony WH-1000XM5: industry-leading ANC, 8 mics, 30-hour battery.',
    specs: { 'Driver': '30mm carbon fiber', 'Frequency': '4Hz–40,000Hz', 'Battery': '30 hours ANC on', 'Charging': 'USB-C, 3 min = 3 hrs', 'ANC': '8 microphones', 'Weight': '250g' }
  },
  {
    id: 14, name: 'Bose QuietComfort 45', category: 'Headphones',
    price: 26990,
    images: [U('1505740420928-5e560c06d30e'), U('1505740420928-5e560c06d30e')],
    rating: 4.7, reviewCount: 4, brand: 'Bose',
    colors: ['Black', 'White Smoke'], inStock: true,
    description: 'Bose QC45: world-class ANC, high-fidelity audio, 24-hour battery.',
    specs: { 'ANC': 'Quiet Mode', 'Aware Mode': 'Yes', 'Battery': '24 hours', 'Charging': 'USB-C, 15 min = 3 hrs', 'Connectivity': 'Bluetooth 5.1', 'Weight': '240g' }
  },
  {
    id: 15, name: 'Apple AirPods Max', category: 'Headphones',
    price: 44900,
    images: [U('1612116454817-2b0841e30eaf'), U('1612116454817-2b0841e30eaf')],
    rating: 4.6, reviewCount: 4, brand: 'Apple',
    colors: ['Space Gray', 'Silver', 'Sky Blue', 'Pink', 'Starlight'], inStock: true,
    description: 'AirPods Max: over-ear ANC, Spatial Audio, seamless Apple ecosystem.',
    specs: { 'Chip': 'Apple H1 per cup', 'ANC': 'Adaptive NC', 'Spatial Audio': 'Dynamic Head Tracking', 'Battery': '20 hours', 'Charging': 'Lightning/USB-C', 'Weight': '385g' }
  },
  {
    id: 16, name: 'Sennheiser HD 560S', category: 'Headphones',
    price: 15990, discountPrice: 12990,
    images: [U('1572536147248-ac59a8abfa4b'), U('1572536147248-ac59a8abfa4b')],
    rating: 3.9, reviewCount: 4, brand: 'Sennheiser',
    colors: ['Black'], inStock: true,
    description: 'Sennheiser HD 560S: open-back audiophile headphones, wide natural soundstage.',
    specs: { 'Type': 'Open-back', 'Driver': '38mm dynamic', 'Frequency': '6Hz–38,000Hz', 'Impedance': '120 Ohm', 'SPL': '110 dB', 'Weight': '240g' }
  },

  // ── Speakers ─────────────────────────────────────────────
  {
    id: 17, name: 'JBL Flip 6', category: 'Speakers',
    price: 9999, discountPrice: 7999,
    images: [U('1608043152269-423dbba4e7e1'), U('1608043152269-423dbba4e7e1')],
    rating: 4.7, reviewCount: 4, brand: 'JBL',
    colors: ['Black', 'Blue', 'Red', 'Teal', 'Pink', 'White'], inStock: true,
    description: 'JBL Flip 6: IP67 waterproof, 30W 2-way speaker, 12-hour battery.',
    specs: { 'Output Power': '30W', 'Battery': '12 hours', 'Waterproof': 'IP67', 'Charging': 'USB-C', 'PartyBoost': 'Yes', 'Weight': '550g' }
  },
  {
    id: 18, name: 'Sonos One (Gen 2)', category: 'Speakers',
    price: 17999,
    images: [U('1743521442683-08ffd8ac9e14'), U('1743521442683-08ffd8ac9e14')],
    rating: 4.6, reviewCount: 4, brand: 'Sonos',
    colors: ['Black', 'White'], inStock: true,
    description: 'Sonos One: smart speaker with Alexa and Google, AirPlay 2, multi-room audio.',
    specs: { 'Amplifiers': '2 Class-D digital', 'Woofer': '3.5-inch', 'Tweeters': '2x 1-inch', 'Connectivity': 'Wi-Fi, AirPlay 2', 'Voice Control': 'Alexa, Google', 'Humidity': 'IPX3' }
  },
  {
    id: 19, name: 'Bose SoundLink Flex', category: 'Speakers',
    price: 11999,
    images: [U('1608043152269-423dbba4e7e1'), U('1608043152269-423dbba4e7e1')],
    rating: 4.8, reviewCount: 4, brand: 'Bose',
    colors: ['Black', 'Stone Blue', 'Cypress Green', 'Carmine Red'], inStock: true,
    description: 'Bose SoundLink Flex: IP67, PositionIQ, 12-hour battery for outdoor use.',
    specs: { 'Battery': '12 hours', 'Waterproof': 'IP67', 'PositionIQ': 'Yes', 'Charging': 'USB-C', 'Bluetooth': '4.2', 'Weight': '590g' }
  },
  {
    id: 20, name: 'Marshall Stanmore III', category: 'Speakers',
    price: 28990, discountPrice: 24990,
    images: [U('1615728199168-55ab4d86dfd3'), U('1615728199168-55ab4d86dfd3')],
    rating: 3.8, reviewCount: 4, brand: 'Marshall',
    colors: ['Black', 'Cream'], inStock: true,
    description: 'Marshall Stanmore III: iconic rock design, 80W audio, Bluetooth 5.2.',
    specs: { 'Output Power': '80W total', 'Woofer': '5.25-inch', 'Tweeters': '2x 0.75-inch', 'Bluetooth': '5.2', 'Inputs': 'RCA, 3.5mm, Bluetooth', 'Weight': '4.4 kg' }
  }
];

export const MOCK_CATEGORIES = ['Tablets', 'Laptops', 'Mouse', 'Headphones', 'Speakers'];
