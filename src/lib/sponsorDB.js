const DB_NAME = 'MonitorSmithSponsorDB';
const STORE_NAME = 'sponsor_images';
const DB_VERSION = 1;

let dbPromise = null;

function getDB() {
  if (dbPromise) return dbPromise;
  
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.reject(new Error('IndexedDB not available'));
  }
  
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        dbPromise = null;
      };
      db.onclose = () => { dbPromise = null; };
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  }).catch((error) => {
    dbPromise = null;
    throw error;
  });
  
  return dbPromise;
}

export async function saveSponsorImages(images) {
  try {
    const db = await getDB();
    return await new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      store.clear();
      
      images.forEach((img, position) => {
        store.put({
          id: img.id,
          name: img.name,
          file: img.file, 
          position,
        });
      });
      
      transaction.oncomplete = () => resolve({ success: true });
      transaction.onerror = () => resolve({ success: false, error: transaction.error });
      transaction.onabort = () => resolve({ success: false, error: transaction.error });
    });
  } catch (error) {
    console.warn('Failed to save to SponsorDB', error);
    return { success: false, error };
  }
}

export async function loadSponsorImages() {
  try {
    const db = await getDB();
    return await new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      let images = [];
      request.onsuccess = () => {
        images = (request.result || []).map((image, index) => ({ image, index }))
          .sort((a, b) => (a.image.position ?? a.index) - (b.image.position ?? b.index))
          .map(({ image }) => image);
      };
      transaction.oncomplete = () => resolve({ success: true, data: images });
      transaction.onerror = () => resolve({ success: false, data: [] });
      transaction.onabort = () => resolve({ success: false, data: [] });
    });
  } catch (error) {
    console.warn('Failed to load from SponsorDB', error);
    return { success: false, data: [] };
  }
}

export async function clearSponsorImages() {
  try {
    const db = await getDB();
    return await new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.clear();
      
      transaction.oncomplete = () => resolve({ success: true });
      transaction.onerror = () => resolve({ success: false, error: transaction.error });
      transaction.onabort = () => resolve({ success: false, error: transaction.error });
    });
  } catch (error) {
    console.warn('Failed to clear SponsorDB', error);
    return { success: false, error };
  }
}
