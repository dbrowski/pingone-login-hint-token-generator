import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import HmacSHA256 from "crypto-js/hmac-sha256";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-around",
    color: "#2E4355",
  },
  innerMain: {
    display: "flex",
    margin: "0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    color: "#2E4355",
  },
  image: {
    backgroundImage:
      "url(https://pingidentity.com/content/dam/ping-6-2-assets/open-graph-images/2019/P14C-Build-OG.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#576877",
    backgroundSize: "cover",
    backgroundPosition: "center",
    maxHeight: "20%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2E4355",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "0",
  },
  submit: {
    backgroundColor: "#2E4355",
    margin: theme.spacing(1, 0, 1),
  },
  typography: {
    color: "#2E4355",
    fontSize: "1%",
  },
  errorMessage: {
    color: "red",
  },
  input: {
    margin: theme.spacing(0, 0, 1),
  },
  linkText: {
    margin: theme.spacing(1, 0, 1),
    textAlign: "center",
    fontSize: "2rem",
  },
  customInputLabel: {
    "& legend": {
      visibility: "visible",
    },
    margin: theme.spacing(0, 0, 1),
  },
  token: {
    color: "green",
    "& .MuiInputBase-root": {
      color: "green",
    },
  },
}));

export default function App() {
  // Use the above styles.
  const classes = useStyles();

  // State variables and setters.
  const [appID, setAppID] = useState("");
  const [envID, setEnvID] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [userID, setUserID] = useState("");
  const [geo, setGeo] = useState("NA");
  const [loginHintToken, setLoginHintToken] = useState("");
  const [myAccount, setMyAccount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      let result = generate(envID, appID, appSecret, userID, geo);
      setLoginHintToken(result["login_hint_token"]);
      setMyAccount(result["myaccount"]);
    } catch (e) {
      // Gets the reason for failure.
      let msg = JSON.stringify(e);
      console.error(e);
      console.error(msg);
    }
  };

  const handleAppIDChange = (event) => {
    event.preventDefault();
    setAppID(event.target.value);
  };

  const handleEnvIDChange = (event) => {
    event.preventDefault();
    setEnvID(event.target.value);
  };

  const handleAppSecretChange = (event) => {
    event.preventDefault();
    setAppSecret(event.target.value);
  };

  const handleUserIDChange = (event) => {
    event.preventDefault();
    setUserID(event.target.value);
  };

  const handleGeoChange = (event) => {
    event.preventDefault();
    setGeo(event.target.value);
  };

  const handleClickShowPassword = (event) => {
    setShowSecret(!showSecret);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(loginHintToken);
  };

  const generate = (envId, appId, appSecret, userId, geo) => {
    // JWT generation script adapted from
    // https://gist.github.com/corbanb/db03150abbe899285d6a86cc480f674d

    const authUrl = getAuthUrl(geo);
    var jwtSecret = appSecret;

    // Set headers for JWT
    var header = {
      typ: "JWT",
      alg: "HS256",
    };

    // Prepare timestamp in seconds
    var currentTimestamp = Math.floor(Date.now() / 1000);

    var data = {
      iss: appId,
      aud: `${authUrl}/${envId}/as`,
      sub: userId,
      iat: currentTimestamp - 300, // be on the safe side in case of clock sync issues
      exp: currentTimestamp + 60 * 60 * 24, // expiry time is 24 hours
    };

    // encode header
    var stringifiedHeader = Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    // encode data
    var stringifiedData = Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    // build token
    var token = `${encodedHeader}.${encodedData}`;

    // sign token
    var signature = HmacSHA256(token, jwtSecret);
    signature = base64url(signature);
    var signedToken = `${token}.${signature}`;

    // console.log("jwt_signed = " + signedToken);

    var baseAppsUrl = authUrl.replace("auth", "apps");
    var url = `${baseAppsUrl}/${envId}/myaccount/?login_hint_token=${signedToken}#mfa`;

    var result = {};
    result["login_hint_token"] = signedToken;
    result["myaccount"] = url;
    return result;
  };

  const getAuthUrl = (geo) => {
    geo = geo.toLowerCase();
    switch (geo) {
      case "na":
        return "https://auth.pingone.com";
      case "eu":
        return "https://auth.pingone.eu";
      case "ap":
        return "https://auth.pingone.asia";
      case "ca":
        return "https://auth.pingone.ca";
      case "ort":
        return "https://auth-staging.pingone.com";
      case "test":
        return "https://auth-test.pingone.com";
      default:
        break;
    }
  };

  const base64url = (source) => {
    // Encode in classical base64
    var encodedSource = Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, "");

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
  };

  const copyLoginHintToken = () => {
    const copyText = $("#lht_result")[0];
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
  };

  const helperText1 = "If MyAccount fails to open, check:";
  const helperText2 = " 1. The user is enabled and MFA is enabled for the user";
  const helperText3 = " 2. The app is enabled";
  const helperText4 =
    " 3. You selected the right geography (NA, EU, AP, CA, ORT, TEST)";

  // $(document).ready(function () {
  //   $(document).on("keyup", function (evt) {
  //     $(".helptext").css("visibility", "hidden");
  //   });
  //   $(document).on("mouseup", function (evt) {
  //     if (evt.target["id"] !== "tooltip_icon") {
  //       $(".helptext").css("visibility", "hidden");
  //     }
  //   });
  // });

  return (
    <Container spacing={0} className={classes.root}>
      <Grid
        container
        display="flex"
        component="main"
        className={classes.innerMain}
        direction="column"
      >
        <Grid
          item
          justify="center"
          style={{
            flex: "1 1 1",
          }}
        >
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
        </Grid>

        <Grid
          item
          container
          display="flex"
          direction="column"
          justify="center"
          alignItems="stretch"
          style={{ flex: "10 1 auto" }}
        >
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Grid
                item
                className={classes.input}
                justify="center"
                alignSelf="center"
              >
                <RadioGroup
                  row
                  aria-label="geo"
                  name="geo"
                  value={geo}
                  onChange={handleGeoChange}
                  style={{ justifyContent: "center" }}
                >
                  <FormControlLabel
                    value="NA"
                    control={<Radio color="primary" />}
                    label="NA"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="EU"
                    control={<Radio color="primary" />}
                    label="EU"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="AP"
                    control={<Radio color="primary" />}
                    label="AP"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="CA"
                    control={<Radio color="primary" />}
                    label="CA"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="ORT"
                    control={<Radio color="primary" />}
                    label="ORT"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="Test"
                    control={<Radio color="primary" />}
                    label="TEST"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
              <Grid item className={classes.input}>
                <TextField
                  id="env-id"
                  label="Environment ID"
                  variant="outlined"
                  value={envID}
                  onChange={handleEnvIDChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item className={classes.input}>
                <TextField
                  id="app-id"
                  label="Application ID"
                  variant="outlined"
                  value={appID}
                  onChange={handleAppIDChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item className={classes.input}>
                <OutlinedInput
                  id="outlined-adornment-app-secret"
                  label="Application Secret"
                  placeholder="Application Secret *"
                  variant="outlined"
                  value={appSecret}
                  onChange={handleAppSecretChange}
                  classes={{
                    focused: classes.customInputLabel,
                  }}
                  fullWidth
                  required
                  type={showSecret ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showSecret ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item className={classes.input}>
                <TextField
                  id="user-id"
                  label="User ID/Username"
                  variant="outlined"
                  value={userID}
                  onChange={handleUserIDChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item className={classes.input}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // onClick={handleSubmit}
                  fullWidth
                  className={classes.submit}
                >
                  Generate
                </Button>
              </Grid>
              <Grid item container>
                <Grid item style={{ flexGrow: 1 }}>
                  <TextField
                    id="login-hint-token"
                    label="Login Hint Token"
                    variant="outlined"
                    value={loginHintToken}
                    color="success"
                    className={classes.token}
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  className={classes.input}
                  style={{ flexGrow: 0, alignSelf: "center" }}
                >
                  <IconButton
                    aria-label="copy"
                    onClick={() => {
                      handleCopyButtonClick();
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <FormHelperText>{helperText1}</FormHelperText>
              <FormHelperText>{helperText2}</FormHelperText>
              <FormHelperText>{helperText3}</FormHelperText>
              <FormHelperText>{helperText4}</FormHelperText>
              <Grid item className={classes.input}>
                {myAccount.length > 1 ? (
                  <Typography className={classes.linkText}>
                    <Link
                      href={myAccount}
                      target="_blank"
                      rel="noreferrer noopener"
                      color="inherit"
                      variant="inherit"
                    >
                      <LinkIcon />
                      My Account
                      <LinkIcon />
                    </Link>
                  </Typography>
                ) : (
                  <></>
                )}
              </Grid>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
