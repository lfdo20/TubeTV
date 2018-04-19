var GoogleAuth;
let userAuth;
let oauthToken;
let googleApiClientReady;

// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '549389071378-mb3f6jvqchsndplttaljmeab0b2n16m9.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function () {
  gapi.auth.init(function () {
    window.setTimeout(checkAuth(), 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}
const loginbutton = document.getElementById('sign-in-or-out-button')
loginbutton.addEventListener("click",
function (e) {
  console.log('foi???');
  if (loginbutton.getAttribute('logged') === 'off' ) {
    checkAuth();
  } else {
    handleAuthResult();
  }
  });

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('#sign-in-or-out-button').html('Sign out');
    $('#auth-status').html('You are currently signed in and have granted ' + 'access to this app.');
    gapi.auth.signOut();
    loginbutton.setAttribute("logged", "on")
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#sign-in-or-out-button').html('Sign In/Authorize');
    $('#auth-status').html('You have not authorized this app or you are ' +
      'signed out.');
        console.log('foi in');
        loginbutton.setAttribute("logged", "off")
  }
}

function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function () {
    //handleAPILoaded();
    $('#playlist').attr('disabled', false);
  });
}
