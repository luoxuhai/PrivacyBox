import ManagedSettings
import FamilyControls
import Foundation
import React

@available(iOS 15.0, *)
@objc(RNManagedSettings)
class RNManagedSettings: NSObject {
  let store = ManagedSettingsStore()
  let decoder = JSONDecoder()
  
  @objc(setBlockedApplications:withRejecter:)
  func setBlockedApplications(resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock) -> Void {
      if let object = UserDefaults.standard.object(forKey: SelectedAppTokensKey) as? Data {
        if let appTokens = try? self.decoder.decode(Set<ApplicationToken>.self, from: object) {
          var applications = Set<Application>();
          for token in appTokens {
            applications.insert(Application(token: token))
          }
          self.store.application.blockedApplications = applications
        }
        resolve("ok");
      }
      
      reject("error", nil, nil)
    }
  
  @objc(clearBlockedApplications:withRejecter:)
  func clearBlockedApplications(resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock) -> Void {
      self.store.application.blockedApplications?.removeAll()
      resolve("ok");
    }
  
  @objc(getBlockedApplicationsCount:withRejecter:)
    func getBlockedApplicationsCount(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      resolve(self.store.application.blockedApplications?.count ?? 0);
    }
  
  @objc(getAuthorizationStatus:withRejecter:)
    func getAuthorizationStatus(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      let authorizationStatus = AuthorizationCenter.shared.authorizationStatus
      resolve(authorizationStatus.rawValue);
    }
}
