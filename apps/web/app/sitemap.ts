// Static sitemap for SystemSpecs Technology Solutions. Lists every public
// (marketing) route. Next 15 generates `sitemap.xml` at build time — works
// with `output: 'export'` so it ships into the static `out/` (and `docs/`)
// build alongside the rest of the site.
//
// New marketing routes must be added here so search engines pick them up.

import type { MetadataRoute } from 'next';

// `output: 'export'` requires fully static routes — Next 16 needs an
// explicit opt-in for sitemap.xml so it bakes into the static build
// instead of running as a dynamic route handler.
export const dynamic = 'force-static';

const SITE_URL = 'https://stsl.ng';

const ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  // Top-level
  { path: '/',            changeFrequency: 'monthly',  priority: 1.0 },
  { path: '/solutions',   changeFrequency: 'monthly',  priority: 0.9 },
  { path: '/products',    changeFrequency: 'monthly',  priority: 0.9 },
  { path: '/developers',  changeFrequency: 'monthly',  priority: 0.7 },
  { path: '/company',     changeFrequency: 'monthly',  priority: 0.8 },
  { path: '/contact',     changeFrequency: 'yearly',   priority: 0.6 },

  // Solutions sub-pages
  { path: '/solutions/banking',              changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solutions/e-government',         changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solutions/community',            changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solutions/enterprise-software',  changeFrequency: 'monthly', priority: 0.7 },

  // Product sub-pages
  { path: '/products/pouchii',     changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/fundacause',  changeFrequency: 'monthly', priority: 0.7 },
  { path: '/products/monicenta',   changeFrequency: 'monthly', priority: 0.7 },

  // Company sub-pages
  { path: '/company/teams',    changeFrequency: 'monthly',  priority: 0.7 },
  { path: '/company/group',    changeFrequency: 'yearly',   priority: 0.6 },
  { path: '/company/press',    changeFrequency: 'monthly',  priority: 0.5 },
  { path: '/company/careers',  changeFrequency: 'weekly',   priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
