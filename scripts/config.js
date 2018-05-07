let config = {}

config.host = process.env.HOST || 'https://ai-roc-playground.documents.azure.com:443/';
config.authKey = process.env.AUTH_KEY || 'H6nY1ILpRwgxj0aMKgARxbzzud1egwav6L4GcCTyM6kkmarnZbmAksi64idE46C8sY4fimJabA7wOZxFFmAq7w==';
config.databaseId = "testdb";
config.collectionId = "democollection";

module.exports = config;