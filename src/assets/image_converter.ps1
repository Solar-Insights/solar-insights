# Execute from repo source with:
# .\src\assets\image_converter.ps1

# Define input directory
$inputDirectory = ".\src\assets\images\"

# Get all PNG files in the input directory
$imageFiles = Get-ChildItem -Path $inputDirectory -Include "*.jpg", "*.png" -Recurse

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