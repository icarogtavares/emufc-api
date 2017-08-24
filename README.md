# emufc-api

## Relacionamentos
- Equipment belongsTo Responsible
- Equipment belongsTo Place

- Responsible hasMany Equipment

- Place hasMany Equipment

## Testes
- *Todos os testes: *
  ```sh
  $ sudo yarn run test
  ```
- *Teste somente nas rotas equipment : *
  ```sh
  $ sudo yarn run test-equipmens
  ```
