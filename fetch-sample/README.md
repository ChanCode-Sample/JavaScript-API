# サンプルの実行方法
- VSCodeでclientフォルダを開いてください
    * fetch-sampleフォルダを開くと、更新系リクエストの際にLiveServerがdata.jsonの変更を検知してしまい、ブラウザがリロードされてしまいます
- 通信相手としてダミーのサーバーを事前に起動します
- 次の手順でダミーサーバーを起動後、index.htmlをLiveServerで起動し動作確認をしてください

# ダミーサーバーの起動
- serverフォルダの階層で次のコマンドを実行してください
    * npm i json-server -D
    * npx json-server ./server/data.json
