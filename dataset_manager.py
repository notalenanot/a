import json
import argparse
from pathlib import Path

DATA_FILE = Path('datasets.json')


def load_datasets():
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []


def save_datasets(datasets):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(datasets, f, indent=2)


def add_dataset(name, link, description):
    datasets = load_datasets()
    if any(d['name'] == name for d in datasets):
        print(f"Dataset '{name}' already exists.")
        return
    datasets.append({'name': name, 'link': link, 'description': description})
    save_datasets(datasets)
    print(f"Added dataset '{name}'.")


def list_datasets():
    datasets = load_datasets()
    if not datasets:
        print('No datasets found.')
        return
    for d in sorted(datasets, key=lambda x: x['name'].lower()):
        print(f"- {d['name']}: {d['link']}\n  {d['description']}")


def remove_dataset(name):
    datasets = load_datasets()
    new_datasets = [d for d in datasets if d['name'] != name]
    if len(new_datasets) == len(datasets):
        print(f"Dataset '{name}' not found.")
        return
    save_datasets(new_datasets)
    print(f"Removed dataset '{name}'.")


def update_dataset(name, link=None, description=None):
    datasets = load_datasets()
    for d in datasets:
        if d['name'] == name:
            if link is not None:
                d['link'] = link
            if description is not None:
                d['description'] = description
            save_datasets(datasets)
            print(f"Updated dataset '{name}'.")
            return
    print(f"Dataset '{name}' not found.")


def search_datasets(keyword):
    datasets = load_datasets()
    results = [d for d in datasets if keyword.lower() in d['name'].lower()]
    if not results:
        print('No matching datasets found.')
        return
    for d in sorted(results, key=lambda x: x['name'].lower()):
        print(f"- {d['name']}: {d['link']}\n  {d['description']}")


def parse_args():
    parser = argparse.ArgumentParser(description='Manage open research datasets')
    subparsers = parser.add_subparsers(dest='command')

    add_p = subparsers.add_parser('add', help='Add a dataset')
    add_p.add_argument('name')
    add_p.add_argument('link')
    add_p.add_argument('description')

    subparsers.add_parser('list', help='List datasets')

    rm_p = subparsers.add_parser('remove', help='Remove a dataset')
    rm_p.add_argument('name')

    up_p = subparsers.add_parser('update', help='Update an existing dataset')
    up_p.add_argument('name')
    up_p.add_argument('--link', help='New link')
    up_p.add_argument('--description', help='New description')

    search_p = subparsers.add_parser('search', help='Search datasets by name')
    search_p.add_argument('keyword')

    return parser.parse_args()


def main():
    args = parse_args()
    if args.command == 'add':
        add_dataset(args.name, args.link, args.description)
    elif args.command == 'list':
        list_datasets()
    elif args.command == 'remove':
        remove_dataset(args.name)
    elif args.command == 'update':
        update_dataset(args.name, args.link, args.description)
    elif args.command == 'search':
        search_datasets(args.keyword)
    else:
        print('No command provided. Use --help for usage information.')


if __name__ == '__main__':
    main()
