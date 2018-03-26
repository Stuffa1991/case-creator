# case-creator

First start

1. Fill out .env.example and rename to .env
2. Install NPM modules
3. Install Composer modules
3. Do migration - php artisan migrate
4. Uncomment the stuff in app/Http/Controllers/CaseController.php /images to create references to the images (Getting moved to seeding layer)
5. Run localhost/api/steamlytics/populate (Should probably also be moved to seeding layer)
6. Run NPM Watch
7. Site should now be functional
