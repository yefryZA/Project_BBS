self.addEventListener('install', (event) => { self.skipWaiting(); });
self.addEventListener('activate', (event) => { event.waitUntil(self.clients.claim()); });

// Menangkap kiriman koordinat dari Driver.html saat aplikasi berjalan di background/ditutup
self.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'TRACK_GPS_BACKGROUND') {
        const { latitude, longitude, dbPath } = event.data;
        
        // 🔥 Trik Rahasia: Mengirim ke Firebase Realtime Database via REST API (Tanpa SDK)
        // Ganti 'PROJEK-FIREBASE-ABANG' dengan nama ID projek Firebase asli milik Abang ya!
        const URL_FIREBASE = `https://PROJEK-FIREBASE-ABANG.firebaseio.com/${dbPath}.json`;

        try {
            await fetch(URL_FIREBASE, {
                method: 'PATCH', // Sama fungsinya dengan 'update' di Firebase SDK
                body: JSON.stringify({
                    lat: latitude,
                    lng: longitude,
                    waktu_update: new Date().toISOString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("📡 SW Latar Belakang: Sukses Nembak Firebase!");
        } catch (error) {
            console.error("❌ SW Latar Belakang Gagal:", error);
        }
    }
});
