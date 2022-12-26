import React, { useMemo, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewProps,
  View,
  Text,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { SFSymbol } from 'react-native-sfsymbols';
import ActionSheet, { SheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, useTheme } from '@/theme';
import { FileImportTypes } from '../constants';
import { useFolderCreator } from '../helpers/useFolderCreator';
import { translate } from '@/i18n';

const ICON_PROPS = {
  size: 30,
  color: '#FFF',
};

interface FileImporterSheetProps extends SheetProps<{ parentId?: string }> {}

export const FileImporterSheet = observer<FileImporterSheetProps>((props) => {
  const { parentId } = props.payload;
  const { colors, isDark } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleCreateFolder = useFolderCreator(parentId);

  const list = useMemo(
    () => [
      {
        type: FileImportTypes.Scan,
        icon: (
          <SFSymbol
            name="doc.viewfinder"
            color={ICON_PROPS.color}
            style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
          />
        ),
        title: translate('filesScreen.import.scan'),
        color: colors.palette.orange,
        onPress: () => {},
      },
      {
        type: FileImportTypes.Document,
        icon: (
          <SFSymbol
            name="folder"
            color={ICON_PROPS.color}
            style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
          />
        ),
        title: translate('filesScreen.import.document'),
        color: colors.palette.blue,
      },
      {
        type: FileImportTypes.Folder,
        icon: (
          <SFSymbol
            name="plus.rectangle.on.folder"
            color={ICON_PROPS.color}
            style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
          />
        ),
        title: translate('filesScreen.import.folder'),
        color: colors.palette.primary6,
        onPress: () => {},
      },
    ],
    [colors],
  );

  return (
    <ActionSheet
      ref={actionSheetRef}
      id={props.sheetId}
      containerStyle={{
        borderTopLeftRadius: radius[10],
        borderTopRightRadius: radius[10],
        paddingBottom: safeAreaInsets.bottom,
        backgroundColor: isDark ? colors.secondaryBackground : colors.background,
      }}
      indicatorStyle={{
        width: 80,
        backgroundColor: colors.tertiaryFill,
      }}
      gestureEnabled={true}
    >
      <View style={$bottomSheetContent}>
        {list.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={$item}
            onPress={async () => {
              handleCreateFolder();
              actionSheetRef.current.hide();
            }}
          >
            <View
              style={[
                $iconContainer,
                {
                  backgroundColor: item.color,
                },
              ]}
            >
              {item.icon}
            </View>
            <Text
              style={[
                $title,
                {
                  color: colors.label,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActionSheet>
  );
});

const $bottomSheetContent: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  height: 140,
  paddingTop: 20,
  paddingHorizontal: 10,
  borderTopEndRadius: 16,
  borderTopStartRadius: 16,
};

const $item: ViewStyle = {
  alignItems: 'center',
  minWidth: 100,
  marginBottom: 20,
};

const $iconContainer: ViewStyle = {
  padding: 10,
  borderRadius: 6,
};

const $title: TextStyle = {
  marginTop: 8,
  fontSize: 14,
};
