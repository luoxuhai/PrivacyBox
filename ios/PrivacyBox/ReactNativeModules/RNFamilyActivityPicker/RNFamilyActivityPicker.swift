import SwiftUI
import FamilyControls
import React
import ManagedSettings

class RNFamilyActivityPickerProps : ObservableObject {
  @Published var headerText: String = ""
  @Published var onActivityChange: RCTDirectEventBlock = { _ in }
}

@available(iOS 15.0, *)
struct RNFamilyActivityPicker: View {
  let store = ManagedSettingsStore()
  let encoder = JSONEncoder()

  @ObservedObject var props = RNFamilyActivityPickerProps()
  @State var selection = FamilyActivitySelection()
  
  init() {
    let blockedApplications = store.application.blockedApplications
    if (blockedApplications != nil) {
     // self.selection.applications = blockedApplications!
    }
  }

    var body: some View {
      Group {
        if #available(iOS 16.0, *) {
          FamilyActivityPicker(headerText: self.props.headerText, selection: $selection)
        } else {
          FamilyActivityPicker(selection: $selection)
        }
      }
      .onChange(of: selection) { newSelection in
        print ("got here count \(newSelection.applications.count)")
        store.application.blockedApplications = newSelection.applications
        self.props.onActivityChange(["applicationTokens": store.application.blockedApplications?.count])
      }
  }
}
