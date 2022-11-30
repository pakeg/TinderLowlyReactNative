import React, { useContext, useState, useEffect, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { GOOGLE_CLIENT_ID } = Constants.manifest.extra;

WebBrowser.maybeCompleteAuthSession();
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    const getPersistedAuth = async () => {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson != null) {
        const userInfo = JSON.parse(userJson);
        if (new Date().getTime() - userInfo.expires_in < 0) {
          setUser(userInfo);
        }
      }
    };
    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = useCallback(async (token) => {
    const persistAuth = async (data) => {
      await AsyncStorage.setItem("user", JSON.stringify(data));
    };
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userInfo = await response.json();
      const user = { ...userInfo, expires_in: new Date().getTime() + 3600000 };
      setUser(user);
      persistAuth(user);
    } catch (error) {
      //
    }
  }, []);

  return (
    <AuthContext.Provider value={{ promptAsync, request, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
