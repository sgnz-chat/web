npm run postinstall:production
mkdir -p dist

cp -fR assets/* dist/
cp -fR build/* dist/

firebase deploy --only hosting
