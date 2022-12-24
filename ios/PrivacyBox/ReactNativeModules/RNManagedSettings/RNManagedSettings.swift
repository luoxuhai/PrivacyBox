import ManagedSettings
import FamilyControls
import Foundation
import React

@objc(RNManagedSettings)
class RNManagedSettings: NSObject {
  @available(iOS 15.0, *)
  @objc(setBlockedApplications:withResolver:withRejecter:)
    func setBlockedApplications(bundleIdentifiers:NSArray, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      var applications = Set<Application>();

      for bundleIdentifier in bundleIdentifiers {
        applications.insert(Application(bundleIdentifier: bundleIdentifier as! String))
      }
      
      let store = ManagedSettingsStore()
      
      store.application.blockedApplications = applications
      
      resolve("ok");
    }
  
  @available(iOS 15.0, *)
  @objc(getBlockedApplications:withRejecter:)
    func setBlockedApplications(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      var bundleIdentifiers: Array<String> = [];
      let store = ManagedSettingsStore()
      let applications = store.application.blockedApplications ?? []
      
      for application in applications {
        bundleIdentifiers.append(application.bundleIdentifier ?? "")
      }
  
      let result: NSArray = bundleIdentifiers as NSArray

      resolve(result);
    }
  
  @available(iOS 15.0, *)
  @objc(getAuthorizationStatus:withRejecter:)
    func getAuthorizationStatus(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      let authorizationStatus = AuthorizationCenter.shared.authorizationStatus
      resolve(authorizationStatus.rawValue);
    }
}
