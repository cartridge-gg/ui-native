import * as WebBrowser from "expo-web-browser";
import { KEYCHAIN_URL } from "#utils/const";
import * as Linking from "expo-linking";

export class MobileKeychain {
  open(
    path: string,
    {params, ...options}: WebBrowser.AuthSessionOpenOptions & {params?: URLSearchParams} = {}
  ): Promise<WebBrowser.WebBrowserAuthSessionResult> {
    const callbackUri = Linking.createURL("");
    const p = params ?? new URLSearchParams();
    p.set("callback_uri", encodeURIComponent(callbackUri));
    const authUrl = `${KEYCHAIN_URL}${path}?${p.toString()}`;
    return WebBrowser.openAuthSessionAsync(authUrl, callbackUri, options);
  }
}
