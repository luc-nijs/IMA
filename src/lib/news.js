// News, from the IMA_news Google Sheet. Columns as on the other sites (Text, Link,
// Picture, Until, Publish), plus Date, Title and Category for the news cards.
// Used at build time (for search engines and the picture copies) and in the
// visitor's browser, which reads the sheet live.

// "File > Share > Publish to web > CSV" address. Empty = use the starter file below.
export const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5ExdIY9nSHVSIN1mSv7xZCTkwy9knpgsw2OaQV-43HOgm8pguEP8MLaYQw79kUKIT5kjqF-ul8pPl/pub?output=csv';

export const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function driveId(link) {
  if (!/^https?:\/\/(drive|docs)\.google\.com\//i.test(link || '')) return '';
  const m = /\/d\/([-\w]+)/.exec(link) || /[?&]id=([-\w]+)/.exec(link);
  return m ? m[1] : '';
}
export const driveImageUrl = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

const webAddress = (s) => (/^https?:\/\//i.test(s) ? s : /^\//.test(s) ? s : /^[a-z][a-z0-9+.-]*:/i.test(s) ? '' : 'https://' + s);

// YYYY-MM-DD from 2026-07-03, 2026/7/3 or 3.7.2026; '' otherwise.
function isoDate(s) {
  let m = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(s);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(s);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  return '';
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export const current = (recs) => recs.filter((r) => !r.until || r.until >= today());

function parseRows(text) {
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => String(v).trim() !== ''));
}

// Throws when there is no Text column (an error page instead of the sheet).
export function recordsFromCSV(text) {
  const rows = parseRows(text);
  const header = (rows[0] || []).map((h) => String(h).trim().toLowerCase());
  const col = (name) => header.indexOf(name);
  if (col('text') === -1) throw new Error('no Text column');
  return rows.slice(1).map((r) => {
    const get = (name) => (col(name) === -1 ? '' : String(r[col(name)] ?? '').trim());
    if (/^(n|no|false|0|hide)$/i.test(get('publish'))) return null;
    return {
      date: isoDate(get('date')),
      title: get('title'),
      category: get('category'),
      text: get('text').replace(/\s+/g, ' '),
      link: get('link') && webAddress(get('link')),
      picture: get('picture') && webAddress(get('picture')),
      until: untilOrEmpty(get('until')),
    };
  }).filter((r) => r && (r.text || r.title));
}
const untilOrEmpty = (s) => isoDate(s);

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (iso) => (iso ? `${+iso.slice(8)} ${MONTHS[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}` : '');

const textHtml = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

function pictureHtml(link) {
  if (!link) return '<span class="news-pic none" aria-hidden="true"></span>';
  const id = driveId(link);
  if (!id) return `<img class="news-pic" src="${esc(link)}" alt="" loading="lazy">`;
  return `<img class="news-pic" src="/news-pictures/${id}.jpg" alt="" loading="lazy" referrerpolicy="no-referrer" ` +
    `onerror="this.onerror=null;this.src='${driveImageUrl(id)}'">`;
}

// The sheet's last row shows first. `limit` keeps only the newest items.
export function newsHtml(recs, limit = 0) {
  let list = [...recs].reverse();
  if (limit) list = list.slice(0, limit);
  return list.map((r) => {
    const ext = /^https?:/i.test(r.link || '');
    const tag = r.link ? 'a' : 'article';
    const href = r.link ? ` href="${esc(r.link)}"${ext ? ' target="_blank" rel="noopener"' : ''}` : '';
    const meta = [r.category, longDate(r.date)].filter(Boolean).map(esc).join(' · ');
    return `<${tag} class="news-card"${href}>${pictureHtml(r.picture)}<div>` +
      (meta ? `<p class="meta">${meta}</p>` : '') +
      (r.title ? `<h3>${esc(r.title)}</h3>` : '') +
      (r.text ? `<p>${textHtml(r.text)}</p>` : '') +
      (r.link ? '<span class="more">Read more →</span>' : '') +
      `</div></${tag}>`;
  }).join('');
}
