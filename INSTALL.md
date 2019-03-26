## __Installation instructions for Chimple__
### __Pre-requisites__
1. Install the latest [Android Studio](https://developer.android.com/studio)
    1. Open Android Studio->Tools->SDK Manager
    2. In the __SDK Platforms__ tab, choose Android 4.4(KitKat)
    3. In the __SDK Tools__ tab, choose the latest Android SDK Platform-Tools and Android SDK Tools.
    4. Note down the Android SDK Location at the top of the window
  2. Install JDK 8 and add Java path as an enviroment variable
  3. Install [Python 2](https://www.python.org/downloads/release/python-2716/). __Do not install Python 3__
  4. Download [Ant](https://ant.apache.org/bindownload.cgi) and unzip it to C:\ant
  5. Download [NDK R12b](https://dl.google.com/android/repository/android-ndk-r12b-windows-x86_64.zip) and unzip it to _C:\ndk_
  6. Download [Cocos2d-x 3.14.1](https://digitalocean.cocos2d-x.org/Cocos2D-X/cocos2d-x-3.14.1.zip) and unzip it to _C:\cocos_
  7. Download [Android SDK tools 25.2.5](https://dl.google.com/android/repository/tools_r25.2.5-windows.zip) and unzip it to _C:\tools_
  8. Install cocos command line tool
      1. Run `cd C:\cocos`
      2. Run `python setup.py` command with Python 2
      3. It will prompt for the following variables:
          1. ANDROID_SDK_ROOT: Enter the directory from step 1.iv. above
          2. NDK_ROOT: C:\ndk\android-ndk-r12b
          3. ANT_ROOT: C:\ant\apache-ant-x.xx.x\bin

### __Install Bali APK__
  1. Open the Android project present in Bali/ folder in Android Studio
  2. Build the application and if Android Studio prompts for installing Android Build Tools and SDK install them
  3. Once the build is complete, run the application

### __Install Maui APK__
  1. Install Flutter SDK

      1. Clone the [Flutter repository](https://github.com/flutter/flutter.git). Use git clone command instead of downloading the repository as a zip file     
      2. Follow the steps [here](https://flutter.dev/docs/get-started/install/windows).
  2. Set the path of cloned Flutter directory in the local.properties file of Maui project
  3. Run the following commands in the root directory of Maui project from either Windows Powershell or Windows Command Prompt
		
		`flutter packages get`

		`flutter build apk`
		
		`flutter run --release` (if --release command is not used then the application runs in debug mode by default)

### __Install Goa APK__
  1. Make sure an Android device is connected with USB debug permissions set
  2. Overwrite the directory _tools_ in _ANDROID_SDK_ROOT_ with _C:\tools_ and then run the following command from Windows Powershell or Windows Command Prompt:
		
        `cd goa`
		
        `cocos run -p android`

### __FAQs__
  1. "Not a git repository" error while executing `git packages get` command in any one of the repositories
	
    Solution: 
    Delete _C:\Users\USERNAME\AppData\Roaming\Pub\Cache\git\cache_ folder and rerun the above command
  2. Plugin import dependency error in the any of the repositories
	
    Solution:
        i. Create a lib folder in parent directory of the concerned project repository
       ii. Copy _flutter.jar_ file from the _FLUTTER_SDK_ROOT_DIR\bin\cache\artifacts\engine\android-arm_ folder into _lib_ folder
      iii. From Android Studio right click the newly added jar file and then select "Add as library" option