export const up = (pgm) => {
  pgm.createTable('revoked_access_tokens', {
    jti: {
      type: 'uuid',
      primaryKey: true,
    },
    expires_at: {
      type: 'timestamptz',
      notNull: true,
    },
    revoked_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('revoked_access_tokens');
};
