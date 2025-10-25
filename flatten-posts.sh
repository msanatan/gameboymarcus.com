#!/bin/bash

# Flatten posts directory structure for Velite
find posts -type f -name "index.md" | while IFS= read -r file; do
  # Extract year and slug from path like posts/2014/foo-hello/index.md
  year=$(echo "$file" | cut -d/ -f2)
  slug=$(echo "$file" | cut -d/ -f3)

  # Create new flattened filename
  newfile="posts/${year}-${slug}.md"

  # Copy the file
  cp "$file" "$newfile"
  echo "Created: $newfile"
done

echo ""
echo "Total flattened posts:"
ls posts/*.md 2>/dev/null | wc -l
