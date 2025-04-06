document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const overlayButton = document.getElementById('overlayButton');
    const status = document.getElementById('status');
    const circle = document.querySelector('.circle');
    const overlayStatus = document.getElementById('overlayStatus');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const renameSettingsForm = document.getElementById('renameSettings');
    const deleteSettingsForm = document.getElementById('deleteSettings');
    const deleteSwitchesContainer = document.getElementById('deleteSwitches');

    // Конфигурация элементов для удаления
    const deleteConfig = [
        { 
            id: 'remove_info_informers',
            selector: '.ozi__informer__informer__HzSFx.ozi-body-500.ozi__informer__size-500__HzSFx.ozi__informer__info__HzSFx.ozi__informer__showAccentLine__HzSFx',
            label: 'Информационные уведомления'
        },
        { 
            id: 'remove_breadcrumbs_separator',
            selector: '.ozi__breadcrumbs__separator__DsxCI',
            label: 'Разделители'
        },
        { 
            id: 'remove_filters',
            selector: '._filter_nvofz_1._filterWithStores_nvofz_7',
            label: 'Фильтры'
        },
        { 
            id: 'remove_breadcrumb_labels',
            selector: '.ozi__breadcrumb-content__label__PKDFH.ozi-body-500',
            label: 'Метки навигации'
        },
        { 
            id: 'remove_qr_block',
            selector: '._qrBlock_1w123_71',
            label: 'QR-блок'
        },
        { 
            id: 'remove_right_block',
            selector: '._right_1w123_35',
            label: 'Правый блок'
        },
        { 
            id: 'remove_disclaimer',
            selector: '._disclaimer_10nno_1.ozi-label-300',
            label: 'Дисклеймер'
        },
        { 
            id: 'remove_links',
            selector: '.ozi__link-pseudo__linkPseudo__9vjoS.ozi__link-common__onLight__QaR0v.ozi__link-common__primary__QaR0v._link_1w123_47.ozi-body-500-true._marginFromLink_1w123_55',
            label: 'Элементы меню'
        },
        { 
            id: 'remove_islands',
            selector: '.ozi__island__island__6OcbH.ozi-body-500.ozi__island__elevate__6OcbH.ozi__island__size-500__6OcbH.ozi__island__hoverable__6OcbH.ozi__island__cursor__6OcbH._button_1fzjv_1._toggler_1tvs3_23',
            label: 'Всплывающие элементы меню'
        },
        { 
            id: 'remove_menu_items',
            type: 'menu',
            items: [
                'https://turbo-pvz.ozon.ru/news',
                'https://turbo-pvz.ozon.ru/learning',
                'https://turbo-pvz.ozon.ru/bank/requests',
                'https://turbo-pvz.ozon.ru/address_storage',
                'https://turbo-pvz.ozon.ru/rating'
            ],
            label: 'Элементы меню (ссылки)'
        },
        { 
            id: 'remove_outbound_items',
            type: 'outbound',
            items: [
                'Тарные ящики',
                'Отзывы',
                'Новости',
                'Обучение',
                'Адресное хранение'
            ],
            label: 'Элементы меню (текст)'
        }
    ];

    function checkExtensionValidity() {
        try {
            return !!chrome.runtime?.id;
        } catch (e) {
            return false;
        }
    }

    function updateUI(isActive) {
        if (!checkExtensionValidity()) return;
        
        toggleButton.textContent = isActive ? 'Отключить все модификации' : 'Включить все модификации';
        status.textContent = `Статус: ${isActive ? 'активировано' : 'неактивно'}`;
        circle.style.backgroundColor = isActive ? '#00cc66' : '#ff0000';
    }

    function updateOverlayStatusUI(isOverlayActive) {
        if (!checkExtensionValidity()) return;
        
        overlayStatus.textContent = isOverlayActive ? 'Блокировка включена' : 'Блокировка выключена';
        overlayStatus.style.color = isOverlayActive ? '#00cc66' : '#ff0000';
    }

    function reloadTurboPvzTabs() {
        if (!checkExtensionValidity()) return;
        
        try {
            chrome.tabs.query({ url: "https://turbo-pvz.ozon.ru/*" }, (tabs) => {
                tabs.forEach(tab => {
                    if (tab.id) chrome.tabs.reload(tab.id, { bypassCache: true });
                });
            });
        } catch (e) {
            console.error('Tabs API error:', e);
        }
    }

    function renderDeleteSwitches(settings) {
        if (!checkExtensionValidity()) return;
        
        try {
            deleteSwitchesContainer.innerHTML = deleteConfig.map(item => `
                <div class="switch">
                    <label for="${item.id}">${item.label}</label>
                    <div class="switch-control">
                        <input type="checkbox" 
                               id="${item.id}" 
                               ${settings[item.id] ? 'checked' : ''}>
                        <span class="slider"></span>
                    </div>
                </div>
            `).join('');
            
            // Add click event listeners to each switch
            deleteConfig.forEach(item => {
                const switchElement = document.getElementById(item.id);
                if (switchElement) {
                    // Add a click event listener to the parent switch div to improve clickability
                    const parentSwitch = switchElement.closest('.switch');
                    if (parentSwitch) {
                        parentSwitch.addEventListener('click', function(e) {
                            // Only toggle if the click wasn't directly on the checkbox
                            // (to avoid double-toggling)
                            if (e.target !== switchElement) {
                                switchElement.checked = !switchElement.checked;
                            }
                        });
                    }
                }
            });
        } catch (e) {
            console.error('Render error:', e);
        }
    }

    // Инициализация
    if (checkExtensionValidity()) {
        chrome.storage.local.get(
            ['extensionActive', 'overlayActive', 'renameSettings', 'deleteSettings'],
            function(result) {
                const extensionActive = result.extensionActive ?? false;
                const overlayActive = result.overlayActive ?? false;

                updateUI(extensionActive);
                updateOverlayStatusUI(overlayActive);

                if (result.renameSettings) {
                    Object.entries(result.renameSettings).forEach(([key, value]) => {
                        const input = document.getElementById(key);
                        if (input) input.value = value;
                    });
                }

                renderDeleteSwitches(result.deleteSettings || {});
            }
        );
    }

    // Обработчики событий
    toggleButton.addEventListener('click', () => {
        if (!checkExtensionValidity()) return;
        
        try {
            chrome.storage.local.get('extensionActive', ({ extensionActive }) => {
                const newState = !extensionActive;
                chrome.storage.local.set({ extensionActive: newState }, () => {
                    updateUI(newState);
                    reloadTurboPvzTabs();
                });
            });
        } catch (e) {
            console.error('Storage error:', e);
        }
    });

    overlayButton.addEventListener('click', () => {
        if (!checkExtensionValidity()) return;
        
        try {
            chrome.storage.local.get('overlayActive', ({ overlayActive }) => {
                const newState = !overlayActive;
                chrome.storage.local.set({ overlayActive: newState }, () => {
                    updateOverlayStatusUI(newState);
                    
                    chrome.tabs.query({ url: "https://turbo-pvz.ozon.ru/*" }, tabs => {
                        tabs.forEach(tab => {
                            if (tab.id) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tab.id },
                                    func: () => typeof changeAddressBadge !== 'undefined'
                                }, (results) => {
                                    if (results?.[0]?.result) {
                                        chrome.tabs.sendMessage(tab.id, { action: 'toggleOverlay' });
                                    } else {
                                        chrome.tabs.reload(tab.id);
                                    }
                                });
                            }
                        });
                    });
                });
            });
        } catch (e) {
            console.error('Overlay error:', e);
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!checkExtensionValidity()) return;
            
            const tabName = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    renameSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!checkExtensionValidity()) return;
        
        try {
            const settings = {
                searchField: this.searchField.value,
                versionField: this.versionField.value,
                loginTitle: this.loginTitle.value,
                profilePrefix: this.profilePrefix.value,
                tabName: this.tabName.value,
                claimReplacement: this.claimReplacement.value,
                claimListReplacement: this.claimListReplacement.value
            };
            
            chrome.storage.local.set({ renameSettings: settings }, () => {
                reloadTurboPvzTabs();
            });
        } catch (e) {
            console.error('Save settings error:', e);
        }
    });

    deleteSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!checkExtensionValidity()) return;
        
        try {
            const settings = {};
            deleteConfig.forEach(item => {
                settings[item.id] = document.getElementById(item.id).checked;
            });
            
            chrome.storage.local.set({ deleteSettings: settings }, () => {
                // First, make sure the extension is active
                chrome.storage.local.get('extensionActive', ({ extensionActive }) => {
                    if (!extensionActive) {
                        // If extension is not active, activate it first
                        chrome.storage.local.set({ extensionActive: true }, () => {
                            updateUI(true);
                            // Send message to apply settings immediately, then reload tabs
                            chrome.tabs.query({ url: "https://turbo-pvz.ozon.ru/*" }, (tabs) => {
                                tabs.forEach(tab => {
                                    if (tab.id) {
                                        // Try to apply settings immediately
                                        chrome.tabs.sendMessage(tab.id, { action: 'applyDeleteSettings' }, () => {
                                            // Reload tab regardless of message success
                                            chrome.tabs.reload(tab.id, { bypassCache: true });
                                        });
                                    }
                                });
                            });
                        });
                    } else {
                        // If extension is already active, send message to apply settings immediately, then reload tabs
                        chrome.tabs.query({ url: "https://turbo-pvz.ozon.ru/*" }, (tabs) => {
                            tabs.forEach(tab => {
                                if (tab.id) {
                                    // Try to apply settings immediately
                                    chrome.tabs.sendMessage(tab.id, { action: 'applyDeleteSettings' }, () => {
                                        // Reload tab regardless of message success
                                        chrome.tabs.reload(tab.id, { bypassCache: true });
                                    });
                                }
                            });
                        });
                    }
                });
            });
        } catch (e) {
            console.error('Delete settings error:', e);
        }
    });
});
