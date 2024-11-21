document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');

    function updateUI(isActive) {
        toggleButton.textContent = isActive ? 'Отключить модификации' : 'Включить модификации';
        statusText.textContent = `Статус: ${isActive ? 'активировано' : 'деактивировано'}`;
    }

    chrome.storage.local.get(['extensionActive'], result => {
        const isActive = result.extensionActive || false;
        updateUI(isActive);
    });

    toggleButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleExtension' }, response => {
                if (response) {
                    updateUI(response.status === 'Активировано');
                }
            });
        });
    });
});
