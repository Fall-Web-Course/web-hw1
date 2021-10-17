const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
	if(req.url === '/sha256') {
		fs.readFile(path.join(__dirname, '..', 'nginx locust front', 'templates', 'sha256.html'), (err, content) => {
			if (err) throw err;
			var input = "", sha = "";
			res.writeHead(200, { 'Content-Type': 'text/html'});
			res.end(content.toString().replace('{{ .input }}', input).replace('{{ .sha_value }}', sha)); 
		});
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
