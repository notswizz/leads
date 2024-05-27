#!/bin/bash

# Ask for a commit message
echo "Enter commit message:"
read commit_message

# Check if there are any changes to commit
if [[ -n $(git status -s) ]]; then
  # Add all changes to the staging area
  git add .

  # Commit the changes with the provided message
  git commit -m "$commit_message"

  # Push the changes to the current branch on GitHub
  git push origin $(git rev-parse --abbrev-ref HEAD)

  echo "Changes have been committed and pushed to GitHub."
else
  echo "No changes to commit."
fi
