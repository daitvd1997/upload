const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Misc_FOLDER_PATH = path.join(__dirname, '/../Misc');

if (!fs.existsSync(Misc_FOLDER_PATH)) {
  fs.mkdirSync(Misc_FOLDER_PATH);
}

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const oldpath = files.filetoupload.path;
      const newpath = path.join(Misc_FOLDER_PATH, files.filetoupload.name);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload" style=" width: 100%; padding: 10px; border: 2px solid gray; border-radius: 5px; "><br>');
    res.write('<input type="submit" style=" width: 100%; padding: 5px; background: none; border-radius: 5px; border: 2px solid gray; margin-top: 10px; font-weight: bold; cursor: pointer; ">');
    res.write('</form>');
    return res.end();
  }
}).listen(6565);