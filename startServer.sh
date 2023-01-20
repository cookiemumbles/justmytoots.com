#!/bin/bash
if [[ "$1" == "-m" ]]; then
  cd public
  php -S localhost:8008
else
  php -S localhost:8008
fi
