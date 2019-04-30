kill $(lsof -t -i:99)
cd "${0%/*}"
npm install -g browser-sync
export LOCAL_IP=`ipconfig getifaddr en0`
browser-sync start -s -f . --no-notify --host $LOCAL_IP --port 99