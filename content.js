let isExtensionActive = false;
let isOverlayActive = false;

function changeAddressBadge() {
    const elements = {
        outbound: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h2__ff2BT.ozi-heading-400.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT._title_85wpk_2'),
        versions: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__caption-small__ff2BT.ozi-body-400.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT.ozi__text-view__caption__ff2BT'),
        nameTab: document.querySelector('.ozi__logo__projectTitle__-H66N.ozi-heading-300'),
        profile: document.querySelector('.ozi__link-nuxt__linkNuxt__8oE33.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._user_yzupa_17'),
        claimsMain: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
        claimsNumber: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
        loginInfo: document.querySelector('._title_1w123_89.ozi-heading-700'),
        serachItemPole: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__paragraph-medium__ff2BT.ozi-body-500.ozi__text-view__light__ff2BT'),    };

    if (elements.serachItemPole) {
        elements.serachItemPole.textContent = elements.serachItemPole.textContent.trim().replace(/Введите или отсканируйте номер предмета/, 'Введите или отсканируйте номер отправления');
    }
    
    if (elements.versions) {
        elements.versions.textContent = elements.versions.textContent.trim().replace(/^Версия: 3.2.9/, 'Кастомная WMS OZON 1.2.4.1');
        elements.versions.style.fontFamily = 'Pacifico, cursive';
        elements.versions.style.fontSize = '13px';
        elements.versions.style.color = '#778899';
    }

    if (elements.loginInfo) {
        elements.loginInfo.textContent = elements.loginInfo.textContent.trim().replace(/^Управление заказами ПВЗ/, 'Вход в систему OZON WMS');
    }

    if (elements.profile) {
        elements.profile.textContent = elements.profile.textContent.trim().replace(/^PVZ_/, 'Оператор WMS ');
    }

    if (elements.nameTab) {
        elements.nameTab.textContent = elements.nameTab.textContent.trim().replace(/^Турбо ПВЗ/, 'OZON WMS');
    }

    if (elements.claimsNumber) {
        elements.claimsNumber.textContent = elements.claimsNumber.textContent.trim().replace(/^Претензия/, 'Непонятная фигня ');
    }

    if (elements.claimsMain) {
        elements.claimsMain.textContent = elements.claimsMain.textContent.trim().replace(/^Список обращений/, 'Список бредней OZON');
    }

    if (isExtensionActive) {
        removeCarriages();
    }
}

function removeCarriages() {
    // Удаление специфичного элемента с проверкoй текста
    document.querySelectorAll('.ozi__informer__informer__HzSFx.ozi__informer__warning__HzSFx').forEach(element => {
        const warningText = element.querySelector('.ozi__data-content__label__tXF2r');
        if (warningText && warningText.textContent.trim() === 'Возврат товаров без заявки запрещен') {
            element.remove();
            console.log('Целевой элемент удален');
        }
    });

    const selectorsToRemove = [
        '.ozi__breadcrumbs__separator__DsxCI',
        '._filter_nvofz_1._filterWithStores_nvofz_7',
        '.ozi__breadcrumb-content__label__PKDFH.ozi-body-500',
        '._qrBlock_1w123_71',
        '._right_1w123_35',
        '._disclaimer_10nno_1.ozi-label-300',
        '.ozi__link-pseudo__linkPseudo__9vjoS.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._link_1w123_47.ozi-body-500-true._marginFromLink_1w123_55',
        '.ozi__island__island__6OcbH.ozi-body-500.ozi__island__elevate__6OcbH.ozi__island__size-500__6OcbH.ozi__island__hoverable__6OcbH.ozi__island__cursor__6OcbH._button_1fzjv_1._toggler_1tvs3_23'
    ];

    selectorsToRemove.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });

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

    const menu_outbound = [
        'Тарные ящики',
        'Отзывы',      
        'Новости',
        'Обучение',
        'Адресное хранение'
    ];

    document.querySelectorAll('._item_1ghl9_1').forEach(button => {
        const linkText = button.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h4__ff2BT.ozi-heading-200.ozi__text-view__light__ff2BT')?.textContent?.trim();
        if (menu_outbound.includes(linkText)) {
            button.remove();
        }
    });
}

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

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', '64');
            svg.setAttribute('height', '64');
            svg.setAttribute('viewBox', '0 0 32 32');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M16.0108 1C7.72377 0.994594 1.00541 7.70754 1 15.9892C0.994594 24.2762 7.70754 30.9946 15.9892 31C24.2708 31.0054 30.9946 24.2925 31 16.0108C31 16.0054 31 16 31 15.9892C31 7.71295 24.2871 1 16.0108 1ZM24.0058 15.9892C24.0058 20.4086 20.4248 23.9895 16.0108 23.9949C11.5914 24.0004 7.99964 20.4194 7.99423 16C7.98882 11.5806 11.5698 7.98882 15.9892 7.98341C20.4086 7.978 24.0004 11.559 24.0058 15.9784V15.9892Z');
            path.setAttribute('fill', '#005BFF');
            svg.appendChild(path);

            const text = document.createElement('p');
            text.textContent = 'Система закрыта для выдачи и других операций до 9:00 по МСК';
            text.style.color = 'white';
            text.style.fontSize = '24px';
            text.style.textAlign = 'center';
            text.style.marginTop = '20px';

            overlay.appendChild(svg);
            overlay.appendChild(text);
            document.body.appendChild(overlay);
        }
    } else {
        if (existingOverlay) {
            existingOverlay.remove();
        }
    }
}

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
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleExtension') {
        isExtensionActive = !isExtensionActive;
        chrome.storage.local.set({ extensionActive: isExtensionActive }, () => {
            if (isExtensionActive) {
                activateModifications();
            } else {
                window.location.reload();
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

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

document.addEventListener('click', (e) => {
    if (isExtensionActive && e.target.closest('.ozi__menu-item__button__8Dv5a.ozi__menu-item__roundHover__8Dv5a')) {
        setTimeout(removeCarriages, 300);
    }
});

window.addEventListener('load', () => {
    checkExtensionState();
    chrome.storage.local.get(['overlayActive'], result => {
        isOverlayActive = result.overlayActive || false;
        updateOverlayUI();
    });
});
