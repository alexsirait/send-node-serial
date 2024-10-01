const express = require('express');
const { SerialPort } = require('serialport');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000; // Atur port sesuai kebutuhan
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware untuk parsing JSON
app.use(bodyParser.json());
app.use(cors()); // Izinkan CORS

let lastData = ''; // Tempat untuk menyimpan data terakhir dari scanner

// Konfigurasi koneksi database
// const db = mysql.createConnection({
//     host: '192.168.88.60',
//     user: 'dot_developer', // Ganti dengan username database
//     password: 'w(v97weP8UGe=bYd', // Ganti dengan password database
//     database: 'uat_mysatnusa' // Ganti dengan nama database
// });

// // Hubungkan ke database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection error:', err);
//         return;
//     }
//     console.log('Connected to the database.');
// });

// Serial port configuration
const port = new SerialPort({
    path: 'COM7', // Ganti dengan port yang sesuai
    baudRate: 9600,
}, (err) => {
    if (err) {
        console.log('Error: ', err.message);
    }
});

// Middleware untuk menyajikan file statis (HTML)
app.use(express.static('public'));
app.use(express.json());

// Endpoint untuk mendapatkan data terakhir sebagai JSON
app.get('/data', (req, res) => {
    res.json({ data: lastData });
});

// Mendengarkan data dari serial port
// port.on('data', (data) => {
//     lastData = data.toString();  // Mengkonversi buffer ke string
//     console.log('Data received from serial port:', lastData);

//     // Insert data ke database
//     const query = 'INSERT INTO tbl_logscanner (qr) VALUES (?)'; // Sesuaikan tabel dan kolom
//     db.query(query, [lastData], (err, result) => {
//         if (err) {
//             console.error('Error inserting data into database:', err);
//             return;
//         }
//         console.log('Data inserted into database:', result);
//     });

//     // Emit data ke klien melalui WebSocket
//     io.emit('scannerData', lastData); // Kirim data ke semua klien yang terhubung
// });

// API untuk menulis data ke COM Virtual
app.post('/write', (req, res) => {
    let { data } = req.body;  // Ambil data dari request body

    // Konversi data ke string jika bukan string
    if (typeof data !== 'string') {
        data = String(data);
    }

    // Tulis data ke serial port
    port.write(data, (err) => {
        if (err) {
            console.error('Error writing to serial port: ', err.message);
            return res.status(500).json({ error: 'Failed to write to serial port.' });
        }
        console.log(`Data sent to serial port: ${data}`);
        res.status(200).json({ message: `Data ${data} written to serial port.` });
    });
});

// Jalankan server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
