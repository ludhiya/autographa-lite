module.exports = {
    recSave: function (book, file, targetLangDoc) {
		var fs = require("fs")
        var filePath = targetLangDoc[0];
        var recfile = JSON.stringify(file);
        console.log("new:", file.blob);
        var book = book.bookName + ".webm";
        filePath += ("/recordings/" + book)
            fs.writeFile(filePath, file.blob, (err) => {
                if(err)
                console.log(err);
            });
            return filePath;
    }
};