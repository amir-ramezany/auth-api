export const up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'bigserial',
      primaryKey: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
      check: 'char_length(btrim(name)) > 0',
    },
    email: {
      type: 'varchar(320)',
      notNull: true,
      unique: true,
      check: 'email = lower(email)',
    },
    password_hash: {
      type: 'varchar(255)',
      notNull: true,
    },
    role: {
      type: 'varchar(20)',
      notNull: true,
      default: 'user',
      check: "role IN ('user', 'admin')",
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('users');
};
