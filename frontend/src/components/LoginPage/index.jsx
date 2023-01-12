/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { SaveToken } from "../../Services/AuthService";
import { createUser, findUserByEmail } from "../../Services/UserService";


export default function LoginPage() {
  let auth2 = {} | null;
  let btnRef = React.createRef(HTMLInputElement);

  let PrepareLoginButton = () => {
    let authObject = {};
    auth2.attachClickHandler(
      btnRef.current,
      {},
      (googleUser) => {
        const authResponse = googleUser.getAuthResponse();
        authObject = {
          codToken: authResponse.access_token, //token(bearer)
          expiresAt: authResponse.expires_at, //horário de expiração do token
          userName: googleUser.getBasicProfile().getName(), //nome do usuário
          firstName: googleUser.getBasicProfile().getGivenName(),
          lastName: googleUser.getBasicProfile().getFamilyName(),
          image: googleUser.getBasicProfile().getImageUrl(),
          email: googleUser.getBasicProfile().getEmail(),
          sucess: true,
        };

        goBack(authObject);
      },
      (error) => {
        authObject = {
          codToken: 0,
          expiresAt: 0,
          userName: "",
          sucess: false,
        };
        goBack(authObject);
        console.log(JSON.stringify(error, undefined, 2));
      }
    );
  };

  let GoogleSDK = () => {
    window["googleSDKLoaded"] = () => {
      window["gapi"].load("auth2", () => {
        auth2 = window["gapi"].auth2.init({
          client_id:
            "520184664852-u96eaeriukvl4as1tj1e281bqsd3lnkf.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          scope: "profile email",
          plugin_name: "chat",
        });
        PrepareLoginButton();
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };

  useEffect(() => {
    GoogleSDK();
  }, []);

  const goBack = async (userGoogle) => {
    if (userGoogle.sucess) {
      const userFound = await findUserByEmail(userGoogle.email);
      if(!userFound) userGoogle.id = await createUser({name: userGoogle.userName, email: userGoogle.email}).id
      else userGoogle.id = userFound.id;
      SaveToken(userGoogle);
    }
    window.location.reload(false);
  };

  return (
    <Button
      color="secondary"
      ref={btnRef}
    >
      Login
    </Button>
  );
}
