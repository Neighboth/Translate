// Kütüphane: başka bir sitede çağırılabilir
async function cevir(apiKey, text, targetLang = 'en') {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('API key gerekli');
  }

  if (!text || typeof text !== 'string') {
    throw new Error('Çevrilecek metin boş olamaz');
  }

  const baseTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
  const proxyUrl = 'https://cool-snow-6c97.salih0simsek.workers.dev/?url=' + encodeURIComponent(baseTranslateUrl);

  try {
    const resp = await fetch(proxyUrl);
    if (!resp.ok) throw new Error(`Translate Hatası: ${resp.status} ${resp.statusText}`);
    const data = await resp.json();

    const sonuc = data[0].map(part => part[0]).join('');

    // NOT: Firestore'a usageCount güncelleme **bu scriptte yok**, çünkü CORS & güvenlik engeli olur.
    // İstersen bu işlemi backend'e taşırsın.

    return sonuc;
  } catch (err) {
    console.error("Çeviri API hatası:", err);
    return "Çeviri başarısız.";
  }
}
