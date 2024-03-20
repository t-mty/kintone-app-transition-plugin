jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  kintone.events.on('app.record.index.show', function() {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);

    var $spaceElement = kintone.app.getHeaderMenuSpaceElement();
    if ($spaceElement === null) {
      throw new Error('The header element is unavailable on this page');
    }
    
    if ($('.custom-app-button').length !== 0) return e;

    //configの値を取得する
    var $array = config.appButtons.split(',');
    var $appButtonsArray = [];
    while ($array.length) $appButtonsArray.push($array.splice(0, 2));
    // console.log($appButtonsArray);

    //ボタンを設置する
    for (var i=0; i<$appButtonsArray.length; i++) {
      var $span = document.createElement('span');
      var $button = document.createElement('button');
      $button.innerText = $appButtonsArray[i][0];
      $button.className = 'custom-app-button';
      var url = $appButtonsArray[i][1];
      // console.log(url);
      $button.setAttribute('onclick', `location.href='${url}'`);
      $span.append($button);
      $spaceElement.append($span);
    }

    // var fragment = document.createDocumentFragment();
    // var headingEl = document.createElement('h3');
    // var messageEl = document.createElement('p');

    // messageEl.classList.add('plugin-space-message');
    // messageEl.textContent = config.message;
    // headingEl.classList.add('plugin-space-heading');
    // headingEl.textContent = 'Hello kintone plugin!';

    // fragment.appendChild(headingEl);
    // fragment.appendChild(messageEl);
    // spaceElement.appendChild(fragment);
  });

  // //別アプリへの遷移ボタン
  // function appButton(){
    
  //   var redirectApp = document.createElement('span');
    
  //   // 一覧画面に顧客一覧表示ボタンを設置
  //   if (document.getElementById('customer_view_button_index') !== null) {
  //     return;
  //   }
  //   const customerViewButtonIndex = document.createElement('button');
  //   customerViewButtonIndex.id = 'customer_view_button_index';
  //   customerViewButtonIndex.className = 'customer_view_button_index';
  //   customerViewButtonIndex.innerText = '';
  //   customerViewButtonIndex.onclick = () => {
  //     console.log(customerAppID);
  //     location.href="https://eafpgdenqpc1.cybozu.com/k/" + customerAppID + "/";
  //   };
  //   redirectApp.appendChild(customerViewButtonIndex);
  //   kintone.app.getHeaderMenuSpaceElement().appendChild(redirectApp);
  // }
})(jQuery, kintone.$PLUGIN_ID);
