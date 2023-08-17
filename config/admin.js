module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "6e6ce2193f35b1a4a5a096d52907513f"),
  },
});
