jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  kintone.events.on('mobile.app.record.index.show', function() {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);

    var $spaceElement = kintone.mobile.app.getHeaderSpaceElement();
    if ($spaceElement === null) {
      throw new Error('The header element is unavailable on this page');
    }

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
      console.log(url);
      $button.setAttribute('onclick', `location.href='${url}'`);
      $span.append($button);
      $spaceElement.append($span);
    }
  });

})(jQuery, kintone.$PLUGIN_ID);



// jQuery.noConflict();

// (function($, PLUGIN_ID) {
//   'use strict';

//   kintone.events.on('mobile.app.record.index.show', function() {
//     var config = kintone.plugin.app.getConfig(PLUGIN_ID);

//     var spaceElement = kintone.mobile.app.getHeaderSpaceElement();
//     if (spaceElement === null) {
//       throw new Error('The header element is unavailable on this page');
//     }
//     var fragment = document.createDocumentFragment();
//     var headingEl = document.createElement('h3');
//     var messageEl = document.createElement('p');

//     messageEl.classList.add('plugin-space-message');
//     messageEl.textContent = config.message;
//     headingEl.classList.add('plugin-space-heading');
//     headingEl.textContent = 'Hello kintone plugin!';

//     fragment.appendChild(headingEl);
//     fragment.appendChild(messageEl);
//     spaceElement.appendChild(fragment);
//   });
// })(jQuery, kintone.$PLUGIN_ID);
