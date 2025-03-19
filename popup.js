document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');
    const indicatorCircle = document.querySelector('.circle');
    const overlayButton = document.getElementById('overlayButton');
    const overlayStatus = document.getElementById('overlayStatus');

    if (!toggleButton || !statusText || !indicatorCircle || !overlayButton || !overlayStatus) {
        console.error("Один или несколько элементов не найдены в popup.html");
        return;
    }

    function updateUI(isActive) {
        toggleButton.textContent = isActive ? 'Отключить все модификации' : 'Включить все модификации';
        statusText.textContent = `Статус: ${isActive ? 'активировано' : 'неактивно'}`;
        indicatorCircle.style.backgroundColor = isActive ? '#00cc66' : '#ff0000';
    }

    function updateOverlayStatusUI(isOverlayActive) {
        overlayStatus.textContent = isOverlayActive ? 'Табличка включена' : 'Табличка выключена';
        overlayStatus.style.color = isOverlayActive ? '#00cc66' : '#ff0000';
    }

    function reloadTurboPvzTabs() {
        chrome.tabs.query({ url: "https://turbo-pvz.ozon.ru/*" }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id, { bypassCache: true }); // Принудительная перезагрузка
            });
        });
    }

    chrome.storage.local.get(['extensionActive', 'overlayActive'], (result) => {
        let extensionActive = result.extensionActive || false;
        let overlayActive = result.overlayActive || false;

        updateUI(extensionActive);
        updateOverlayStatusUI(overlayActive);

        toggleButton.addEventListener('click', () => {
            extensionActive = !extensionActive;
            chrome.storage.local.set({ extensionActive }, () => {
                updateUI(extensionActive);
                reloadTurboPvzTabs();
            });
        });

        overlayButton.addEventListener('click', () => {
            overlayActive = !overlayActive;
            chrome.storage.local.set({ overlayActive }, () => {
                updateOverlayStatusUI(overlayActive);
                chrome.tabs.query({ url: "https://turbo-pvz.ozon.ru/*" }, (tabs) => {
                    tabs.forEach(tab => {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: () => typeof changeAddressBadge !== 'undefined'
                        }, (results) => {
                            if (results && results[0].result) {
                                chrome.tabs.sendMessage(tab.id, { action: 'toggleOverlay' });
                            } else {
                                chrome.tabs.reload(tab.id);
                            }
                        });
                    });
                });
            });
        });
    });
});