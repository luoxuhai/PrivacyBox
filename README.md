## 平台

### App Connect: <https://appstoreconnect.apple.com/apps/1597534147/appstore/ios/version/inflight>

### App Center: <https://appcenter.ms/users/15186743693-163.com/apps/yin3-si1-kong1-jian1/distribute/code-push>

### Feedback: <https://support.qq.com/product/334350>

### Firebase: <https://console.firebase.google.com/u/0/project/private-space-1659c/overview>

### Sentry: <https://sentry.io/organizations/darkce/projects/private-space-ios/?project=6139676>

## 发布热更新

```bash
  yarn dynamic:ios -t "xxx" --des "xxx"
```

| Range Expression | Who gets the update                                                                    |
| ---------------- | -------------------------------------------------------------------------------------- |
| `1.2.3`          | Only devices running the specific binary version `1.2.3` of your app                   |
| `*`              | Any device configured to consume updates from your CodePush app                        |
| `1.2.x`          | Devices running major version 1, minor version 2 and any patch version of your app     |
| `1.2.3 - 1.2.7`  | Devices running any binary version between `1.2.3` (inclusive) and `1.2.7` (inclusive) |
| `>=1.2.3 <1.2.7` | Devices running any binary version between `1.2.3` (inclusive) and `1.2.7` (exclusive) |
| `1.2`            | Equivalent to `>=1.2.0 <1.3.0`                                                         |
| `~1.2.3`         | Equivalent to `>=1.2.3 <1.3.0`                                                         |
| `^1.2.3`         | Equivalent to `>=1.2.3 <2.0.0`
