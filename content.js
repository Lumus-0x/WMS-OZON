let isExtensionActive = false;

function activateModifications() {
    console.log('Активация модификаций...');
    isExtensionActive = true;
    changeAddressBadge();
    addProfileCreatedText();
}

function deactivateModifications() {
    console.log('Деактивация модификаций...');
    isExtensionActive = false;
    removeCarriages();
    removeProfileCreatedText();
}

function checkExtensionState() {
    chrome.storage.local.get(['extensionActive'], result => {
        isExtensionActive = result.extensionActive || false;
        if (isExtensionActive) {
            activateModifications();
        } else {
            deactivateModifications();
        }
    });
}

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
});

function removeProfileCreatedText() {
    const profileText = document.querySelector('div[style*="Созданно Ануфриевым С.Л"]');
    if (profileText) {
        profileText.remove();
    }
}

function changeAddressBadge() {
    const elements = {
        addressBadges: document.querySelectorAll('._addressBadge_1kmk7_1.ozi-heading-500'),
        nameTab: document.querySelector('.ozi__logo__projectTitle__-H66N.ozi-heading-300'),
        addressPriem: document.querySelector('._addressBadge_mor7k_87.ozi-heading-500._addressBadgeDefault_mor7k_114'),
        profile: document.querySelector('.ozi__link-nuxt__linkNuxt__8oE33.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._user_yzupa_17'),
        claimsMain: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingTopOff__ff2BT'),
        claimsNumber: document.querySelector('.ozi__text-view__textView__ff2BT.ozi__text-view__headline-h1__ff2BT.ozi-heading-600.ozi__text-view__light__ff2BT.ozi__text-view__paddingBottomOff__ff2BT.ozi__text-view__paddingTopOff__ff2BT')
    };


    if (elements.addressPriem) {
        const newAddress = elements.addressPriem.textContent.trim().startsWith('600-') ? 'КГТ-1' : 
                          elements.addressPriem.textContent.trim().startsWith('599-') ? 'КГТ-2' : 
                          elements.addressPriem.textContent;
        elements.addressPriem.textContent = newAddress;
    }
    elements.addressBadges.forEach(badge => {
        badge.textContent = badge.textContent.trim().startsWith('600-') ? 'КГТ-1' : 
                           badge.textContent.trim().startsWith('599-') ? 'КГТ-2' : 
                           badge.textContent;
    });

    if (elements.profile) {
        elements.profile.textContent = elements.profile.textContent.trim().replace(/^PVZ_/, 'Оператор WMS ');
    }

    if (elements.nameTab) {
        elements.nameTab.textContent = elements.nameTab.textContent.trim().replace(/^Турбо ПВЗ/, 'OZON WMS');
    }

    if (elements.claimsNumber) {
        elements.claimsNumber.textContent = elements.claimsNumber.textContent.trim().replace(/^Претензия/, 'Непонятная хуетень ');
    }

    if (elements.claimsMain) {
        elements.claimsMain.textContent = elements.claimsMain.textContent.trim().replace(/^Список обращений/, 'Список хуйни и бреда');
    }

    removeCarriages();
}

function removeCarriages() {
    const selectorsToRemove = [
        '.ozi__breadcrumbs__separator__DsxCI',
        '._filter_nvofz_1._filterWithStores_nvofz_7',
        '.ozi__breadcrumb-content__label__PKDFH.ozi-body-500',
        '.ozi__informer__informer__HzSFx.ozi-body-500.ozi__informer__size-500__HzSFx.ozi__informer__info__HzSFx.ozi__informer__showAccentLine__HzSFx',
        '.ozi__informer__informer__HzSFx.ozi-body-500.ozi__informer__size-500__HzSFx.ozi__informer__warning__HzSFx.ozi__informer__showAccentLine__HzSFx',
        '.ozi__island__island__6OcbH.ozi-body-500.ozi__island__elevate__6OcbH.ozi__island__size-500__6OcbH.ozi__island__hoverable__6OcbH.ozi__island__cursor__6OcbH._button_1fzjv_1._toggler_1tvs3_23'

    ];

    selectorsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.remove();
    });

    const buttons = document.querySelectorAll('.ozi__data-cell__dataCell__QUywL');
    buttons.forEach(button => {
        const linkHref = button.closest('a')?.href;
        if (['https://turbo-pvz.ozon.ru/news', 
             'https://turbo-pvz.ozon.ru/learning',
             'https://turbo-pvz.ozon.ru/bank/requests',
             'https://turbo-pvz.ozon.ru/address_storage',
             'https://turbo-pvz.ozon.ru/rating'].includes(linkHref)) {
            button.remove();
        }
    });
}

function addProfileCreatedText() {
    const profileText = document.createElement('div');
    profileText.textContent = 'Созданно Ануфриевым С.Л';
    profileText.style.position = 'fixed';
    profileText.style.bottom = '10px';
    profileText.style.right = '10px';
    profileText.style.color = 'white';
    profileText.style.padding = '10px';
    profileText.style.zIndex = '1000';
    document.body.appendChild(profileText);
}

const observer = new MutationObserver(mutations => {
    if (isExtensionActive) {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                changeAddressBadge();
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
    checkExtensionState();
});
