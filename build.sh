rm -rf .build

meteor build --server-only --directory ./.build --architecture os.linux.x86_64

VERSION=$(node -pe "require('./package.json').version")
NAME=$(node -pe "require('./package.json').name")

cp dockerfile .build/
cp docker-package.json .build/bundle/package.json

docker build .build/ -t hacknlove/$NAME:$VERSION

rm -rf .build

docker push hacknlove/$NAME:$VERSION
