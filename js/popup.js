document.getElementById('download').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "runMainFunction"})
    })
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "DOWNLOAD_MESSAGES") {
        var markdown = '# ChatGPT Session\n\n'
        markdown += 'Downloaded at ' + new Date().toLocaleString() + '\n\n'
        for (const item of message.messages) {
            markdown += `## ${item.role}` + '\n\n'
            markdown += item.msg + '\n\n'
        }
        const blob = new Blob([markdown], {type: 'text/markdown'})
        const url = URL.createObjectURL(blob)
        chrome.downloads.download({url: url, filename: 'messages.md'})
    }
})