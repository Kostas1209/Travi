# Travi
run: npx react-native run-android
run-release: npx react-native run-android --variant=release
build apk: cd android && gradlew buildRelease
