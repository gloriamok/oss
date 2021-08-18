// JavaScript source code
var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    return `<!doctype html>
<html>
<head>
  <title>Virtual Travel App - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">Virtual Travel Application</a></h1>
${list}
${body}
</body>
</html>
`;
}

function templateList(filelist2) {
    var list = '<ol>';
    var i = 0;
    while (i < filelist2.length) {
        list += `<li><a href="?id=${filelist2[i]}">${filelist2[i]}</a></li>`;
        i++;
    }
    list += '</ol>';
    return list;
}

var app = http.createServer((request, response) => {

    var varUrl = request.url;
    var myURL = new URL('http://localhost:3000' + varUrl);

    var queryData = myURL.searchParams.get('id');
    var title = queryData;

    var pathname = url.parse(varUrl, true).pathname;

    if (pathname === '/') {
        if (title === null) {

            fs.readdir('./data', (error, filelist) => {

                var filelist2 = filelist;
                for (var i = 0; i < filelist2.length; i++) {
                    filelist2[i] = filelist2[i].replace('.txt', '');
                }
                var title = 'Welcome';
                var description = '~~~~~~ is a virtual travel application for resolving the Corona Blue caused by COVID-19.';
                var list = templateList(filelist2);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            })
        }
        else {
            fs.readdir('./data', (error, filelist) => {

                var filelist2 = filelist;
                for (var i = 0; i < filelist2.length; i++) {
                    filelist2[i] = filelist2[i].replace('.txt', '');
                }
                var list = templateList(filelist2);
                fs.readFile(`data/${title}.txt`, 'utf-8', (err, description) => {
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }

    }
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(2000);