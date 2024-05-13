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

// use companyData;
db.companies.insertOne({ name: 'Fast Burgers Foods', stock: 132, _id: 1 });
db.companies.insertMany([
  { name: 'Smart Burgers', stock: 224, _id: 2 },
  { name: 'High Quality Beef', stock: 187, _id: 3 },
]);

db.companies.find();

db.companies.insertMany(
  [
    { name: 'Fresh Shakes', stock: 98, _id: 1 },
    { name: 'Awesome Burgers Inc.', stock: 134, _id: 4 },
  ],
  { ordered: false }
);
db.companies.insertOne(
  { name: 'Fresh Produce', stock: 218, _id: 5 },
  { writeConcern: { w: 1, j: true } }
);

// mongoimport tv-shows.json -d movieData -c movies --jsonArray --drop // use to import data

db.movies.find({ 'rating.average': { $gt: 7 } });
db.movies.find({ genres: 'Drama' });
db.movies.find({ genres: ['Drama'] }); // finds only genres with only "Drama" in array
db.movies.find({ runtime: { $in: [30, 42] } }); // finds only runtime of 30 and 42
db.movies.find({ runtime: { $nin: [30, 42] } }); // finds every runtime except 30 and 42
db.movies.find({
  $or: [{ 'rating.average': { $lt: 5 } }, { 'rating.average': { $gt: 9.3 } }],
});
db.movies.find({
  $nor: [{ 'rating.average': { $lt: 5 } }, { 'rating.average': { $gt: 9.3 } }],
});
db.movies.find({
  $and: [{ 'rating.average': { $gt: 9 } }, { genres: 'Drama' }],
}); // doese the same as below code
db.movies.find({ 'rating.average': { $gt: 9 }, 'genres': 'Drama' }); // doese the same as above code
db.movies.find({ genres: 'Drama', genres: 'Horror' }); // only returns genres: "Horror"
db.movies.find({ $and: [{ genres: 'Drama' }, { genres: 'Horror' }] }); // returns bothe Drama and Horror becouse of $and
db.movies.find({ runtime: { $not: { $eq: 60 } } }); // count 70
db.movies.find({ runtime: { $ne: 60 } }); // count 70
db.users.insertMany([
  {
    name: 'Max',
    hobbies: [
      { title: 'Sports', frequency: 3 },
      { title: 'Cooking', frequency: 6 },
    ],
    phone: 0131782734,
  },
  {
    name: 'Manuel',
    hobbies: [
      { title: 'Cooking', frequency: 5 },
      { title: 'Cars', frequency: 2 },
    ],
    phone: '012177972',
    age: 30,
  },
]);
db.users.find({ age: { $exists: true } });
db.users.find({ age: { $exists: true, $gt: 30 } });
db.users.insertOne({
  name: 'Anne',
  hobbies: [
    { title: 'Sports', frequency: 2 },
    { title: 'Yoga', frequency: 3 },
  ],
  phone: '80811987291',
  age: null,
});
db.users.find({ age: { $exists: false } }); // finds age with null
db.users.find({ phone: { $type: 'number' } });
db.users.find({ phone: { $type: 'double' } });
db.users.find({ phone: { $type: ['double', 'string'] } });
db.movies.find({ summary: 'musical' }); // doesn't work wit paragraphs
db.movies.find({ summary: { $regex: /musical/ } }); // finds all text with musical in it
db.sales.find({ $expr: { $gt: ['$volume', '$target'] } });
b.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ['$volume', 190] },
          then: { $subtract: ['$volume', 10] },
          else: '$volume',
        },
      },
      '$target',
    ],
  },
});
db.movieStarts.find({
  'meta.rating': { $gt: 9.2 },
  'meta. runtime': { $lt: 100 },
});
db.movieStarts.find({ $or: [{ genre: 'drama' }, { genre: 'action' }] });
db.movieStarts.find({ $and: [{ genre: 'drama' }, { genre: 'action' }] });
db.movieStarts.find({ $expr: { $gt: ['$visitors', '$expectedVisitors'] } });
[
  {
    _id: ObjectId('6633a9068758a736063b3dc8'),
    title: 'Teach me if you can',
    meta: { rating: 8.5, aired: 2014, runtime: 90 },
    visitors: 590378,
    expectedVisitors: 500000,
    genre: ['action', 'thriller'],
  },
];
db.users.find({ 'hobbies.title': 'Sports' });
[
  {
    _id: ObjectId('66327ca72933198031ffaaf6'),
    name: 'Max',
    hobbies: [
      { title: 'Sports', frequency: 3 },
      { title: 'Cooking', frequency: 6 },
    ],
    phone: 131782734,
  },
  {
    _id: ObjectId('663285df2933198031ffaaf8'),
    name: 'Anne',
    hobbies: [
      { title: 'Sports', frequency: 2 },
      { title: 'Yoga', frequency: 3 },
    ],
    phone: '80811987291',
    age: null,
  },
];
db.users.insertOne({ name: 'Chris', hobbies: ['Sports', 'Cooking', 'Hiking'] });
db.users.find({ hobbies: { $size: 3 } });
[
  {
    _id: ObjectId('6633d036f1e15831a8897f05'),
    name: 'Chris',
    hobbies: ['Sports', 'Cooking', 'Hiking'],
  },
];

db.movieStarts.find({ genre: { $all: ['action', 'thriller'] } });
[
  {
    _id: ObjectId('6633a9068758a736063b3dc7'),
    title: 'The Last Student Returns',
    meta: { rating: 9.5, aired: 2018, runtime: 100 },
    visitors: 1300000,
    expectedVisitors: 1550000,
    genre: ['thriller', 'drama', 'action'],
  },
  {
    _id: ObjectId('6633a9068758a736063b3dc8'),
    title: 'Teach me if you can',
    meta: { rating: 8.5, aired: 2014, runtime: 90 },
    visitors: 590378,
    expectedVisitors: 500000,
    genre: ['action', 'thriller'],
  },
  {
    _id: ObjectId('6633a9068758a736063b3dc9'),
    title: 'Supercharged Teaching',
    meta: { rating: 9.3, aired: 2016, runtime: 60 },
    visitors: 370000,
    expectedVisitors: 1000000,
    genre: ['thriller', 'action'],
  },
];

db.users.find({
  $and: [{ 'hobbies.title': 'Sports' }, { 'hobbies.frequency': { $gte: 2 } }],
});
[
  ({
    _id: ObjectId('66327ca72933198031ffaaf6'),
    name: 'Max',
    hobbies: [
      { title: 'Sports', frequency: 3 },
      { title: 'Cooking', frequency: 6 },
    ],
    phone: 131782734,
  },
  {
    _id: ObjectId('663285df2933198031ffaaf8'),
    name: 'Anne',
    hobbies: [
      { title: 'Sports', frequency: 2 },
      { title: 'Yoga', frequency: 3 },
    ],
    phone: '80811987291',
    age: null,
  }),
];

db.users.find({
  hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } },
});
[
  {
    _id: ObjectId('66327ca72933198031ffaaf6'),
    name: 'Max',
    hobbies: [
      { title: 'Sports', frequency: 3 },
      { title: 'Cooking', frequency: 6 },
    ],
    phone: 131782734,
  },
];

db.exmoviestarts.find({ genre: { $size: 2 } });
[
  {
    _id: ObjectId('66351806be429f0a14d62581'),
    title: 'Supercharged Teaching',
    meta: { rating: 9.3, aired: 2016, runtime: 60 },
    visitors: 370000,
    expectedVisitors: 1000000,
    genre: ['thriller', 'action'],
    ratings: [10, 9, 9],
  },
  {
    _id: ObjectId('66351806be429f0a14d62582'),
    title: 'Teach me if you can',
    meta: { rating: 8, aired: 2014, runtime: 90 },
    visitors: 590378,
    expectedVisitors: 500000,
    genre: ['action', 'thriller'],
    ratings: [8, 8],
  },
];

db.exmoviestarts.find({ 'meta.aired': 2018 });
[
  {
    _id: ObjectId('66351806be429f0a14d62583'),
    title: 'The Last Student Returns',
    meta: { rating: 9.5, aired: 2018, runtime: 100 },
    visitors: 1300000,
    expectedVisitors: 1550000,
    genre: ['thriller', 'drama', 'action'],
    ratings: [10, 9],
  },
];

db.exmoviestarts.find({ ratings: { $elemMatch: { $gt: 8, $lt: 10 } } });
[
  {
    _id: ObjectId('66351806be429f0a14d62581'),
    title: 'Supercharged Teaching',
    meta: { rating: 9.3, aired: 2016, runtime: 60 },
    visitors: 370000,
    expectedVisitors: 1000000,
    genre: ['thriller', 'action'],
    ratings: [10, 9, 9],
  },
  {
    _id: ObjectId('66351806be429f0a14d62583'),
    title: 'The Last Student Returns',
    meta: { rating: 9.5, aired: 2018, runtime: 100 },
    visitors: 1300000,
    expectedVisitors: 1550000,
    genre: ['thriller', 'drama', 'action'],
    ratings: [10, 9],
  },
];

const dataCursor = db.movies.find();
dataCursor.next();
dataCursor.forEach((doc) => {
  printjson(doc);
}); // goes through all documents

dataCursor.hasNext(); // returns true or false

db.movies.find().sort({ 'ratting.average': 1 }); // 1 assending -1 descending

db.movies.find().sort({ 'ratting.average': 1, 'runtime': -1 }); // 1 assending -1 descending

db.movies
  .find()
  .sort({ 'rating.average': 1, 'runtime': -1 })
  .sort({ 'rating.average': 1 })
  .skip(10);

db.movies
  .find()
  .sort({ 'rating.average': 1, 'runtime': -1 })
  .sort({ 'rating.average': 1 })
  .skip(10)
  .limit(10);

db.movies.find({ genres: 'Drama' }, { 'genres.$': 1 });
[
  { _id: ObjectId('662fdd76b86188abdbab1e51'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e52'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e53'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e54'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e55'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e56'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e57'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e58'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e59'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e5b'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e5c'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e5d'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e5e'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e5f'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e60'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e62'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e65'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e67'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e68'), genres: ['Drama'] },
  { _id: ObjectId('662fdd76b86188abdbab1e69'), genres: ['Drama'] },
];

db.movies.find({ genres: { $all: ['Drama', 'Horror'] } }, { 'genres.$': 1 });
[
  { _id: ObjectId('662fdd76b86188abdbab1e54'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e58'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e59'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e5d'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e70'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e71'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e76'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e7b'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1e8f'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1ee4'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1eea'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1f04'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1f09'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1f1b'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1f1f'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1f26'), genres: ['Horror'] },
  { _id: ObjectId('662fdd76b86188abdbab1f35'), genres: ['Horror'] },
];

db.movies.find(
  { genres: 'Drama' },
  { genres: { $elemMatch: { $eq: 'Horror' } } }
);

db.movies
  .find({ 'rating.average': { $gt: 9 } }, { genres: { $slice: 2 } })
  .count(); // 7
db.movies
  .find({ 'rating.average': { $gt: 9 } }, { genres: { $slice: 1 }, name: 1 })
  .count(); // 7
7;

movieData >
  db.movies
    .find(
      { 'rating.average': { $gt: 9 } },
      { genres: { $slice: [1, 2] }, name: 1 }
    )
    .count(); // 7

db.users.updateOne(
  { _id: ObjectId('6633d036f1e15831a8897f05') },
  {
    $set: {
      hobbies: [
        { title: 'Sports', frequency: 5 },
        { title: 'Hiking', frequency: 1 },
      ],
    },
  }
);

db.users.updateMany(
  { 'hobbies.title': 'Sports' },
  { $set: { isSporty: true } }
);

db.users.updateOne(
  { _id: ObjectId('6633d036f1e15831a8897f05') },
  { $set: { age: 23, phone: 5093488956 } }
);

db.users.updateOne({ name: 'Manuel' }, { $inc: { age: 1 } });

db.users.updateOne(
  { name: 'Manuel' },
  { $inc: { age: 1 }, $set: { isSporty: false } }
);

db.users.find({ name: 'Manuel' });
[
  {
    _id: ObjectId('66327ca72933198031ffaaf7'),
    name: 'Manuel',
    hobbies: [
      { title: 'Cooking', frequency: 5 },
      { title: 'Cars', frequency: 2 },
    ],
    phone: '012177972',
    age: 33,
    isSporty: false,
  },
];
