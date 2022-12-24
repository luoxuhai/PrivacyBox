#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNManagedSettings, NSObject)

RCT_EXTERN_METHOD(setBlockedApplications:(NSArray *)applications
                  withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


RCT_EXTERN_METHOD(getBlockedApplications:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAuthorizationStatus:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
