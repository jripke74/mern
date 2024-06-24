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
    phone: 131782734,
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

db.users.updateOne({ name: 'Chris' }, { $min: { age: 20 } });
db.users.updateOne({ name: 'Chris' }, { $max: { age: 30 } });

db.users.updateOne({ name: 'Chris' }, { $mul: { age: 1.1 } });
db.users.find({ name: 'Chris' });
[
  {
    _id: ObjectId('6633d036f1e15831a8897f05'),
    name: 'Chris',
    hobbies: [
      { title: 'Sports', frequency: 5 },
      { title: 'Hiking', frequency: 1 },
    ],
    isSporty: true,
    age: 24.200000000000003,
    phone: 5093488956,
  },
];

db.users.updateMany({ isSporty: true }, { $unset: { phone: '' } });

db.users.updateMany({}, { $rename: { age: 'totalAge' } });

db.users.updateOne(
  { name: 'Jeff' },
  {
    $set: {
      age: 32,
      hobbies: [{ title: 'Photography', frequency: 32 }],
      isSporty: true,
    },
  },
  { upsert: true }
);

db.sports.updateMany(
  {},
  { $set: { title: 'Football', requiresTeam: true } },
  { upsert: true }
);

db.sports.updateMany({ requiresTeam: true }, { $set: { minPlayers: 11 } });

db.sports.updateMany({ requiresTeam: true }, { $inc: { minPlayers: 10 } });

db.users.find({
  $and: [{ 'hobbies.title': 'Sports' }, { 'hobbies.frequency': { $gte: 3 } }],
});
[
  {
    _id: ObjectId('66327ca72933198031ffaaf6'),
    name: 'Max',
    hobbies: [
      { title: 'Sports', frequency: 3 },
      { title: 'Cooking', frequency: 6 },
    ],
    isSporty: true,
  },
  {
    _id: ObjectId('663285df2933198031ffaaf8'),
    name: 'Anne',
    hobbies: [
      { title: 'Sports', frequency: 2 },
      { title: 'Yoga', frequency: 3 },
    ],
    isSporty: true,
    totalAge: null,
  },
  {
    _id: ObjectId('6633d036f1e15831a8897f05'),
    name: 'Chris',
    hobbies: [
      { title: 'Sports', frequency: 5 },
      { title: 'Hiking', frequency: 1 },
    ],
    isSporty: true,
    totalAge: 24.200000000000003,
  },
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
    isSporty: true,
  },
  {
    _id: ObjectId('6633d036f1e15831a8897f05'),
    name: 'Chris',
    hobbies: [
      { title: 'Sports', frequency: 5 },
      { title: 'Hiking', frequency: 1 },
    ],
    isSporty: true,
    totalAge: 24.200000000000003,
  },
];

db.users.updateMany(
  { hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } } },
  { $set: { 'hobbies.$.highFrequency': true } }
);

db.users.find({ 'hobbies.frequency': { $gt: 2 } });
[
  {
    _id: ObjectId('66327ca72933198031ffaaf6'),
    name: 'Max',
    hobbies: [
      { title: 'Sports', frequency: 3, highFrequency: true },
      { title: 'Cooking', frequency: 6 },
    ],
    isSporty: true,
    hobbis: { 0: { highFrequency: true } },
  },
  {
    _id: ObjectId('66327ca72933198031ffaaf7'),
    name: 'Manuel',
    hobbies: [
      { title: 'Cooking', frequency: 5 },
      { title: 'Cars', frequency: 2 },
    ],
    phone: '012177972',
    isSporty: false,
    totalAge: 33,
  },
  {
    _id: ObjectId('663285df2933198031ffaaf8'),
    name: 'Anne',
    hobbies: [
      { title: 'Sports', frequency: 2 },
      { title: 'Yoga', frequency: 3 },
    ],
    isSporty: true,
    totalAge: null,
  },
  {
    _id: ObjectId('6633d036f1e15831a8897f05'),
    name: 'Chris',
    hobbies: [
      { title: 'Sports', frequency: 5, highFrequency: true },
      { title: 'Hiking', frequency: 1 },
    ],
    isSporty: true,
    totalAge: 24.200000000000003,
    hobbis: { 0: { highFrequency: true } },
  },
  {
    _id: ObjectId('66438bbb9b9da3d1dc14a41b'),
    name: 'Jeff',
    age: 32,
    hobbies: [{ title: 'Photography', frequency: 32 }],
    isSporty: true,
  },
];

db.users.updateMany(
  { 'hobbies.frequency': { $gt: 2 } },
  { $set: { 'hobbies.$.goodFrequency': true } }
);

db.users.updateMany(
  { totalAge: { $gt: 30 } },
  { $inc: { 'hobbies.$[].frequency': -1 } }
);

db.users.updateMany(
  { 'hobbies.frequency': { $gt: 2 } },
  { $set: { 'hobbies.$[el].goodFrequency': false } },
  { arrayFilters: [{ 'el.frequency': { $gt: 2 } }] }
);

db.users.udateOne(
  { name: 'Jeff' },
  { $push: { hobbies: { title: 'Sports', frequency: 2 } } }
);

db.users.updateOne(
  { name: 'Jeff' },
  {
    $push: {
      hobbies: {
        $each: [
          { title: 'Good Wine', frequency: 1 },
          { title: 'Hiking', frequency: 2 },
        ],
        $sort: { frequency: -1 },
      },
    },
  }
);
user > db.users.find({ name: 'Jeff' });
[
  {
    _id: ObjectId('66438bbb9b9da3d1dc14a41b'),
    name: 'Jeff',
    age: 32,
    hobbies: [
      {
        title: 'Photography',
        frequency: 32,
        gooFrequency: true,
        goodFrequency: false,
      },
      { title: 'Sports', frequency: 2 },
      { title: 'Hiking', frequency: 2 },
      { title: 'Good Wine', frequency: 1 },
    ],
    isSporty: true,
  },
];

db.users.deleteOne({ name: 'Chris' });

db.users.deleteMany({ age: { $gt: 30 }, isSporty: true });

db.users.deleteMany({ age: { $exists: false }, isSporty: true });

db.users.deleteMany({}); // deletes everything in that collection

db.users.drop(); // deletes entire collections

db.dropDatabase(); // deletes db

db.contacts.explain().find({ 'dob.age': { $gt: 60 } });

db.contacts.explain('executionStats').find({ 'dob.age': { $gt: 60 } });

db.contacts.createIndex({ 'dob.age': 1 });

db.contacts.dropIndex({ 'dob.age': 1 });

db.contacts.createIndex({ gender: 1 });

db.contacts.explain('executionStats').find({ gender: 'male' });

db.contacts.explain().find({ 'dob.age': 35 }).sort({ gender: 1 });

db.contacts.getIndexes();

db.users.insertMany([{ name: 'Max', email: 'max@test.com' }, { name: 'Manu' }]);

db.users.createIndex({ email: 1 }, { uinque: true });

db.sessions.insertOne({ data: 'lkjojjd', createdAt: new Date() });
[
  {
    _id: ObjectId('66633a8600f622191cee6512'),
    data: 'lkjojjd',
    createdAt: ISODate('2024-06-07T16:51:18.872Z'),
  },
];

db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 }); // deletes docs after 10 seconds
db.customers.explain('allPlansExecution').find({ name: 'Max', age: 30 });

db.contacts.insertOne({
  name: 'Max',
  hobbies: ['Cooking', 'Sports'],
  addresses: [{ street: 'Main Street' }, { street: 'Secone Street' }],
});
db.contacts.createIndex({ hobbies: 1 });
db.contacts.createIndex({ 'addresses.street': 1 });
db.contacts.explain('executionStats').find({ hobbies: 'Sports' });

db.products.createIndex({ description: 'text' });
db.products.find({ $text: { $search: 'awesome' } });
db.products.find({ $text: { $search: 'red book' } });
db.products.find({ $text: { $search: '"red book"' } }); // searches for phrase "red book"

db.products.find({ $text: { $search: 'awesome t-shirt' } });
db.products.find(
  { $text: { $search: 'awesome t-shirt' } },
  { score: { $meta: 'textScore' } }
);
[
  {
    _id: ObjectId('666475bf00f622191cee651a'),
    title: 'A Book',
    description: 'This is an awesome book a young artist!',
    score: 0.625,
  },
  {
    _id: ObjectId('666475bf00f622191cee651b'),
    title: 'Red T-Shirt',
    description: "This T-Shirt is red and it's pretty awesome!",
    score: 1.7999999999999998,
  },
];

db.products.find(
  { $text: { $search: 'awesome t-shirt' } },
  { score: { $meta: 'textScore' } }
);
[
  {
    _id: ObjectId('666475bf00f622191cee651b'),
    title: 'Red T-Shirt',
    description: "This T-Shirt is red and it's pretty awesome!",
    score: 1.7999999999999998,
  },
  {
    _id: ObjectId('666475bf00f622191cee651a'),
    title: 'A Book',
    description: 'This is an awesome book a young artist!',
    score: 0.625,
  },
];

b.products.createIndex({ title: 'text', description: 'text' });
db.products.find({ $text: { $search: 'ship' } });
[
  {
    _id: ObjectId('6667230800f622191cee651c'),
    title: 'A Ship',
    decription: 'Floats perfectly!',
  },
];

db.products.find(
  { $text: { $search: 'red' } },
  { score: { $meta: 'textScore' } }
);
[
  {
    _id: ObjectId('666475bf00f622191cee651b'),
    title: 'Red T-Shirt',
    description: "This T-Shirt is red and it's pretty awesome!",
    score: 6.666666666666667,
  },
];

db.ratings.createIndex({ age: 1 }, { background: true });

db.places.insertOne({
  name: 'California Academy of Scieces',
  location: { type: 'Point', coordinates: [-122.4729481, 37.769933] },
});

db.places.createIndex({ location: '2dsphere' }); // index geospational
db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-122.471114, 37.771104] },
    },
  },
});
db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-122.471114, 37.771104] },
      $maxDistance: 440,
      $minDistance: 10,
    },
  },
});

db.places.deleteOne({ _id: ObjectId('666b6435d0f4d66dba54eb55') });

const p1 = [-122.4547, 37.77473];
const p2 = [-122.45303, 37.76641];
const p3 = [-122.51026, 37.76411];
const p4 = [-122.51088, 37.77131];
db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});

db.areas.insertOne({
  name: 'Golden Gate Park',
  area: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
});
db.areas.find()[
  {
    _id: ObjectId('666c630cd0f4d66dba54eb5a'),
    name: 'Golden Gate Park',
    area: {
      type: 'Polygon',
      coordinates: [
        [
          [-122.4547, 37.77473],
          [-122.45303, 37.76641],
          [-122.51026, 37.76411],
          [-122.51088, 37.77131],
          [-122.4547, 37.77473],
        ],
      ],
    },
  }
];

db.areas.find({
  area: {
    $geoIntersects: {
      $geometry: { type: 'Point', coordinates: [-122.49089, 37.76992] },
    },
  },
});
[
  {
    _id: ObjectId('666c630cd0f4d66dba54eb5a'),
    name: 'Golden Gate Park',
    area: {
      type: 'Polygon',
      coordinates: [
        [
          [-122.4547, 37.77473],
          [-122.45303, 37.76641],
          [-122.51026, 37.76411],
          [-122.51088, 37.77131],
          [-122.4547, 37.77473],
        ],
      ],
    },
  },
];

db.places.insertOne({
  name: 'Beergarden',
  loc: { type: 'Point', coordinates: [11.59228, 48.15203] },
});

db.persons.aggregate([
  { $match: { gender: 'female' } },
  { $group: { _id: { state: '$location.state' }, totalPerson: { $sum: 1 } } },
]);
[
  { _id: { state: 'minas gerais' }, totalPerson: 4 },
  { _id: { state: 'galway city' }, totalPerson: 6 },
  { _id: { state: 'solothurn' }, totalPerson: 4 },
  { _id: { state: 'tennessee' }, totalPerson: 3 },
  { _id: { state: 'ardèche' }, totalPerson: 1 },
  { _id: { state: 'iowa' }, totalPerson: 4 },
  { _id: { state: 'val-de-marne' }, totalPerson: 3 },
  { _id: { state: 'new mexico' }, totalPerson: 3 },
  { _id: { state: 'rogaland' }, totalPerson: 10 },
  { _id: { state: 'niedersachsen' }, totalPerson: 3 },
  { _id: { state: 'appenzell ausserrhoden' }, totalPerson: 5 },
  { _id: { state: 'bolu' }, totalPerson: 2 },
  { _id: { state: 'gisborne' }, totalPerson: 7 },
  { _id: { state: 'limburg' }, totalPerson: 14 },
  { _id: { state: 'şanlıurfa' }, totalPerson: 6 },
  { _id: { state: 'basel-landschaft' }, totalPerson: 8 },
  { _id: { state: 'creuse' }, totalPerson: 3 },
  { _id: { state: 'oppland' }, totalPerson: 3 },
  { _id: { state: 'pará' }, totalPerson: 3 },
  { _id: { state: 'hamburg' }, totalPerson: 12 },
];

db.persons.aggregate([
  { $match: { gender: 'female' } },
  { $group: { _id: { state: '$location.state' }, totalPerson: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } },
]);
