#!/bin/sh

# check that we're on the `main` branch
branch=$(git rev-parse --abbrev-ref HEAD)
if [ $branch != 'main' ]
then
	echo "The 'main' must be the current branch to make a release."
	echo "You are currently on: $branch"
	exit 1
fi

if [ -n "$(git status --porcelain)" ]
then
  echo "There are uncommited changes. Please commit and create a pull request or stash them.";
  exit 1
fi

version=$(npm list @appcues/react-native | grep @appcues/react-native | awk -F@ '{print $3}')

echo "@appcues/react-native dependency current version: $version"

# no args, so give usage.
if [ $# -eq 0 ]
then
	echo "Version upgrade script"
	echo ""
	echo "Usage: $ ./upgrade.sh <version>"
	echo "   ex: $ ./upgrade.sh \"1.0.2\""
	exit 0
fi

newVersion="${1}"
echo "Preparing to upgrade to @appcues/react-native@$newVersion..."

versionComparison=$(./scripts/semver.sh $newVersion $version)

if [ $versionComparison != '1' ]
then
	echo "New version must be greater than previous version ($version)."
	exit 1
fi

git checkout -b "feature/sdk-$newVersion"

npm install --save-peer @appcues/react-native@$newVersion

cd example
npm install @appcues/react-native@$newVersion

cd ios
pod update Appcues

cd ../..

git commit -am "⬆️ Update @appcues/react-native to $newVersion"
