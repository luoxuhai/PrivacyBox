const zh = {
  common: {
    ok: '好',
    cancel: '取消',
    back: '返回',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    appName: '隐私盒子',
    coming: '即将推出...',
  },
  contentNavigator: {
    albumTab: '相册',
    filesTab: '文件',
    moreTab: '更多',
    settingsTab: '设置',
  },
  errorScreen: {
    reset: '重置',
  },
  settingsScreen: {
    purchaseBanner: {
      title: '隐私盒子高级版',
      subtitle: '开通后可获得完整的功能体验',
      button: '立即开通',
    },
    hapticFeedbackSwitch: '触觉反馈',
    language: '语言',
    preference: '通用偏好',
    security: '安全',
    help: '帮助和支持',
    feedback: '反馈建议',
    share: '分享给朋友',
    FAQ: '常见问题',
  },
  appearanceScreen: {
    title: '外观和图标',
    appearanceColor: {
      title: '颜色模式',
      auto: '跟随系统',
      light: '浅色模式',
      dark: '深色模式',
    },
    appIcon: {
      title: '应用图标',
    },
  },
  aboutScreen: {
    title: '关于',
    version: '版本',
    changelog: '更新日志',
    review: '给个好评',
    agreement: '协议',
    private: '隐私政策',
    userAgreement: '用户协议',
    connect: '联系我们',
    email: '开发者邮箱',
    qqGroup: 'QQ 反馈群',
    emailCopied: '已复制 QQ 群号',
    qqGroupCopied: '已复制邮箱',
  },
  debugScreen: {
    title: '调试',
  },
  purchaseScreen: {},
  appLockScreen: {
    faceId: '面容',
    touchId: '指纹',
    unlock: '解锁 App',
  },
  appLockSettingsScreen: {
    title: '密码锁',
    autolockTimeout: '自动锁定',
    biometrics: '使用{{ name }}解锁',
    changePasscode: '修改密码',
    autoTriggerBiometrics: '自动触发{{ name }}解锁',
    autolockTimeoutDisabled: '立即',
    autolockTimeoutTip: '切换到其他 APP 后，超过以下选定到时间间隔后会自动锁定',
  },
  fakeAppLockSettingsScreen: {
    title: '伪装密码',
    fakePasscodeSwitch: '开启伪装密码',
    changeFakePasscode: '修改伪装密码',
    hideBiometricsWhenFake: '隐藏解锁界面的{{ name }}按钮',
  },
  advancedSettingsScreen: {
    title: '高级设置',
  },
  urgentSwitchScreen: {
    title: '紧急切换',
  },
  fakeAppHomeScreen: {
    removeInfo: '去除图片隐私信息',
    faceMosaic: '人像打码',
    textMosaic: '文本打码',
    QRCodeMosaic: '二维码/条形码打码',
  },
  fakeAppHomeSettingsScreen: {
    title: '伪装界面',
    fakeHomeEnabled: '开启伪装界面',
    unlockAction: '解锁方式',
    pullRefresh: '下拉刷新',
    slide: '向左滑动',
    shake: '摇一摇',
  },
};

export default zh;

export type Translations = typeof zh;
