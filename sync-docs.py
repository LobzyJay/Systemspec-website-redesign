"""Mirror apps/web/out/ -> docs/ preserving docs/uikit (which is not in out/)."""
import os, shutil

ROOT = '/Users/lobzy/Documents/GitHub/Systemspec website redesign'
SRC = os.path.join(ROOT, 'apps/web/out')
DST = os.path.join(ROOT, 'docs')

# Step 1: remove everything in DST except 'uikit' (and dotfiles like .nojekyll)
PRESERVE = {'uikit', '.nojekyll'}
for entry in os.listdir(DST):
    if entry in PRESERVE:
        continue
    path = os.path.join(DST, entry)
    if os.path.isdir(path) and not os.path.islink(path):
        shutil.rmtree(path)
    else:
        os.remove(path)

# Step 2: copy SRC -> DST (skip 'uikit' if present in src, which it shouldn't be)
def _ignore(_, names):
    return [n for n in names if n == 'uikit']

for entry in os.listdir(SRC):
    if entry == 'uikit':
        continue
    s = os.path.join(SRC, entry)
    d = os.path.join(DST, entry)
    if os.path.isdir(s):
        shutil.copytree(s, d, ignore=_ignore)
    else:
        shutil.copy2(s, d)

# Step 3: ensure .nojekyll
open(os.path.join(DST, '.nojekyll'), 'a').close()
print('Synced apps/web/out -> docs (preserved docs/uikit, .nojekyll)')
