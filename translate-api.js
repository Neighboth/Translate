// Geliştirilmiş: kaynak dil opsiyonel olarak eklenebilir
async function cevir(apiKey, text, targetLang = 'en', sourceLang = '') {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('API key gerekli');
  }

  if (!text || typeof text !== 'string') {
    throw new Error('Çevrilecek metin boş olamaz');
  }

  const sl = sourceLang.trim() || 'auto'; // boşsa otomatik dil algıla

  const baseTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
  const proxyUrl = 'https://cool-snow-6c97.salih0simsek.workers.dev/?url=' + encodeURIComponent(baseTranslateUrl);

  try {
    const resp = await fetch(proxyUrl);
    if (!resp.ok) throw new Error(`Translate Hatası: ${resp.status} ${resp.statusText}`);
    const data = await resp.json();

    const sonuc = data[0].map(part => part[0]).join('');

    return sonuc;
  } catch (err) {
    console.error("Çeviri API hatası:", err);
    return "Çeviri başarısız.";
  }
}
