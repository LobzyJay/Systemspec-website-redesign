import os, re
BASE = '/Systemspec-website-redesign'
DOCS = '/Users/lobzy/Documents/GitHub/Systemspec website redesign/docs'


def _needs_prefix(v):
    # v is a candidate URL string. Skip if already prefixed, external,
    # protocol-relative, fragment, mailto/tel/data, or not absolute-path.
    if (v.startswith(BASE) or v.startswith('http') or v.startswith('//') or
        v.startswith('#') or v.startswith('mailto:') or v.startswith('tel:') or
        v.startswith('data:') or not v.startswith('/')):
        return False
    return True


def fix_attr(m):
    a, q, v = m.group(1), m.group(2), m.group(3)
    if not _needs_prefix(v):
        return m.group(0)
    return f'{a}={q}{BASE}{v}{q}'


def fix_json_escaped(m):
    # Matches escaped JSON strings inside RSC payloads / inline scripts.
    # Group 1 is the URL between \" ... \"
    v = m.group(1)
    if not _needs_prefix(v):
        return m.group(0)
    return f'\\"{BASE}{v}\\"'


# 1) HTML attribute hrefs/srcs/actions in raw markup.
attr_pat = re.compile(r'(href|src|action)=(["\'])(/[^"\']*?)\2')
# 2) Escaped JSON URL strings (RSC payloads, inline data blobs). Matches
#    \"/path\" — including \"/\" — stops at whitespace/quote/backslash.
json_pat = re.compile(r'\\"(/[^"\\\s]*?)\\"')

n_attr = 0
n_json = 0
for root, _, files in os.walk(DOCS):
    if '/uikit' in root:
        continue
    for f in files:
        if not f.endswith('.html'):
            continue
        p = os.path.join(root, f)
        c = open(p, 'r', errors='ignore').read()
        c, ka = attr_pat.subn(fix_attr, c)
        c, kj = json_pat.subn(fix_json_escaped, c)
        if ka or kj:
            open(p, 'w').write(c)
            n_attr += ka
            n_json += kj
print(f'Fixed {n_attr} attribute paths and {n_json} JSON-escaped paths')
