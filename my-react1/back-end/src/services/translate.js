import translate from '@vitalets/google-translate-api';

/**
 * Google Translate を使って英語を日本語に翻訳
 * @param {string} text - 翻訳したい英語テキスト
 * @returns {Promise<string>} - 翻訳された日本語テキスト
 */
export async function translateToJapanese(text) {
  // 空文字やnullの場合はそのまま返す
  if (!text || text.trim() === '') {
    return text || '';
  }

  try {
    const result = await translate(text, { from: 'en', to: 'ja' });
    return result.text || text;
  } catch (error) {
    console.error('Translation failed:', error.message);
    return text; // エラー時は元のテキストを返す
  }
}

/**
 * 複数のテキストを一括翻訳（効率化のため）
 * @param {string[]} texts - 翻訳したいテキストの配列
 * @returns {Promise<string[]>} - 翻訳されたテキストの配列
 */
export async function translateBatch(texts) {
  // 並列実行で高速化（ただしAPIの負荷に注意）
  const promises = texts.map(text => translateToJapanese(text));
  return Promise.all(promises);
}
