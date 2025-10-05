param(
    [string]$PiIP
)

$PiUser = "owim2"
$KeyPath = "$env:USERPROFILE\sshkey"

if (-not $PiIP) {
    $PiIP = Read-Host "IP van je Raspberry Pi"
}

if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

npx electron-builder --linux --arm64 --dir
if ($LASTEXITCODE -ne 0) { exit 1 }

ssh -i $KeyPath "$PiUser@$PiIP" "rm -rf ~/myapp"
scp -i $KeyPath -r dist/linux-arm64-unpacked "$PiUser@${PiIP}:/home/$PiUser/myapp"
ssh -i $KeyPath "$PiUser@$PiIP" "chmod +x ~/myapp/muondashboard"
ssh -i $KeyPath "$PiUser@$PiIP" "if [ ! -f ~/myapp/icon.png ]; then mkdir -p ~/myapp; convert -size 128x128 xc:blue ~/myapp/icon.png; fi"

$DesktopFile = @"
[Desktop Entry]
Version=1.0
Type=Application
Name=MuonDashboard
Comment=Mijn Electron App
Exec=/home/owim2/myapp/muondashboard --no-sandbox
Icon=/home/owim2/myapp/icon.png
Terminal=false
Categories=Utility;
StartupNotify=true
"@

$TempDesktop = "$env:TEMP\muondashboard.desktop"
$DesktopFile | Out-File -FilePath $TempDesktop -Encoding ascii


ssh -i $KeyPath "$PiUser@$PiIP" "rm -rf ~
/.local/share/applications/muondashboard.desktop"
scp -i $KeyPath $TempDesktop "$PiUser@${PiIP}:~/.local/share/applications/muondashboard.desktop"
ssh -i $KeyPath "$PiUser@$PiIP" "chmod +x ~/.local/share/applications/muondashboard.desktop; update-desktop-database ~/.local/share/applications"
ssh -i $KeyPath "$PiUser@$PiIP" "cp ~/.local/share/applications/muondashboard.desktop ~/Desktop/; chmod +x ~/Desktop/muondashboard.desktop"


Write-Host "The deploy is bloody finished mate!"