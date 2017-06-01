## v0.0.1
> First Release

## v0.2.0
* Docs updated with useful information
* Updated some modules to the latest version
* personalised notification enabled
* breaking change avatar is now passed as url image instead of element
* overflowText is now string
* minWidth of the container changed to 325px as default

## v0.3.0
* Fixed npm build issues

## v0.3.1
* Fixed left icon prop being passed empty resulted in an error
* Fixed left icon padding

## v0.3.2
* Changed max notification count to infinity and allowed values are natural numbers or Infinity

## v0.4.0
* changed the way props are handled internally for react css transition group
* added a demo for react css transition group
* added license to package json
* added transitionAppear and other related props

> **Note** Major breaking changes!

* removed children prop in favor of static showNotification method
* you can now only use one ReactMaterialUiNotifications component per app, so try to put it in a common spot, this was done to solve the problem of incorrect notifications getting displayed and to introduce the dismiss action in a future release

## v0.4.1
* Bumped versions of dependencies to newer versions

## v0.5.0
* Warning this release contains breaking changes in dependencies.
* react-addons-css-transition-group changed to react-transition-group to remove warning.
* removed proptypes from react instead imported from prop-types library 
* Special thanks to [Gonçalo Margalho @DevAlien](https://github.com/DevAlien) for making that wonderful hotfix