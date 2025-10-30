import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "97087528603-l45tv5m01d508alq1ek1d2mleec3rf18.apps.googleusercontent.com",
    webClientId: "97087528603-l45tv5m01d508alq1ek1d2mleec3rf18.apps.googleusercontent.com",
  });

 const signInWithGoogle = async () => {
  try {
    console.log("Google login started...");
    const result = await promptAsync();

    if (result?.type === "success") {
      // Web + Native compatible
      const idToken =
        result.params?.id_token || result.authentication?.idToken;

      if (!idToken) throw new Error("No ID token returned from Google");

      console.log("Got idToken:", idToken);

      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);

      const firebaseToken = await userCredential.user.getIdToken();
      console.log("Firebase token:", firebaseToken);

      return firebaseToken;
    } else {
      throw new Error("Google Sign-In cancelled");
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};


  return { signInWithGoogle, request, response };
}
