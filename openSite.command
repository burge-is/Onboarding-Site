kill $(lsof -t -i:99)
cd "${0%/*}"

if ! [ -x "$(command -v npm)" ]; then
    echo 'Error: npm is not installed.' >&2
    echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
    . ~/.bashrc
    mkdir ~/local
    mkdir ~/node-latest-install
    cd ~/node-latest-install
    curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
    ./configure --prefix=~/local
    make install
    curl https://www.npmjs.org/install.sh | sh
fi

if ! [ -x "$(command -v browser-sync)" ]; then
    echo 'browser-sync is not installed' >&2
    npm install -g browser-sync
fi

export LOCAL_IP=`ipconfig getifaddr en0`

browser-sync start -s -f . --no-notify --host $LOCAL_IP --port 99