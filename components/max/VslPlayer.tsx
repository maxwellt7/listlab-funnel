import Script from "next/script";
import { preconnect } from "react-dom";
import { VSL } from "@/lib/config";

/**
 * The VSL under the headline. Vidalytics' embed is a container <div> plus a loader script, so the
 * container is rendered here and the loader runs once the page is interactive. The frame around it
 * is 16:9 from the first paint, so the page doesn't jump when the player arrives.
 */
export function VslPlayer() {
  const embedId = VSL.embedId.trim();
  const baseUrl = VSL.baseUrl.trim();
  const configured = /^[A-Za-z0-9_-]+$/.test(embedId) && /^https:\/\/fast\.vidalytics\.com\/embeds\/[A-Za-z0-9_\-/]+\/$/.test(baseUrl);

  if (!configured) {
    return (
      <div className="vsl-slot">
        <div className="vsl" role="img" aria-label="Video">
          <div className="vsl-play" />
        </div>
      </div>
    );
  }

  preconnect("https://fast.vidalytics.com");
  const containerId = `vidalytics_embed_${embedId}`;

  return (
    <div className="vsl-slot">
      <div className="vsl-frame">
        <div id={containerId} style={{ width: "100%", position: "relative", paddingTop: "56.25%" }} />
      </div>
      <Script id="vidalytics-loader" strategy="afterInteractive">
        {vidalyticsLoader(containerId, baseUrl)}
      </Script>
    </div>
  );
}

/** Vidalytics' own loader, unchanged; only the container id and embed URL are passed in. */
function vidalyticsLoader(containerId: string, baseUrl: string) {
  return `(function (v, i, d, a, l, y, t, c, s) {
    y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
    if (!vsl){vsl=function(u,cb){
        if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
        if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
        i.getElementsByTagName("head")[0].appendChild(s);
    };}
    vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
})(window, document, 'Vidalytics', ${JSON.stringify(containerId)}, ${JSON.stringify(baseUrl)});`;
}
