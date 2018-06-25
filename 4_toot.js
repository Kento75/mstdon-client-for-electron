const Mastdon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const instanceUri = 'https://pawoo.net'

// ファイルから情報を読み込む
const token = fs.readFileSync(path.join(__dirname, 'token.json'))

// マストドンのAPIクライアント作成
const Mstdn_obj = new Mastdon({
  access_token: token,
  timeout_ms: 60 * 1000,
  api_url: instanceUri + '/api/v1/'
})

// 発信(Toot)
Mstdn_obj.post('statuses', {status: 'TEST TEST TEST by cli'},
  (err, data, res) => {
    if(err) {
      console.log(err)
      return
    }
    console.log(res)
  })