// 📡 SW MATA-MATA BACKGROUND GPS PT. BBS
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Menerima koordinat GPS dari Driver.html meskipun aplikasi di-minimize
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRACK_GPS') {
        const { latitude, longitude, driverName } = event.data;
        
        // Kirim data GPS ini ke server / Firebase Abang di sini
        // Contoh fungsi kirim data ke database Abang:
        // kirimKeDatabase(latitude, longitude, driverName);
        
        console.log(`📡 SW Berhasil Tangkap GPS Latar Belakang: ${latitude}, ${longitude}`);
    }
});
