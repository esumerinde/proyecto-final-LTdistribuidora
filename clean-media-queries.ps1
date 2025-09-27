#!/usr/bin/env powershell

# Script para remover todas las reglas @media de los archivos CSS
Write-Host "Eliminando todas las reglas @media de los archivos CSS..." -ForegroundColor Yellow

# Obtener todos los archivos CSS
$cssFiles = Get-ChildItem -Path "c:\Users\Emiliano\Documents\Facultad 2025\Proyecto Final\LT-Electronica-v2\src" -Filter "*.css" -Recurse

foreach ($file in $cssFiles) {
    Write-Host "Procesando: $($file.Name)" -ForegroundColor Cyan
    
    $content = Get-Content $file.FullName -Raw
    
    # Patrón para encontrar @media queries completos (incluyendo bloques anidados)
    $pattern = '@media[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}'
    
    # Remover todas las @media queries
    $cleanContent = $content -replace $pattern, ''
    
    # Limpiar líneas vacías extra
    $cleanContent = $cleanContent -replace '\n\s*\n\s*\n', "`n`n"
    
    # Escribir el contenido limpio de vuelta al archivo
    Set-Content -Path $file.FullName -Value $cleanContent -Encoding UTF8
}

Write-Host "¡Limpieza completada!" -ForegroundColor Green
Write-Host "Se procesaron $($cssFiles.Count) archivos CSS" -ForegroundColor Green
