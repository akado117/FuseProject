export default [
  `
  scalar Date
  scalar UUID
  scalar JSON
  scalar Coord

  type Url {
    url: String!
  }

  type Test {
    foo: String,
    bar: String
  }

  type AvatarUrls {
    i48x48: String,
    i24x24: String,
    i16x16: String,
    i32x32: String
  }

  type Project {
    expand: String,
    self: String,
    id: Int,
    key: String,
    name: String,
    avatarUrls: AvatarUrls,
    projectTypeKey: String
  }

  type RootMutation {
    insertUrl(url: String!): Url
  }

  type RootQuery {
    say: Test
    says: [Test]
    urls: [Url]
    getAllProjects: [Project]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`
];

