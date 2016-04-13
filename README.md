# furthermore

Interim censeo, Carthago delenda est. She is a menace to Rome.

[![on npm](http://img.shields.io/npm/v/furthermore.svg?style=flat)](https://www.npmjs.org/package/furthermore)  [![Tests](http://img.shields.io/travis/ceejbot/furthermore.svg?style=flat)](http://travis-ci.org/ceejbot/furthermore)
[![Coverage Status](https://coveralls.io/repos/ceejbot/furthermore/badge.svg?branch=master&service=github)](https://coveralls.io/github/ceejbot/furthermore?branch=master) [![Dependencies](http://img.shields.io/david/ceejbot/furthermore.svg?style=flat)](https://david-dm.org/ceejbot/furthermore)

`furthermore` is a command-line tool that manipulates keys in an [etcd](https://github.com/coreos/etcd) server or cluster somewhere over there. It's meant to be more convenient than `etcdctl`. `npm install -g furthermore` to begin setting keys.

It uses a file named `~/.etcdrc` for config. That file looks like this:

```ini
[default]
hosts=etcd.example.com:443
ssl=true

[staging]
hosts=staging-etcd.example.com:443
ssl=true

[cluster]
hosts[]=etcd-1.example.com:443
hosts[]=etcd-2.example.com:443
ssl=true
```

The named sections may be passed to the `--env` option to use a different etcd host group than the default.

Usage:

```
furthermore: manipulate keys on a remote etcd server

Commands:
  get <key>          get the value for a key; end the key with * to see all keys
                     that start with the prefix
  ls <dir>           get a directory listing
  mkdir <dir>        create the named directory, recursively
  rm <key>           remove a key
  rmdir <dir>        remove the named directory
  set <key> <value>  set a key to a new value

Options:
  --env, -e  which etcd host group to use                   [default: "default"]
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

Examples:
  furthermore ls /deploys
  furthermore mkdir /deploys/website
  furthermore set /deploys/website/commit bfc8d32
  furthermore get /deploys/website/commit
  furthermore rm /deploys/website/commit
  furthermore -e staging set canonical-host https://example.com
```

## License

ISC
