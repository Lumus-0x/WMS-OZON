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

    if (elements.nameTab) {
        elements.nameTab.textContent = elements.nameTab.textContent.trim().replace(/^Турбо ПВЗ/, 'OZON WMS');
    }

    if (elements.profile) {
        elements.profile.textContent = elements.profile.textContent.trim().replace(/^PVZ_/, 'Оператор WMS ');
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
        '._carriagesInfoWidget_1n5pn_1',
        '._filter_n3ctm_18',
        '._filter_nvofz_1._filterWithStores_nvofz_7',
        '.ozi__breadcrumb-content__label__PKDFH.ozi-body-500',
        '.ozi__breadcrumbs__separator__DsxCI'
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

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            changeAddressBadge();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
    changeAddressBadge();
    setInterval(changeAddressBadge, 1000);
});