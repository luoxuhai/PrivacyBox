import SwiftUI
import React

@available(iOS 15.0, *)
@objcMembers class RNFamilyActivityPickerProxy: NSObject {
  private var vc = UIHostingController(rootView: RNFamilyActivityPicker())
  
  static let storage = NSMutableDictionary()
  
  open var headerText: String {
    set { vc.rootView.props.headerText = newValue }
    get { return vc.rootView.props.headerText }
  }
  
  var onActivityChange: RCTBubblingEventBlock {
    set { vc.rootView.props.onActivityChange = newValue }
    get { return vc.rootView.props.onActivityChange }
  }
  
  var view: UIView {
    return vc.view
  }
}

