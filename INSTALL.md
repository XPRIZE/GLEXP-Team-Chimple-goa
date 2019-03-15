# __Installation instructions for Chimple project__

  ### 1. __Install Flutter SDK__
         i. Clone the Flutter repository from https://github.com/flutter/flutter.git. Use git clone command instead of downloading the                 repository as a zip file
        ii. Follow the steps here https://flutter.dev/docs/get-started/install/windows

  ### 2. __Set the path of cloned Flutter directory in the local.properties file of Maui project__
  ### 3. Run the following commands in Goa and Maui project from either PowerShell or Windows Command Prompt
        i. flutter packages get
       ii. flutter build apk
      iii. flutter run --release (if --release command is not used then the application runs in debug mode by default)

## __FAQ__
	1. "Not a git repository" error while executing git packages get command in any one of the repositories
	Solution: Delete C:\Users\USERNAME\AppData\Roaming\Pub\Cache\git\cache folder and rerun the above command
	2. Plugin import dependency error in the any of the repositories
	Solution:
	  i. Create a lib folder in parent directory of the concerned project repository
	 ii. Copy flutter.jar file from the _FLUTTER_SDK_ROOT_DIR_\bin\cache\artifacts\engine\android-arm folder into lib folder
	iii. From Android Studio right click the newly added jar file and then select "Add as library"