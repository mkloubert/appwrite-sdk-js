/**
  The MIT License (MIT)

  Copyright (c) 2025-present Marcel Joachim Kloubert (https://marcel.coffee)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
**/

import { Databases, Models, Query, } from "node-appwrite";
import type { AppwriteProject, } from "..";
import type { AppwriteProjectDatabaseCollection, } from "./collections";
import { AssertionError, } from "node:assert";

/**
 * Appwrite database context.
 */
export class AppwriteProjectDatabases
implements Iterable<AppwriteProjectDatabase> {
  #databaseList: AppwriteProjectDatabase[] | undefined;
  #databases: Databases | undefined;
  readonly #project: AppwriteProject;

  /**
   * Initializes a new instance of that class.
   *
   * @param {AppwriteProject} project The underlying project.
   */
  constructor(project: AppwriteProject) {
    this.#project = project;
  }

  /**
   * @inheritdoc
   */
  [Symbol.iterator](): Iterator<AppwriteProjectDatabase, any, any> {
    let currentIndex = -1;

    return {
      "next": () => {
        const index = ++currentIndex;

        return {
          "value": this.databaseList[index],
          "done": index >= this.databaseList.length,
        };
      },
    };
  }

  /**
   * Returns the list of databases.
   */
  get databaseList(): ReadonlyArray<AppwriteProjectDatabase> {
    return this.#databaseList!;
  }

  /**
   * Gets the underlying `Databases` instance of Appwrite.
   */
  get databases(): Databases {
    return this.#databases!;
  }

  /**
   * Returns a database by name.
   *
   * @param {string} name The name of the database.
   *
   * @returns {AppwriteProjectDatabase} The database.
   *
   * @throws AssertionError No single colledatabasection found with that name.
   */
  getDatabase(name: string): AppwriteProjectDatabase {
    const databases = this.databaseList.filter((c) => {
      return c.model.name === name;
    });

    if (databases.length !== 1) {
      throw new AssertionError({
        "actual": databases.length,
        "message": `Single database ${name} not found in project ${this.project.id}`,
        "expected": 0,
      });
    }

    return databases[0]!;
  }

  /**
   * Initializes this instance.
   */
  async init() {
    this.#databases = new Databases(this.#project.client);

    this.#databaseList = [];

    const maxItems = 25;

    let lastId: string | undefined;
    do {
      const queries: string[] = [];
      if (lastId) {
        queries.push(Query.cursorAfter(lastId));
      }
      queries.push(Query.limit(maxItems));

      const response = await this.databases.list(queries);

      lastId =
        response.databases[response.databases.length - 1]?.$id || undefined;

      for (const database of response.databases) {
        const newDb = new AppwriteProjectDatabase(this, database);

        await newDb.init();

        this.#databaseList!.push(newDb);
      }

      if (response.databases.length < maxItems) {
        break;
      }
    } while (lastId);
  }

  /**
   * Gets the underlying project.
   */
  get project(): AppwriteProject {
    return this.#project;
  }
}

/**
 * A single database instance.
 */
export class AppwriteProjectDatabase
implements Iterable<AppwriteProjectDatabaseCollection> {
  #collectionList: AppwriteProjectDatabaseCollection[] | undefined;

  /**
   * Initializes a new instance of that class.
   *
   * @param {AppwriteProjectDatabases} databases The instances with all databases.
   * @param {Readonly<Models.Database>} model The Appwrite model of that database.
   */
  constructor(
    public readonly databases: AppwriteProjectDatabases,
    public readonly model: Readonly<Models.Database>
  ) {}

  /**
   * @inheritdoc
   */
  [Symbol.iterator](): Iterator<AppwriteProjectDatabaseCollection, any, any> {
    let currentIndex = -1;

    return {
      "next": () => {
        const index = ++currentIndex;

        return {
          "value": this.collectionList[index],
          "done": index >= this.collectionList.length,
        };
      },
    };
  }

  /**
   * Returns the list of collections.
   */
  get collectionList(): ReadonlyArray<AppwriteProjectDatabaseCollection> {
    return this.#collectionList!;
  }

  /**
   * Returns a collection by name.
   *
   * @param {string} name The name of the collection.
   *
   * @returns {AppwriteProjectDatabaseCollection} The collection.
   *
   * @throws AssertionError No single collection found with that name.
   */
  getCollection(name: string): AppwriteProjectDatabaseCollection {
    const collections = this.collectionList.filter((c) => {
      return c.model.name === name;
    });

    if (collections.length !== 1) {
      throw new AssertionError({
        "actual": collections.length,
        "message": `Single collection ${name} not found in database ${this.model.$id}`,
        "expected": 0,
      });
    }

    return collections[0]!;
  }

  /**
   * Gets the ID of that database.
   */
  get id(): string {
    return this.model.$id;
  }

  /**
   * Initializes that instance.
   */
  async init() {
    const {
      "AppwriteProjectDatabaseCollection": AppwriteProjectDatabaseCollectionClass,
    } = await import("./collections.js");

    this.#collectionList = [];

    const maxItems = 100;

    let lastId: string | undefined;
    do {
      const queries: string[] = [];
      if (lastId) {
        queries.push(Query.cursorAfter(lastId));
      }
      queries.push(Query.limit(maxItems));

      const response = await this.databases.databases.listCollections(
        this.model.$id,
        queries
      );

      lastId =
        response.collections[response.collections.length - 1]?.$id || undefined;

      for (const collection of response.collections) {
        const newCollection = new AppwriteProjectDatabaseCollectionClass(
          this,
          collection
        );

        await newCollection.init();

        this.#collectionList!.push(newCollection);
      }

      if (response.collections.length < maxItems) {
        break;
      }
    } while (lastId);
  }

  /**
   * Gets the name of that database.
   */
  get name(): string {
    return this.model.name;
  }
}
