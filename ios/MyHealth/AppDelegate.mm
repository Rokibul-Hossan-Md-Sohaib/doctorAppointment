#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

//
//#import <Firebase.h>
//#import "RNCallKeep.h"
//#import <PushKit/PushKit.h>
//#import "RNVoipPushNotificationManager.h"
//#import <UserNotifications/UserNotifications.h>
//#import <RNCPushNotificationIOS.h>


@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [FIRApp configure];
  RCTAppSetupPrepareApp(application);

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif

  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"MyHealth", nil);

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

@end

// setup later

//- (BOOL)application:(UIApplication *)application
//continueUserActivity:(NSUserActivity *)userActivity
//  restorationHandler:(void(^)(NSArray * __nullable restorableObjects))restorationHandler
//{
//  return [RNCallKeep application:application
//          continueUserActivity:userActivity
//            restorationHandler:restorationHandler];
//}
///* Add PushKit delegate method */
////
//// --- Handle updated push credentials
//- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
//  // Register VoIP push token (a property of PKPushCredentials) with server
//  [RNVoipPushNotificationManager didUpdatePushCredentials:credentials forType:(NSString *)type];
//}
//
//- (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type
//{
//  // --- The system calls this method when a previously provided push token is no longer valid for use. No action is necessary on your part to reregister the push type. Instead, use this method to notify your server not to send push notifications using the matching push token.
//}
//
//// --- Handle incoming pushes
//- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
//
//
//  // --- NOTE: apple forced us to invoke callkit ASAP when we receive voip push
//  // --- see: react-native-callkeep
//
//  // --- Retrieve information from your voip push payload
//  NSString *uuid = payload.dictionaryPayload[@"uuid"];
//  NSString *callerName = payload.dictionaryPayload[@"callerName"];
//  NSString *handle = payload.dictionaryPayload[@"handle"];
//  NSString *callType = payload.dictionaryPayload[@"callType"];
//
//  NSDictionary *extra = [payload.dictionaryPayload valueForKeyPath:@"custom.path.to.data"]; /* use this to pass any special data (ie. from your notification) down to RN. Can also be `nil` */
//
//  // --- this is optional, only required if you want to call `completion()` on the js side
//  [RNVoipPushNotificationManager addCompletionHandler:uuid completionHandler:completion];
//
//  // --- Process the received push
//  [RNVoipPushNotificationManager didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
//
//  // --- You should make sure to report to callkit BEFORE execute `completion()`
//  [RNCallKeep reportNewIncomingCall: uuid
//                               handle: handle
//                           handleType: @"generic"
//                           hasVideo: [callType  isEqual: @"Audio"] ? NO : YES
//                  localizedCallerName: callerName
//                      supportsHolding: YES
//                         supportsDTMF: YES
//                     supportsGrouping: YES
//                   supportsUngrouping: YES
//                          fromPushKit: YES
//                              payload: extra
//                withCompletionHandler: completion];
//
//  // --- You don't need to call it if you stored `completion()` and will call it on the js side.
////  completion();
//}
//// Required for the register event.
////- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
////{
//// [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
////}
////// Required for the notification event. You must call the completion handler after handling the remote notification.
////- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
////fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
////{
////  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
////}
////// Required for the registrationError event.
////- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
////{
//// [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
////}
//// Required for localNotification event
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//didReceiveNotificationResponse:(UNNotificationResponse *)response
//         withCompletionHandler:(void (^)(void))completionHandler
//{
//  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
//}
//
////Called when a notification is delivered to a foreground app.
//-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
//{
//  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
//}
//@end
