document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');
    const indicatorCircle = document.querySelector('.circle');

    // Массив для хранения идентификаторов кнопок и их меток
    const toggleButtons = [
        { id: 'toggleNews', key: 'newsActive', label: 'Новости' },
        { id: 'toggleTraining', key: 'trainingActive', label: 'Обучение' },
        { id: 'toggleOzonBank', key: 'ozonBankActive', label: 'OZON Банк' },
        { id: 'toggleAddressStorage', key: 'addressStorageActive', label: 'Адресное Хранение' },
        { id: 'toggleReviews', key: 'reviewsActive', label: 'Отзывы' }
    ];

    function updateUI(isActive) {
        toggleButton.textContent = isActive ? 'Отключить все модификации' : 'Включить все модификации';
        statusText.textContent = `Статус: ${isActive ? 'активировано' : 'неактивно'}`;
        indicatorCircle.style.backgroundColor = isActive ? '#00cc66' : '#ff0000';
    }

    function updateToggleButton(buttonId, isActive, label) {
        const button = document.getElementById(buttonId);
        button.textContent = isActive ? `Отключить ${label}` : `Включить ${label}`;
    }

    chrome.storage.local.get(['extensionActive', ...toggleButtons.map(btn => btn.key)], result => {
        const isActive = result.extensionActive || false;
        updateUI(isActive);
        
        // Обновляем состояние для каждого переключателя
        toggleButtons.forEach(({ id, key, label }) => {
            const isToggleActive = result[key] || false;
            updateToggleButton(id, isToggleActive, label);
        });
    });

    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get(['extensionActive'], result => {
            const newState = !(result.extensionActive || false);
            chrome.storage.local.set({ extensionActive: newState }, () => {
                updateUI(newState);
                // Логика для выполнения скрипта при изменении состояния
            });
        });
    });

    // Добавляем обработчики событий для новых переключателей
    toggleButtons.forEach(({ id, key, label }) => {
        document.getElementById(id).addEventListener('click', () => {
            chrome.storage.local.get([key], result => {
                const newState = !(result[key] || false);
                chrome.storage.local.set({ [key]: newState }, () => {
                    updateToggleButton(id, newState, label);
                    // Логика для выполнения скрипта при изменении состояния
                });
            });
        });
    });
});