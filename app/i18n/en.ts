import { Translations } from './zh';

const en: Translations = {
  common: {
    ok: 'OK',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    second: 'Seconds',
    minute: 'Minutes',
    hour: 'Hours',
    appName: 'Privacy Box',
    coming: 'Coming Soon...',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    closed: 'Closed',
    opened: 'Opened',
    open: 'Open',
    close: 'Close',
    done: 'Done',
    noData: 'No Data',
    rename: 'Rename',
    delete: 'Delete',
    share: 'Share',
    save: 'Save',
  },
  contentNavigator: {
    albumTab: 'Albums',
    filesTab: 'Files',
    moreTab: 'More',
    settingsTab: 'Settings',
  },
  errorScreen: {
    title: 'Something went wrong.',
    reset: 'Try Again',
    feedback: 'Feedback',
  },
  dbSeeds: {
    picture: 'Pictures 🏞️',
    video: 'Videos 📀',
    folder: 'Default folder 🗂️',
  },
  dataMigratorScreen: {
    title: 'Old Version Data Migration',
    success: 'Migration Succeeded',
    fail: 'Migration Failed',
    tip: 'Do not close this page',
    doing: 'Migrating Old Version Data',
    someFailTitle: 'Whether to export data that failed to migrate',
    someFailMsg: 'You can export it later in Settings > Advanced Settings',
    export: 'Export',
  },
  albumsScreen: {
    title: 'Albums',
    searchPlaceholder: 'Albums, Images and Videos',
    editAlbum: {
      title: 'Edit Album',
      changeName: 'Rename',
      delete: 'Delete Album',
      rename: 'Rename',
    },
    createAlbum: {
      title: 'New Album',
      message: 'Please enter the album name',
      placeholder: 'Album name (within 20 characters)',
      success: 'Created successfully',
      fail: 'Failed to create album',
      sameName: 'Album names cannot be the same',
    },
    renameAlbum: {
      title: 'Modify album name',
      message: 'Please enter a new name for the album',
      success: 'Renamed successfully',
      fail: 'Rename failed',
    },
    deleteAlbum: {
      title: 'Confirm Deletion',
      success: 'Delete successful',
      fail: 'Delete failed',
      doing: 'Deleting...',
    },
  },
  photoSearchPanel: {
    all: 'All',
    album: 'Albums',
    image: 'Images',
    video: 'Videos',
  },
  photosScreen: {
    import: {
      photos: 'Album',
      document: 'Files',
      camera: 'Camera',
      download: 'Download',
    },
    export: {
      success: 'Exported',
      fail: 'Export Failed',
      message: 'Number of export failures: {{count}}',
    },
    subtitle: {
      photo: '{{count}} photos',
      video: '{{count}} videos',
    },
    delete: {
      title: 'These {{count}} items will be deleted',
      softDeleteMsg: 'It can be recovered in the recycle bin after deletion',
      deleteMsg: 'The recycle bin is closed and cannot be restored after deletion',
    },
    moveToAlbum: {
      title: 'Move to Album',
      success: 'Moved',
      fail: 'Move Failed',
    },
  },
  photoViewerScreen: {
    bottomToolbar: {
      more: 'More',
      description: 'Modify description',
      moreTitle: 'More operations',
      descPlaceholder: 'Please enter a description',
    },
  },
  videoPlayerScreen: {
    airplayTip: 'Airplaying',
    autoPausedTip: 'Paused playback',
  },
  settingsScreen: {
    purchaseBanner: {
      title: 'Privacy Box Premium',
      subtitle: 'A complete features experience can be obtained after activation',
      purchasedSubtitle: 'Click to view all features',
      button: 'Get',
    },
    hapticFeedbackSwitch: 'Haptic Feedback',
    language: 'Language',
    preference: 'GENERAL',
    security: 'SECURITY',
    help: 'HELP & SUPPORT',
    feedback: 'Feedback',
    share: 'Share',
    FAQ: 'FAQ',
  },
  appearanceScreen: {
    title: 'Appearance & Icon',
    appearanceColor: {
      title: 'COLOR MODE',
      auto: 'Follow the system',
      light: 'Light',
      dark: 'Dark',
    },
    appIcon: {
      title: 'APP ICON',
      tip: "If it doesn't take effect, please try to restart the phone",
    },
  },
  aboutScreen: {
    title: 'About',
    version: 'Version',
    changelog: 'Changelog',
    review: 'Give a Good Review',
    agreement: 'Agreement',
    private: 'Privacy Policy',
    userAgreement: 'User Agreement',
    connect: 'Contact us',
    email: 'Developer Email',
    qqGroup: 'QQ Feedback Group',
    emailCopied: 'Email has been copied',
    qqGroupCopied: 'QQ group number has been copied',
    checkingUpdate: 'Checking for update',
    checkUpdate: 'Check for New Version',
  },
  debugScreen: {
    title: 'Debug',
  },
  purchaseScreen: {
    title: 'Privacy Box Premium',
    subtitle: 'Complete Features Experience',
    purchasing: 'Purchasing',
    purchaseSuccess: 'Purchase Successful',
    purchaseFail: 'Purchase Failed',
    purchased: 'Purchased',
    restore: 'Restore',
    restoring: 'Restoring Purchase',
    restoreSuccess: 'Restore Purchase Successful',
    restoreFail: 'Failed to Restore Purchases',
    restoreFailMessage: 'Please Buy First',
    help: 'The Apple account will be credited after the user confirms the purchase and pays. If you have any questions, please ',
    connect: 'Contact us.',
    buyButton: '{{ price }} Purchase',
    moreFeatures: 'More features coming soon...',
    fetchInfoFailTitle: 'Failed to fetch in-app purchase',
    fetchInfoFailMessage: 'Please try again later',
    cardButton: 'Get',
    features: {
      icloud: 'iCloud sync data',
      fakeHome: 'Fake App Homepage',
      hideApp: 'Hide any App from the device',
      transfer: 'WI-FI unlimited transfer',
      changeAppIcon: 'Change App Icon',
      scanDocument: 'Scan document',
      smartSearch: 'Smart Search',
      keepDuration: 'Recycle bin retention duration',
      more: 'More features coming soon',
    },
  },
  appLockScreen: {
    faceId: 'Face ID',
    touchId: 'Fingerprint',
    unlock: 'Unlock App',
    enterPassword: 'Please Enter a Passcode',
    passcodeLength: 'Passcode Length',
    biometricsAuthFailed: 'Validation Failed',
  },
  changeLockPasscodeScreen: {
    createPasscode: 'Please Create an Unlock Passcode',
    confirmCreatedPasscode: 'Confirm Passcode',
    changePasscode: 'Please set a New Passcode',
    confirmPasscode: 'Confirm new Passcode',
    changeFakePasscode: 'Please Set a Fake Passcode',
    confirmFakePasscode: 'Confirm the Fake Passcode',
    reset: 'Reset Passcode',
    samePrompt: 'Cannot be the same as the master password',
  },
  appLockSettingsScreen: {
    title: 'Passcode Lock',
    sectionTitle: 'Master Password',
    autolockTimeout: 'Auto Lock',
    biometrics: 'Use {{ name }} to unlock',
    changePasscode: 'Change Passcode',
    autoTriggerBiometrics: 'Automatically trigger {{ name }} unlock',
    autolockTimeoutDisabled: 'Immediately',
    autolockTimeoutTip:
      'After switching to other apps, it will be automatically locked after the following selected time interval',
  },
  fakeAppLockSettingsScreen: {
    title: 'Pretend Passcode',
    fakePasscodeSwitch: 'Enable Fake Passcode',
    changeFakePasscode: 'Change the Fake Passcode',
    hideBiometricsWhenFake: 'Hide the {{ name }} button on the unlock interface',
    bottomTabDarkle: 'Darken Bottom Tabs',
  },
  advancedSettingsScreen: {
    title: 'Advanced Settings',
    importImageAfterDelete: 'Prompt to Delete Original Photos After Import',
    importImageAfterDeleteTip:
      'After importing pictures/videos, a confirmation box will pop up whether to delete them from the system album',
    smartSearch: 'Smart Search',
    smartSearchTip: 'After opening, it can identify the content of the image to search',
    bottomTabVisible: 'Display and hide bottom navigation items',
    dataExport: 'Data Export',
    exceptionDataExport: 'Export migration failed data',
    allPhotoExport: 'Export all pictures and videos',
    allFileExport: 'Export all files',
    dest: {
      title: 'Export pictures and videos to the following location',
      album: 'Album',
      file: 'file',
    },
    clear: {
      title: 'Clean Cache',
      success: 'Cleaned',
      fail: 'Failed to Clean Cache',
    },
    assetRepresentationMode: {
      title: 'Picture/Video Import Mode',
      description:
        'It will affect the speed and compatibility of imported pictures/videos, it is recommended to use the default mode',
      menu: {
        auto: {
          title: 'Default',
          description: 'Use the best format',
        },
        compatible: {
          title: 'Compatibility',
          description: 'Compatibility is better, but the import speed is slower',
        },
        current: {
          title: 'Original',
          description:
            'The import speed is fast, but it may not be available on non-iPhone devices',
        },
      },
    },
  },
  thirdPartyApp: {
    browser: 'Browser',
    email: 'Email',
    note: 'Note',
    qq: 'QQ',
    wechat: 'WeChat',
    weixin: 'WeChat',
    douyin: 'Douyin',
    tikTok: 'TikTok',
    kwai: 'Kwai',
    bilibili: 'Bilibili',
    album: 'Photos',
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
  },
  appIconName: {
    default: 'Default',
    calculator: 'Calculator',
    passwordBox: 'Password Box',
    clock: 'Clock',
    housekeeper: 'Security',
    todo: 'TO-DO',
    weather: 'Weather',
    news: 'News',
    old: 'Skeuomorphism',
  },
  urgentSwitchScreen: {
    title: 'Urgent Switch',
    targetHeader: 'Select App',
    targetTip: 'When the device triggers the jump action, it will jump to the selected application',
    actionSectionTitle: 'Trigger Action',
    actionShake: 'Shake',
    actionFaceDown: 'Screen Face Down',
    uninstall: 'The app is not installed',
    openFail: 'Unable to open the app',
  },
  fakeAppHomeScreen: {
    removeInfo: 'Remove Image Privacy Info',
    faceMosaic: 'Face Mosaic',
    exif: 'View Image Privacy Info',
    highlightMosaic: 'QR Code Mosaic',
    textMosaic: 'Text Mosaic',
  },
  exifScreen: {
    import: 'Import',
    save: 'Save',
    exif: 'Image Privacy Info',
    removeExtra: 'Image privacy info has been removed',
  },
  fakeAppHomeSettingsScreen: {
    title: 'Fake Home Page',
    fakeHomeEnabled: 'Enable Fake Home Page',
    unlockAction: 'Unlock Methods',
    pullRefresh: 'Pull Down to Refresh',
    slide: 'Slide to The Left',
    shake: 'Shake',
  },
  moreFeatureScreen: {
    title: 'More Features',
  },
  icloudScreen: {
    title: 'iCloud Sync',
    subtitle: 'Multi-device synchronization',
    autoSyncEnabled: 'Enable automatic synchronization',
    onlyWifi: 'Sync only under Wi-Fi',
  },
  wastebasketScreen: {
    title: 'Recycle Bin',
    recover: 'Recover',
    delete: 'Delete',
    recoverAll: 'Recover All',
    deleteAll: 'Delete All',
    deleteTitle: 'Cannot be restored after deletion',
  },
  recycleBinSettingsScreen: {
    title: 'Recycle Bin Settings',
    tip: 'Retain up to {{ duration }} days, after which it will be permanently deleted. ',
    enableTip:
      'The recycle bin is closed, it can be opened in the settings in the upper right corner. ',
    enableHeader: 'After closing, deleted files cannot be restored',
    enableTitle: 'Enable Recycle Bin',
    durationHeader: 'Reserved days',
    day: ' days',
  },
  transferScreen: {
    title: 'WI-FI Transfer',
    subtitle: 'Cross-platform speed transfer',
    tip1: 'Open the following URL by entering or scanning the QR code in the browser of your computer or other devices. ',
    tip2: 'Must be connected to the same WI-FI, please do not leave this page',
    errorTip: 'Please check the WI-FI connection',
    connectFail: 'Connection failed, please try again! ',
    wifiTip: 'Please turn on WI-FI and try again',
  },
  hideApplicationsScreen: {
    title: 'Hide Apps',
    subtitle: 'Hide the app you specified from the device',
    enabled: 'Open Hidden',
    selection: 'Select App to Hide',
    notSupported: 'This feature only supports iOS 16 and above, please upgrade the system version',
    permission: 'Please grant Screen Time access restrictions to use this function normally',
  },
  applicationPickerScreen: {
    title: 'Choose the app that needs to be hidden',
  },
  filesScreen: {
    title: 'Files',
    saveToLocal: 'Save to Local',
    move: 'Move',
    items: 'items',
    select: 'Select',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    sort: 'Sort',
    sortSize: 'Size',
    sortCtime: 'Created Date',
    sortName: 'Name',
    import: {
      folder: 'New Folder',
      scan: 'Scan Documents',
      document: 'Files',
      success: 'Imported successfully',
      fail: 'Import failed',
      doing: 'Importing...',
      nonsupport: {
        msg: 'The current device does not support this function',
      },
    },
    folderForm: {
      title: 'New Folder',
      msg: 'Please enter a new folder name',
      placeholder: 'Folder name (within 50 characters)',
    },
    rename: {
      placeholder: 'File name (within 255 chars)',
      success: 'Renamed successfully',
      fail: 'Rename failed',
    },
    createFolder: {
      success: 'The folder was created successfully',
      fail: 'Failed to create folder',
    },
    detail: {
      title: 'Details',
      name: 'Name',
      type: 'Type',
      size: 'Size',
      ctime: 'Created Date',
      importTime: 'Imported Date',
      duration: 'Duration',
      resolution: 'Resolution',
      description: 'Description',
      labels: 'Labels',
    },
    types: {
      text: 'Text',
      image: 'Image',
      audio: 'Audio',
      video: 'Video',
      application: 'Application',
      model: 'Model',
      folder: 'Folder',
      unknown: 'Unknown',
    },
    deleteMsg: 'Deleted cannot be recovered',
  },
  permissionManager: {
    camera: 'Camera',
    microphone: 'Microphone',
    faceID: 'Face ID',
    photoLibrary: 'Photo Library',
    mediaLibrary: 'Media Library',
    motion: 'Motion',
    unavailable: '{{permission}} unavailable',
    blocked:
      'Please go to settings to grant {{permissions}} permission to use this function normally',
    openSettings: 'Open Settings',
    allPhotos: {
      title: 'Visit all photos',
      message:
        'Please grant permission to access all photos in order to use this function normally',
    },
    noPermission: 'No access permission',
  },
  appUpdate: {
    alert: {
      title: 'New Version Found (V{{version}})',
      ok: 'Update',
      next: 'Next',
      ignore: 'Ignore',
    },
  },
};

export default en;
export { Translations };
