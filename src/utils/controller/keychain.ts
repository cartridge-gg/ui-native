import * as WebBrowser from "expo-web-browser";
import { KEYCHAIN_URL } from "#utils/const";
import * as Linking from "expo-linking";

export class MobileKeychain {
  open(
    path: string,
    {params, ...options}: WebBrowser.AuthSessionOpenOptions & {params?: URLSearchParams} = {}
  ): Promise<WebBrowser.WebBrowserAuthSessionResult> {
    const redirect_uri = Linking.createURL("");
    const p = params ?? new URLSearchParams();
    p.set("redirect_uri", encodeURIComponent(redirect_uri));
    const authUrl = `${KEYCHAIN_URL}${path}?${p.toString()}`;
    console.log(`authUrl: ${authUrl}`);
    return WebBrowser.openAuthSessionAsync(authUrl, redirect_uri, options);
  }
}
