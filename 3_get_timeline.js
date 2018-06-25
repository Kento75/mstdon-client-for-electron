const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const instanceUri = 'https://pawoo.net'

// ファイルから情報を読み込む
const token = fs.readFileSync(path.join(__dirname, 'token.json'))

// マストドンのAPIクライアントを作成
const Mstdn_obj = new Mastodon({
  access_token: token,
  timeout_ms: 60 * 1000,
  api_url: instanceUri + '/api/v1/',
})

// タイムラインの読み込み
Mstdn_obj.get('timelines/home', {})
  .then(res => {
    const data = res.data
    console.log(data)
  })