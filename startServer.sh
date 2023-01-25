#!/bin/bash
if [[ "$1" == "-m" ]]; then
  echo "starting minified"
  [[ ! -d public ]] && echo "ERROR: not built" && exit 1
  cd public
  php -S localhost:8008
else
  echo "starting unminified"
  php -S localhost:8008
fi
