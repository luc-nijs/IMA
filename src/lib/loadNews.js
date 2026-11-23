// Build-time news: the published sheet, or the starter file while there is no sheet yet.
import { SHEET_CSV_URL, recordsFromCSV, current } from './news.js';
import starter from '../data/IMA_news.csv?raw';

export async function loadNews() {
  let recs = [];
  try {
    if (SHEET_CSV_URL) {
      const res = await fetch(SHEET_CSV_URL, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      recs = recordsFromCSV(await res.text());
    } else recs = recordsFromCSV(starter);
  } catch (err) {
    console.warn('[news] The sheet could not be read.', err);
  }
  return current(recs);
}
