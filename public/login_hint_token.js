function execute() {
  var url;
  var data;
  result = generate($('#envid').val(),
            $('#appid').val(),
            $('#appsecret').val(),
            $('#userid').val(),
            $("input[name='geo']:checked").val());
  showResult(result);
}

function showResult(result) {
  $('#lht_result').val(result['login_hint_token']);
  $('#myaccount_href').attr('href', result['myaccount']);
  $("#myaccount_result").css('visibility', 'visible');
}

function generate (envId, appId, appSecret, userId, geo) {
  // JWT generation script adapted from
  // https://gist.github.com/corbanb/db03150abbe899285d6a86cc480f674d

  const authUrl = getAuthUrl(geo);
  var jwtSecret = appSecret;

  // Set headers for JWT
  var header = {
    'typ': 'JWT',
    'alg': 'HS256'
  };

  // Prepare timestamp in seconds
  var currentTimestamp = Math.floor(Date.now() / 1000)

  var data = {
    'iss': appId,
    'aud': `${authUrl}/${envId}/as`,
    'sub': userId,
    'iat': currentTimestamp - 300, // be on the safe side in case clocks sync issues 
    'exp': currentTimestamp + (60 * 60 * 24) // expiry time is 24 hours
  }

  // encode header
  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  var encodedHeader = base64url(stringifiedHeader)

  // encode data
  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
  var encodedData = base64url(stringifiedData)

  // build token
  var token = `${encodedHeader}.${encodedData}`

  // sign token
  var signature = CryptoJS.HmacSHA256(token, jwtSecret)
  signature = base64url(signature)
  var signedToken = `${token}.${signature}`

  console.log('jwt_signed = ' + signedToken);

  baseAppsUrl = authUrl.replace('auth','apps');
  url=`${baseAppsUrl}/${envId}/myaccount/?login_hint_token=${signedToken}#mfa`;

  result = {};
  result['login_hint_token'] = signedToken;
  result['myaccount'] = url;
  return result;
}

function getAuthUrl(geo) {
  switch (geo) {
    case 'na':
      return 'https://auth.pingone.com';   
    case 'eu':
      return 'https://auth.pingone.eu';   
    case 'ap':
      return 'https://auth.pingone.asia';   
    case 'ort':
      return 'https://auth-staging.pingone.com';   
    case 'test':
      return 'https://auth-test.pingone.com';   
    default:
      break;
  };
}

function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source)
    
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '')
    
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-')
    encodedSource = encodedSource.replace(/\//g, '_')
    
    return encodedSource
}

function copyLoginHintToken() {
    const copyText = $('#lht_result')[0];
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
}

function showTooltip() {
    const textHtml = 
        'If MyAccount fails to open, check:<br>' + 
        ' 1. The user is enabled and MFA is enabled for the user<br>' +
        ' 2. The app is enabled<br>' +
        ' 3. You selected the right geography (NA, EU, AP, ORT, TEST)<br>';
    if ($('.helptext').css('visibility') != 'visible') {
        $('.helptext').css('visibility', 'visible');
        $('.helptext').html(`<span>${textHtml}</span>`);
    } else {
        $('.helptext').css('visibility', 'hidden');
    }
}

$(document).ready(function(){
    $(document).on('keyup',function(evt) {
        $('.helptext').css('visibility', 'hidden');
    });
    $(document).on('mouseup',function(evt) {
        if (evt.target['id'] != 'tooltip_icon') {
            $('.helptext').css('visibility', 'hidden');
        }
    });
});