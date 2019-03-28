module.exports = {
    recSave: function (book, file, targetLangDoc) {
		var fs = require("fs")
        var filePath = targetLangDoc[0];
        var book = book.bookName + ".webm";
        filePath += ("/recordings/" + book)
        var fileReader = new FileReader();
            fileReader.onload = function () {
            fs.writeFileSync(filePath, Buffer.from(new Uint8Array(this.result)));
            };
            fileReader.readAsArrayBuffer(file.blob);
            return filePath;
    }
};