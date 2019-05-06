# Compilation and installation instructions for the Chimple application
Last updated: May 6, 2019

The steps for building the Chimple application on a Windows 7 or newer are listed below. To compile and install on macOS X (Mavericks or newer) or Linux, similar steps can be followed. *Please do not create any directories with spaces in them.[Creating directories names with spaces may cause problems on Linux installations.*]
## Pre-requisites
1. Install the latest version of [Android Studio](https://developer.android.com/studio). These steps were created using Android Studio 3.4 for Windows 64-bit.
    1. Open Android Studio->Tools->SDK Manager
    2. In the **SDK Platforms** tab, choose Android 4.4 (KitKat)
    3. In the **SDK Tools** tab, choose the latest Android SDK Platform-Tools and Android SDK Tools. Also, choose Cmake version as 3.6.4111459
    4. Note the Android SDK Location at the top of the window
2. Install the [Java Development Kit](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). These steps were created usign Java SE Development Kit 3.4 8u211 for Windows 64-bit.
    1. Open Control Panel->System and Security->System->Advanced System Settings->Environment Variables and set a new variable JAVA_HOME to the directory where JDK is installed. Provide the JDK directory, and not the JRE directory.
3. Install [Python 2](https://www.python.org/downloads/release/python-2716/). *Do not install Python 3.* These steps were created usign Python 2.7.16 for Windows 64-bit.
4. Download [Ant 1.9.14](https://ant.apache.org/bindownload.cgi) and unzip it to C:\ant.
5. Download [NDK R12b](https://dl.google.com/android/repository/android-ndk-r12b-windows-x86_64.zip) and unzip it to C:\ndk.
6. Download [Cocos2d-x 3.14.1](https://digitalocean.cocos2d-x.org/Cocos2D-X/cocos2d-x-3.14.1.zip) and unzip it to C:\cocos.
7. Download [Android SDK tools 25.2.5](https://dl.google.com/android/repository/tools_r25.2.5-windows.zip) and unzip it to C:\tools.
8. Install cocos command line tool.

    `cd C:\cocos`
    
    `setup.py`
    
    It will prompt the following variables:
    1. ANDROID_SDK_ROOT: Enter the directory from Step 1.4 above
    2. NDK_ROOT: C:\ndk\android-ndk-r12b
    3. ANT_ROOT: C:\ant\apache-ant-x.xx.x\bin
## Build and install Bali
Bali is an application which teaches literacy and also controls the progress of the child. This application must be installed first before installing any other applications.
1. Open Android Studio.
2. File->Open GLEXP-Team-Chimple-goa/bali
3. Make sure an Android device is connected with USB debug permissions set.
3. Run->Run app
## Build and install goa
Goa is an application which has many games for a child to play while improving literacy.
1. Make sure an Android device is connected with USB debug permissions set.
2. Overwrite the directory *tools* in ANDROID_SDK_ROOT with C:\tools
3. `cd goa`
4. `cocos run -p android`
## Activate/Deactivate Kiosk Mode
By default, the Kiosk mode is enabled. So all games are open. To disable Kiosk mode, set the KIOSK variable in 
`goa/Classes/menu/ScrollableGameMapScene.cpp` to false

``static const bool KIOSK = false;``

The custom Android Launcher screen (part of Bali) will cover the screen every minute if enough coins are not there. This is useful to encourage children to learn and earn coins which they can use to buy camera time or other game time. By default, (as part of Kiosk mode) this is disabled. To enable this functionality, in `Bali/app/src/main/java/org/chimple/bali/launcher/LauncherScreen.java` set the POPUP variable to true

``public static final boolean POPUP = true;``

## Switch between English and Swahili versions
### To create an English version of the software:
In `goa/Classes/lang/LangUtil.cpp`:
```
        _instance = new EnglishUtil();
        // _instance = new SwahiliUtil();
```
In `goa/.cocos-project.json`:
```
{
    "engine_version": "cocos2d-x-3.14.1", 
    "project_type": "cpp",
        "custom_step_script": "./scripts/custom_script.py",
    "chimple_res": "HDR",
    "chimple_lang": "eng"
}
```
In `Bali/app/src/main/java/org/chimple/bali/db/AppDatabase.java`:
```
                        inputStream = assetManager.open("eng/database.csv");
```

### To create a Swahili version of the software:
In `goa/Classes/lang/LangUtil.cpp`:
```
        // _instance = new EnglishUtil();
        _instance = new SwahiliUtil();
```
In `goa/.cocos-project.json`:
```
{
    "engine_version": "cocos2d-x-3.14.1", 
    "project_type": "cpp",
        "custom_step_script": "./scripts/custom_script.py",
    "chimple_res": "HDR",
    "chimple_lang": "swa"
}
```
In `Bali/app/src/main/java/org/chimple/bali/db/AppDatabase.java`:
```
                        inputStream = assetManager.open("swa/database.csv");
```

## FAQs
1. How can I resolve the "Not a git repository" error encountered after executing `git packages get` command?

  	> To resolve the "Not a git repository" error, delete _C:\Users\USERNAME\AppData\Roaming\Pub\Cache\git\cache_ folder and rerun the `git packages get` command.
2. How can I resolve the plugin import dependency error?
	
   > 1. To resolve the plugin import dependency error, create a lib folder in parent directory of the concerned project repository.
   > 2. Copy the _flutter.jar_ file from the _FLUTTER_SDK_ROOT_DIR\bin\cache\artifacts\engine\android-arm_ folder into _lib_ folder.
   > 3. From the Android Studio, right click the newly added jar file and then select the "Add as library" option.
3. How can I resolve an error encountered after running the "setup.py" script while installing cocos?

    > To resolve an error encountered after running the “setup.py” script while installing cocos, check to see whether you have Python 3 installed. If you do have Python 3 installed, uninstall it and try running setup.py again.