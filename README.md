# @marcelkloubert/appwrite-sdk

> An (unofficial) enhancement for official SDK of Appwrite which runs on [Node.js 18+](https://nodejs.org/en/blog/release/v18.0.0/) or later.

## Install

Execute the following command from your project folder, where your package.json file is stored:

```bash
npm i @marcelkloubert/appwrite-sdk
```

## Usage

```typescript
import { Query } from "node-appwrite";
import { AppwriteProject } from "@marcelkloubert/appwrite-sdk";

interface BarCollection {
  buzz: number;
}

// set environment variables `APPWRITE_API_KEY` and `APPWRITE_PROJECT_ID`
// with correct values
const project = new AppwriteProject();

// initialize project and make it available
// as a singleton instance if possible
await project.init({ withDatabase: true });

for (const database of project.databases) {
  console.log("Database:", database.name);

  // `database` is an iterator of collections
  for (const collection of database) {
    console.log("\tCollection:", collection.name);

    // `collection` is an iterator of attributes
    for (const attribute of collection) {
      console.log("\tAttribute:", attribute.name);
    }
  }
}

// get existing database `foo`
const foo = project.databases.getDatabase("foo");

// get existing collection `bar` inside `foo`
const bar = foo.getCollection("bar").wrap<BarCollection>();

// insert a new document
const newDoc = await bar.insertOne({ buzz: 42 });

// update an existing document
const updatedDoc = await bar.updateOne(newDoc, { buzz: 666 });

// remove a document
await bar.deleteOne(updatedDoc);

// query multiple documents
const asyncCursor = bar.query({
  queries: [Query.greaterThan("$createdAt", new Date().toISOString())],
});
for await (const document of asyncCursor) {
  console.log("Document:", document.$id);
}

// query a single document
const maybeExistingDoc = await bar.queryOne({
  queries: [Query.equal("buzz", 667)],
});
if (maybeExistingDoc) {
  console.log("Document with buzz=667 exists as:", maybeExistingDoc.$id);
} else {
  console.log("Document with buzz=667 does not exist");
}
```

## Currently supported

The project is currently under heavy development.

Currently the following features running have a "quite stable" beta status:

- [x] [Databases](https://appwrite.io/docs/references/cloud/client-web/databases)
- [ ] [Account](https://appwrite.io/docs/references/cloud/client-web/account)
- [ ] [Avatars](https://appwrite.io/docs/references/cloud/client-web/avatars)
- [ ] [Functions](https://appwrite.io/docs/references/cloud/client-web/functions)
- [ ] [Localization](https://appwrite.io/docs/references/cloud/client-web/locale)
- [ ] [Messaging](https://appwrite.io/docs/references/cloud/client-web/messaging)
- [ ] [Storage](https://appwrite.io/docs/references/cloud/client-web/storage)
- [ ] [Teams](https://appwrite.io/docs/references/cloud/client-web/teams)
- [ ] [Users](https://appwrite.io/docs/references/cloud/client-web/users)

## Documentation

The API documentation can be found [here](https://mkloubert.github.io/appwrite-sdk-js/).

## License

MIT © [Marcel Joachim Kloubert](https://github.com/mkloubert)

## Support and contribute

<span class="badge-paypal"><a href="https://paypal.me/MarcelKloubert" title="Donate to this project using PayPal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-patreon"><a href="https://patreon.com/mkloubert" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/mkloubert" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>

[Contribution guidelines](./CONTRIBUTE.md)
