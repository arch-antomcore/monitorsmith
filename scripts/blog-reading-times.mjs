import blogInspection from './blog-articles-inspection.mjs';
import blogCalibration from './blog-articles-calibration.mjs';
import blogProductivity from './blog-articles-productivity.mjs';

export function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39|lt|gt);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function countWords(value) {
  const text = stripHtml(value);
  return text ? text.split(/\s+/u).length : 0;
}

// Computed only by Node/Vite: the browser receives the small metadata map, not article bodies.
export const BLOG_READING_MINUTES = Object.freeze(Object.fromEntries(
  [...blogInspection, ...blogCalibration, ...blogProductivity].map((article) => [
    article.slug, Math.max(3, Math.ceil(countWords(article.body) / 200)),
  ]),
));
