const ja = {
  common: {
    ok: '了解',
    confirm: '確認',
    cancel: 'キャンセル',
    back: '戻る',
    second: '秒',
    minute: '分',
    hour: '時間',
    appName: 'プライバシーボックス',
    coming: '近日公開...',
    enable: '有効化する',
    disable: '無効化する',
    enabled: '有効化済み',
    disabled: '無効化済み',
    closed: '閉じる',
    opened: '開く',
    open: '開く',
    close: '閉じる',
    done: '完了',
    noData: 'データなし',
    rename: '名前の変更',
    delete: '削除',
    share: '共有',
    save: '保存',
  },

  contentNavigator: {
    albumTab: 'アルバム',
    filesTab: 'ファイル',
    moreTab: 'その他の機能',
    settingsTab: '設定',
  },

  errorScreen: {
    title: 'エラーが発生しました',
    reset: '再起動',
    feedback: 'フィードバック',
  },

  dbSeeds: {
    picture: '写真 🏞️',
    video: '動画 📀',
    folder: 'デフォルトフォルダ 🗂️',
  },

  dataMigratorScreen: {
    title: '古いバージョンのデータ移行',
    success: '移行成功',
    fail: '移行失敗',
    tip: 'このページを閉じないでください',
    doing: '古いバージョンのデータを移行中',
    someFailTitle: '移行失敗データのエクスポート',
    someFailMsg: '後で設定→詳細設定からエクスポートできます',
    export: 'エクスポート',
  },

  albumsScreen: {
    title: 'アルバム',
    searchPlaceholder: 'アルバム、写真、動画を検索',
    editAlbum: {
      title: 'アルバムを編集',
      changeName: '名前を変更',
      delete: 'アルバムを削除',
      rename: '名前の変更',
    },
    createAlbum: {
      title: '新しいアルバム',
      message: 'アルバム名を入力してください',
      placeholder: 'アルバム名(255文字以内)',
      success: 'アルバムを作成しました',
      fail: 'アルバムの作成に失敗しました',
      sameName: '同じ名前のアルバムは作成できません',
    },
    renameAlbum: {
      title: 'アルバム名を変更',
      message: '新しいアルバム名を入力してください',
      success: '名前を変更しました',
      fail: '名前の変更に失敗しました',
    },
    deleteAlbum: {
      title: '削除の確認',
      success: '削除しました',
      fail: '削除に失敗しました',
      doing: '削除中...',
    },
  },

  photoSearchPanel: {
    all: '全て',
    album: 'アルバム',
    image: '画像',
    video: '動画',
  },

  photosScreen: {
    import: {
      photos: 'フォトライブラリ',
      document: 'ファイル',
      camera: 'カメラ',
      download: 'ダウンロード',
    },
    export: {
      success: 'エクスポートしました',
      fail: '一部のファイルのエクスポートに失敗しました',
      message: 'エクスポート失敗数: {{count}}',
    },
    subtitle: {
      photo: '{{count}}枚の写真',
      video: '{{count}}個の動画',
    },
    delete: {
      title: 'これら{{count}}個のアイテムを削除します',
      softDeleteMsg: 'ゴミ箱から復元できます',
      deleteMsg: 'ゴミ箱が無効になっているため、復元できません',
    },
    moveToAlbum: {
      title: 'アルバムに移動',
      success: '移動しました',
      fail: '移動に失敗しました',
    },
  },

  photoViewerScreen: {
    bottomToolbar: {
      more: 'その他',
      description: '説明を編集',
      moreTitle: 'その他の操作',
      descPlaceholder: '説明を入力',
    },
  },

  videoPlayerScreen: {
    airplayTip: 'エアプレイ中',
    autoPausedTip: '一時停止しました',
  },

  settingsScreen: {
    purchaseBanner: {
      title: 'プライバシーボックスプレミアム',
      subtitle: 'プレミアムサブスクリプションで全機能を解除',
      purchasedSubtitle: 'すべての特典を表示',
      button: '今すぐ登録',
    },
    hapticFeedbackSwitch: 'ハプティックフィードバック',
    language: '言語',
    preference: '全般設定',
    security: 'セキュリティ',
    help: 'ヘルプとサポート',
    feedback: 'フィードバック',
    share: '友達にシェア',
    FAQ: 'よくある質問',
  },

  appearanceScreen: {
    title: '表示とアイコン',
    appearanceColor: {
      title: 'カラーモード',
      auto: 'システムに従う',
      light: 'ライトモード',
      dark: 'ダークモード',
    },
    appIcon: {
      title: 'アプリのアイコン',
      tip: '反映されない場合は端末の再起動を試してください',
    },
  },

  aboutScreen: {
    title: 'このアプリについて',
    version: 'バージョン',
    changelog: '更新履歴',
    review: 'レビューを書く',
    agreement: '利用規約',
    private: 'プライバシーポリシー',
    userAgreement: '利用規約',
    connect: 'お問い合わせ',
    email: '開発者メールアドレス',
    qqGroup: 'QQフィードバックグループ',
    emailCopied: 'メールアドレスをコピーしました',
    qqGroupCopied: 'QQグループ番号をコピーしました',
    checkUpdate: 'アップデートを確認',
    checkingUpdate: 'アップデートを確認中',
  },

  debugScreen: {
    title: 'デバッグ',
  },

  purchaseScreen: {
    title: 'プライバシーボックスプレミアム',
    subtitle: '全機能の解除',
    purchasing: '購入中',
    purchaseSuccess: '購入成功',
    purchaseFail: '購入失敗',
    purchased: '購入済み',
    restore: '購入を復元',
    restoring: '購入復元中',
    restoreSuccess: '購入復元成功',
    restoreFail: '購入復元失敗',
    restoreFailMessage: 'まず購入してください',
    help: 'ユーザーが購入して支払うとAppleアカウントに記録されます。ご不明な点がありましたら、',
    connect: 'お問い合わせください。',
    buyButton: '{{price}}で永久会員権を取得',
    moreFeatures: '近日公開の新機能...',
    fetchInfoFailTitle: '課金情報の取得失敗',
    fetchInfoFailMessage: 'しばらくしてから再度お試しください',
    cardButton: '取得',
    features: {
      icloud: 'iCloudデータの同期',
      fakeHome: '偽のホーム画面',
      hideApp: '任意のアプリを非表示',
      transfer: 'Wi-Fiでの無制限ファイル転送',
      changeAppIcon: 'アプリアイコンの変更',
      scanDocument: '文書スキャン',
      smartSearch: 'スマート検索',
      keepDuration: 'ゴミ箱の保持期間指定',
      more: 'その他の機能も近日公開予定',
    },
  },

  appLockScreen: {
    faceId: '顔認証',
    touchId: 'Touch ID',
    unlock: 'アプリのロックを解除',
    enterPassword: 'パスコードを入力',
    passcodeLength: 'パスコードの桁数',
    biometricsAuthFailed: '認証失敗',
  },

  changeLockPasscodeScreen: {
    createPasscode: 'ロック解除用のパスコードを設定してください',
    confirmCreatedPasscode: 'パスコードを確認',
    changePasscode: '新しいパスコードを設定してください',
    confirmPasscode: '新しいパスコードを確認',
    changeFakePasscode: '偽のパスコードを設定してください',
    confirmFakePasscode: '偽のパスコードを確認',
    reset: 'パスコードをリセット',
    samePrompt: 'メインパスコードと同じにできません',
  },

  appLockSettingsScreen: {
    title: 'パスコードロック',
    sectionTitle: 'メインパスコード',
    autolockTimeout: '自動ロック',
    biometrics: '{{name}}でロック解除',
    changePasscode: 'パスコードの変更',
    autoTriggerBiometrics: '{{name}}を自動的に要求',
    autolockTimeoutDisabled: '無効',
    autolockTimeoutTip: '別のアプリに切り替えてから選択した時間が経過すると自動的にロックされます',
  },

  fakeAppLockSettingsScreen: {
    title: '偽のパスコード',
    fakePasscodeSwitch: '偽のパスコードを有効化',
    changeFakePasscode: '偽のパスコードを変更',
    hideBiometricsWhenFake: 'ロック解除画面から{{name}}ボタンを非表示',
    bottomTabDarkle: 'ボトムタブを暗くする',
  },

  advancedSettingsScreen: {
    title: '詳細設定',
    importImageAfterDelete: 'インポート後に元のファイルを削除するか確認',
    importImageAfterDeleteTip:
      'インポート後にシステムフォトから削除するかどうかの確認ダイアログが表示されます',
    smartSearch: 'スマート検索',
    smartSearchTip: '有効にすると画像の内容を認識して検索できます',
    bottomTabVisible: 'ボトムタブの表示/非表示',
    dataExport: 'データエクスポート',
    exceptionDataExport: '移行失敗データのエクスポート',
    allPhotoExport: 'すべての写真/動画をエクスポート',
    allFileExport: 'すべてのファイルをエクスポート',
    dest: {
      title: '写真/動画のエクスポート先',
      album: 'フォトアルバム',
      file: 'ファイル',
    },
    clear: {
      title: 'キャッシュの消去',
      success: '消去しました',
      fail: 'キャッシュの消去に失敗しました',
    },
    assetRepresentationMode: {
      title: '写真/動画のインポートモード',
      description: 'インポートの速度と互換性に影響します。デフォルトの設定を推奨',
      menu: {
        auto: {
          title: 'デフォルト',
          description: '最適なフォーマットを使用',
        },
        compatible: {
          title: '互換モード',
          description: '互換性は高いがインポートが遅い',
        },
        current: {
          title: 'オリジナルのまま',
          description: 'インポートは速いがiPhone以外での使用に制限',
        },
      },
    },
  },

  thirdPartyApp: {
    browser: 'ブラウザ',
    email: 'メール',
    note: 'メモ',
    qq: 'QQ',
    wechat: 'WeChat',
    weixin: 'WeChat',
    douyin: 'TikTok',
    tikTok: 'TikTok',
    kwai: 'Kuaishou',
    bilibili: 'Bilibili',
    album: 'フォト',
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    red: 'Xiaohongshu',
  },

  appIconName: {
    default: 'デフォルト',
    calculator: '電卓',
    passwordBox: 'パスワードボックス',
    clock: '時計',
    housekeeper: 'セキュリティ',
    todo: 'ToDo',
    weather: '天気',
    news: 'ニュース',
    old: 'レトロ',
  },

  urgentSwitchScreen: {
    title: '緊急切り替え',
    targetHeader: '切り替え先アプリの選択',
    targetTip: '端末の動作がトリガーとなった時に選択したアプリに切り替わります',
    actionSectionTitle: 'トリガー動作',
    actionShake: '振る',
    actionFaceDown: '画面を下にする',
    uninstall: 'アンインストール済み',
    openFail: 'アプリを開けませんでした',
  },

  fakeAppHomeScreen: {
    removeInfo: '画像のプライバシー情報を削除',
    exif: '画像のプライバシー情報を表示',
    faceMosaic: '顔モザイク',
    highlightMosaic: 'QRコードモザイク',
    textMosaic: '文字モザイク',
  },

  exifScreen: {
    import: '画像をインポート',
    save: '画像を保存',
    exif: '画像のプライバシー情報',
    removeExtra: '画像のプライバシー情報を削除しました',
  },

  fakeAppHomeSettingsScreen: {
    title: '偽のホーム画面',
    fakeHomeEnabled: '偽のホーム画面を有効化',
    unlockAction: 'ロック解除方法',
    pullRefresh: '下に引っ張る',
    slide: '左にスワイプ',
    shake: '振る',
  },

  moreFeatureScreen: {
    title: 'その他の機能',
  },

  icloudScreen: {
    title: 'iCloud同期',
    subtitle: '複数デバイスで同期',
    autoSyncEnabled: '自動同期を有効化',
    onlyWifi: 'Wi-Fiのみで同期',
  },

  wastebasketScreen: {
    title: 'ゴミ箱',
    recover: '復元',
    delete: '完全に削除',
    recoverAll: 'すべて復元',
    deleteAll: 'すべて完全に削除',
    deleteTitle: '完全に削除されます',
  },

  recycleBinSettingsScreen: {
    enableTitle: 'ゴミ箱を有効化',
    durationHeader: '保持日数',
    day: '日',
  },

  transferScreen: {
    title: 'Wi-Fiダイレクト転送',
    subtitle: 'データ通信料金なしで高速転送',
    tip1: 'PCや他のデバイスのブラウザで表示されているURLを入力またはQRコードをスキャンしてください',
    tip2: '同じWi-Fiに接続している必要があります。このページから離れないでください。',
    errorTip: 'Wi-Fiの接続を確認してください',
    connectFail: '接続に失敗しました。再試行してください!',
    wifiTip: 'Wi-Fiに接続してから試してください',
  },

  hideApplicationsScreen: {
    title: 'アプリを隠す',
    subtitle: '指定したアプリをデバイスから隠す',
    enabled: 'アプリ隠しを有効化',
    selection: '隠すアプリの選択',
    notSupported: 'この機能はiOS 16以上でのみサポートされています。OSをアップデートしてください。',
    permission: 'この機能を使用するには、スクリーンタイムの設定変更権限が必要です。',
  },

  applicationPickerScreen: {
    title: '隠すアプリの選択',
  },

  filesScreen: {
    title: 'ファイル',
    saveToLocal: 'ローカルに保存',
    move: '移動',
    items: 'アイテム',
    select: '選択',
    selectAll: 'すべて選択',
    deselectAll: '選択解除',
    sort: '並び替え',
    sortSize: 'サイズ',
    sortCtime: '作成日時',
    sortName: '名前',
    import: {
      success: 'インポート成功',
      fail: 'インポート失敗',
      doing: 'インポート中...',
      folder: 'フォルダを作成',
      scan: 'スキャン',
      document: 'ファイルをインポート',
      nonsupport: {
        msg: 'このデバイスではサポートされていない機能です',
      },
    },
    folderForm: {
      title: 'フォルダ作成',
      msg: 'フォルダ名を入力してください',
      placeholder: 'フォルダ名(50文字以内)',
    },
    rename: {
      placeholder: 'ファイル名(255文字以内)',
      success: 'リネーム成功',
      fail: 'リネーム失敗',
    },
    createFolder: {
      success: 'フォルダ作成成功',
      fail: 'フォルダ作成失敗',
    },
    detail: {
      title: '詳細',
      name: '名前',
      type: 'タイプ',
      size: 'サイズ',
      ctime: '作成日時',
      importTime: 'インポート日時',
      duration: '長さ',
      resolution: '解像度',
      description: '説明',
      labels: 'ラベル',
    },
    types: {
      text: 'テキスト',
      image: '画像',
      audio: '音声',
      video: '動画',
      application: 'アプリ',
      model: 'モデル',
      folder: 'フォルダ',
      unknown: '不明',
    },
    deleteMsg: '完全に削除されます',
  },

  permissionManager: {
    camera: 'カメラ',
    microphone: 'マイク',
    faceID: 'Face ID',
    photoLibrary: 'フォトライブラリ',
    mediaLibrary: 'メディアライブラリ',
    motion: 'モーションとフィットネス',
    unavailable: '{{permission}}は利用できません',
    blocked:
      '{{permissions}}の権限を設定画面で許可してください。この機能を利用するために必要です。',
    openSettings: '設定を開く',
    allPhotos: {
      title: 'すべての写真へのアクセス',
      message: 'この機能を利用するには、すべての写真へのアクセスを許可する必要があります。',
    },
    noPermission: 'アクセス権限なし',
  },

  appUpdate: {
    alert: {
      title: '新しいバージョンがあります(V{{version}})',
      ok: 'アップデート',
      next: '次回以降にする',
      ignore: '無視',
    },
  },

  appPromote: {
    title: '他のおすすめアプリ',
    nightVision: {
      id: '1668629667',
      name: 'ナイトビジョン',
      description: '夜道の導き手',
    },
    iGrammar: {
      id: '6447102989',
      name: '英文法Ai診断',
      description: '英文法を楽しく学ぶ',
    },
  },
};


export default ja;