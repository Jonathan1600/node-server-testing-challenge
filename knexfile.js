module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    connection: {
      filename: './data/elements.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA journal_mode = WAL', done)
      },
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    connection: {
      filename: './data/test.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA journal_mode = WAL', done)
      },
    },
  },
  production: {

  },
};
