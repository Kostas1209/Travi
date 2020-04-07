import Constants from "expo-constants";

const ENV = {
    dev: {
      GOOGLE_API_KEY: "AIzaSyCAM_giOv1RVMxIRohwiqeD78MUvSsgqQ8",
      BACKGROUND_IMAGE: "mountainBackground.jpg"
    },
    prod: {
        GOOGLE_API_KEY: "AIzaSyCAM_giOv1RVMxIRohwiqeD78MUvSsgqQ8",
        BACKGROUND_IMAGE: "mountainBackground.jpg"
    }
   };
   
   const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
      return ENV.dev;
    }else if (env === 'prod') {
      return ENV.prod;
    }
    return ENV.dev;
   };
  

export default getEnvVars;