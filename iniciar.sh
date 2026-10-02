#!/usr/bin/env bash
# Script para iniciar el servidor local de EduRobótica Docente

PORT=3000
echo "=========================================================="
echo "🤖 Iniciando EduRobótica Docente en http://localhost:$PORT"
echo "=========================================================="
echo "Presiona Ctrl + C para detener el servidor en cualquier momento."
echo ""

# Intenta abrir el navegador automáticamente si está disponible
if command -v xdg-open > /dev/null; then
  (sleep 1 && xdg-open "http://localhost:$PORT") &
elif command -v open > /dev/null; then
  (sleep 1 && open "http://localhost:$PORT") &
fi

python3 -m http.server $PORT
