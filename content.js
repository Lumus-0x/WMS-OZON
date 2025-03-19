let isExtensionActive = false;
let isOverlayActive = false;

function changeAddressBadge() {
    const elements = {
        versions: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__caption-small__ff2BT.ozi-body-400.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT.ozi__text-view__caption__ff2BT'),
        nameTab: document.querySelector('.ozi__logo__projectTitle__-H66N.ozi-heading-300'),
        profile: document.querySelector('.ozi__link-nuxt__linkNuxt__8oE33.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._user_yzupa_17'),
        claimsMain: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
        claimsNumber: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
        loginInfo: document.querySelector('._title_1w123_89.ozi-heading-700'),
    };

    // Отладка: выводим найденные элементы в консоль
    console.log('Найденные элементы:', elements);

    if (elements.versions) {
        console.log('Изменение versions:', elements.versions.textContent);
        elements.versions.textContent = elements.versions.textContent.trim().replace(/^Версия: 3.2.4/, 'Кастомная WMS OZON 1.2.2');
    }

    if (elements.loginInfo) {
        console.log('Изменение loginInfo:', elements.loginInfo.textContent);
        elements.loginInfo.textContent = elements.loginInfo.textContent.trim().replace(/^Управление заказами ПВЗ/, 'Вход в систему OZON WMS');
    }

    if (elements.profile) {
        console.log('Изменение profile:', elements.profile.textContent);
        elements.profile.textContent = elements.profile.textContent.trim().replace(/^PVZ_/, 'Оператор WMS ');
    }

    if (elements.nameTab) {
        console.log('Изменение nameTab:', elements.nameTab.textContent);
        elements.nameTab.textContent = elements.nameTab.textContent.trim().replace(/^Турбо ПВЗ/, 'OZON WMS');
    }

    if (elements.claimsNumber) {
        console.log('Изменение claimsNumber:', elements.claimsNumber.textContent);
        elements.claimsNumber.textContent = elements.claimsNumber.textContent.trim().replace(/^Претензия/, 'Непонятная фигня ');
    }

    if (elements.claimsMain) {
        console.log('Изменение claimsMain:', elements.claimsMain.textContent);
        elements.claimsMain.textContent = elements.claimsMain.textContent.trim().replace(/^Список обращений/, 'Список бредней OZON');
    }

    removeCarriages();
}

// Функция удаления элементов
function removeCarriages() {
    const selectorsToRemove = [
        '.ozi__breadcrumbs__separator__DsxCI',
        '._filter_nvofz_1._filterWithStores_nvofz_7',
        '.ozi__breadcrumb-content__label__PKDFH.ozi-body-500',
        '._qrBlock_1w123_71',
        '._right_1w123_35',
        '._disclaimer_10nno_1.ozi-label-300',
        '.ozi__link-pseudo__linkPseudo__9vjoS.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._link_1w123_47.ozi-body-500-true._marginFromLink_1w123_55',
        '.ozi__informer__informer__HzSFx.ozi-body-500.ozi__informer__size-500__HzSFx.ozi__informer__info__HzSFx.ozi__informer__showAccentLine__HzSFx',
        '.ozi__island__island__6OcbH.ozi-body-500.ozi__island__elevate__6OcbH.ozi__island__size-500__6OcbH.ozi__island__hoverable__6OcbH.ozi__island__cursor__6OcbH._button_1fzjv_1._toggler_1tvs3_23'
    ];

    // Удаление элементов даже при открытой панели
    selectorsToRemove.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });

    // Динамические элементы меню
    const menuItemsToRemove = [
        'https://turbo-pvz.ozon.ru/news',
        'https://turbo-pvz.ozon.ru/learning',
        'https://turbo-pvz.ozon.ru/bank/requests',
        'https://turbo-pvz.ozon.ru/address_storage',
        'https://turbo-pvz.ozon.ru/rating'
    ];

    document.querySelectorAll('.ozi__menu-item__menuItem__8Dv5a').forEach(button => {
        const linkHref = button.closest('a')?.href;
        if (menuItemsToRemove.includes(linkHref)) {
            button.remove();
        }
    });
}

// Оверлей
function updateOverlayUI() {
    const existingOverlay = document.getElementById('customOverlay');
    if (isOverlayActive) {
        if (!existingOverlay) {
            const overlay = document.createElement('div');
            overlay.id = 'customOverlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '9999';
            overlay.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32">
                    <path d="M16.0108 1C7.72377 0.994594 1.00541 7.70754 1 15.9892C0.994594 24.2762 7.70754 30.9946 15.9892 31C24.2708 31.0054 30.9946 24.2925 31 16.0108C31 16.0054 31 16 31 15.9892C31 7.71295 24.2871 1 16.0108 1ZM24.0058 15.9892C24.0058 20.4086 20.4248 23.9895 16.0108 23.9949C11.5914 24.0004 7.99964 20.4194 7.99423 16C7.98882 11.5806 11.5698 7.98882 15.9892 7.98341C20.4086 7.978 24.0004 11.559 24.0058 15.9784V15.9892Z" fill="#005BFF"></path>
                </svg>
                <p style="color: white; font-size: 24px; text-align: center; margin-top: 20px;">
                    Система закрыта для выдачи и других операций до 9:00 по МСК
                </p>
            `;
            document.body.appendChild(overlay);
        }
    } else {
        if (existingOverlay) {
            existingOverlay.remove();
        }
    }
}

// Проверка состояния расширения
function checkExtensionState() {
    chrome.storage.local.get(['extensionActive', 'overlayActive'], result => {
        isExtensionActive = result.extensionActive || false;
        isOverlayActive = result.overlayActive || false;
        if (isExtensionActive) {
            activateModifications();
        } else {
            deactivateModifications();
        }
        updateOverlayUI();
    });
}

function activateModifications() {
    console.log('Активация модификаций...');
    isExtensionActive = true;
    changeAddressBadge();
}

function deactivateModifications() {
    console.log('Деактивация модификаций...');
    isExtensionActive = false;
    removeCarriages();
}

// Обработчик сообщений
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleExtension') {
        isExtensionActive = !isExtensionActive;
        chrome.storage.local.set({ extensionActive: isExtensionActive }, () => {
            if (isExtensionActive) {
                activateModifications();
            } else {
                deactivateModifications();
            }
            sendResponse({ status: isExtensionActive ? 'Активировано' : 'Деактивировано' });
        });
        return true;
    }
    if (message.action === 'toggleOverlay') {
        isOverlayActive = !isOverlayActive;
        chrome.storage.local.set({ overlayActive: isOverlayActive }, () => {
            updateOverlayUI();
            sendResponse({ overlayStatus: isOverlayActive ? 'Показано' : 'Скрыто' });
        });
        return true;
    }
});

const observer = new MutationObserver(mutations => {
    if (isExtensionActive) {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                console.log('Обнаружены изменения в DOM. Применяем изменения...');
                changeAddressBadge();
            }
        });
    }
});

// Наблюдаем за изменениями в body и всех его поддеревьях
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Обработчик события открытия панел
document.addEventListener('click', (e) => {
    if (e.target.closest('.ozi__menu-item__button__8Dv5a.ozi__menu-item__roundHover__8Dv5a')) {
        setTimeout(removeCarriages, 300); // Задержка для анимации
    }
});

// Восстановление состояния при загрузке
window.addEventListener('load', () => {
    checkExtensionState();
    chrome.storage.local.get(['overlayActive'], result => {
        isOverlayActive = result.overlayActive || false;
        updateOverlayUI();
    });
});
