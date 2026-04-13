& 'C:\Users\Admin\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe' `
  -y `
  -i 'F:\backtest\portfolio\public\dapp revamp.mp4' `
  -vf "scale='min(1280,iw)':-2" `
  -c:v libx264 `
  -preset medium `
  -crf 30 `
  -c:a aac `
  -b:a 128k `
  'F:\backtest\portfolio\public\dapp revamp-small.mp4'
