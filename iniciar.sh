#!/usr/bin/env bash
# Ejecutar desde cualquier directorio; no instala dependencias automáticamente.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
if [[ -x .venv/bin/python ]]; then
  PYTHON_BIN=.venv/bin/python
else
  PYTHON_BIN=python3
fi
if ! "$PYTHON_BIN" -c 'import jinja2, markdown, yaml' 2>/dev/null; then
  echo 'Primero instala las dependencias:' >&2
  echo '  python3 -m venv .venv' >&2
  echo '  .venv/bin/python -m pip install -r requirements.txt' >&2
  exit 1
fi
exec "$PYTHON_BIN" scripts/build.py --serve "$@"
