jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  if (!($form.length > 0 && $cancelButton.length > 0)) {
    throw new Error('Required elements do not exist.');
  }

  //既存のデータを取得して二次元配列にする
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);
  var $appButtonsArray = [];    
  if (!config.appButtons) {
    $appButtonsArray = [[]]; 
  } else {
    var $array = config.appButtons.split(',');
    while ($array.length) $appButtonsArray.push($array.splice(0, 2));
    // console.log($appButtonsArray);
  }

  //サブテーブルを初期配置する
  for(var i=0; i<$appButtonsArray.length-1; i++) {
    var $firstRow = $('tbody tr').eq(-1);
    var $newRow = $firstRow.after('<tr></tr>').next('tr');

    $newRow.append('<td><div class="kintoneplugin-table-td-control"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text button-name" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-table-td-control"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text button-name" type="url"></div></div></div></td>');
    $newRow.append('<td class="kintoneplugin-table-td-operation"><button type="button" class="kintoneplugin-button-add-row-image" title="Add row"></button> <button type="button" class="kintoneplugin-button-remove-row-image" title="Delete this row"></button></td>');
  }

  //サブテーブルに設定済みの値を入れる
  var tr = $("tbody tr");//テーブルの全行を取得
  for( var i=0; i<tr.length; i++){
    var td = tr.eq(i).children(); //1行目から順番に列を取得(th、td)
    for( var j=0; j<td.length-1; j++ ){
      // if( typeof data[i] == "undefined" ) data[i] = [];
      td.eq(j).find('input').val($appButtonsArray[i][j]); //値をセットする
    }
  }

  //テーブルの行削除ボタンを押したとき
  $('tbody').on('click', '.kintoneplugin-button-remove-row-image', 
  function removeRow() {
    var tr = $("tbody tr");
    if(tr.length > 1) {
      $(this).closest('tr').remove();
    }
  });

  //テーブルの行追加ボタンを押したとき
  $('tbody').on('click', '.kintoneplugin-button-add-row-image', 
  function addRow() {
    var $nowRow = $(this).closest('tr');
    var $newRow = $nowRow.after('<tr></tr>').next('tr');
    // console.log('row: ' & $nowRow.index(this));

    $newRow.append('<td><div class="kintoneplugin-table-td-control"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text button-name" type="text"></div></div></div></td>');
    $newRow.append('<td><div class="kintoneplugin-table-td-control"><div class="kintoneplugin-table-td-control-value"><div class="kintoneplugin-input-outer"><input class="kintoneplugin-input-text button-name" type="url"></div></div></div></td>');
    $newRow.append('<td class="kintoneplugin-table-td-operation"><button type="button" class="kintoneplugin-button-add-row-image" title="Add row"></button> <button type="button" class="kintoneplugin-button-remove-row-image" title="Delete this row"></button></td>');
  });

  //保存ボタンを押したとき
  $form.on('submit', function(e) {
    e.preventDefault();
    var data = [];
    var tr = $("tbody tr");//テーブルの全行を取得
    for( var i=0; i<tr.length; i++){
      var td = tr.eq(i).children(); //1行目から順番に列を取得(th、td)
      for( var j=0; j<td.length-1; j++ ){
        if( typeof data[i] == "undefined" ) data[i] = [];
        data[i][j] = td.eq(j).find('input').val(); //i行目j列の文字列を取得
      }
      if(data[i][0]=='' && data[i][1]=='') {
        delete data[i];
      }
    }
    var appButtons = data.join();
    // console.log(appButtons);
    kintone.plugin.app.setConfig({
      appButtons: appButtons
    }, function() {
      // alert('The plug-in settings have been saved. Please update the app!');
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });
  });

  //キャンセルボタンが押されたとき
  $cancelButton.on('click', function() {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(jQuery, kintone.$PLUGIN_ID);
