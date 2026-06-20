#!/bin/bash
# Artisanal Deployment Script for RESINROOM
# Optimized to handle remote conflicts for the final harvest.
git init
git remote add origin https://github.com/YAZR007/resinroom.git
git add .
git commit -m "Final boutique harvest deployment"
git branch -M main
# We use --force to ensure the Studio's artisanal state overwrites any remote placeholders.
git push -u origin main --force
