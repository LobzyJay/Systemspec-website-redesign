import {
  PageHeading, SectionHeading, SubHeading, Stage, Caption, Swatch, CodeBlock, Eyebrow,
} from './_docs';
import { DotMark, SystemSpecsWordmark } from '@systemspecs/brand-stsl/brand';
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, Close,
  Check, Info, Alert, Lock,
  Building, Government, Bank, Network, Code, Card as CardIcon, Wallet, Document, Users, Award, Shield,
  LinkedIn, Twitter, Mail, Phone,
} from '@systemspecs/brand-stsl/icons';
import {
  Button, Link as DSLink, Card, CardTitle, CardBody, Input, Textarea, Field, Badge,
  Tabs, TabList, Tab, TabPanel,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Skeleton,
} from '@systemspecs/foundations/primitives';
import {
  Hero, ProofBar, SolutionCard, ProductCard, CapabilityStrip,
  GroupBlock, InsightCard, SegmentedCTA,
} from '@systemspecs/brand-stsl/components';
import { GlobeStatic, DottedGlobe } from '@systemspecs/brand-stsl/components/Globe';
import {
  TeamMember,
  WaveBackdrop, WaveStill, waveStills,
  WaveBackdrop2,
  WaveBackdrop3,
} from '@systemspecs/brand-stsl/components';
import { DocsGlobe } from './DocsGlobe';
import { LeadershipCard } from '@systemspecs/brand-stsl/components';

const accent = [
  { name: 'accent.default',       value: '#017A6A', cssVar: '--accent-default' },
  { name: 'accent.default-hover', value: '#014E44', cssVar: '--accent-default-hover' },
  { name: 'accent.emphasis',      value: '#1A356A', cssVar: '--accent-emphasis' },
  { name: 'accent.subtle',        value: '#E6F4F1', cssVar: '--accent-subtle' },
];
const brandTeals = [
  { name: 'brand.teal (deep)', value: '#017A6A', cssVar: '--brand-teal' },
  { name: 'brand.teal.light',  value: '#83BFB7', cssVar: '--brand-teal-light' },
  { name: 'brand.teal.pale',   value: '#B6D8D4', cssVar: '--brand-teal-pale' },
];
const extended = [
  { name: 'brand.forest',      value: '#0E5E3D', cssVar: '--brand-forest' },
  { name: 'brand.forest.deep', value: '#0A4530', cssVar: '--brand-forest-deep' },
  { name: 'brand.gold',        value: '#D4A82C', cssVar: '--brand-gold' },
  { name: 'brand.cream',       value: '#F8E89A', cssVar: '--brand-cream' },
];
const surface = [
  { name: 'bg.canvas',         value: '#FFFFFF', cssVar: '--bg-canvas' },
  { name: 'bg.surface-raised', value: '#F7F8F9', cssVar: '--bg-surface-raised' },
  { name: 'bg.surface-muted',  value: '#EEF0F2', cssVar: '--bg-surface-muted' },
  { name: 'bg.inverse',        value: '#0B0C0F', cssVar: '--bg-inverse' },
];
const text = [
  { name: 'text.primary',   value: '#16181C', cssVar: '--text-primary' },
  { name: 'text.secondary', value: '#41464E', cssVar: '--text-secondary' },
  { name: 'text.muted',     value: '#7A828D', cssVar: '--text-muted' },
];
const feedback = [
  { name: 'feedback.success', value: '#2E8B57', cssVar: '--feedback-success' },
  { name: 'feedback.warning', value: '#D99A00', cssVar: '--feedback-warning' },
  { name: 'feedback.danger',  value: '#C0353A', cssVar: '--feedback-danger' },
  { name: 'feedback.info',    value: '#2769C4', cssVar: '--feedback-info' },
];
const typeScale = [
  { token: 'display-2xl', sample: 'Infrastructure' },
  { token: 'display-xl',  sample: 'Infrastructure' },
  { token: 'display-lg',  sample: 'Infrastructure' },
  { token: 'display-md',  sample: 'Infrastructure' },
  { token: 'heading-1',   sample: 'Section heading' },
  { token: 'heading-2',   sample: 'Section heading' },
  { token: 'heading-3',   sample: 'Card title' },
  { token: 'body-lg',     sample: 'Lede paragraph' },
  { token: 'body',        sample: 'Body paragraph' },
  { token: 'body-sm',     sample: 'Secondary body' },
  { token: 'caption',     sample: 'Caption' },
  { token: 'overline',    sample: 'Overline' },
];
const spacing = [
  { token: '1', px: 4 }, { token: '2', px: 8 }, { token: '3', px: 12 },
  { token: '4', px: 16 }, { token: '5', px: 20 }, { token: '6', px: 24 },
  { token: '8', px: 32 }, { token: '10', px: 40 }, { token: '12', px: 48 },
  { token: '16', px: 64 }, { token: '20', px: 80 }, { token: '24', px: 96 },
];
const radius = [
  { token: 'sm', value: '0.25rem' }, { token: 'md', value: '0.5rem' },
  { token: 'lg', value: '0.75rem' }, { token: 'xl', value: '1rem' },
  { token: '2xl', value: '1.5rem' }, { token: 'pill', value: '9999px' },
];
const shadow = ['e1', 'e2', 'e3', 'e4'];

const iconCatalogue = [
  { name: 'ArrowRight', icon: ArrowRight }, { name: 'ArrowUpRight', icon: ArrowUpRight },
  { name: 'ChevronDown', icon: ChevronDown }, { name: 'Menu', icon: Menu }, { name: 'Close', icon: Close },
  { name: 'Check', icon: Check }, { name: 'Info', icon: Info }, { name: 'Alert', icon: Alert }, { name: 'Lock', icon: Lock },
  { name: 'Building', icon: Building }, { name: 'Government', icon: Government }, { name: 'Bank', icon: Bank },
  { name: 'Network', icon: Network }, { name: 'Code', icon: Code }, { name: 'Card', icon: CardIcon },
  { name: 'Wallet', icon: Wallet }, { name: 'Document', icon: Document }, { name: 'Users', icon: Users },
  { name: 'Award', icon: Award }, { name: 'Shield', icon: Shield },
  { name: 'LinkedIn', icon: LinkedIn }, { name: 'Twitter', icon: Twitter }, { name: 'Mail', icon: Mail }, { name: 'Phone', icon: Phone },
];

export default function DesignPage() {
  return (
    <>
      <PageHeading
        number="System v0.1"
        title="The SystemSpecs design system."
        lede="Tokens, brand, primitives, patterns. One system, three layers — re-skinnable across SystemSpecs Holdings subsidiaries with token swaps alone."
      />

      {/* ============================================================ */}
      {/* 01 — FOUNDATIONS                                              */}
      {/* ============================================================ */}
      <SectionHeading id="foundations" number="01" title="Foundations." intro="Tokens — color, type, spacing, radius, motion." />

      <SubHeading>Accent</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {accent.map((s) => <Swatch key={s.name} {...s} />)}
        </div>
      </Stage>

      <SubHeading>Brand teals</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {brandTeals.map((s) => <Swatch key={s.name} {...s} />)}
        </div>
      </Stage>
      <Caption>Sampled from the parent dot motif. Use accent-* in UI; these are for marks.</Caption>

      <SubHeading>Extended palette</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {extended.map((s) => <Swatch key={s.name} {...s} />)}
        </div>
      </Stage>
      <Caption>Marketing surfaces and celebration moments. Sampled from the SystemSpecs ecosystem.</Caption>

      <SubHeading>Surface</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {surface.map((s) => <Swatch key={s.name} {...s} />)}
        </div>
      </Stage>

      <SubHeading>Text</SubHeading>
      <Stage>
        <div className="grid grid-cols-3 gap-8">
          {text.map((s) => <Swatch key={s.name} {...s} />)}
        </div>
      </Stage>

      <SubHeading>Feedback</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {feedback.map((s) => <Swatch key={s.name} {...s} />)}
        </div>
      </Stage>

      <SubHeading>Typography</SubHeading>
      <Stage>
        <div className="space-y-8">
          {typeScale.map((t) => (
            <div key={t.token} className="grid grid-cols-1 md:grid-cols-[10rem_1fr] items-baseline gap-6 pb-6 border-b border-border-subtle last:border-b-0">
              <span className="text-caption text-fg-muted font-mono">text-{t.token}</span>
              <span
                className={
                  `text-${t.token} block overflow-x-auto whitespace-nowrap ` +
                  (t.token.startsWith('display') || t.token.startsWith('heading') ? 'font-display text-fg-primary' : 'font-sans text-fg-primary')
                }
              >
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </Stage>
      <Caption>Plus Jakarta Sans drives display; Geist drives body; Source Serif 4 carries editorial pull-quotes and lede passages.</Caption>

      <SubHeading>Spacing</SubHeading>
      <Stage>
        <div className="space-y-4">
          {spacing.map((s) => (
            <div key={s.token} className="flex items-center gap-6">
              <span className="w-12 text-caption text-fg-muted font-mono">{s.token}</span>
              <div className="h-4 bg-accent rounded-sm" style={{ width: `${s.px}px` }} />
              <span className="text-caption text-fg-muted">{s.px}px</span>
            </div>
          ))}
        </div>
      </Stage>

      <SubHeading>Responsive scale</SubHeading>
      <Stage>
        <p className="text-caption text-fg-muted font-mono mb-6">How tokens scale across breakpoints.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { vp: 'Mobile · 375',  display: '36px', heading: '24px', body: '16px', section: '96px' },
            { vp: 'Tablet · 768',  display: '44px', heading: '30px', body: '18px', section: '128px' },
            { vp: 'Desktop · 1280',display: '56px', heading: '30px', body: '18px', section: '160px' },
          ].map((t) => (
            <div key={t.vp} className="space-y-3">
              <p className="text-overline uppercase font-mono tracking-widest text-accent">{t.vp}</p>
              <dl className="text-body-sm space-y-2">
                <div className="flex justify-between"><dt className="text-fg-muted">Display</dt><dd className="font-mono">{t.display}</dd></div>
                <div className="flex justify-between"><dt className="text-fg-muted">Section heading</dt><dd className="font-mono">{t.heading}</dd></div>
                <div className="flex justify-between"><dt className="text-fg-muted">Body</dt><dd className="font-mono">{t.body}</dd></div>
                <div className="flex justify-between"><dt className="text-fg-muted">Section gap</dt><dd className="font-mono">{t.section}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </Stage>
      <Caption>The PageHeading title clamps to display-md on mobile, display-xl on tablet, display-2xl on desktop. Sub-tier sizes scale similarly.</Caption>

      <SubHeading>Radius</SubHeading>
      <Stage>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {radius.map((r) => (
            <div key={r.token} className="text-center">
              <div className="w-full aspect-square bg-bg-surface border border-border" style={{ borderRadius: r.value }} />
              <p className="mt-3 text-caption text-fg-muted font-mono">{r.token}</p>
            </div>
          ))}
        </div>
      </Stage>

      <SubHeading>Elevation</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {shadow.map((s) => (
            <div key={s} className="text-center">
              <div className={`w-full aspect-square bg-bg-surface rounded-lg shadow-${s}`} />
              <p className="mt-4 text-caption text-fg-muted font-mono">shadow-{s}</p>
            </div>
          ))}
        </div>
      </Stage>

      <SubHeading>Motion</SubHeading>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-caption font-mono text-fg-muted">
          <div>duration-instant<br/>80ms</div>
          <div>duration-fast<br/>160ms</div>
          <div>duration-base<br/>220ms</div>
          <div>duration-slow<br/>360ms</div>
          <div>duration-slower<br/>520ms</div>
        </div>
      </Stage>

      {/* ============================================================ */}
      {/* 02 — BRAND                                                    */}
      {/* ============================================================ */}
      <SectionHeading id="brand" number="02" title="Brand." intro="Wordmark, mark, icons." />

      <SubHeading>Wordmark</SubHeading>
      <Stage>
        <div className="py-8 grid place-items-center">
          <SystemSpecsWordmark height={56} />
        </div>
      </Stage>
      <Stage dark>
        <div className="py-8 grid place-items-center">
          <SystemSpecsWordmark height={56} tone="mono" />
        </div>
        <Caption>Mono — uses the white asset so the dot motif keeps its teal hues.</Caption>
      </Stage>

      <SubHeading>Dot mark</SubHeading>
      <Stage>
        <div className="flex items-center justify-center gap-16 py-6 flex-wrap">
          <DotMark size={120} />
          <DotMark size={64} />
          <DotMark size={32} />
        </div>
      </Stage>

      <SubHeading>Icons</SubHeading>
      <Stage>
        {/* Single-radius tile — no nested squircle. One rounded container,
            ring + bg, icon + label inside. */}
        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {iconCatalogue.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="group/icon flex flex-col items-center gap-3 px-4 py-5 rounded-2xl ring-1 ring-[color:var(--border-subtle)] bg-bg-surface transition-transform duration-slow ease-expressive hover:-translate-y-0.5"
            >
              <Icon size={26} className="text-fg-primary transition-transform duration-base ease-expressive group-hover/icon:scale-105" strokeWidth={1.25} />
              <span className="text-caption text-fg-muted font-mono">{name}</span>
            </li>
          ))}
        </ul>
      </Stage>

      {/* ============================================================ */}
      {/* 03 — PRIMITIVES                                               */}
      {/* ============================================================ */}
      <SectionHeading id="primitives" number="03" title="Primitives." intro="Buttons, fields, tabs, accordions, skeletons." />

      <SubHeading>Button</SubHeading>
      <Stage>
        <div className="flex flex-wrap items-center gap-4">
          <Button trailingIcon={<ArrowUpRight size={14} />}>Primary</Button>
          <Button variant="secondary" trailingIcon={<ArrowUpRight size={14} />}>Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="inverse" trailingIcon={<ArrowUpRight size={14} />}>Inverse</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button size="sm" trailingIcon={<ArrowUpRight size={12} />}>Small</Button>
          <Button size="md" trailingIcon={<ArrowUpRight size={14} />}>Medium</Button>
          <Button size="lg" trailingIcon={<ArrowUpRight size={16} />}>Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Stage>
      <Caption>Trailing arrows live inside their own circular chip, flush with the right inner padding. On hover the chip translates diagonally and lifts — internal kinetic tension without disturbing the surrounding layout.</Caption>
      <CodeBlock>{`<Button trailingIcon={<ArrowUpRight size={14} />}>Talk to sales</Button>`}</CodeBlock>

      <SubHeading>Link</SubHeading>
      <Stage>
        <div className="flex flex-wrap items-center gap-10">
          <DSLink href="#">Default link</DSLink>
          <DSLink href="#" variant="subtle">Subtle</DSLink>
          <DSLink href="#" variant="standalone" trailingIcon={<ArrowRight size={16} />}>Standalone CTA</DSLink>
        </div>
      </Stage>

      <SubHeading>Card</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card surface="outline"><CardTitle>Outline</CardTitle><CardBody className="mt-3">Default surface.</CardBody></Card>
          <Card surface="raised"><CardTitle>Raised</CardTitle><CardBody className="mt-3">Subtle elevation.</CardBody></Card>
          <Card surface="flat"><CardTitle>Flat</CardTitle><CardBody className="mt-3">Inside tinted sections.</CardBody></Card>
        </div>
      </Stage>

      <SubHeading>Field</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <Field label="Work email" htmlFor="email" hint="We only contact about this enquiry.">
            <Input id="email" type="email" placeholder="you@institution.com" />
          </Field>
          <Field label="Phone" htmlFor="phone" error="Include country code.">
            <Input id="phone" placeholder="+234" />
          </Field>
          <div className="md:col-span-2">
            <Field label="What you'd like to discuss" htmlFor="msg">
              <Textarea id="msg" placeholder="One paragraph is plenty…" />
            </Field>
          </div>
        </div>
      </Stage>

      <SubHeading>Badge</SubHeading>
      <Stage>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="info">Info</Badge>
        </div>
      </Stage>

      <SubHeading>Tabs</SubHeading>
      <Stage>
        <Tabs defaultValue="overview">
          <TabList>
            <Tab value="overview">Overview</Tab>
            <Tab value="capabilities">Capabilities</Tab>
            <Tab value="security">Security</Tab>
          </TabList>
          <TabPanel value="overview"><p className="text-body text-fg-secondary">Overview panel.</p></TabPanel>
          <TabPanel value="capabilities"><p className="text-body text-fg-secondary">Capabilities panel.</p></TabPanel>
          <TabPanel value="security"><p className="text-body text-fg-secondary">Security panel.</p></TabPanel>
        </Tabs>
      </Stage>

      <SubHeading>Accordion</SubHeading>
      <Stage>
        <Accordion type="single" collapsible className="max-w-2xl">
          <AccordionItem value="a">
            <AccordionTrigger>Is procurement documented?</AccordionTrigger>
            <AccordionContent>A procurement-ready brief is available on request.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>What integration patterns are supported?</AccordionTrigger>
            <AccordionContent>REST over HTTPS with mTLS, plus event hooks.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Stage>

      <SubHeading>Skeleton</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Skeleton variant="heading" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
          <div className="flex items-start gap-4">
            <Skeleton variant="circle" />
            <div className="flex-1 space-y-3">
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-3/4" />
            </div>
          </div>
        </div>
      </Stage>

      {/* ============================================================ */}
      {/* 04 — PATTERNS                                                 */}
      {/* ============================================================ */}
      <SectionHeading id="patterns" number="04" title="Patterns." intro="Composed assemblies of the primitives." />

      <SubHeading>Globe</SubHeading>
      <Stage flush>
        <div className="mx-auto w-full max-w-md p-8">
          <DocsGlobe />
        </div>
        <Caption>Cobe-powered. Drag to rotate; auto-rotates when idle.</Caption>
      </Stage>

      <SubHeading>Globe in context</SubHeading>
      <Caption>Same asset, four surfaces. No backdrop pattern — the globe carries the visual itself.</Caption>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-6 mb-3">Web hero · 16:9</p>
      <Stage flush>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-12 bg-bg-inverse text-fg-on-inverse rounded-lg">
          <div>
            <SystemSpecsWordmark height={28} tone="mono" />
            <h3 className="mt-6 font-display text-heading-1 md:text-display-md text-fg-on-inverse text-balance">
              Africa's payment, government, and financial infrastructure.
            </h3>
            <p className="mt-3 text-body text-fg-on-inverse/70 max-w-md">Coverage across Nigerian financial centers.</p>
          </div>
          <div className="mx-auto w-full max-w-xs"><DocsGlobe /></div>
        </div>
      </Stage>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-8 mb-3">Social card · 1.91:1</p>
      <Stage flush>
        <div className="aspect-[1200/628] grid grid-cols-[1fr_auto] items-center gap-6 p-6 md:p-10 bg-bg-inverse text-fg-on-inverse rounded-lg">
          <div className="min-w-0">
            <SystemSpecsWordmark height={28} tone="mono" />
            <p className="mt-4 font-display text-heading-1 md:text-display-md text-fg-on-inverse text-balance">
              Built in Nigeria. Operating since 1992.
            </p>
          </div>
          <div className="aspect-square" style={{ width: '40%' }}>
            <DocsGlobe />
          </div>
        </div>
      </Stage>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-8 mb-3">Banner · 728 × 90</p>
      <Stage flush>
        <div className="overflow-x-auto -mx-4 px-4">
          <div
            className="mx-auto rounded-md overflow-hidden bg-bg-inverse text-fg-on-inverse grid grid-cols-[90px_1fr_auto] items-center gap-4 p-3"
            style={{ width: 728, height: 90 }}
          >
            <div className="h-full aspect-square">
              <DocsGlobe />
            </div>
            <div className="min-w-0">
              <SystemSpecsWordmark height={16} tone="mono" />
              <p className="mt-1 text-caption text-fg-on-inverse/70 truncate">
                Infrastructure that institutions trust.
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 text-caption !text-white bg-accent rounded-pill px-4 py-1.5 whitespace-nowrap"
            >
              Learn more
            </a>
          </div>
        </div>
        <Caption>Fixed 728×90 leaderboard.</Caption>
      </Stage>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-8 mb-3">Newsletter · 600 wide</p>
      <Stage flush>
        <div className="mx-auto w-full rounded-lg overflow-hidden border border-border-subtle" style={{ maxWidth: 600 }}>
          <div className="bg-bg-inverse p-8 grid place-items-center">
            <div className="w-48 aspect-square">
              <DocsGlobe />
            </div>
          </div>
          <div className="bg-bg-canvas p-8 text-center">
            <div className="grid place-items-center">
              <SystemSpecsWordmark height={20} />
            </div>
            <h4 className="mt-6 font-display text-heading-1 text-fg-primary text-balance">
              Quarterly notes from the infrastructure team.
            </h4>
            <p className="mt-3 text-body-sm text-fg-secondary">
              What we shipped this quarter, in three minutes.
            </p>
            <a href="#" className="mt-6 inline-flex h-10 items-center px-5 rounded-md bg-accent text-fg-on-accent text-body-sm font-medium">
              Read the issue
            </a>
          </div>
        </div>
      </Stage>

      <SubHeading>Background patterns</SubHeading>
      <Caption>Three motion loops. Loop 01 ships six frozen frames for static surfaces (banners, social exports, email). Loops 02 and 03 are live-only.</Caption>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Loop 01 · Diagonal sweep
          </p>
          <p className="text-caption text-fg-muted font-mono">live + 6 stills</p>
        </div>
        <div className="relative aspect-[16/6] overflow-hidden bg-bg-inverse text-accent">
          <WaveBackdrop />
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {waveStills.map((s, i) => (
            <div key={`s1-${i}`} className="relative aspect-[4/3] overflow-hidden bg-bg-inverse text-accent">
              <WaveStill progress={s.progress} />
              <span className="absolute bottom-3 left-3 inline-flex items-center h-6 px-2.5 rounded-pill bg-white/10 backdrop-blur-md text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-fg-on-inverse">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Stage>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Loop 02 · Dot ripple
          </p>
          <p className="text-caption text-fg-muted font-mono">live only</p>
        </div>
        <div className="relative aspect-[16/6] overflow-hidden bg-bg-inverse text-accent">
          <WaveBackdrop2 />
        </div>
      </Stage>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Loop 03 · Vertical drift
          </p>
          <p className="text-caption text-fg-muted font-mono">live only</p>
        </div>
        <div className="relative aspect-[16/6] overflow-hidden bg-bg-inverse text-accent">
          <WaveBackdrop3 />
        </div>
      </Stage>

      <SubHeading>Team grid</SubHeading>
      <Caption>Compact card for full-team grids. Use when 15+ people would make the leadership card feel disorganized.</Caption>
      <Stage>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {[
            { name: 'Aisha Bello',   role: 'Engineering',  dept: 'Eng',     id: 1 },
            { name: 'Tunde Okafor',  role: 'Banking',       dept: 'Bank',    id: 2 },
            { name: 'Chioma Eze',    role: 'Product',       dept: 'Product', id: 3 },
            { name: 'David Adeleke', role: 'Design',        dept: 'Design',  id: 4 },
            { name: 'Funmi Ige',     role: 'E-Government',  dept: 'Gov',     id: 5 },
            { name: 'Kola Adigun',   role: 'Engineering',                    id: 6 },
            { name: 'Halima Sani',   role: 'Compliance',                     id: 7 },
            { name: 'Yetunde Bakare',role: 'Legal',                          id: 8 },
            { name: 'Emeka Nwosu',   role: 'Operations',                     id: 9 },
            { name: 'Bola Odetola',  role: 'Customer success',               id: 10 },
          ].map((m) => (
            <TeamMember
              key={m.id}
              name={m.name}
              role={m.role}
              department={m.dept}
              linkedin="#"
              photo={`https://i.pravatar.cc/300?img=${m.id + 10}`}
            />
          ))}
        </div>
      </Stage>

      <SubHeading>Hero</SubHeading>
      <Stage flush>
        <Hero
          eyebrow="Pattern"
          headline="A headline that names the position."
          subhead="One sentence of proof — group lineage and scale."
          primary={{ label: 'Talk to sales', href: '#' }}
          secondary={{ label: 'View solutions', href: '#' }}
          visual={<DocsGlobe />}
        />
      </Stage>

      <SubHeading>Proof bar</SubHeading>
      <Stage flush>
        <ProofBar
          intro="Proof, not promises"
          metrics={[
            { value: '32 yrs', label: 'In Nigerian fintech' },
            { value: '40+',    label: 'Federal MDAs served' },
            { value: 'Tier-1', label: 'Banks integrated' },
            { value: '4',      label: 'Awards in 24 months' },
          ]}
        />
      </Stage>

      <SubHeading>Solution card</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SolutionCard icon={<Bank size={28} />} title="Banking" description="Integration patterns and payment infrastructure for tier-1 Nigerian banks." proof="Tier-1 bank deployments in production" href="#" />
          <SolutionCard icon={<Government size={28} />} title="E-Government" description="TSA-adjacent infrastructure deployed across federal MDAs since the early 2000s." proof="Federal MDA track record" href="#" />
          <SolutionCard icon={<Users size={28} />} title="Community" description="White-label wallet infrastructure for cooperatives and schemes." proof="Cooperatives across multiple states" href="#" />
          <SolutionCard icon={<Code size={28} />} title="Enterprise Software" description="Custom development with dedicated teams." proof="Multi-year enterprise engagements" href="#" />
        </div>
      </Stage>

      <SubHeading>Product card</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProductCard
            name="Pouchii"
            tag="Wallet + API"
            positioning="Digital wallet and aggregation API."
            proof="Live with integration partners"
            href="#"
            logo="/brand/group/pouchii.png"
            brandColor="#5C6BFF"
          />
          <ProductCard
            name="FundACause"
            tag="Crowdfunding"
            positioning="Crowdfunding for Nigerian causes."
            proof="Best Crowdfunding Platform 2022"
            href="#"
            logo="/brand/group/fundacause.svg"
            brandColor="#2F80ED"
          />
          <ProductCard
            name="Monicenta"
            tag="Cooperative SaaS"
            positioning="SaaS for cooperatives and contributory schemes."
            proof="Operating with multiple cooperatives"
            href="#"
            logo="/brand/group/monicenta.png"
            brandColor="#F26524"
          />
        </div>
      </Stage>

      <SubHeading>Capability strip</SubHeading>
      <Stage flush>
        <CapabilityStrip
          eyebrow="Capability"
          headline="What we build."
          body="Thirty years inside Nigerian fintech and federal e-government. We build, run, and integrate the components below."
          capabilities={[
            'Virtual accounts on CBN-licensed institutions',
            'Payment aggregation across categories',
            'Federal e-budgeting and warranting',
            'Identity, KYC, onboarding',
            'Crowdfunding and contributory rails',
            'Custom enterprise software',
          ]}
        />
      </Stage>

      <SubHeading>Group block</SubHeading>
      <Stage flush>
        <GroupBlock
          intro="Part of SystemSpecs — operating since 1992."
          parentName="SystemSpecs Holdings Limited"
          parentHref="https://systemspecs.com.ng/"
          foundedYear={1992}
          companies={[
            {
              name: 'Remita',
              description: 'Payment services. Operator of the federal Treasury Single Account rails.',
              href: 'https://remita.net/',
              logo: '/brand/group/remita.svg',
            },
            {
              name: 'HumanManager',
              description: 'HR and payroll software for African enterprises.',
              href: 'https://humanmanager.net/',
              logo: '/brand/group/humanmanager.svg',
            },
            {
              name: 'Whatadeal',
              description: 'Group event and conference vehicle.',
              href: 'https://whatadeal.events/',
              logo: '/brand/group/whatadeal.svg',
            },
          ]}
        />
      </Stage>

      <SubHeading>Leadership card</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <LeadershipCard
            name="Dr. John Obaro"
            role="Founder & CEO"
            credentials={['Founder', '30 yrs in fintech']}
            linkedin="#"
            photo="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=70"
          />
          <LeadershipCard
            name="Demola Igbalajobi"
            role="Group COO"
            credentials={['Operations']}
            linkedin="#"
            photo="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=600&h=750&q=70"
          />
          <LeadershipCard
            name="Aderonke Aderinoye"
            role="Director, Banking"
            credentials={['Banking']}
            linkedin="#"
            photo="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=70"
          />
          <LeadershipCard
            name="Ikenna Onuoha"
            role="Director, E-Government"
            credentials={['Public sector']}
            linkedin="#"
            photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=70"
          />
        </div>
      </Stage>

      <SubHeading>Insight card</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard kind="press" publication="NECA" date="2024" title="SystemSpecs Technology Solutions receives NECA Excellence Award." href="#" />
          <InsightCard kind="press" publication="TechCabal" date="2026" title="The 30-year fintech group quietly powering Nigeria's payment stack." href="#" />
          <InsightCard kind="case-study" publication="Case study" date="2025" title="Integrating Pouchii's wallet API into a tier-1 bank in 9 weeks." href="#" />
        </div>
      </Stage>

      <SubHeading>Segmented CTA</SubHeading>
      <Stage flush>
        <SegmentedCTA
          headline="Find the team that matches your buying motion."
          segments={[
            { audience: 'For banks', outcome: 'Integration patterns, security, references.', cta: 'Talk to banking', href: '#' },
            { audience: 'For federal MDAs', outcome: 'E-Government capability, TSA track record.', cta: 'Government', href: '#' },
            { audience: 'For PSPs and fintech', outcome: 'API surface, sandbox, uptime.', cta: 'Request access', href: '#' },
          ]}
        />
      </Stage>
    </>
  );
}
