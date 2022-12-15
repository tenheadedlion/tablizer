# Tablizer

Tablizer is an ad hoc serialization tool that organizes trading info and publish it on contract platform

## Parsing data

Parsing input data from config.yaml, and save them in trading.sqlite

```shell
tablizer parse -f config.yaml -d trading.sqlite
```

## Save data to a registry contract


```shell
tablizer contract --set -a 0xf156b3be0c6e18db4161f0c49e59e371c96fe534398a6b83a29de7615bc230d1 -r http://localhost:8000 -n ws://localhost:9944
```

Here, `0xf156b3be0c6e18db4161f0c49e59e371c96fe534398a6b83a29de7615bc230d1` is the address of the contract with its runtime endpoint beging `http://localhost:8000`, and node being `ws://localhost:9944`

## Get data from a registry contract 

```shell
tablizer contract --get -a 0xf156b3be0c6e18db4161f0c49e59e371c96fe534398a6b83a29de7615bc230d1 -r http://localhost:8000 -n ws://localhost:9944
```
