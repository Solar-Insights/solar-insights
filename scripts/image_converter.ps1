# Execute from repo source with:
# .\scripts\image_converter.ps1

# Define input directories
$src = ".\src\assets\images\"
$public = ".\public\images\"

# Get all PNG files in the input directory
$imageFiles = Get-ChildItem -Path $src, $public -Include "*.jpg", "*.png" -Recurse

# Iterate over each PNG file and convert it to WEBP
foreach ($oldImage in $imageFiles) {
    $imageName = [System.IO.Path]::GetFileNameWithoutExtension($oldImage)
    $pathToParentDir = Split-Path -Parent $oldImage

    $newImage = Join-Path -Path $pathToParentDir -ChildPath "$imageName.webp"

    magick $oldImage $newImage

    Remove-Item $oldImage
}

Write-Host "Conversion completed!"

# Resize image - https://imagemagick.org/script/command-line-processing.php
# magick solar_map_pc.webp -resize 1000x600 solar_map_pc.webp