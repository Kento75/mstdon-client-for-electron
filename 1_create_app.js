// アプリをサーバーへ登録する処理
const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')

const instanceUri = 'https://pawoo.net'
const clientName = 'MasdonCli'
const savefile = path.join(__dirname, 'cli-app.json')

// webAPI呼び出し
Mastodon.createOAuthApp(instanceUri + '/api/v1/apps', clientName)
  .catch(err => console.error(err))
  .then(res => {
    console.log(res)
    fs.writeFileSync(savefile, JSON.stringify(res))
  })
