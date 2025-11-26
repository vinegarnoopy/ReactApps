/**
 * Google Apps Script を使った翻訳サービス
 */
const GAS_URL = process.env.GAS_TRANSLATE_URL || '';

// 1回のリクエストで長すぎる本文を避けるため分割
function chunkText(text, max = 800) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + max));
    i += max;
  }
  return chunks;
}

export async function translateToJapanese(text) {
  if (!text || text.trim() === '') return text || '';
  try {
    // Google Apps Script WebApp (GET, JSON { code, text })
    const chunks = text.length <= 800 ? [text] : chunkText(text);
    const out = [];
    for (const part of chunks) {
      if (!GAS_URL) { out.push(part); continue; }
      const url = `${GAS_URL}?text=${encodeURIComponent(part)}&source=en&target=ja`;
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) { console.error('[gas] HTTP', res.status); out.push(part); continue; }
      const data = await res.json();
      out.push((data && data.text) ? data.text : part);
      await new Promise(r => setTimeout(r, 120));
    }
    return out.join('');
  } catch (e) {
    console.error('[gas] translation failed', e.message);
    return text;
  }
}

export async function translateBatch(texts) {
  const results = [];
  for (const t of texts) {
    results.push(await translateToJapanese(t));
  }
  return results;
}
