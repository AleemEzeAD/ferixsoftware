const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function seedAdmin() {
    try {
        // 1. Database Connect karein
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "127.0.0.1",
            port: 3306,
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "anzal_db",
        });

        // 2. Yahan apna Username aur Password likhein
        const adminUsername = "admin";
        const plainPassword = "#Anzal_$ecret721_Pasw";

        // 3. Password ko Hash karein
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        // 4. Database mein Insert ya Update karein
        const [rows] = await connection.execute('SELECT * FROM admins WHERE username = ?', [adminUsername]);

        if (rows.length > 0) {
            // Agar admin pehle se hai, toh password update karein
            await connection.execute('UPDATE admins SET password = ? WHERE username = ?', [hashedPassword, adminUsername]);
            console.log("✅ Admin password UPDATED successfully in database!");
        } else {
            // Agar naya hai, toh insert karein
            await connection.execute('INSERT INTO admins (username, password) VALUES (?, ?)', [adminUsername, hashedPassword]);
            console.log("✅ Admin created successfully in database!");
        }

        console.log(`Username: ${adminUsername}`);
        console.log(`Password: ${plainPassword}`);
        console.log("Password hash:", hashedPassword);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

seedAdmin();
// node src/db/seed-admin.js run after changing passw