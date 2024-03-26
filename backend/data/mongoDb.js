import { db } from '../models/place';

db.posts.drop();
db.posts.findOne();

db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectId and is required',
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                description: 'must be a objectId and is required',
              },
            },
          },
        },
      },
    },
  },
});

db.posts.insertOne({
  title: 'My first Post!',
  text: 'This is my first Post, I hope you like it!',
  tags: ['new', 'tech'],
  creator: ObjectId('660200968a598212be926487'),
  comments: [
    { text: 'I this post!', author: ObjectId('660200968a598212be926486') },
  ],
});
