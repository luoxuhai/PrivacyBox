import Config from '@/config';
import FS from 'react-native-fs';

const DB_LOCATION = FS.pathForGroup(Config.groupIdentifier).then((res) => {
  console.log(res);
});
