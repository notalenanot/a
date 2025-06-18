# Open Research Repository

This project provides a simple command-line tool for managing links to open datasets. Researchers can add, list, update, search, and remove dataset entries stored in a local JSON file.

## Usage

```bash
# Add a dataset
python dataset_manager.py add "Dataset Name" "http://example.com" "Short description"

# List datasets
python dataset_manager.py list

# Remove a dataset
python dataset_manager.py remove "Dataset Name"

# Update a dataset
python dataset_manager.py update "Dataset Name" --link "http://new.link" --description "New info"

# Search for datasets
python dataset_manager.py search "keyword"
```
