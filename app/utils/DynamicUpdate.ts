import { Alert } from 'react-native';
import CodePush, { LocalPackage } from 'react-native-code-push';

import { reportException } from './crashReporting';

export class DynamicUpdate {
  static timer?: NodeJS.Timer;

  /**
   * 检查并更新，不会重启应用
   */
  static sync(debug = false): void {
    if (debug) {
      CodePush.sync(
        {
          updateDialog: {
            optionalIgnoreButtonLabel: '下次再说',
            optionalInstallButtonLabel: '马上体验',
            optionalUpdateMessage: '新版本来袭，是否更新',
            title: '更新提示',
            mandatoryUpdateMessage: '噢，版本中有一些大改动，不得不更新',
            mandatoryContinueButtonLabel: '立即更新',
          },
        },
        (status) => {
          Alert.alert('CodePush.SyncStatus', transformSyncStatus(status));
        },
      ).catch((error) => {
        Alert.alert('更新失败', error.message);
      });
    } else {
      CodePush.sync({
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_SUSPEND,
        minimumBackgroundDuration: 30,
      }).catch((error) => {
        reportException({
          error,
          message: '检查热更新失败',
        });
      });
    }
  }

  /**
   * 检查并更新，会重启应用
   */
  static checkForUpdate(): void {
    CodePush.checkForUpdate();
  }

  /**
   * 检查并更新，会重启应用
   */
  static restartApp(): void {
    CodePush.restartApp();
  }

  /**
   * 定时检查并更新
   */
  static timingSync(): void {
    const s = 60 * 5;
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.sync();
    this.timer = setInterval(() => {
      this.sync();
    }, 1000 * s);
  }

  /**
   * 检索状态与指定updateState参数匹配的已安装更新的元数据
   * @param state RUNNING | PENDING | LATEST
   */
  static getUpdateMetadataAsync(
    state: CodePush.UpdateState = CodePush.UpdateState.RUNNING,
  ): Promise<LocalPackage | null> {
    return CodePush.getUpdateMetadata(state);
  }

  static clear(): void {
    CodePush.clearUpdates();
  }
}

function transformSyncStatus(syncStatus: CodePush.SyncStatus) {
  switch (syncStatus) {
    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      return '正在查询 CodePush 服务器以获取更新。';
    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
      return '正在从 CodePush 服务器下载可用更新。';
    case CodePush.SyncStatus.AWAITING_USER_ACTION:
      return 'Awaiting user action.';
    case CodePush.SyncStatus.INSTALLING_UPDATE:
      return '已下载可用更新，即将安装。';
    case CodePush.SyncStatus.UP_TO_DATE:
      return '该应用程序是CodePush服务器的最新功能。';
    case CodePush.SyncStatus.UPDATE_IGNORED:
      return 'user chose to ignore';
    case CodePush.SyncStatus.UPDATE_INSTALLED:
      return '已安装可用更新并将在 syncStatusChangedCallback 函数返回后或下次应用程序恢复/重新启动时立即运行，具体取决于 SyncOptions 中指定的 InstallMode';
    case CodePush.SyncStatus.UNKNOWN_ERROR:
    default:
      return '同步操作遇到未知错误。';
  }
}

export { LocalPackage };
