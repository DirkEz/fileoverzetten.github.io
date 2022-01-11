const http = require('http');
const formidable = require('formidable');
const fs = require('fs');


http.createServer(function(req, res) {

    switch(req.url) {

        default:
            fs.readFile('index.html', function(err, data){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
            break;

        case '/fileupload':
            fs.readFile('fileupload.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data)
                res.end();
            });
            break;

        case '/fileuploaded':
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                var oldpath = files.filetoupload.path;
                var newpath = 'C:/Users/dirk2/' + files.filetoupload.name; // <-- veranderen
                fs.rename(oldpath, newpath, function(err){
                    if(err) throw err;
                    res.write('File uploaded and moved');
                    res.end();
                })
            });
            break;

    };

}).listen(8080);
