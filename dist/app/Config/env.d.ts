interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: string;
    jwt_access_expire: string;
    jwt_access_secret: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASSWORD: string;
    JWT_EXPIRE_SECRET: string;
    JWT_REFRESH_SECRET: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CALLBACK_URL: string;
    EXPRESS_SESSION_SECRET: string;
    FRONTEND_URL: string;
    SSL: {
        SSL_STORE_ID: string;
        SSL_STORE_PASS: string;
        SSL_PAYMENT_API: string;
        SSL_VALIDATION_API: string;
        SSL_SUCCESS_BACKEND_URL: string;
        SSL_FAIL_BACKEND_URL: string;
        SSL_CANCEL_BACKEND_URL: string;
        SSL_SUCCESS_FRONTEND_URL: string;
        SSL_FAIL_FRONTEND_URL: string;
        SSL_CANCEL_FRONTEND_URL: string;
        SSL_IPN_URL: string;
    };
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    };
    EMAIL_SENDER: {
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USER: string;
        SMTP_PASS: string;
        SMTP_FROM: string;
    };
    REDIS: {
        REDIS_HOST: string;
        USERNAME: string;
        PASSWORD: string;
        REDIS_PORT: string;
    };
}
export declare const envVars: EnvConfig;
export {};
//# sourceMappingURL=env.d.ts.map