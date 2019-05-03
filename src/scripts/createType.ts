import { generateNamespace } from '@gql2ts/from-schema';
import { generateSchema } from '../utils/generateSchema';
import * as fs from 'fs';
import path from 'path';

const myNamespace = generateNamespace("GQL", generateSchema());
fs.writeFile(path.join(__dirname, "../types/schema.d.ts"), myNamespace, (err) => {
  console.log('create schema type error ', err);
});