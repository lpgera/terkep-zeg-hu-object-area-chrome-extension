const id = 'extension-tooltip'

chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'addTooltip') {
    console.log(message.tooltip)
    const tooltip = message.tooltip.replaceAll('\\n', '<br/>')

    const existingDiv = document.getElementById(id)
    if (existingDiv) {
      existingDiv.innerHTML = tooltip
    } else {
      const div = document.createElement('div')
      div.id = id
      div.style.cssText = 'position:absolute;background:white;top:0;right:0;padding:10px;font-size:18px;border:1px solid black;z-index:10'
      div.innerHTML = tooltip
      document.body.appendChild(div)
    }
  }
  if (message.action === 'removeTooltip') {
    const existingDiv = document.getElementById(id)
    if (existingDiv) {
      existingDiv.remove()
    }
  }
})

console.log('Content script loaded!')
