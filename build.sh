#!/bin/sh
# Assemble les sources de src/ en une seule page :
#   docs/index.html : page autonome, servie par GitHub Pages
#   artifact.html   : corps de page pour l'artifact Claude (sans doctype, ignoré par Git)
cd "$(dirname "$0")"
mkdir -p docs
{
  cat src/head.html
  echo "<style>"; cat src/app.css src/demos-anim.css src/demos-comp.css src/demos-more.css src/demos-video.css; echo "</style>"
  cat src/body.html
  echo "<script>"; cat src/data-anim.js src/data-comp.js src/data-more.js src/data-video.js src/app.js; echo "</script>"
} > artifact.html
{
  echo '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  sed -n '1,/<\/style>/p' artifact.html
  echo '</head><body>'
  sed '1,/<\/style>/d' artifact.html
  echo '</body></html>'
} > docs/index.html
