[![Run on Repl.it](https://repl.it/badge/github/mbajoshuac/library-node-api)](https://repl.it/github/mbajoshuac/library-node-api)

Just a Node native server with routes for endpoint that permits.

1. User Registration
2. Admin Add book
3. Admin Delete Book
4. Admin delete user
5. Admin Update a Book in the library.
6. User Access books
7. User Request/ lend Book and user borrowed status is updated

End Points
============================
1. books (with methods - post, get, put and delete)
2. user (with methods - post, get and delete)
3. request ( request book)
4. reqturn (  returns books)



User Input format::
{
  "fullname": "Emmanuel Mba",
  "email" : "emmy@gmail.com",
  "dob" : "29-10-1990",
  "address" : "No 23, Ezi Akani, Ukpa, Ehugbo",
  "phone" : "07063516620",
  "role" : "user"
}

PS: User borrowed and userid prop is added from the code

NB: Admin can't be registered :::


Book Input Format:::

{
    "name": "nodejs HardCore",
    "author": "Harmes Diaz",
    "price": 4400,
    "isbn" : "234-5050-33",
    "publisher": "Microsoft",
    "copies" : 5
    }


Users and Admin are authenicated through the header.

The fileName is used and their unique Identification for authentication.