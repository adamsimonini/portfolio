/* 
this is the plugin that allows for global functions (i.e., functions implicitly accessible to all complnents without the need for explicit import statements)
Since these functions get added to the Vue instance (Vue.prototype.functionName), 
compoents can access these functions via "this.functionName"
*/

import Vue from 'vue';

Vue.prototype.$getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Vue.prototype.$setCookie = (cname, cvalue, exdays) => {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

Vue.prototype.$alertMe = (msg) => {
    console.log(msg);
}