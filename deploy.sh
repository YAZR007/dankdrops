#!/bin/bash
# Artisanal Deployment Script for DANKDROPS
git init
git remote add origin https://github.com/YAZR007/dankdrops.git
git add .
git commit -m "Final boutique harvest deployment"
git branch -M main
git push -u origin main
