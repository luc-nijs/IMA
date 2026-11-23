// Build-time publications: the IMA_publications sheet, or the saved copy if it can't be read.
import { SHEET_CSV_URL, recordsFromCSV } from './publications.js';
import snapshot from '../data/publications-snapshot.json';

export async function loadPublications() {
  if (!SHEET_CSV_URL) return snapshot;
  try {
    const res = await fetch(SHEET_CSV_URL, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const fromSheet = recordsFromCSV(await res.text());
    if (!fromSheet.length) throw new Error('no usable rows');
    return fromSheet;
  } catch (err) {
    console.warn('[publications] Using the saved copy: the sheet could not be read.', err);
    return snapshot;
  }
}
