Just a Node native server with routes for endpoint that permits.

1. User Registration
2. Admin Add book
3. User Access books
4. Admin Delete Book
5. User Request and lend Book
6. Admin delete user
7. Admin Update a Book in the library.


User Input format::
{
  "fullname": "Emmanuel Mba",
  "email" : "emmy@gmail.com",
  "dob" : "29-10-1990",
  "address" : "No 23, Ezi Akani, Ukpa, Ehugbo",
  "phone" : "07063516620",
  "role" : "user"
}

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