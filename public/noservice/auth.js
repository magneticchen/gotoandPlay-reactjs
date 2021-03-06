let _NSc = new NSc('gotoandplay.nctu.edu.tw');
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
$(function () {
  let status = $('#status');
  if(getQueryVariable('authfail')) {
    status.html('<span style="color: #E91E63">Check your username exists and password is valid!</span>');
  }
  $('#loginform').submit(function(e){
    try{
      _NSc.getImplementationModule((err, implement_module)=>{
        implement_module.getClientConnProfile(getQueryVariable('conn_method'), getQueryVariable('remote_ip'), getQueryVariable('port'), (err, connprofile) => {
          let _data = {
            u: $('#loginform-username').val(),
            p: $('#loginform-password').val()
          }
          implement_module.returnImplement('setUser')(false, _data.u);
          implement_module.emitRequest(connprofile, 'GT', _data);
        });
      });
    }
    catch(e) {
      console.log(e);
    }
    return false;
  });

  $('#passwordform-username').val(getQueryVariable('username'));
  $('#passwordform').submit(function(e){
    try{
      _NSc.getImplementationModule((err, implement_module)=>{
        implement_module.getClientConnProfile(getQueryVariable('conn_method'), getQueryVariable('remote_ip'), getQueryVariable('port'), (err, connprofile) => {
          let _data = {
            m: 'PW',
            d: {
              t: getQueryVariable('authtoken'),
              v: $('#passwordform-password').val()
            }
          }

          implement_module.sendRouterData(connprofile, 'AU', 'rs', Buf.encode(JSON.stringify(_data)));

          setTimeout(()=>{window.close();}, 500);
        });
      });
    }
    catch(e) {
      console.log(e);
    }
    return false;
  });
});
