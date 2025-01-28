import http from 'http';
import app from './index';

const server = http.createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, async()=>{
    console.log(`Server started http://localhost:${PORT}`);
});