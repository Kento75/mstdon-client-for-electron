/** アクセストークン取得 */
const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')
const file_cli_app = path.join(__dirname, 'cli-app.json')
const file_user = path.join(__dirname, 'token.json')
const instanceUri = 'https://pawoo.net'

// ファイルからクライアント情報を取得
const info = JSON.parse(fs.readFileSync(file_cli_app))

// 認証用URLを取得
Mastodon.getAuthorizationUrl(
  info.client_id,
  info.client_secret,
  instanceUri)
  .then(url => {
    console.log('以下のURLにアクセスしてコードを取得してください。')
    console.log(url)
    const code = readlineSync.question('コード： ')
    return Mastodon.getAccessToken(
      info.client_id,
      info.client_secret,
      code,
      instanceUri)
  })
  .then(token => {
    console.log('アクセストークン： ', token)
    fs.writeFileSync(file_user, token)
  })