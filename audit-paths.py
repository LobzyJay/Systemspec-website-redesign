import os, re
DOCS = '/Users/lobzy/Documents/GitHub/Systemspec website redesign/docs'
BASE = '/Systemspec-website-redesign'
p_attr = re.compile(r'''(href|src|action)=(["'])(/[^"']*)\2''')
p_json = re.compile(r'\\"(/[a-zA-Z][a-zA-Z0-9/_?=&\-\.]*?)\\"')
issues = {}
for root, _, files in os.walk(DOCS):
    if '/uikit' in root:
        continue
    for f in files:
        if not f.endswith('.html'):
            continue
        p = os.path.join(root, f)
        c = open(p, errors='ignore').read()
        rel = os.path.relpath(p, DOCS)
        for m in p_attr.finditer(c):
            v = m.group(3)
            if v.startswith(BASE) or v.startswith('//'):
                continue
            issues.setdefault(('attr_' + m.group(1), v), set()).add(rel)
        for m in p_json.finditer(c):
            v = m.group(1)
            if v.startswith(BASE) or v.startswith('//') or v.startswith('/_next'):
                continue
            issues.setdefault(('json', v), set()).add(rel)
for key, files in sorted(issues.items())[:80]:
    print(key, '->', len(files), 'files (e.g.', next(iter(files)) + ')')
if not issues:
    print('NO ISSUES')
