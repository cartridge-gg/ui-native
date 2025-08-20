import * as WebBrowser from "expo-web-browser";
import { KEYCHAIN_URL } from "#utils/const";
import * as Linking from "expo-linking";

export class MobileKeychain {
  open(path: string, options: WebBrowser.AuthSessionOpenOptions = {}): Promise<WebBrowser.WebBrowserAuthSessionResult> {
    const callbackUri = Linking.createURL(path);
    const authUrl = `${KEYCHAIN_URL}?callback_uri=${encodeURIComponent(callbackUri)}`;
    return WebBrowser.openAuthSessionAsync(authUrl, callbackUri, options);
  }
}
