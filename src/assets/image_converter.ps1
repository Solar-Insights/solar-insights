# Define input directory
$inputDirectory = ".\*.png"

# Get all PNG files in the input directory
$pngFiles = Get-ChildItem -Path $inputDirectory -Recurse

# Iterate over each PNG file and convert it to WEBP
foreach ($pngFile in $pngFiles) {
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($pngFile)
    $fullFilePath = [System.IO.Path]::GetFullPath($pngFile)

    $newParentPath = Split-Path -Parent $fullFilePath
    $webpFile = Join-Path -Path $newParentPath -ChildPath "$fileName.webp"

    magick "$($pngFile.FullName)" "$webpFile"

    Remove-Item $pngFile
}

Write-Host "Conversion completed!"

# Resize image - https://imagemagick.org/script/command-line-processing.php
# magick solar_map_pc.webp -resize 1000x600 solar_map_pc.webp