if [ "$PACKAGE" = "api" ]; then  
    nx run api:build:production
elif [ "$PACKAGE" = "web" ]; then
    if [ "$APP_ENV" = "production" ]; then
        echo "NEXT_PUBLIC_REMOTE_API_BASE_URL=https://screenary-api-e92c7280adc2.herokuapp.com/api" > .env    
    fi
    nx run web:build:production
    rm -r ./dist/packages/web/.next/cache
fi