const fileUtil = require('./fileUtil');
const routeHandler = {};
const helper = require('./helper');

routeHandler.Books = (data, callback) => {
    const acceptableHeaders = ["post", "get", "put", "delete"];
    if (acceptableHeaders.indexOf(data.method) > -1) {
        routeHandler._books[data.method](data, callback);
    } else {
        callback(405);
    }
};

//main book route object
routeHandler._books = {};

//Post route -- for creating a book
routeHandler._books.post = (data, callback) => {
    //validate that all required fields are filled out

    var name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var isbn = typeof(data.payload.isbn) === 'string' && !isNaN(parseInt(data.payload.isbn)) ? data.payload.isbn : false;
    var author = typeof(data.payload.author) === 'string' && data.payload.author.trim().length > 0 ? data.payload.author : false;
    var publisher = typeof(data.payload.publisher) === 'string' && data.payload.publisher.trim().length > 0 ? data.payload.publisher : false;
    var copies = typeof(data.payload.copies) === 'number' && !isNaN(parseInt(data.payload.copies)) ? data.payload.copies : false;
    if (name && isbn && author && publisher && copies) {
        const fileName = helper.generateRandomString(30);

        fileUtil.create('books', fileName, data.payload, (err) => {
            if (!err) {
                callback(200, { message: "The New book was added successfully with ID: " + fileName });
            } else {
                callback(400, { message: "Oops! This server had issues with your Request, Try again" });
            }
        });
    } else {
        callback(403, { message: " You are sending an incomplete data", data: { name, author, publisher, isbn, copies } })
    }
};
//Get route -- for geting a book
routeHandler._books.get = (data, callback) => {
    // fileUtil.read('users', userid, (err, data) => {
    var userid = data.query.userid;
    if (userid) {
        fileUtil.read('users', userid, (err, data) => {
            if (!err && data) {
                if (bookid) {
                    fileUtil.read('books', bookid, (err, data) => {
                        if (!err && data) {
                            callback(200, { message: 'Book record Retrieved', data: data, id: bookid });
                        } else {
                            callback(403, { err: err, data: data, message: 'This Book seems not to be in our Library Again' });
                        }
                    });
                } else {
                    callback(403, { message: 'Please Provide a Valid Book ID for your request' })
                }
            } else {
                callback(403, { message: 'This User doesn\'t exist in our record' })
            }
        })
    } else {
        callback(403, { message: 'Please provide a valid User ID to Verify your Identity' })
    }
}


//Put route -- for updating a book
routeHandler._books.put = (data, callback) => {
    if (data.query.name) {
        fileUtil.update('books', data.query.name, data.payload, (err) => {
            console.log(data.query.name);
            if (!err) {
                callback(200, { message: 'book updated successfully' })
            } else {
                callback(400, { err: err, data: null, message: 'could not update book' });
            }
        });
    } else {
        callback(404, { message: 'book not found' });
    }
};
//Delete route -- for deleting a book
routeHandler._books.delete = (data, callback) => {
    if (data.query.name) {
        fileUtil.delete('books', data.query.name, (err) => {
            if (!err) {
                callback(200, { message: 'book deleted successfully' });
            } else {
                callback(400, { err: err, message: 'could not delete book' });
            }
        })
    } else {
        callback(404, { message: 'book not found' });
    }
};

routeHandler.ping = (data, callback) => {
    callback(200, { response: "server is live" });
};
routeHandler.notfound = (data, callback) => {
    callback(404, { response: 'not found' });
};


//routerHandler for users
routeHandler.register = (data, callback) => {
    const acceptableHeaders = ["post", "get", "put", "delete"];
    if (acceptableHeaders.indexOf(data.method) > -1) {
        routeHandler._users[data.method](data, callback);
    } else {
        callback(405);
    }
};

// main user route
routeHandler._users = {};

//user post route - for adding user
routeHandler._users.post = (data, callback) => {
    var name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var email = typeof(data.payload.email) === 'string' && data.payload.email.trim().length > 0 ? data.payload.email : false;
    var age = typeof(data.payload.age) === 'string' && !isNaN(parseInt(data.payload.age)) ? data.payload.age : false;
    var address = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;
    var phone = typeof(data.payload.phone) === 'string' && !isNaN(parseInt(data.payload.phone)) ? data.payload.phone : false;
    var role = typeof(data.payload.role) === 'string' && data.payload.role.trim().length > 0 ? data.payload.role : false;
    if (name && email && age && address && phone && role) {
        const fileName = helper.generateRandomString(6);
        fileUtil.create('users', fileName, data.payload, (err) => {
            if (!err) {
                callback(200, { message: "User has been added successfully", data: null });
            } else {
                callback(400, { message: "Error encountered, user could not be registered" });
            }
        });
    } else {
        callback(403, { message: " incomplete data", data: { name, price, author, publisher } })
    }
};

//Get Route -- to fetch user using file name as unique ID
routeHandler._users.get = (data, callback) => {
    if (data.query.id) {
        fileUtil.read('users', data.query.id, (err, data) => {
            if (!err && data) {
                callback(200, { message: 'User retrieved', data: data });
            } else {
                callback(404, { err: err, data: data, message: 'could not retrieve user Details' });
            }
        });
    } else {
        callback(404, { message: 'This user doesn\'t exist here', data: null });
    }
}

//Delete Route -- to delete user using file name as unique ID
routeHandler._users.delete = (data, callback) => {
    if (data.query.id) {
        fileUtil.delete('users', data.query.id, (err) => {
            if (!err) {
                callback(200, { message: 'User has been deleted successfully and can\'t Request for a book again ' });
            } else {
                callback(400, { err: err, message: 'could not delete user, try again' });
            }
        })
    } else {
        callback(404, { message: 'User doesn\'t exist in here' });
    }
};


//route handlers for Book request

routeHandler.request = (data, callback) => {
    var bookid = data.payload.bookid;
    var userid = data.query.userid;
    // console.log(bookid, userid);
    if (userid) {
        fileUtil.read('users', userid, (err, data) => {
            if (!err && data) {
                // console.log(data);
                fileUtil.read('books', bookid, (err, data) => {
                    var book = data
                    book.copies = book.copies - 1
                    fileUtil.update('books', bookid, book, (err, data) => {
                        callback(200, { message: 'Successfully', data: book })
                    })
                })
            } else {
                callback(403, { message: 'User details not found' })
            }
        })
    } else {
        callback(403, { message: 'Oops! This User does not exist' })
    }

}

module.exports = routeHandler;