// Node's native fetch (undici) does not read HTTPS_PROXY/HTTP_PROXY on its
// own. This sandbox's outbound HTTPS is proxy-only, so route fetch through
// it explicitly before anything else makes a request.
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
if (proxyUrl) {
  setGlobalDispatcher(new ProxyAgent(proxyUrl));
}
