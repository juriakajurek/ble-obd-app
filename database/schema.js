import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 2,
  tables: [
    // tu definiuje schematy tabel bazy danych
    tableSchema({
      name: 'routes',
      columns: [
        {name: 'paramsData', type: 'string'}, //typy: string || number || boolean
        {name: 'geo', type: 'string'},
        {name: 'acc', type: 'number'},
        {name: 'speed', type: 'number'},
        {name: 'date', type: 'number'},
        {name: 'route', type: 'number'},
      ],
    }),
  ],
});
