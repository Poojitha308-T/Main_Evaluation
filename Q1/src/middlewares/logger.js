import fs from "fs";
export const logger = (req,res,next) => {
    const line = `${req.method} ${req.url} ${new Date().toISOString()}\n`;
    fs.appendFile("logs.txt",line,() => {});
    next();
}