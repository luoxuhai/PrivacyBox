/*

import FamilyControls
import Foundation

@objc class AuthorizationCenterAsync: NSObject {
  @objc public static func requestAuthorization() async throws -> Void {
    if #available(iOS 16.0, *) {
      let center = AuthorizationCenter.shared
      do {
          try await center.requestAuthorization(for: FamilyControlsMember.individual)
          print("[requestAuthorization] Success")
      } catch {
          print("[requestAuthorization] Error", error.localizedDescription, error)
      }
    }
  }
}
*/
