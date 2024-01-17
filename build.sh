if [ "$PACKAGE" = "api" ]; then  
    nx run api:build:production
elif [ "$PACKAGE" = "web" ]; then
    nx run web:build:production
    rm -r ./dist/packages/web/.next/cache
fi