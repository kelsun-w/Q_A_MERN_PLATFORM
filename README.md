# mfu-life

## Installation

### Prerequisites

* node
* npm
* mongodb

1. Clone this repository

2. Install server dependencies
    ```bash
    $ cd server
    $ npm install
    ```
3. Install client dependencies
    ```bash
    $ cd client
    $ npm install
    ```

## Run the app

1. Start mongodb locally
    ```bash
    $ mongod
    ```
2. Start the server
    ```bash
    $ cd server
    $ npm start
    ```
3. Start the client
    ```bash
    $ cd client
    $ npm start
    ```
4. Browse to `http://localhost:3000/`  
 
## Testing
 
### Server
Make sure mongodb is running before testing the server.
```bash
$ cd server
$ npm test
```

### Client
```bash
$ cd client
$ npm test
```
 
### Routes
|          Route          |    Method   | Return on success | HTTP status on `error` |
|:------------------------|:-----------:|:-----------------:|:----------------------:|
|/login                   |     POST    |    jwt token      | `401`                  |
|/register                |     POST    |    jwt token      | `422`                  |
|/posts                   |     POST    |    `Post`         | `401` OR `422`         |
|/posts                   |     GET     |    `Array<Post>`  |  -                     |
|/posts/`:category`       |     GET     |    `Array<Post>`  |  -                     |
|/post/`:post`            |     GET     |    `Post`         |  -                     |
|/post/`:post`/upvote     |     GET     |    `Post`         | `401`                  |
|/post/`:post`/downvote   |     GET     |    `Post`         | `401`                  |
|/post/`:post`/unvote     |     GET     |    `Post`         | `401`                  |
|/post/`:post`            |     DELETE  |    success        | `401`                  |         
|/post/`:post`            |     POST    |    `Post`         | `401` OR `422`         |
|/post/`:post`/`:comment` |     DELETE  |    `Post`         | `401`                  |
|/user/`:user`            |     GET     |    `Array<Post>`  |                        |

 
## License

This project is made available under the **MIT License**.
