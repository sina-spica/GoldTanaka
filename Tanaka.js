
function getGold() {
  
  // https://www.77-lifework.com/entry/gas-scraping-switch
  //Parser ライブラリ必要

  //現在の日時を取得
  let now = new Date();
  let hours = now.getHours();
  
  Logger.log(hours)

  // GAS が1時間おきに起動するので、10時～11時の間のときだけ実行
  //if (  hours  > 9  &&  hours < 11) {


    // --田中貴金属から店頭小売価格を入手
    let URL1="https://gold.tanaka.co.jp/commodity/souba/d-gold.php";

    let fromText1 = '<td class="retail_tax">';
    let toText1 = '円<br />'; 

    let fromText2 = '<td class="purchase_tax">';
    let toText2 = '円<br />'; 

    let html1 = UrlFetchApp.fetch(URL1).getContentText("UTF-8");

    let state1 = Parser.data(html1)
    .from(fromText1)
    .to(toText1)
    .build();

    let state2 = Parser.data(html1)
    .from(fromText2)
    .to(toText2)
    .build();


    Logger.log(state1);
    Logger.log(state2);

    //--------------

    //Google Sheetのシート名を設定。
    let book = SpreadsheetApp.getActiveSpreadsheet();
    let sheet1Data = book.getSheetByName("シート1");

    //Google Sheet1の2行目に行を挿入する
    sheet1Data.insertRows(2,1);

    //　2行目1列目のセルに日時を入力する
    let val_time = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    sheet1Data.getRange(2,1).setValue(val_time);


    //価格を記入
    sheet1Data.getRange(2,2).setValue(state1);
    sheet1Data.getRange(2,3).setValue(state2);
  
  //}

  SendMessage("Gold：店頭小売価格:"+ state1 )
  SendMessage("Gold：店頭買取価格:"+ state2 )

}





