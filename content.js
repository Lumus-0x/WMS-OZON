let isOverlayActive = false;
let isExtensionActive = false;
let isProcessing = false; // Флаг для блокировки рекурсии

function checkExtensionValidity() {
    try {
        return !!chrome.runtime?.id;
    } catch (e) {
        return false;
    }
}

function changeAddressBadge() {
    if (isProcessing || !checkExtensionValidity()) return;
    isProcessing = true;

    try {
        chrome.storage.local.get('renameSettings', function(result) {
            if (!checkExtensionValidity()) return;

            const settings = result.renameSettings || {};
            const elements = {
                outbound: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h2__ff2BT.ozi-heading-400.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT._title_85wpk_2'),
                versions: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__caption-small__ff2BT.ozi-body-400.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT.ozi__text-view__caption__ff2BT'),
                nameTab: document.querySelector('.ozi__logo__projectTitle__-H66N.ozi-heading-300'),
                profile: document.querySelector('.ozi__link-nuxt__linkNuxt__8oE33.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._user_yzupa_17'),
                claimsMain: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
                claimsNumber: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
                loginInfo: document.querySelector('._title_1w123_89.ozi-heading-700'),
                searchItemPole: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__paragraph-medium__ff2BT.ozi-body-500.ozi__text-view__light__ff2BT'),
            };

            if (elements.searchItemPole) {
                elements.searchItemPole.textContent = elements.searchItemPole.textContent
                    .trim()
                    .replace(/Введите или отсканируйте номер предмета/, settings.searchField || 'Введите или отсканируйте номер отправления');
            }

            if (elements.versions) {
                elements.versions.textContent = elements.versions.textContent
                    .trim()
                    .replace(/^Версия: 3\.2\.17/, settings.versionField || 'Кастомная WMS OZON 1.3.3');
                elements.versions.style.fontFamily = 'Pacifico, cursive';
                elements.versions.style.fontSize = '13px';
                elements.versions.style.color = '#778899';
            }

            if (elements.loginInfo) {
                elements.loginInfo.textContent = elements.loginInfo.textContent
                    .trim()
                    .replace(/^Управление заказами ПВЗ/, settings.loginTitle || 'Вход в систему OZON WMS');
            }

            if (elements.profile) {
                elements.profile.textContent = elements.profile.textContent
                    .trim()
                    .replace(/^PVZ_/, settings.profilePrefix || 'Оператор WMS ');
            }

            if (elements.nameTab) {
                elements.nameTab.textContent = elements.nameTab.textContent
                    .trim()
                    .replace(/^Турбо ПВЗ/, settings.tabName || 'OZON WMS');
            }

            if (elements.claimsNumber) {
                elements.claimsNumber.textContent = elements.claimsNumber.textContent
                    .trim()
                    .replace(/^Претензия/, settings.claimReplacement || 'Непонятная фигня ');
            }

            if (elements.claimsMain) {
                elements.claimsMain.textContent = elements.claimsMain.textContent
                    .trim()
                    .replace(/^Список обращений/, settings.claimListReplacement || 'Список бредней OZON');
            }

            if (isExtensionActive) {
                removeCarriages();
            }
        });
    } catch (e) {
        console.error('Storage access error:', e);
    } finally {
        isProcessing = false;
    }
}


function removeCarriages() {
    chrome.storage.local.get(['deleteSettings'], result => {
        const settings = result.deleteSettings || {};

        if (settings.remove_info_informers) {
            document.querySelectorAll('.ozi__informer__informer__HzSFx.ozi-body-500.ozi__informer__size-500__HzSFx.ozi__informer__info__HzSFx.ozi__informer__showAccentLine__HzSFx').forEach(el => el.remove());
        }
        
        if (settings.remove_breadcrumbs_separator) {
            document.querySelectorAll('.ozi__breadcrumbs__separator__DsxCI').forEach(el => el.remove());
        }
        
        if (settings.remove_filters) {
            document.querySelectorAll('._filter_nvofz_1._filterWithStores_nvofz_7').forEach(el => el.remove());
        }
        
        if (settings.remove_breadcrumb_labels) {
            document.querySelectorAll('.ozi__breadcrumb-content__label__PKDFH.ozi-body-500').forEach(el => el.remove());
        }
        
        if (settings.remove_qr_block) {
            document.querySelectorAll('._qrBlock_1w123_71').forEach(el => el.remove());
        }
        
        if (settings.remove_right_block) {
            document.querySelectorAll('._right_1w123_35').forEach(el => el.remove());
        }
        
        if (settings.remove_disclaimer) {
            document.querySelectorAll('._disclaimer_10nno_1.ozi-label-300').forEach(el => el.remove());
        }
        
        if (settings.remove_links) {
            document.querySelectorAll('.ozi__link-pseudo__linkPseudo__9vjoS.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._link_1w123_47.ozi-body-500-true._marginFromLink_1w123_55').forEach(el => el.remove());
        }
        
        if (settings.remove_islands) {
            document.querySelectorAll('.ozi__island__island__6OcbH.ozi-body-500.ozi__island__elevate__6OcbH.ozi__island__size-500__6OcbH.ozi__island__hoverable__6OcbH.ozi__island__cursor__6OcbH._button_1fzjv_1._toggler_1tvs3_23').forEach(el => el.remove());
        }

        // Удаление элементов меню по URL
        if (settings.remove_menu_items) {
            const menuItemsToRemove = [
                'https://turbo-pvz.ozon.ru/news',
                'https://turbo-pvz.ozon.ru/learning',
                'https://turbo-pvz.ozon.ru/bank/requests',
                'https://turbo-pvz.ozon.ru/address_storage',
                'https://turbo-pvz.ozon.ru/rating'
            ];

            document.querySelectorAll('.ozi__menu-item__menuItem__8Dv5a').forEach(button => {
                const linkElement = button.closest('a');
                if (linkElement && menuItemsToRemove.includes(linkElement.href)) {
                    button.remove();
                }
            });
        }

        // Удаление элементов меню по тексту
        if (settings.remove_outbound_items) {
            const menu_outbound = [
                'Тарные ящики',
                'Отзывы',      
                'Новости',
                'Обучение',
                'Адресное хранение'
            ];

            document.querySelectorAll('._item_1ghl9_1').forEach(button => {
                const textElement = button.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h4__ff2BT.ozi-heading-200.ozi__text-view__light__ff2BT');
                if (textElement && menu_outbound.includes(textElement.textContent.trim())) {
                    button.remove();
                }
            });
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
    if (!checkExtensionValidity()) return;

    try {
        chrome.storage.local.get(['extensionActive', 'overlayActive'], result => {
            if (!checkExtensionValidity()) return;
            
            isExtensionActive = result.extensionActive || false;
            isOverlayActive = result.overlayActive || false;
            if (isExtensionActive) {
                activateModifications();
            } else {
                deactivateModifications();
            }
            updateOverlayUI();
        });
    } catch (e) {
        console.error('Storage access error:', e);
    }
}

function activateModifications() {
    console.log('Активация модификаций...');
    isExtensionActive = true;
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
    changeAddressBadge();
}

function deactivateModifications() {
    console.log('Деактивация модификаций...');
    isExtensionActive = false;
    observer.disconnect();
    
    // Устанавливаем флаг в localStorage, чтобы знать, что перезагрузка уже была выполнена
    if (!localStorage.getItem('deactivationReload')) {
        localStorage.setItem('deactivationReload', 'true');
        window.location.reload();
    } else {
        // Сбрасываем флаг для будущих деактиваций
        localStorage.removeItem('deactivationReload');
    }
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
    if (message.action === 'applyDeleteSettings') {
        // Force apply delete settings immediately
        removeCarriages();
        sendResponse({ status: 'Applied' });
        return true;
    }
});

const observer = new MutationObserver((mutations) => {
    if (!isExtensionActive || isProcessing) return;

    let shouldUpdate = false;

    for (const mutation of mutations) {
        const isOverlay = Array.from(mutation.addedNodes).some(
            node => node.id === 'customOverlay'
        );
        if (mutation.type === 'childList' && !isOverlay) {
            shouldUpdate = true;
            break;
        }
    }

    if (shouldUpdate) {
        setTimeout(() => {
            changeAddressBadge();
        }, 100);
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
