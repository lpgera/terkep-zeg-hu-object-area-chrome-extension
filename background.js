chrome.webRequest.onCompleted.addListener(
  async details => {
    const url = new URL(details.url)
    const params = new URLSearchParams(url.search)

    if (
      details.tabId > -1 && // prevent looping
      url.pathname === "/mapguide/mapagent/mapagent.fcgi" &&
      params.get("operation") === "QUERYMAPFEATURES"
    ) {
      if (params.get("maxFeatures") === "1") {
        const response = await fetch(details.url)

        const {
          FeatureInformation: {
            Tooltip: [
              tooltip,
            ],
          },
        } = await response.json()

        chrome.tabs.sendMessage(details.tabId, { action: "addTooltip", tooltip })
      } else {
        chrome.tabs.sendMessage(details.tabId, { action: "removeTooltip" })
      }
    }
  },
  {
    urls: ["<all_urls>"]
  }
)

console.log('Background script loaded!')
