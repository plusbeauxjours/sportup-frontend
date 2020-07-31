import React, { useState } from "react";

import * as Facebook from "expo-facebook";
import { useMutation } from "react-apollo-hooks";

import { FACEBOOK_CONNECT } from "./FacebookApproachQueries";
import FacebookApproachPresenter from "./FacebookApproachPresenter";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";

interface IProps {
  cityId: string;
  countryCode: string;
}

const FacebookApproachContainer: React.FC<IProps> = () => {
  const [loading, setLoading] = useState(false);

  const [facebookConnectFn, { loading: facebookConnectLoading }] = useMutation<
    FacebookConnect,
    FacebookConnectVariables
  >(FACEBOOK_CONNECT);

  const fbLogin = async () => {
    try {
      await Facebook.initializeAsync("242663513281642", "Pinner");
      const authResult = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (authResult.type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${authResult.token}&fields=id,name,last_name,first_name,email,gender`
        );
        const { id, email, first_name, last_name } = await response.json();
        const {
          data: { facebookConnect },
        } = await facebookConnectFn({
          variables: {
            firstName: first_name,
            lastName: last_name,
            email,
            fbId: id,
          },
        });
        await logIn(facebookConnect);
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FacebookApproachPresenter
      loading={loading}
      setLoading={setLoading}
      fbLogin={fbLogin}
    />
  );
};

export default FacebookApproachContainer;
