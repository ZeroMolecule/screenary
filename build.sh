if [ "$PACKAGE" = "api" ]; then  
    echo "nx run api:build:production"
elif [ "$PACKAGE" = "web" ]; then
    echo "nx run web:build:production"
fi