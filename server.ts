import { createServer } from 'https';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import fs from 'fs';
import next from 'next';


const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const sslOptions = {
    pfx: fs.readFileSync('C:/SSL/WildCardSSL/ssl.pfx'),
    passphrase: 'Test@123',
};


app.prepare().then(() => {
    createServer(
        sslOptions,
        (req: IncomingMessage, res: ServerResponse) => {
            const parsedUrl = parse(req.url || '', true);
            handle(req, res, parsedUrl);
        }
    ).listen(port, () => {
        console.log(`Next.js server is running at https://localhost:${port}`);
    });
});
