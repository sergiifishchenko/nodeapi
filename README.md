# Node Rest API

## Running project

You need to have installed Node.js and MongoDB 

### Install dependencies 

To install dependencies enter project folder and run following command:
```
npm install
```
### Make Requests

Post request sample
http://localhost:1337/api/articles
{
  "title": "string",
  "author": "string",
  "description": "string",
  "images": [{"kind":"thumbnail", "url":"http://site.com/images/write-topic.png"}, {"kind":"detail", "url":"http://site.com/images/write-topic.png"}]
}