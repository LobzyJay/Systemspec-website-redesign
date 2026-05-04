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
  Nav, Footer, SectionHeader, StatPill, CapabilityBlock,
  CodeSample, Timeline,
  HeroAtmosphere, HeroAtmosphereReactive, FooterAtmosphereReactive,
} from '@systemspecs/brand-stsl/components';
import { GlobeStatic, DottedGlobe } from '@systemspecs/brand-stsl/components/Globe';
import {
  TeamMember,
  WaveBackdrop,
  WaveBackdrop2,
  WaveBackdrop3,
} from '@systemspecs/brand-stsl/components';
import { DocsGlobe } from './DocsGlobe';
import { LeadershipCard } from '@systemspecs/brand-stsl/components';
import {
  DialogDemo, CheckboxDemo, RadioDemo, SelectDemo, TooltipDemo,
  ContactFormDemo, NewsletterCTADemo, RevealReplay,
} from './_demos';

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

      <SubHeading id="sub-color">Accent</SubHeading>
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

      <SubHeading id="sub-type">Typography</SubHeading>
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

      <SubHeading id="sub-spacing">Spacing</SubHeading>
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

      <SubHeading id="sub-radius">Radius</SubHeading>
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

      <SubHeading id="sub-elevation">Elevation</SubHeading>
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

      <SubHeading id="sub-motiontokens">Motion</SubHeading>
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

      <SubHeading id="sub-wordmark">Wordmark</SubHeading>
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

      <SubHeading id="sub-dotmark">Dot mark</SubHeading>
      <Stage>
        <div className="flex items-center justify-center gap-16 py-6 flex-wrap">
          <DotMark size={120} />
          <DotMark size={64} />
          <DotMark size={32} />
        </div>
      </Stage>

      <SubHeading id="sub-icons">Icons</SubHeading>
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

      <SubHeading id="sub-button">Button</SubHeading>
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

      <SubHeading id="sub-link">Link</SubHeading>
      <Stage>
        <div className="flex flex-wrap items-center gap-10">
          <DSLink href="#">Default link</DSLink>
          <DSLink href="#" variant="subtle">Subtle</DSLink>
          <DSLink href="#" variant="standalone" trailingIcon={<ArrowRight size={16} />}>Standalone CTA</DSLink>
        </div>
      </Stage>

      <SubHeading id="sub-card">Card</SubHeading>
      <Stage>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card surface="outline"><CardTitle>Outline</CardTitle><CardBody className="mt-3">Default surface.</CardBody></Card>
          <Card surface="raised"><CardTitle>Raised</CardTitle><CardBody className="mt-3">Subtle elevation.</CardBody></Card>
          <Card surface="flat"><CardTitle>Flat</CardTitle><CardBody className="mt-3">Inside tinted sections.</CardBody></Card>
        </div>
      </Stage>

      <SubHeading id="sub-field">Field</SubHeading>
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

      <SubHeading id="sub-badge">Badge</SubHeading>
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

      <SubHeading id="sub-tabs">Tabs</SubHeading>
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

      <SubHeading id="sub-accordion">Accordion</SubHeading>
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

      <SubHeading id="sub-skeleton">Skeleton</SubHeading>
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

      <SubHeading id="sub-checkbox">Checkbox</SubHeading>
      <Stage>
        <CheckboxDemo />
      </Stage>

      <SubHeading id="sub-radio">Radio</SubHeading>
      <Stage>
        <RadioDemo />
      </Stage>

      <SubHeading id="sub-select">Select</SubHeading>
      <Stage>
        <SelectDemo />
      </Stage>

      <SubHeading id="sub-tooltip">Tooltip</SubHeading>
      <Stage>
        <TooltipDemo />
      </Stage>
      <Caption>Hover or focus a trigger to surface a 12px caption tooltip. Sides cycle top/bottom/right/left depending on viewport room.</Caption>

      <SubHeading id="sub-dialog">Dialog</SubHeading>
      <Stage>
        <DialogDemo />
      </Stage>
      <Caption>Three sizes — 480/560/720px. Single 24px radius, no nested chrome. ESC + scrim-click + circular ghost close all dismiss.</Caption>

      {/* ============================================================ */}
      {/* 04 — PATTERNS                                                 */}
      {/* ============================================================ */}
      <SectionHeading id="patterns" number="04" title="Patterns." intro="Composed assemblies of the primitives." />

      <SubHeading id="sub-globe">Globe</SubHeading>
      <Stage flush>
        <div className="mx-auto w-full max-w-md p-8">
          <DocsGlobe />
        </div>
        <Caption>Cobe-powered. Drag to rotate; auto-rotates when idle.</Caption>
      </Stage>

      <SubHeading id="sub-globe-context">Globe in context</SubHeading>
      <Caption>Same asset, four surfaces. No backdrop pattern — the globe carries the visual itself.</Caption>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-6 mb-3">Web hero · 16:9</p>
      <Stage flush>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-12 surface-frozen-dark rounded-lg">
          <div>
            <SystemSpecsWordmark height={28} tone="mono" />
            <h3 className="mt-6 font-display text-heading-1 md:text-display-md text-on-inverse-frozen text-balance">
              Africa&rsquo;s payment, government, and financial infrastructure.
            </h3>
            <p className="mt-3 text-body text-on-inverse-frozen-70 max-w-md">Coverage across Nigerian financial centers.</p>
          </div>
          <div className="mx-auto w-full max-w-xs"><DocsGlobe /></div>
        </div>
      </Stage>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-8 mb-3">Social card · 1.91:1</p>
      <Stage flush>
        <div className="relative aspect-[1200/628] grid grid-cols-[1fr_auto] items-stretch gap-0 surface-frozen-dark overflow-hidden shadow-e2">
          <div className="relative flex flex-col justify-between min-w-0 p-8 md:p-12 lg:p-14">
            <div className="flex items-center gap-3">
              <SystemSpecsWordmark height={26} tone="mono" />
              <span aria-hidden="true" className="inline-block h-3 w-px bg-white/20" />
              <span className="inline-flex items-center h-6 px-2.5 rounded-pill ring-1 ring-white/15 text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-on-inverse-frozen-80">
                Est. 1992
              </span>
            </div>
            <h3 className="font-display text-heading-1 md:text-display-md leading-[1.05] tracking-[-0.012em] text-on-inverse-frozen text-balance max-w-[28ch]">
              Africa&rsquo;s payment, government &amp; financial infrastructure.
            </h3>
            <div className="flex items-center justify-between gap-4">
              <span className="text-caption font-mono uppercase tracking-[0.18em] text-on-inverse-frozen-60">
                systemspecs.com.ng
              </span>
              <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-[0.18em] text-on-inverse-frozen-80">
                Learn more
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
          <div className="relative w-[44%] self-stretch">
            <div
              className="absolute top-1/2 -translate-y-1/2 aspect-square"
              style={{ right: '-8%', width: '108%' }}
            >
              <DocsGlobe />
            </div>
          </div>
        </div>
      </Stage>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-8 mb-3">Banner &middot; 728 &times; 90</p>
      <Stage flush width="scroll">
        <div className="py-4">
          <div
            className="group/banner relative mx-auto surface-frozen-dark grid grid-cols-[90px_1fr_auto] items-center gap-5 pr-3 shadow-e2"
            style={{ width: 728, height: 90 }}
          >
            <div className="relative h-full w-[90px] grid place-items-center bg-white/[0.03]">
              <div className="w-[74px] h-[74px]">
                <DottedGlobe variant="filled" />
              </div>
              <span aria-hidden="true" className="absolute top-3 bottom-3 right-0 w-px bg-white/15" />
            </div>
            <div className="min-w-0 flex flex-col justify-center gap-1.5">
              <SystemSpecsWordmark height={18} tone="mono" />
              <p className="text-[11px] leading-[1.3] font-mono uppercase tracking-[0.16em] text-on-inverse-frozen-65 truncate">
                Infrastructure that institutions trust
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 inline-flex items-center gap-2 h-10 pl-4 pr-1.5 rounded-pill bg-accent !text-white text-[12px] font-medium tracking-tight whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-px active:scale-[0.98]"
            >
              Learn more
              <span
                aria-hidden="true"
                className="inline-grid place-items-center h-7 w-7 rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/banner:translate-x-[2px] group-hover/banner:-translate-y-[1px]"
              >
                <ArrowUpRight size={12} />
              </span>
            </a>
          </div>
        </div>
      </Stage>
      <Caption>Fixed 728&times;90 leaderboard. Static dotted globe for crisp rendering at 90px.</Caption>

      <p className="text-overline uppercase text-fg-muted font-mono tracking-widest mt-8 mb-3">Newsletter &middot; 600 wide</p>
      <Stage flush>
        <div className="mx-auto w-full rounded-lg overflow-hidden border border-border-subtle" style={{ maxWidth: 600 }}>
          <div className="bg-[#0B0C0F] p-8 grid place-items-center">
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

      <SubHeading id="sub-bg">Background patterns</SubHeading>
      <Caption>Three motion loops. Loop 01 ships six frozen frames for static surfaces (banners, social exports, email). Loops 02 and 03 are live-only.</Caption>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Loop 01 · Diagonal sweep
          </p>
          <p className="text-caption text-fg-muted font-mono">live</p>
        </div>
        <div className="relative aspect-[16/6] overflow-hidden bg-[#0B0C0F] text-accent">
          <WaveBackdrop />
        </div>
      </Stage>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Loop 02 · Dot ripple
          </p>
          <p className="text-caption text-fg-muted font-mono">live only</p>
        </div>
        <div className="relative aspect-[16/6] overflow-hidden bg-[#0B0C0F] text-accent">
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
        <div className="relative aspect-[16/6] overflow-hidden bg-[#0B0C0F] text-accent">
          <WaveBackdrop3 />
        </div>
      </Stage>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Hero atmosphere · braille (reactive)
          </p>
          <p className="text-caption text-fg-muted font-mono">cursor-aware</p>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-canvas">
          <HeroAtmosphereReactive />
        </div>
      </Stage>
      <Caption>The atmosphere that ships on the homepage hero. Move your cursor over the surface — the braille texture pushes away from the pointer.</Caption>

      <Stage>
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-overline uppercase text-fg-muted font-mono tracking-widest">
            Footer atmosphere · Loop 1 (reactive)
          </p>
          <p className="text-caption text-fg-muted font-mono">cursor-aware</p>
        </div>
        <div className="relative aspect-[16/6] overflow-hidden bg-[#0B0C0F] text-accent rounded-2xl">
          <FooterAtmosphereReactive />
        </div>
      </Stage>
      <Caption>The reactive Loop 1 sweep used inside the marketing footer. Same canvas physics as the hero atmosphere but warped to the footer&rsquo;s espresso surface.</Caption>

      <SubHeading id="sub-team">Team grid</SubHeading>
      <Caption>Compact card for full-team grids. Use when 15+ people would make the leadership card feel disorganized.</Caption>
      <Stage>
        <div className="docs-grid-5up">
          {[
            { name: 'Demola Igbalajobi', role: 'MD, STSL',           dept: 'STSL',    photo: '/teams/demola-igbalajobi.png' },
            { name: '’Deremi Atanda',    role: 'MD, Remita',          dept: 'Remita',  photo: '/teams/deremi-atanda.jpg' },
            { name: 'Udo Ngele',         role: 'MD, HumanManager',    dept: 'HM',      photo: '/teams/udo-ngele.jpg' },
            { name: 'Fela Bank-Olemoh',  role: 'MD, WhataDeal',       dept: 'WAD',     photo: '/teams/fela-bank-olemoh.jpg' },
            { name: 'Ahabue Borha',      role: 'Operations',          dept: 'Ops',     photo: '/teams/ahabue-borha.png' },
            { name: 'Anu Oyeleye',       role: 'Engineering',         dept: 'Eng',     photo: '/teams/anu-oyeleye.png' },
            { name: 'Etereigho Ozakpo',  role: 'Compliance',          dept: 'Risk',    photo: '/teams/etereigho-ozakpo.png' },
            { name: 'Leke Ogunbanwo',    role: 'Product',             dept: 'Product', photo: '/teams/leke-ogunbanwo.png' },
            { name: 'Uche Obiofuma',     role: 'Banking',             dept: 'Banking', photo: '/teams/uche-obiofuma.png' },
            { name: 'Kehinde Lawanson',  role: 'Director (Board)',    dept: 'Board',   photo: '/teams/kehinde-lawanson.jpg' },
          ].map((m) => (
            <TeamMember
              key={m.name}
              name={m.name}
              role={m.role}
              department={m.dept}
              linkedin="#"
              photo={m.photo}
            />
          ))}
        </div>
      </Stage>

      <SubHeading id="sub-hero">Hero</SubHeading>
      <Stage flush>
        <div className="[&>section]:!min-h-0 [&>section]:!justify-center [&_section>div]:!py-10 md:[&_section>div]:!py-14">
          <Hero
            headline="A headline that names the position."
            subhead="One sentence of proof — group lineage and scale."
            primary={{ label: 'Talk to sales', href: '#' }}
            secondary={{ label: 'View solutions', href: '#' }}
            visual={<DocsGlobe />}
          />
        </div>
      </Stage>

      <SubHeading id="sub-proof">Proof bar</SubHeading>
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

      <SubHeading id="sub-solution">Solution card</SubHeading>
      <Stage>
        <div className="docs-grid-2up">
          <SolutionCard icon={<Bank size={28} />} title="Banking" description="Integration patterns and payment infrastructure for tier-1 Nigerian banks." proof="Tier-1 bank deployments in production" href="#" />
          <SolutionCard icon={<Government size={28} />} title="E-Government" description="TSA-adjacent infrastructure deployed across federal MDAs since the early 2000s." proof="Federal MDA track record" href="#" />
          <SolutionCard icon={<Users size={28} />} title="Community" description="White-label wallet infrastructure for cooperatives and schemes." proof="Cooperatives across multiple states" href="#" />
          <SolutionCard icon={<Code size={28} />} title="Enterprise Software" description="Custom development with dedicated teams." proof="Multi-year enterprise engagements" href="#" />
        </div>
      </Stage>

      <SubHeading id="sub-product">Product card</SubHeading>
      <Stage>
        <div className="docs-grid-3up">
          <ProductCard
            name="Pouchii"
            positioning="Digital wallet and aggregation API."
            proof="Live with integration partners"
            href="#"
            logoColor="/products/pouchii-color.png"
            logoBw="/products/pouchii-bw.png"
          />
          <ProductCard
            name="FundACause"
            positioning="Crowdfunding for Nigerian causes."
            proof="Best Crowdfunding Platform 2022"
            href="#"
            logoColor="/products/fundacause-color.png"
            logoBw="/products/fundacause-bw.png"
          />
          <ProductCard
            name="Monicenta"
            positioning="SaaS for cooperatives and contributory schemes."
            proof="Operating with multiple cooperatives"
            href="#"
            logoColor="/products/monicenta-color.png"
            logoBw="/products/monicenta-bw.png"
          />
        </div>
      </Stage>

      <SubHeading id="sub-capstrip">Capability strip</SubHeading>
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

      <SubHeading id="sub-group">Group block</SubHeading>
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

      <SubHeading id="sub-leadership">Leadership card</SubHeading>
      <Stage>
        <div className="docs-grid-4up">
          <LeadershipCard
            name="Dr. Ernest Ndukwe, OFR"
            role="Chairman, Board of Directors"
            credentials={['OFR', 'Telecoms policy']}
            linkedin="#"
            photo="/teams/ernest-ndukwe.jpg"
          />
          <LeadershipCard
            name="Dr. John Obaro"
            role="Founder & Group MD"
            credentials={['Founder', '30+ yrs in fintech']}
            linkedin="#"
            photo="/teams/john-obaro.jpg"
          />
          <LeadershipCard
            name="Demola Igbalajobi"
            role="MD, STSL"
            credentials={['Chartered accountant', 'IBM-trained PM']}
            linkedin="#"
            photo="/teams/demola-igbalajobi.png"
          />
          <LeadershipCard
            name="’Deremi Atanda"
            role="MD, Remita Payment Services"
            credentials={['25+ yrs digital finance']}
            linkedin="#"
            photo="/teams/deremi-atanda.jpg"
          />
        </div>
      </Stage>

      <SubHeading id="sub-insight">Insight card</SubHeading>
      <Stage>
        <div className="docs-grid-3up">
          <InsightCard kind="press" publication="NECA" date="2024" title="SystemSpecs Technology Solutions receives NECA Excellence Award." href="#" />
          <InsightCard kind="press" publication="TechCabal" date="2026" title="The 30-year fintech group quietly powering Nigeria's payment stack." href="#" />
          <InsightCard kind="case-study" publication="Case study" date="2025" title="Integrating Pouchii's wallet API into a tier-1 bank in 9 weeks." href="#" />
        </div>
      </Stage>

      <SubHeading id="sub-segmented">Segmented CTA</SubHeading>
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

      <SubHeading id="sub-sectionheader">Section header</SubHeading>
      <Stage flush>
        <div className="pt-10 md:pt-14 pb-2">
          <SectionHeader
            eyebrow="What we build"
            headline="Capability across rails, identity, and public sector."
            intro="Thirty years inside Nigerian fintech and federal e-government. The patterns below are how subsequent sections of every marketing page introduce themselves."
            link={{ label: 'See all capabilities', href: '#' }}
          />
        </div>
      </Stage>

      <SubHeading id="sub-statpill">Stat pill</SubHeading>
      <Stage>
        <div className="flex flex-wrap items-center gap-6">
          <StatPill
            label="Tier-1 banks"
            value="14"
            avatars={[
              { src: 'https://i.pravatar.cc/64?img=11' },
              { src: 'https://i.pravatar.cc/64?img=12' },
              { src: 'https://i.pravatar.cc/64?img=13' },
            ]}
          />
          <StatPill
            label="Federal MDAs"
            value="40+"
            avatars={[
              { initial: 'F' }, { initial: 'I' }, { initial: 'R' },
            ]}
          />
          <StatPill label="Years live" value="32" className="pl-5" />
        </div>
      </Stage>

      <SubHeading id="sub-capblock">Capability block</SubHeading>
      <Stage>
        <div className="docs-grid-2up">
          <CapabilityBlock
            icon={<Network size={28} />}
            title="Real-time payment rails"
            description="Direct integration with CBN-licensed switches and tier-1 commercial banks."
            bullets={[
              'NIP, NEFT, and instant transfer rails',
              'Virtual account orchestration',
              'mTLS over HTTPS, signed requests',
            ]}
            surface
          />
          <CapabilityBlock
            icon={<Shield size={28} />}
            title="Identity &amp; KYC"
            description="Layered identity orchestration over BVN, NIN, and documentary KYC."
            bullets={[
              'BVN + NIN verification',
              'Liveness + selfie match',
              'Sanctions and PEP screening',
            ]}
            surface
          />
        </div>
      </Stage>

      <SubHeading id="sub-code">Code sample</SubHeading>
      <Stage>
        <CodeSample
          language="ts"
          filename="virtual-accounts.ts"
          caption="Issue a CBN-aligned virtual account against a customer record."
          code={`import { client } from '@systemspecs/payments';

const account = await client.virtualAccounts.create({
  customerId: 'cus_01HX9YZ',
  bankCode: '011',
  // Optional metadata flows through to settlement reports.
  metadata: { reference: 'INV-2026-04-22' },
});

console.log(account.accountNumber); // → 9100000123`}
        />
      </Stage>

      <SubHeading id="sub-timeline">Timeline</SubHeading>
      <Stage>
        <Timeline
          items={[
            { year: '1992', title: 'SystemSpecs founded.', description: 'Nigerian software house built around enterprise payroll.', tag: 'Origin' },
            { year: '2003', title: 'Remita launches.', description: 'Payment platform that would later carry the federal Treasury Single Account.', tag: 'Payments' },
            { year: '2012', title: 'TSA appointment.', description: 'Selected as the federal Treasury Single Account collection rail.', tag: 'TSA' },
            { year: '2022', title: 'Group restructure.', description: 'Holding company formed; Technology Solutions Limited carved out as the build arm.', tag: 'Restructure' },
            { year: 'Today', title: 'Three subsidiaries, one platform.', description: 'STSL builds. Remita runs. HumanManager and Whatadeal sit alongside as group ventures.' },
          ]}
        />
      </Stage>

      <SubHeading id="sub-newsletter">Newsletter CTA</SubHeading>
      <Stage flush>
        <div className="px-6 py-12 md:px-12 md:py-16">
          <NewsletterCTADemo />
        </div>
      </Stage>
      <Caption>Form lives borderless on the canvas. Inline validation; success state replaces the form with a confirming caption.</Caption>

      <SubHeading id="sub-contact">Contact form</SubHeading>
      <Stage>
        <ContactFormDemo />
      </Stage>
      <Caption>Audience-aware: extras shift per route (banking, government, fintech, community, enterprise, partners, press, careers). Submit is a stub here — the success state appears after a 600ms delay.</Caption>

      <SubHeading id="sub-nav">Marketing nav</SubHeading>
      <Stage flush>
        <div className="relative bg-bg-canvas">
          <Nav
            primaryLinks={[
              { label: 'Solutions', href: '#nav-solutions' },
              { label: 'Products', href: '#nav-products' },
              { label: 'Developers', href: '#nav-developers' },
              { label: 'Company', href: '#nav-company' },
            ]}
            salesHref="#nav-sales"
            governmentHref="#nav-government"
            brand={{
              mark: <SystemSpecsWordmark height={28} />,
              href: '#',
              label: 'SystemSpecs Technology Solutions',
            }}
          />
          {/* spacer so the sticky header has visual room inside the stage */}
          <div className="h-24" />
        </div>
      </Stage>
      <Caption>Live nav with the morphing hamburger, scroll-frost (tries to mount above 80px scroll), and pill-button right-rail.</Caption>

      <SubHeading id="sub-footer">Marketing footer</SubHeading>
      <Stage flush>
        <div className="p-3 md:p-5">
          <Footer
            columns={[
              {
                title: 'Solutions',
                links: [
                  { label: 'Banking', href: '#fdemo-banking' },
                  { label: 'E-Government', href: '#fdemo-egov' },
                  { label: 'Community', href: '#fdemo-community' },
                  { label: 'Enterprise Software', href: '#fdemo-enterprise' },
                ],
              },
              {
                title: 'Products',
                links: [
                  { label: 'Pouchii', href: '#fdemo-pouchii' },
                  { label: 'FundACause', href: '#fdemo-fundacause' },
                  { label: 'Monicenta', href: '#fdemo-monicenta' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '#fdemo-about' },
                  { label: 'Teams', href: '#fdemo-teams' },
                  { label: 'Group', href: '#fdemo-group' },
                  { label: 'Press', href: '#fdemo-press' },
                  { label: 'Careers', href: '#fdemo-careers' },
                ],
              },
            ]}
            groupCompanies={[
              { label: 'Remita', href: '#fdemo-remita' },
              { label: 'HumanManager', href: '#fdemo-hm' },
              { label: 'WhataDeal', href: '#fdemo-wad' },
            ]}
            contact={{ email: 'hello@stsl.ng', phone: '+234 (0)1 271 0511' }}
            legalLinks={[
              { label: 'Privacy', href: '#fdemo-privacy' },
              { label: 'Terms', href: '#fdemo-terms' },
            ]}
            socialLinks={[
              { kind: 'linkedin', href: '#fdemo-linkedin' },
              { kind: 'twitter', href: '#fdemo-twitter' },
            ]}
          />
        </div>
      </Stage>
      <Caption>Squircle dark surface with the reactive Loop 1 atmosphere. Move your cursor inside the footer to push the sweep.</Caption>

      {/* ============================================================ */}
      {/* 05 — MOTION & INTERACTIONS                                   */}
      {/* ============================================================ */}
      <SectionHeading id="motion" number="05" title="Motion &amp; interactions." intro="Live animation surfaces — atmospheres, reveals, hover micro-motions." />

      <SubHeading id="sub-reactive">Hero with reactive atmosphere</SubHeading>
      <Stage flush>
        <div className="relative [&>section]:!min-h-0 [&>section]:!justify-center [&_section>div]:!py-10 md:[&_section>div]:!py-14">
          <Hero
            headline="Cursor-aware atmosphere over the hero canvas."
            subhead="Move the cursor across the hero. The braille texture pushes away from the pointer and the sweep tilts — same physics that ships on the live homepage."
            primary={{ label: 'Talk to sales', href: '#' }}
            secondary={{ label: 'Explore solutions', href: '#' }}
            atmosphereReactive
          />
        </div>
      </Stage>
      <Caption>The default <code className="font-mono text-fg-primary">Hero</code> ships with <code className="font-mono text-fg-primary">atmosphere</code> on; <code className="font-mono text-fg-primary">atmosphereReactive</code> wires the canvas to the cursor. Pages with a globe leave reactivity off (the visual already responds).</Caption>

      <SubHeading id="sub-reveal">Reveal system</SubHeading>
      <Stage>
        <div className="docs-grid-3up">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              data-reveal-card
              style={{ ['--stagger' as string]: n }}
              className="rounded-2xl ring-1 ring-[color:var(--border-subtle)] bg-bg-surface p-6"
            >
              <p className="text-overline uppercase font-mono tracking-widest text-accent">Card {n}</p>
              <p className="mt-3 font-display text-heading-3 text-fg-primary">Cascading entry.</p>
              <p className="mt-2 text-body-sm text-fg-secondary">
                Each card carries a <code className="font-mono">--stagger</code> index — IntersectionObserver flips
                <code className="font-mono">data-revealed</code> and the CSS transition fires with a 60ms-per-card delay.
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <RevealReplay />
        </div>
      </Stage>
      <Caption>Replay the reveals on this whole page without reloading. Useful for previewing entry choreography.</Caption>

      <SubHeading id="sub-hover">Hover micro-motions</SubHeading>
      <Stage>
        <div className="docs-grid-3up">
          <button className="group/h relative overflow-hidden rounded-2xl ring-1 ring-[color:var(--border-subtle)] bg-bg-surface p-6 text-left transition-transform duration-base ease-expressive hover:-translate-y-0.5">
            <p className="text-overline uppercase font-mono tracking-widest text-accent">Lift</p>
            <p className="mt-3 font-display text-heading-3 text-fg-primary">Hover lifts 2px.</p>
            <p className="mt-2 text-body-sm text-fg-secondary">Used on solution / product cards.</p>
          </button>
          <button className="group/h relative overflow-hidden rounded-2xl ring-1 ring-[color:var(--border-subtle)] bg-bg-surface p-6 text-left transition-colors duration-base ease-expressive hover:bg-bg-surface-raised">
            <p className="text-overline uppercase font-mono tracking-widest text-accent">Surface swap</p>
            <p className="mt-3 font-display text-heading-3 text-fg-primary">Hover tints surface.</p>
            <p className="mt-2 text-body-sm text-fg-secondary">Used on insight / press cards.</p>
          </button>
          <button className="group/h relative overflow-hidden rounded-2xl ring-1 ring-[color:var(--border-subtle)] bg-bg-surface p-6 text-left">
            <p className="text-overline uppercase font-mono tracking-widest text-accent">Underline draw</p>
            <p className="mt-3 font-display text-heading-3 text-fg-primary">
              <span className="stsl-underline-draw">Hover here</span>
            </p>
            <p className="mt-2 text-body-sm text-fg-secondary">Used on footer + nav links.</p>
          </button>
        </div>
      </Stage>

      {/* ============================================================ */}
      {/* 06 — PAGE COMPOSITIONS                                        */}
      {/* ============================================================ */}
      <SectionHeading id="compositions" number="06" title="Page compositions." intro="How the components assemble into the routes that ship — abbreviated previews." />

      <SubHeading id="sub-developers">Developers strip</SubHeading>
      <Stage flush>
        <div className="px-6 py-10 md:px-12 md:py-16 space-y-8">
          <SectionHeader
            eyebrow="Developers"
            headline="The API surface, in two minutes."
            intro="Issue a virtual account, watch a webhook, reconcile against a settlement file."
            link={{ label: 'Open the docs', href: '#' }}
          />
          <CodeSample
            language="bash"
            filename="terminal"
            code={`curl -X POST https://api.stsl.ng/v1/accounts \\
  -H "Authorization: Bearer $STSL_KEY" \\
  -d '{"customerId":"cus_01HX9YZ","bankCode":"011"}'`}
          />
        </div>
      </Stage>

      <SubHeading id="sub-contactstrip">Contact strip</SubHeading>
      <Stage flush>
        <div className="px-6 py-10 md:px-12 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-overline uppercase text-accent mb-4 font-mono tracking-widest">Contact</p>
              <h3 className="font-display text-display-md text-fg-primary text-balance leading-[1.05] tracking-[-0.018em]">
                Talk to the banking team.
              </h3>
              <p className="mt-4 text-body-lg text-fg-secondary max-w-md">
                Tier-1 references, integration patterns, and procurement docs available after a short qualification.
              </p>
            </div>
            <div className="border-t border-[color:var(--border-subtle)] pt-6 flex flex-col gap-3">
              <a
                href="mailto:hello@stsl.ng"
                className="group/c inline-flex items-center gap-3 text-body text-fg-primary self-start"
              >
                <span className="inline-grid place-items-center h-9 w-9 rounded-full ring-1 ring-[color:var(--border-subtle)] bg-bg-surface-raised text-fg-secondary transition-colors duration-base ease-expressive group-hover/c:ring-accent group-hover/c:text-accent">
                  <Mail size={14} />
                </span>
                <span className="stsl-underline-draw">hello@stsl.ng</span>
              </a>
              <a
                href="tel:+23412710511"
                className="group/c inline-flex items-center gap-3 text-body text-fg-primary self-start"
              >
                <span className="inline-grid place-items-center h-9 w-9 rounded-full ring-1 ring-[color:var(--border-subtle)] bg-bg-surface-raised text-fg-secondary transition-colors duration-base ease-expressive group-hover/c:ring-accent group-hover/c:text-accent">
                  <Phone size={14} />
                </span>
                <span className="stsl-underline-draw">+234 (0)1 271 0511</span>
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <ContactFormDemo />
          </div>
        </div>
      </Stage>

    </>
  );
}
