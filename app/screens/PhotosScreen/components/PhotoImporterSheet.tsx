import React, { useMemo, useRef } from 'react';
import { TouchableOpacity, View, Text, ViewStyle, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SFSymbol } from 'react-native-sfsymbols';
import ActionSheet, { SheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, useTheme, Colors } from '@/theme';
import { translate } from '@/i18n';
import { PhotoImportTypes } from '../constants';
import { PhotoImporter } from '../helpers/PhotoImporter';

const ICON_PROPS = {
  size: 30,
  color: '#FFF',
};

interface PhotoImporterSheetProps extends SheetProps<{ albumId?: string }> {}

export const PhotoImporterSheet = observer<PhotoImporterSheetProps>((props) => {
  const { albumId } = props.payload;
  const { colors, isDark } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const list = useMemo(() => getFileImportList(colors), [colors]);

  async function handleImport(type: any) {
    switch (type) {
      case PhotoImportTypes.Photos:
        PhotoImporter.album.open();
        break;
      case PhotoImportTypes.Document:
        PhotoImporter.document.open();
        break;
      case PhotoImportTypes.Camera:
        PhotoImporter.camera.open();
        break;
      case PhotoImportTypes.Download:
        PhotoImporter.download.open();
        break;
    }

    // actionSheetRef.current.hide();
  }

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
          <TouchableOpacity key={item.title} style={$item} onPress={() => handleImport(item.type)}>
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

function getFileImportList(colors: Colors) {
  return [
    {
      type: PhotoImportTypes.Photos,
      icon: (
        <SFSymbol
          name="photo.on.rectangle.angled"
          color={ICON_PROPS.color}
          style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
        />
      ),
      title: translate('photosScreen.import.photos'),
      color: colors.palette.orange,
    },
    {
      type: PhotoImportTypes.Document,
      icon: (
        <SFSymbol
          name="folder"
          color={ICON_PROPS.color}
          style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
        />
      ),
      title: translate('photosScreen.import.document'),
      color: colors.palette.blue,
    },
    {
      type: PhotoImportTypes.Camera,
      icon: (
        <SFSymbol
          name="camera"
          color={ICON_PROPS.color}
          style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
        />
      ),
      title: translate('photosScreen.import.camera'),
      color: colors.palette.primary6,
    },
    {
      type: PhotoImportTypes.Download,
      icon: (
        <SFSymbol
          name="arrow.down.circle"
          color={ICON_PROPS.color}
          style={{ width: ICON_PROPS.size, height: ICON_PROPS.size }}
        />
      ),
      title: translate('photosScreen.import.download'),
      color: colors.palette.green,
    },
  ];
}

const $bottomSheetContent: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
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
