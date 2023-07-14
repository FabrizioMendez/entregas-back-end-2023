import { connect } from 'mongoose';
import fs from 'fs';
import path from 'path';

// const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const configPath = path.resolve('./src/utils/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));



export const mongoURI = config.mongoURI;
export async function connectMongo() {
  try {
    await connect(mongoURI);
    console.log('Plug to MongoDB');
  } catch (e) {
    console.log(e);
    throw 'Connection to mongoDB failed';
  }
}
