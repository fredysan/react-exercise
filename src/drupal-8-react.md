# Drupal Installation

Follow the instructions provided here https://github.com/docksal/boilerplate-drupal8

```bash
$ git clone https://github.com/docksal/boilerplate-drupal8.git drupal8

$ cd drupal8

$ fin init
```

And finally go to the site.

```
http://drupal8.docksal
```

```bash
$ fin composer require drupal/restui
$ fin drush en rest restui
```

Add this to your `docksal.yml` so you can have access from your ReactJs Application to the Rest endpoint.

```yml
version: "2.1"

services:
  cli:
    ports:
      - "8880:80"
```

Add this configuration to the `default/services/yml` file in Drupal.

```yml
cors.config:
  enabled: true
  # Specify allowed headers, like 'x-allowed-header'.
  allowedHeaders: ["x-csrf-token", "content-type"]
  # Specify allowed request methods, specify ['*'] to allow all possible ones.
  allowedMethods: ["GET", "POST", "PATCH", "DELETE"]
  # Configure requests allowed from specific origins.
  allowedOrigins: ["http://localhost:3000"]
  # Sets the Access-Control-Expose-Headers header.
  exposedHeaders: false
  # Sets the Access-Control-Max-Age header.
  maxAge: false
  # Sets the Access-Control-Allow-Credentials header.
  supportsCredentials: true
```
