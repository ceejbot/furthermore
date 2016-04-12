# furthermore

Interim censeo, Carthago delenda est. She is a menace to Rome.

[![on npm](http://img.shields.io/npm/v/furthermore.svg?style=flat)](https://www.npmjs.org/package/furthermore)  [![Tests](http://img.shields.io/travis/ceejbot/furthermore.svg?style=flat)](http://travis-ci.org/ceejbot/furthermore)
[![Coverage Status](https://coveralls.io/repos/ceejbot/furthermore/badge.svg?branch=master&service=github)](https://coveralls.io/github/ceejbot/furthermore?branch=master) [![Dependencies](http://img.shields.io/david/ceejbot/furthermore.svg?style=flat)](https://david-dm.org/ceejbot/furthermore)

`furthermore` is a command-line tool that manipulates keys in an etcd server or cluster somewhere over there. It's meant to be more convenient than `etcdctl`. `npm install -g furthermore` to begin setting keys.

It uses a file named ~/.etcdrc` for config. That file looks like this:

```ini
hosts=my-etcd-host.example.com:443
ssl=true
```

Usage:

```
furthermore: manipulate keys on a remote etcd server

Commands:
  del <key>          remove a key
  get <key>          get the value for a key; end the key with * to see all keys
                     that start with the prefix
  ls <dir>           get a directory listing
  mkdir <dir>        create the named directory, recursively
  rmdir <dir>        remove the named directory
  set <key> <value>  set a key to a new value

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## License

ISC
