document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');
    const indicatorCircle = document.querySelector('.circle');

    function updateUI(isActive) {
        toggleButton.textContent = isActive ? 'Отключить модификации' : 'Включить модификации';
        statusText.textContent = `Статус: ${isActive ? 'активировано' : 'неактивно'}`;
        indicatorCircle.style.backgroundColor = isActive ? '#00cc66' : '#ff0000';
    }

    chrome.storage.local.get(['extensionActive'], result => {
        const isActive = result.extensionActive || false;
        updateUI(isActive);
    });

    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get(['extensionActive'], result => {
            const newState = !(result.extensionActive || false);
            chrome.storage.local.set({ extensionActive: newState }, () => {
                updateUI(newState);

                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                    if (tabs.length === 0) {
                        console.error('Не найден активный таб.');
                        return;
                    }

                    const tabId = tabs[0].id;

                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabId },
                            func: () => { /* Доп проверки */ },
                        },
                        () => {
                            if (chrome.runtime.lastError) {
                                console.error('Ошибка подключения скрипта содержимого:', chrome.runtime.lastError.message);
                                alert('Ошибка: Содержимое не отвечает. Убедитесь, что вы находитесь на поддерживаемой странице.');
                                return;
                            }

                            chrome.tabs.sendMessage(tabId, { action: 'toggleExtension' }, response => {
                                if (chrome.runtime.lastError) {
                                    console.error('Ошибка передачи сообщения:', chrome.runtime.lastError.message);
                                    alert('Ошибка: Содержимое не отвечает. Убедитесь, что вы находитесь на поддерживаемой странице.');
                                } else if (response) {
                                    updateUI(response.status === 'Активировано');
                                }
                            });
                        }
                    );
                });
            });
        });
    });
});
