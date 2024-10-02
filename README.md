# Dillinger
## _Mysatnusa E-kiosk_

Required item:.

- Node JS (any version)
- pm2 installation
- Driver CP210x USB to UART Bridge VCP Drivers (Windows PC)

## Installation

Install the dependencies and devDependencies and start the server.
Change COM in serial-port-node/server.js

```sh 
const port = new SerialPort({
    path: 'COM7', // Ganti dengan port yang sesuai
    baudRate: 9600,
}, (err) => {
    if (err) {
        console.log('Error: ', err.message);
    }
});
```

## Install PM2

Install PM2

```sh 
npm install -g pm2
```
Copy file scheduler.bat

```sh
\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

