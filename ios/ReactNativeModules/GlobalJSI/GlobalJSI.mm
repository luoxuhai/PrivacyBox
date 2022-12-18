#import "GlobalJSI.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>

using namespace facebook;

@implementation GlobalJSI

@synthesize bridge=_bridge;
@synthesize methodQueue = _methodQueue;

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (void)setBridge:(RCTBridge *)bridge {
  _bridge = bridge;
  _setBridgeOnMainQueue = RCTIsMainQueue();

  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
  auto jsiRuntime = (jsi::Runtime*) cxxBridge.runtime;
  if (!jsiRuntime) {
    return;
  }
    
  jsi::String str = jsi::String::createFromUtf8(*jsiRuntime, "我的");
  jsiRuntime->global().setProperty(*jsiRuntime, "xxx", str);
}

- (void)invalidate {
  if(!self.bridge){
    return;
  }
  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
  auto jsiRuntime = (jsi::Runtime*) cxxBridge.runtime;
  if (!jsiRuntime) {
    return;
  }
  
  jsiRuntime->global().setProperty(*jsiRuntime, "xxx", jsi::Value::undefined());
}

@end
