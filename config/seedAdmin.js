/**
 * Admin User Seeder
 * Seeds the default admin user on server startup if not already present in MongoDB.
 */

const User = require('../models/User');

const seedAdmin = async () => {
  const adminEmail = 'vijayavarshini19@gmail.com';

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`✅ Admin user already exists: ${adminEmail}`);
      return;
    }

    await User.create({
      name: 'Vijayavarshini S',
      email: adminEmail,
      password: 'varsh@234',
      role: 'admin',
      department: 'ALL',
      regulation: 'ALL',
      isActive: true
    });

    console.log(`🛡️  Admin user seeded successfully: ${adminEmail}`);
  } catch (err) {
    // Non-critical: server can still run in demo/offline mode
    console.warn('⚠️  Admin seeding skipped (DB may not be connected):', err.message);
  }
};

module.exports = seedAdmin;
