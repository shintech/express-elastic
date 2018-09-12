#!/usr/bin/env bash

if [ -d "node_modules" ] || [ -d ".next" ]; then
  echo "Removing existing files..."
  rm -r node_modules .next --force
fi

if [ ! -d "uploads" ]; then
  echo "Creating file directories..." && \
  mkdir uploads
fi


printf "\nInstalling packages...\n" && \
yarn install && \

printf "All done...\n"