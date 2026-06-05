# Script to create missing project subdirectories
$baseDir = "d:\Clone website"

$dirs = @(
    # features/users
    "src/features/users/frontend",
    "src/features/users/backend",
    "src/features/users/api",
    "src/features/users/services",
    "src/features/users/schemas",
    "src/features/users/models",
    "src/features/users/hooks",
    "src/features/users/components",
    "src/features/users/tests",

    # features/geolocation
    "src/features/geolocation/frontend",
    "src/features/geolocation/backend",
    "src/features/geolocation/api",
    "src/features/geolocation/services",
    "src/features/geolocation/schemas",
    "src/features/geolocation/models",
    "src/features/geolocation/hooks",
    "src/features/geolocation/components",
    "src/features/geolocation/tests",

    # features/dashboard
    "src/features/dashboard/frontend",
    "src/features/dashboard/backend",
    "src/features/dashboard/api",
    "src/features/dashboard/services",
    "src/features/dashboard/schemas",
    "src/features/dashboard/models",
    "src/features/dashboard/hooks",
    "src/features/dashboard/components",
    "src/features/dashboard/tests",

    # features/attendance
    "src/features/attendance/frontend",
    "src/features/attendance/backend",
    "src/features/attendance/api",
    "src/features/attendance/services",
    "src/features/attendance/schemas",
    "src/features/attendance/models",
    "src/features/attendance/hooks",
    "src/features/attendance/components",
    "src/features/attendance/tests",

    # features/notifications
    "src/features/notifications/frontend",
    "src/features/notifications/backend",
    "src/features/notifications/api",
    "src/features/notifications/services",
    "src/features/notifications/schemas",
    "src/features/notifications/models",
    "src/features/notifications/hooks",
    "src/features/notifications/components",
    "src/features/notifications/tests",

    # features/analytics
    "src/features/analytics/frontend",
    "src/features/analytics/backend",
    "src/features/analytics/api",
    "src/features/analytics/services",
    "src/features/analytics/schemas",
    "src/features/analytics/models",
    "src/features/analytics/hooks",
    "src/features/analytics/components",
    "src/features/analytics/tests",

    # features/reports
    "src/features/reports/frontend",
    "src/features/reports/backend",
    "src/features/reports/api",
    "src/features/reports/services",
    "src/features/reports/schemas",
    "src/features/reports/models",
    "src/features/reports/hooks",
    "src/features/reports/components",
    "src/features/reports/tests"
)

$created = 0
$skipped = 0

foreach ($dir in $dirs) {
    $fullPath = Join-Path $baseDir $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        New-Item -ItemType File -Path (Join-Path $fullPath ".gitkeep") -Force | Out-Null
        Write-Host "[CREATED] $dir" -ForegroundColor Green
        $created++
    } else {
        $gitkeep = Join-Path $fullPath ".gitkeep"
        if (-not (Test-Path $gitkeep)) {
            $children = Get-ChildItem -Path $fullPath -Force
            if ($children.Count -eq 0) {
                New-Item -ItemType File -Path $gitkeep -Force | Out-Null
                Write-Host "[GITKEEP] $dir" -ForegroundColor Yellow
                $created++
            } else {
                Write-Host "[EXISTS ] $dir (has content)" -ForegroundColor Cyan
                $skipped++
            }
        } else {
            Write-Host "[EXISTS ] $dir" -ForegroundColor DarkGray
            $skipped++
        }
    }
}

Write-Host ""
Write-Host "Done! Created: $created | Skipped: $skipped" -ForegroundColor White
