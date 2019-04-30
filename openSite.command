kill $(lsof -t -i:99)
cd "${0%/*}"

export NPM_ROOT=`npm root -g`
export NPM_BIN=`echo $NPM_ROOT | sed 's/lib\/node_modules/bin/g'`
echo $NPM_BIN/browser-sync

if ! [ -x "$(command -v browser-sync)" ]; then
    echo 'browser-sync is not installed' >&2
    npm install -g browser-sync
fi

export LOCAL_IP=`ipconfig getifaddr en0`

"$NPM_BIN"/browser-sync start -s -f . --no-notify --host $LOCAL_IP --port 99