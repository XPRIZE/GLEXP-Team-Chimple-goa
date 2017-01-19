# Building the image on a Google Pixel C tablet
## Prerequisites:
* Install cocos2d-x according to the procedure listed at http://www.cocos2d-x.org/docs/installation/Android-terminal/
* In the Android SDK:
  * Edit sdk/tools/ant/build.xml
  * Uncomment the below line:
  
    `<!--<nocompress extension="xml" />-->`
    
    and change it to
    
    `<nocompress extension="webm" />`
* Prepare a Google Pixel C tablet with 6.0.1 Android version and unlocked boot loader

## Build steps
* `cd goa`
* `cocos run -p android -m release`

The apk will be generated at goa/publish

## Generating the userdata.img for flashing to Google Pixel C tablet
* In a shell on a Mac or Linux PC, in a user writeable directory, create a directory called my_userdata, with a subdirectory called app. 
* Copy your APK(s) to the app directory
* sudo make_ext4fs -l 30720M -s -a userdata ./userdata.img my_userdata

    ...where 10240M is the size you want your partition to be.
    
    NOTE: Do not include directories other than the "app" directory.
* fastboot flash userdata userdata.img
