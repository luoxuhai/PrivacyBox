import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, useWindowDimensions, Modal } from 'react-native';
import { observer } from 'mobx-react-lite';
import {
  ContextMenuButton,
  MenuConfig,
  OnPressMenuItemEventObject,
} from 'react-native-ios-context-menu';

export interface PopoverMenuProps {
  menus: MenuConfig;
  permittedArrowDirections?: string[];
  children?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
  onPressMenuItem?: (event?: OnPressMenuItemEventObject) => void;
  onMenuWillShow?: () => void;
  onMenuWillHide?: () => void;
  onMenuDidShow?: () => void;
  onMenuDidHide?: () => void;
}

export type { MenuConfig };

export const PopoverMenu = observer<PopoverMenuProps>((props) => {
  const [visibleOutside, setVisibleOutside] = useState(false);

  function hideOutsideView() {
    setVisibleOutside(false);
  }

  function showOutsideView() {
    setVisibleOutside(true);
  }

  return props.disabled ? (
    props.children
  ) : (
    <>
      <ContextMenuButton
        isMenuPrimaryAction
        menuConfig={props.menus}
        onMenuDidShow={showOutsideView}
        onMenuWillHide={hideOutsideView}
        {...props}
      >
        {props.children}
      </ContextMenuButton>
      {visibleOutside && <Modal visible transparent />}
      {/* <View style={[$mask, maskStyle]} /> */}
    </>
  );
});

// const $mask: ViewStyle = {
//   opacity: 0,
//   ...StyleSheet.absoluteFillObject,
//   backgroundColor: '#F00',
// };
