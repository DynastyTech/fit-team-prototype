import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
export const initDatabase = () => {
  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      featured BOOLEAN DEFAULT 0,
      subscribe_save BOOLEAN DEFAULT 1,
      pv_value INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      total REAL NOT NULL,
      status TEXT NOT NULL,
      stripe_payment_intent_id TEXT,
      shipping_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Cart table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Seed initial products if table is empty
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO products (name, description, price, image, category, stock, featured, subscribe_save, pv_value)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const products = [
      // Kits
      {
        name: 'FITTEAM ALL-IN KIT (400 PV)',
        description: 'Complete transformation package with all FITTEAM products. Everything you need to transform your life.',
        price: 687.99,
        image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800',
        category: 'Kits',
        stock: 50,
        featured: 1,
        subscribe_save: 1,
        pv_value: 400
      },
      {
        name: 'FITTEAM TRANSFORMATION KIT (200 PV)',
        description: 'Essential starter kit for your fitness transformation journey. Perfect for beginners.',
        price: 348.99,
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
        category: 'Kits',
        stock: 75,
        featured: 1,
        subscribe_save: 1,
        pv_value: 200
      },
      // Featured Products
      {
        name: 'FITTEAM FIT 30 Ct (50 PV)',
        description: 'Premium energy and focus blend to power through your day and workouts.',
        price: 75.99,
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
        category: 'Featured Products',
        stock: 200,
        featured: 1,
        subscribe_save: 1,
        pv_value: 50
      },
      {
        name: 'FITTEAM FIT PLUS + 60 Caps (50 PV)',
        description: 'Enhanced formula with additional performance-boosting ingredients.',
        price: 77.99,
        image: 'https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?w=800',
        category: 'Featured Products',
        stock: 150,
        featured: 1,
        subscribe_save: 1,
        pv_value: 50
      },
      {
        name: 'FITTEAM GREENS (50 PV)',
        description: 'Nutrient-rich green superfood blend for overall health and vitality.',
        price: 84.99,
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800',
        category: 'Featured Products',
        stock: 120,
        featured: 1,
        subscribe_save: 1,
        pv_value: 50
      },
      {
        name: 'FITTEAM HYDRATE 30 Ct (30 PV)',
        description: 'Electrolyte-rich hydration formula for optimal performance and recovery.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
        category: 'Featured Products',
        stock: 180,
        featured: 1,
        subscribe_save: 1,
        pv_value: 30
      },
      {
        name: 'FITTEAM IMMUNE (40 PV)',
        description: 'Boost your immune system with this powerful blend of vitamins and minerals.',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
        category: 'Featured Products',
        stock: 140,
        featured: 1,
        subscribe_save: 1,
        pv_value: 40
      },
      {
        name: 'FITTEAM LEAN Protein (30 PV)',
        description: 'High-quality protein blend for lean muscle building and recovery.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800',
        category: 'Featured Products',
        stock: 160,
        featured: 1,
        subscribe_save: 1,
        pv_value: 30
      },
      {
        name: 'FITTEAM Metabolic Reset',
        description: 'Reset your metabolism and kickstart your weight loss journey.',
        price: 67.99,
        image: 'https://images.unsplash.com/photo-1505944428330-1f2b94e5984d?w=800',
        category: 'Featured Products',
        stock: 100,
        featured: 1,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'FITTEAM Metabolic Reset + GREENS',
        description: 'Powerful combination of metabolic reset and greens for maximum results.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
        category: 'Featured Products',
        stock: 90,
        featured: 1,
        subscribe_save: 0,
        pv_value: 0
      },
      // ActiveWear
      {
        name: 'Ladies ALL-IN Legging Black',
        description: 'Premium performance leggings in classic black. Available in multiple sizes.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
        category: 'ActiveWear',
        stock: 100,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'Ladies ALL-IN Legging Navy',
        description: 'Premium performance leggings in navy blue. Comfortable and stylish.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        category: 'ActiveWear',
        stock: 100,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'Ladies Power Legging Camo',
        description: 'High-performance camo leggings for your intense workouts.',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
        category: 'ActiveWear',
        stock: 80,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'Ladies Power Legging Redwood',
        description: 'Stylish redwood color leggings with superior comfort and fit.',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        category: 'ActiveWear',
        stock: 80,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'Ladies Power Legging Chocolate Truffle',
        description: 'Rich chocolate truffle colored leggings for everyday wear.',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
        category: 'ActiveWear',
        stock: 80,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'Ladies Empower Sports Bra Black',
        description: 'Maximum support sports bra in classic black.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        category: 'ActiveWear',
        stock: 120,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      },
      {
        name: 'Ladies Empower Sports Bra Navy',
        description: 'Maximum support sports bra in navy blue.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
        category: 'ActiveWear',
        stock: 120,
        featured: 0,
        subscribe_save: 0,
        pv_value: 0
      }
    ];

    products.forEach(product => {
      insert.run(
        product.name,
        product.description,
        product.price,
        product.image,
        product.category,
        product.stock,
        product.featured,
        product.subscribe_save,
        product.pv_value
      );
    });

    console.log('✅ Database seeded with initial products');
  }
};

export default db;

