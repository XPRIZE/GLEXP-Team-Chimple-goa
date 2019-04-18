## __Installation instructions for Chimple__
### __Pre-requisites__
___
1. Clone the GitHub repository on your local machine. Henceforth, root folder of the cloned GitHub repository mapped in your local machine will be referenced as __~\\__.
2. Install the latest [Android Studio](https://developer.android.com/studio)
    1. Open Android Studio->Tools->SDK Manager
    2. In the __SDK Platforms__ tab, choose Android 4.4(KitKat)
    3. In the __SDK Tools__ tab, choose the latest Android SDK Platform-Tools, Android SDK Tools and CMake.
    4. Note down the Android SDK Location at the top of the window.
  3. Install JDK 8 and add Java path as an enviroment variable.
  4. Install [Python 2](https://www.python.org/downloads/release/python-2716/). __Do not install Python 3__.
  5. Download [Ant](https://ant.apache.org/bindownload.cgi) and unzip it to C:\ant.
  7. Download [NDK R12b](https://dl.google.com/android/repository/android-ndk-r12b-windows-x86_64.zip) and unzip it to _C:\ndk_.
  8. Download [Cocos2d-x 3.14.1](https://digitalocean.cocos2d-x.org/Cocos2D-X/cocos2d-x-3.14.1.zip) and unzip it to _C:\cocos_.
  9. Download [Android SDK tools 25.2.5](https://dl.google.com/android/repository/tools_r25.2.5-windows.zip) and unzip it to _C:\tools_.
  10. Set up cocos command line tool.
      1. Run `cd C:\cocos`
      2. Run `python setup.py` command with Python 2
      3. It will prompt for the following variables:
          1. ANDROID_SDK_ROOT: Enter the directory from step 1.iv. above
          2. NDK_ROOT: C:\ndk\android-ndk-r12b
          3. ANT_ROOT: C:\ant\apache-ant-x.xx.x\bin

### __Install Bali APK__
___
  1. Open the Android project present in ~\Bali\ folder in Android Studio.
  2. Build the application and if Android Studio prompts for installing Android Build Tools and SDK install them.
  3. Once the build is complete, run the application.

### __Install Maui APK__
___
  1. Install Flutter SDK.

      1. Clone the [Flutter repository](https://github.com/flutter/flutter.git). Use git clone command instead of downloading the repository as a zip file     
      2. Follow the steps [here](https://flutter.dev/docs/get-started/install/windows).
  2. Set the path of cloned Flutter directory in the local.properties file of Maui project.
  3. Run the following commands in the root directory of Maui project from either Windows PowerShell or Windows Command Prompt.
		
		`flutter packages get`

		`flutter build apk`
		
		`flutter run --release` (if --release command is not used then the application runs in debug mode by default)

### __Install Goa APK__
___
  1. Make sure an Android device is connected with USB debug permissions set.
  2. Replace _tools_ directory in _ANDROID_SDK_ROOT_ with _C:\tools_.
  3. The default configuration of the application is Swahili. If one wants to build the application in English then do the following changes:  
      1. In [Sqlite3Helper.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/sqlite3/Sqlite3Helper.cpp) class replace Swahili with English as follows:  
      
          `LangUtil::getInstance()->changeLanguage(SupportedLanguages::ENGLISH);`  
		
      2. In [LangUtil.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/LangUtil.cpp) class:  
      
          Comment the following line:  
	  `_instance = new SwahiliUtil();`  
	  
          Uncomment the following line:  
          `// _instance = new EnglishUtil();`  
  4. Run the following command from Windows PowerShell or Windows Command Prompt:
		
        `cd goa`
		
        `cocos run -p android`

### __Common issues and resolutions__
___
  1. "Not a git repository" error while executing `git packages get` command in any one of the repositories
  		> Delete _C:\Users\USERNAME\AppData\Roaming\Pub\Cache\git\cache_ folder and rerun the above command
  2. Plugin import dependency error in the any of the repositories
	
        > 1. Create a lib folder in parent directory of the concerned project repository
    	> 2. Copy _flutter.jar_ file from the _FLUTTER_SDK_ROOT_DIR\bin\cache\artifacts\engine\android-arm_ folder into _lib_ folder
    	> 3. From Android Studio right click the newly added jar file and then select "Add as library" option
  3. "setup.py" throwing error while installing cocos
        > Uninstall Python 3 temporarily and try running setup.py again
