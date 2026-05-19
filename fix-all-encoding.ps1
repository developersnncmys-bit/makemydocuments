$enc = New-Object System.Text.UTF8Encoding $false

# Get ALL .jsx files in views (service pages + visa pages + forms)
$files = Get-ChildItem "e:\MMD\src\views" -Filter "*.jsx" | Select-Object -ExpandProperty FullName

# ── "FROM" patterns built via code points (avoids PowerShell smart-quote parse issues) ──

# Text chars
$endash_f  = [char]0x00E2 + [char]0x20AC + [char]0x201C  # â€" → – (en dash E2 80 93)
$emdash_f  = [char]0x00E2 + [char]0x20AC + [char]0x201D  # â€" → — (em dash E2 80 94)
$rupee_f   = [char]0x00E2 + [char]0x201A + [char]0x00B9  # â‚¹ → ₹ (E2 82 B9)
$star_f    = [char]0x00E2 + [char]0x02DC + [char]0x2026  # â˜… → ★ (E2 98 85)
$arrow_f   = [char]0x00E2 + [char]0x2020 + [char]0x2019  # â†' → → (E2 86 92)
$minus_f   = [char]0x00E2 + [char]0x02C6 + [char]0x2019  # âˆ' → − (E2 88 92)
$middot_f  = [char]0x00C2 + [char]0x00B7                 # Â·  → · (C2 B7)

# Emoji icons (garbled via Latin-1/Windows-1252)
$stop_f    = [char]0x00E2 + [char]0x008F + [char]0x00B1  # ⏱ (E2 8F B1)
$plane_f   = [char]0x00E2 + [char]0x0153 + [char]0x02C6  # ✈ (E2 9C 88)
$vs16_f    = [char]0x00EF + [char]0x00B8 + [char]0x008F  # ️ variation selector (EF B8 8F)

# Flag emoji garbled forms (F0 9F 87 XX pattern)
function GRI($letter) {
    [char]0x00F0 + [char]0x0178 + [char]0x2021 + [char](0x00A6 + [int][char]$letter - 65)
}
function GFlag($c1, $c2) { (GRI $c1) + (GRI $c2) }

# ── "TO" correct values ──
$endash_t  = [char]::ConvertFromUtf32(0x2013)  # –
$emdash_t  = [char]::ConvertFromUtf32(0x2014)  # —
$rupee_t   = [char]::ConvertFromUtf32(0x20B9)  # ₹
$star_t    = [char]::ConvertFromUtf32(0x2605)  # ★
$arrow_t   = [char]::ConvertFromUtf32(0x2192)  # →
$minus_t   = [char]::ConvertFromUtf32(0x2212)  # −
$middot_t  = [char]::ConvertFromUtf32(0x00B7)  # ·
$stop_t    = [char]::ConvertFromUtf32(0x23F1)  # ⏱
$plane_t   = [char]::ConvertFromUtf32(0x2708)  # ✈
$vs16_t    = [char]::ConvertFromUtf32(0xFE0F)  # ️

function Flag($a, $b) {
    [char]::ConvertFromUtf32(0x1F1E6 + [int][char]$a - 65) +
    [char]::ConvertFromUtf32(0x1F1E6 + [int][char]$b - 65)
}

$total = 0
foreach ($p in $files) {
    $c = [System.IO.File]::ReadAllText($p, $enc)
    $orig = $c

    # Text chars
    $c = $c.Replace($endash_f, $endash_t)
    $c = $c.Replace($emdash_f, $emdash_t)
    $c = $c.Replace($rupee_f,  $rupee_t)
    $c = $c.Replace($star_f,   $star_t)
    $c = $c.Replace($arrow_f,  $arrow_t)
    $c = $c.Replace($minus_f,  $minus_t)
    $c = $c.Replace($middot_f, $middot_t)

    # Emoji icons
    $c = $c.Replace($stop_f,  $stop_t)
    $c = $c.Replace($plane_f, $plane_t)
    $c = $c.Replace($vs16_f,  $vs16_t)

    # Flag emojis
    $c = $c.Replace((GFlag 'A' 'E'), (Flag 'A' 'E'))
    $c = $c.Replace((GFlag 'S' 'G'), (Flag 'S' 'G'))
    $c = $c.Replace((GFlag 'G' 'B'), (Flag 'G' 'B'))
    $c = $c.Replace((GFlag 'A' 'U'), (Flag 'A' 'U'))
    $c = $c.Replace((GFlag 'M' 'Y'), (Flag 'M' 'Y'))
    $c = $c.Replace((GFlag 'E' 'G'), (Flag 'E' 'G'))
    $c = $c.Replace((GFlag 'V' 'N'), (Flag 'V' 'N'))
    $c = $c.Replace((GFlag 'H' 'K'), (Flag 'H' 'K'))
    $c = $c.Replace((GFlag 'I' 'D'), (Flag 'I' 'D'))
    $c = $c.Replace((GFlag 'A' 'Z'), (Flag 'A' 'Z'))
    $c = $c.Replace((GFlag 'O' 'M'), (Flag 'O' 'M'))
    $c = $c.Replace((GFlag 'M' 'A'), (Flag 'M' 'A'))
    $c = $c.Replace((GFlag 'B' 'H'), (Flag 'B' 'H'))
    $c = $c.Replace((GFlag 'Q' 'A'), (Flag 'Q' 'A'))
    $c = $c.Replace((GFlag 'R' 'U'), (Flag 'R' 'U'))
    $c = $c.Replace((GFlag 'U' 'Z'), (Flag 'U' 'Z'))

    if ($c -ne $orig) {
        [System.IO.File]::WriteAllText($p, $c, $enc)
        Write-Host "Fixed: $(Split-Path $p -Leaf)"
        $total++
    }
}
Write-Host "`nDone — $total file(s) updated."
