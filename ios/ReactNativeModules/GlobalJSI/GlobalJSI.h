//
//  GlobalJSI.h
//  PrivacyBox
//
//  Created by Xuhai Luo on 2022/12/18.
//

#import <React/RCTBridgeModule.h>

@interface GlobalJSI : NSObject <RCTBridgeModule>

@property (nonatomic, assign) BOOL setBridgeOnMainQueue;

@end
