## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash

# watch mode
$ npm run start:dev

# build mode
$ npm run build

# production mode (after build)
$ npm run start
```

## Endpoints

### Get JP Location
```bash
curl --location --request POST 'https://wonder-sg10.herokuapp.com/localizacion' \
--header 'Content-Type: application/json' \
--data-raw '{
    "antenas":[
        {
        "name":"wonderfulAntena1",
        "distance":10.1,
        "message":["", "tengo", "", "y", "hambre"]
        },
        {
        "name":"wonderfulAntena2",
        "distance":15.6,
        "message":["ayuda", "", "frío", "y", ""]
        },
        {
        "name":"wonderfulAntena3",
        "distance":12.9,
        "message":["ayuda", "", "", "", "hambre"]
        }
    ]
}'
```

### Set Localizacion por partes
```bash
curl --location --request POST 'https://wonder-sg10.herokuapp.com/localizacion_por_partes/wonderfulAntena1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "distance":10.1,
    "message":["", "tengo", "", "y", "hambre"]
}'
```

### Get Localizacion por partes
```bash
curl --location --request GET 'https://wonder-sg10.herokuapp.com/localizacion_por_partes'
```