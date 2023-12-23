console.log('content.js loaded')

function extractMessages() {
    var messages = []
    const elements = document.querySelectorAll('[data-message-id]')
    if (elements) {
        const turndownService = new TurndownService()
        for (const element of elements) {
            const role = element.getAttribute('data-message-author-role')
            const markdownContent = turndownService.turndown(element.innerHTML)
            messages.push({role:role, msg:markdownContent})
        }
    }
    console.log(messages)
    chrome.runtime.sendMessage({type:'DOWNLOAD_MESSAGES', messages:messages})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "runMainFunction") {
        extractMessages()
    }
})