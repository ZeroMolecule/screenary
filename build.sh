if [ "$PACKAGE" = "api" ]; then  
    nx run api:build:production --no-cloud
elif [ "$PACKAGE" = "web" ]; then
    nx run web:build:production --no-cloud
    rm -r ./dist/packages/web/.next/cache
fi