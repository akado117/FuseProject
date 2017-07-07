export default [
  `
  type Url {
    url: String!
  }

  type Test {
    foo: String,
    bar: String
  }

  type Roomie {
    name: String,
    daysInRoom: Int,
    amountOwed: Float
  }

  type Room {
    _id: String!
    daysRented: Int!
    costPerNight: Float!
    fees: Float!
    taxRate: Float!
    roomies: [Roomie]
  }

  type RootMutation {
    insertUrl(url: String!): Url
  }

  type RootQuery {
    say: Test
    says: [Test]
    urls: [Url]
    getSavedRoom(Id: String!): Room
    getSavedRooms: [Room]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`,
];
