function task(){

  //現在の日時を取得
  let now = new Date();
  let hours = now.getHours();
  
  Logger.log(hours)

  switch(hours){

    case 10:  // GAS が1時間おきに起動するので、10時台のときだけ実行
      getGold();
      break;
    



    default: // 上記以外の時間は何もしない
  }


}