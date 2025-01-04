import winston from "winston";

const { Console } = winston.transports;

const format = () => {
    const { combine, json, timestamp, errors } = winston.format;
    return combine(
        errors({ stack : true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), 
        json(),
    );
}

const logger = winston.createLogger({
    level: "http",
    format: format(),
    transports: [new Console()],
});

export default logger;
