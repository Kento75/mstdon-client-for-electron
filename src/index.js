import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'
import path from 'path'
import Mastodon from 'mastodon-api'
import { styles } from './styles.js'

// コンポーネント定義
export default class App extends Component {
  constructor(props) {
    super(props)
    this.apiUri = 'https://pawoo.net/api/v1/'
    this.loadInfo()
    this.state = {
      tootdata: '',
      timelines: [],
    }
  }

  // マウント実行時処理
  componentWillMount() {
    this.loadTimelines()
    setInterval(() => {
      this.loadTimelines()
    }, 1000 * 30)
  }

  // APIクライアント生成処理
  loadInfo() {
    // アクセストークン取得
    const file_path = path.join('token.json')

    try {
      fs.statSync(file_path)
    } catch(err) {
      window.alert('先にアクセストークンを取得してください。')
      window.close()
      return
    }

    this.token = fs.readFileSync(file_path)

    // APIクライアント生成
    this.mstdn = new Mastodon({
      access_token: this.token,
      timeout_ms: 60 * 1000,
      api_url: this.apiUri
    })
  }

  // タイムライン読み込み
  loadTimelines() {
    this.mstdn.get('timelines/home', {})
      .then(res => {
        this.setState({timelines: res.data})
      })
  }

  // テキストボックス更新時処理
  handleText(e) {
    this.setState({tootdata: e.target.value})
  }

  // 発言(Toot)処理
  toot(e) {
    this.mstdn.post('statuses', {status: this.state.tootdata},
      (err, data, res) => {
        if(err) {
          console.error(err)
          return
        }
        this.setState({tootdata: ''})
        this.loadTimelines()
      }
    )
  }

  // 描画処理
  render() {
    return (
      <div>
        <div style={styles.editorPad}>
          <h1 style={styles.title}>Mastodon Client</h1>
          <textarea
            style={styles.editor}
            value={this.state.tootdata}
            onChange={e => this.handleText(e)}
          />
          <div>
            <button onClick={e => this.toot(e)} />
          </div>
        </div>
        <div style={{marginTop: 120}} />
        {this.renderTimelines()}
      </div>
    )
  }

  // タイムラインコンポーネント生成
  // TODO: タイムライン処理の追加

}