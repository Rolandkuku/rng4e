# This is G4E

This is the third version of the [Girondins4ever](http://www.girondins4ever.com/) android app. It was re-written using [React Native](https://facebook.github.io/react-native/). It allows any Android device owner to keep up with the latest news about the greatest football team of all times: the Girondins de Bordeaux:

<iframe width="560" height="315" src="https://www.youtube.com/embed/giE7svTR0Ko" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Setup

This project uses the great React Native. In order to get started, make sure to have [Android Studio](https://www.ecosia.org/search?q=android+studio&addon=firefox&addonversion=4.0.4) and the react native CLI installed [with the proper setup](https://facebook.github.io/react-native/docs/getting-started).

The next step couldn’t be easier:

```
$ react-native run-android
```

## Deploy

We use [Fastlane](https://docs.fastlane.tools/) managed by [Bundler](https://bundler.io/) in order to deploy.
You will also need to get the google credentials and the `.keystore` file if you want to submit a build to the Play Store althrought this is not mandatory if you just want to run the project locally.

There are currently two lanes in our fastfile: `beta` and `release`.

```
$ bundle exec fastlane <beta|release>
```

## Develop

This is a super simple React Native app and most of it is written in JavaScript. No deep knowledge in Java is required.

The components are responsible for most of the logic althrought the navigation is handled by the `AppNavigator`.

## To do

Here is a non-exhaustive list of features yet to develop:

- [ ] Articles and news pagination
- [ ] Add google analytics
- [ ] Add firebase
