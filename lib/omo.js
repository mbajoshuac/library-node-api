lib.update = (id, data__, callback) => {
    //open the file
    const filePath = lib.booksDirectory;
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
            let file = parsed[id];

            if (file) {
                file = {...file, ...data__ }
                parsed[id] = file;
                parsed = JSON.stringify(parsed);
                console.log(file)
                    // write to file

                fs.writeFile(filePath, parsed, (err) => {
                    if (!err) {
                        callback(false, parsed[id]);

                    } else {
                        callback("Error writing to new file");
                    }
                });
            } else {
                callback("Book not found")
            }

        } else {
            callback(err, data);
        }
    });
};