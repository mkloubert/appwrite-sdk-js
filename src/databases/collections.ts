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

import { ID, Query, type Models, } from "node-appwrite";
import type { AppwriteProjectDatabaseCollectionAttribute, } from "./attributes";
import type { AppwriteProjectDatabaseCollectionIndex, } from "./indexes";
import type { AppwriteDocumentData, WithQueries, } from ".";
import type { AppwriteProjectDatabase, } from "./databases";
import { AssertionError, } from "node:assert";

/**
 * A result item of the generator of `AppwriteProjectDatabaseCollection.query()` method.
 */
export interface AppwriteProjectDatabaseCollectionQueryItem<
  TDocument extends Models.Document = Models.Document
> {
  /**
   * Cancels the whole operation.
   *
   * @param {boolean|null|undefined} [flag=true] Explicit flag value.
   */
  cancel: (flag?: boolean | null) => void;
  /**
   * The total number of items.
   */
  count: number;
  /**
   * The current document.
   */
  document: TDocument;
  /**
   * The total zero-based index.
   */
  index: number;
  /**
   * The current used value for items per page.
   */
  itemsPerPage: number;
  /**
   * The current page number, starting at 1.
   */
  page: number;
  /**
   * The number of items for this page.
   */
  pageCount: number;
  /**
   * The zero-based index of that page.
   */
  pageIndex: number;
  /**
   * Skips the current page.
   *
   * @param {boolean|null|undefined} [flag=true] Explicit flag value.
   */
  skip: (flag?: boolean | null) => void;
}

/**
 * Options for `AppwriteProjectDatabaseCollection.delete()` method.
 */
export interface DeleteAppwriteDocumentsOptions<
  TDocument extends Models.Document = Models.Document
> extends QueryAppwriteProjectDatabaseCollectionOptions {
  onDelete?: DeleteDocumentsFromAppwriteProjectDatabaseCollectionCallback<TDocument> | null;
}

/**
 * Callback that is invoked by `AppwriteProjectDatabaseCollection.delete()` method
 * after a document after a document has been successfully deleted.
 *
 * @param {DeleteDocumentsFromAppwriteProjectDatabaseCollectionCallbackContext<TDocument>} context The context with the new document.
 */
export type DeleteDocumentsFromAppwriteProjectDatabaseCollectionCallback<
  TDocument extends Models.Document = Models.Document
> = (
  context: DeleteDocumentsFromAppwriteProjectDatabaseCollectionCallbackContext<TDocument>
) => any;

/**
 * A context for `DeleteDocumentsFromAppwriteProjectDatabaseCollectionCallback`.
 */
export interface DeleteDocumentsFromAppwriteProjectDatabaseCollectionCallbackContext<
  TDocument extends Models.Document = Models.Document
> {
  /**
   * The total of documents that should be inserted.
   */
  count: number;
  /**
   * The current document.
   */
  document: Pick<TDocument, "$id">;
  /**
   * The zero-based index of the current document.
   */
  index: number;
}

/**
 * Callback that is invoked by `AppwriteProjectDatabaseCollection.insert()` method
 * after a document after a document has been successfully inserted.
 *
 * @param {InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallbackContext<TDocument>} context The context with the new document.
 */
export type InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallback<
  TDocument extends Models.Document = Models.Document
> = (
  context: InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallbackContext<TDocument>
) => any;

/**
 * A context for `InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallback`.
 */
export interface InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallbackContext<
  TDocument extends Models.Document = Models.Document
> {
  /**
   * The total of documents that should be inserted.
   */
  count: number;
  /**
   * The current document.
   */
  document: TDocument;
  /**
   * The zero-based index of the current document.
   */
  index: number;
}

/**
 * Options for `AppwriteProjectDatabaseCollection.query()` method.
 */
export interface QueryAppwriteProjectDatabaseCollectionOptions
  extends WithQueries {
  /**
   * Items per page.
   *
   * @default 25
   */
  itemsPerPage?: number | null;
  /**
   * The zero based offet.
   */
  offset?: number | null;
}

/**
 * Options for `AppwriteProjectDatabaseCollection.queryOne()` method.
 */
export type QueryOneAppwriteProjectDatabaseCollectionDocumentOptions = Omit<QueryAppwriteProjectDatabaseCollectionOptions, "itemsPerPage">;

/**
 * Callback that is invoked by `AppwriteProjectDatabaseCollection.update()` method
 * after a document after a document has been successfully updated.
 *
 * @param {UpdateDocumentsIntoAppwriteProjectDatabaseCollectionCallbackContext<TDocument>} context The context with the updated document.
 */
export type UpdateDocumentsIntoAppwriteProjectDatabaseCollectionCallback<
  TDocument extends Models.Document = Models.Document
> = (
  context: UpdateDocumentsIntoAppwriteProjectDatabaseCollectionCallbackContext<TDocument>
) => any;

/**
 * Options for `AppwriteProjectDatabaseCollection.update()` method.
 */
export interface UpdateAppwriteDocumentsOptions<
  TDocument extends Models.Document = Models.Document
> extends QueryAppwriteProjectDatabaseCollectionOptions {
  onUpdate?: UpdateDocumentsIntoAppwriteProjectDatabaseCollectionCallback<TDocument> | null;
}

/**
 * A context for `UpdateDocumentsIntoAppwriteProjectDatabaseCollectionCallback<TDocument extends Models.Document = Models.Document>`.
 */
export interface UpdateDocumentsIntoAppwriteProjectDatabaseCollectionCallbackContext<
  TDocument extends Models.Document = Models.Document
> {
  /**
   * The total of documents that should be inserted.
   */
  count: number;
  /**
   * The current document.
   */
  document: TDocument;
  /**
   * The zero-based index of the current document.
   */
  index: number;
}

/**
 * A single database collection instance.
 */
export class AppwriteProjectDatabaseCollection<
  TDocument extends Models.Document = Models.Document
> implements
    Iterable<
    AppwriteProjectDatabaseCollectionAttribute<
    AppwriteProjectDatabaseCollection<TDocument>
    >
    > {
  #attributeList:
  | AppwriteProjectDatabaseCollectionAttribute<
  AppwriteProjectDatabaseCollection<TDocument>
  >[]
  | undefined;
  #indexList:
  | AppwriteProjectDatabaseCollectionIndex<
  AppwriteProjectDatabaseCollection<TDocument>
  >[]
  | undefined;

  /**
   * Initializes a new instance of that class.
   *
   * @param {AppwriteProjectDatabase} database The underlying database.
   * @param {Readonly<Models.Collection>} model The Appwrite model of that collection.
   */
  constructor(
    public readonly database: AppwriteProjectDatabase,
    public readonly model: Readonly<Models.Collection>
  ) {}

  /**
   * @inheritdoc
   */
  [Symbol.iterator](): Iterator<
  AppwriteProjectDatabaseCollectionAttribute<
  AppwriteProjectDatabaseCollection<TDocument>
  >,
  any,
  any
  > {
    let currentIndex = -1;

    return {
      "next": () => {
        const index = ++currentIndex;

        return {
          "value": this.attributeList[index],
          "done": index >= this.attributeList.length,
        };
      },
    };
  }

  /**
   * Returns the list of attributes.
   */
  get attributeList(): ReadonlyArray<
  AppwriteProjectDatabaseCollectionAttribute<
  AppwriteProjectDatabaseCollection<TDocument>
  >
  > {
    return this.#attributeList!;
  }

  /**
   * Deletes many documents at once.
   *
   * @param {DeleteManyAppwriteDocumentsOptions<TDocument>|null} [options=undefined] Custom options.
   */
  async delete(
    options?: DeleteAppwriteDocumentsOptions<TDocument> | null
  ): Promise<void> {
    const allDocuments: Pick<TDocument, "$id">[] = [];

    // collect data ...
    const cursor = this.query(options);
    for await (const { document, } of cursor) {
      allDocuments.push({
        "$id": document.$id,
      });
    }

    const count = allDocuments.length;
    let index = -1;

    // ... before delete
    while (allDocuments.length > 0) {
      ++index;

      const document = allDocuments.shift()!;

      await this.deleteOne(document);

      if (options?.onDelete) {
        await Promise.resolve(
          options.onDelete({
            count,
            document,
            index,
          })
        );
      }
    }
  }

  /**
   * Deletes a single document.
   *
   * @param {Pick<TDocument, "$id">|string} documentOrId The document (or its ID) to delete.
   */
  async deleteOne(
    documentOrId: Pick<TDocument, "$id"> | string
  ): Promise<void> {
    let document: Pick<TDocument, "$id">;
    if (typeof documentOrId === "string") {
      document = {
        "$id": documentOrId,
      };
    } else {
      document = documentOrId;
    }

    await this.database.databases.databases.deleteDocument(
      this.database.model.$id,
      this.model.$id,
      document.$id
    );
  }

  /**
   * Returns an attribute by name.
   *
   * @param {string} name The name of the attribute.
   *
   * @returns {AppwriteProjectDatabaseCollectionAttribute} The attribute.
   *
   * @throws AssertionError No single attribute found with that name.
   */
  getAttribute(name: string): AppwriteProjectDatabaseCollectionAttribute {
    const attributes = this.attributeList.filter((c) => {
      return c.model.key === name;
    });

    if (attributes.length !== 1) {
      throw new AssertionError({
        "actual": attributes.length,
        "message": `Single attribute ${name} not found in collection ${this.model.$id}`,
        "expected": 0,
      });
    }

    return attributes[0]!;
  }

  /**
   * Returns an index by name.
   *
   * @param {string} name The name of the index.
   *
   * @returns {AppwriteProjectDatabaseCollectionIndex} The index.
   *
   * @throws AssertionError No single index found with that name.
   */
  getIndex(name: string): AppwriteProjectDatabaseCollectionIndex {
    const indexes = this.indexList.filter((c) => {
      return c.model.key === name;
    });

    if (indexes.length !== 1) {
      throw new AssertionError({
        "actual": indexes.length,
        "message": `Single index ${name} not found in collection ${this.model.$id}`,
        "expected": 0,
      });
    }

    return indexes[0]!;
  }

  /**
   * Gets the ID of that collection.
   */
  get id(): string {
    return this.model.$id;
  }

  /**
   * Returns the list of indexes.
   */
  get indexList(): ReadonlyArray<
  AppwriteProjectDatabaseCollectionIndex<
  AppwriteProjectDatabaseCollection<TDocument>
  >
  > {
    return this.#indexList!;
  }

  /**
   * Initializes that instance.
   */
  async init() {
    const {
      "AppwriteProjectDatabaseCollectionAttribute":
        AppwriteProjectDatabaseCollectionAttributeClass,
    } = await import("./attributes.js");
    const {
      "AppwriteProjectDatabaseCollectionIndex":
        AppwriteProjectDatabaseCollectionIndexClass,
    } = await import("./indexes.js");

    this.#attributeList = [];
    this.#indexList = [];

    // attributes
    {
      const maxItems = 100;

      let lastCreatedAt: string | undefined;
      do {
        const queries: string[] = [];
        if (lastCreatedAt) {
          queries.push(Query.greaterThan("$createdAt", lastCreatedAt));
        }
        queries.push(Query.limit(maxItems));

        const response = await this.database.databases.databases.listAttributes(
          this.database.model.$id,
          this.model.$id,
          queries
        );

        lastCreatedAt =
          response.attributes[response.attributes.length - 1]?.$createdAt ||
          undefined;

        for (const attribute of response.attributes) {
          const newAttribute =
            new AppwriteProjectDatabaseCollectionAttributeClass(
              this,
              attribute
            );

          this.#attributeList!.push(newAttribute);
        }

        if (response.attributes.length < maxItems) {
          break;
        }
      } while (lastCreatedAt);
    }

    // indexes
    {
      const maxItems = 100;

      let lastCreatedAt: string | undefined;
      do {
        const queries: string[] = [];
        if (lastCreatedAt) {
          queries.push(Query.greaterThan("$createdAt", lastCreatedAt));
        }
        queries.push(Query.limit(maxItems));

        const response = await this.database.databases.databases.listIndexes(
          this.database.model.$id,
          this.model.$id,
          queries
        );

        lastCreatedAt =
          response.indexes[response.indexes.length - 1]?.$createdAt ||
          undefined;

        for (const index of response.indexes) {
          const newIndex = new AppwriteProjectDatabaseCollectionIndexClass(
            this,
            index
          );

          this.#indexList!.push(newIndex);
        }

        if (response.indexes.length < maxItems) {
          break;
        }
      } while (lastCreatedAt);
    }
  }

  /**
   * Inserts one or more items.
   *
   * @param {InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallback<TDocument>|AppwriteDocumentData<TDocument>} callbackOrFirstItem The insert callback or the first item.
   * @param {AppwriteDocumentData<TDocument>[]} [restItems] The rest items.
   */
  async insert(
    firstItem: AppwriteDocumentData<TDocument>,
    ...restItems: AppwriteDocumentData<TDocument>[]
  ): Promise<void>;
  async insert(
    callback: InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallback<TDocument>,
    firstItem: AppwriteDocumentData<TDocument>,
    ...restItems: AppwriteDocumentData<TDocument>[]
  ): Promise<void>;
  async insert(
    callbackOrFirstItem:
    | InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallback<TDocument>
    | AppwriteDocumentData<TDocument>,
    ...restItems: AppwriteDocumentData<TDocument>[]
  ): Promise<void> {
    let insertCallback:
    | InsertDocumentsIntoAppwriteProjectDatabaseCollectionCallback<TDocument>
    | undefined;

    const allData: AppwriteDocumentData<TDocument>[] = [];
    if (typeof callbackOrFirstItem === "function") {
      insertCallback = callbackOrFirstItem;
    } else {
      allData.push(callbackOrFirstItem);
    }
    allData.push(...restItems);

    for (let i = 0; i < allData.length; i++) {
      const data = allData[i];

      const newDoc = await this.database.databases.databases.createDocument(
        this.database.model.$id,
        this.model.$id,
        ID.unique(),
        data
      );

      if (insertCallback) {
        await Promise.resolve(
          insertCallback({
            "count": allData.length,
            "document": newDoc,
            "index": i,
          })
        );
      }
    }
  }

  /**
   * Inserts a single document.
   *
   * @param {AppwriteDocumentData<TDocument>} data The data for the new document.
   *
   * @returns {Promise<TDocument>} The promise with the new document.
   */
  async insertOne(data: AppwriteDocumentData<TDocument>): Promise<TDocument> {
    const newDocument = await this.database.databases.databases.createDocument(
      this.database.model.$id,
      this.model.$id,
      ID.unique(),
      data
    );

    return newDocument;
  }

  /**
   * Get the name of this collection.
   */
  get name(): string {
    return this.model.name;
  }

  /**
   * Starts a query.
   *
   * @param {QueryAppwriteProjectDatabaseCollectionOptions|null} [options=undefined] The custom options.
   *
   * @returns {AsyncGenerator<AppwriteProjectDatabaseCollectionQueryItem<TDocument>>} The async cursor.
   */
  async *query(
    options?: QueryAppwriteProjectDatabaseCollectionOptions | null
  ): AsyncGenerator<AppwriteProjectDatabaseCollectionQueryItem<TDocument>> {
    const itemsPerPage = options?.itemsPerPage ?? 25;
    const queries = [...(options?.queries ?? []),];

    let index = -1;
    let page = 0;

    let lastId: string | undefined;
    do {
      ++page;
      const pageIndex = 0;

      const allQueries: string[] = [];
      if (lastId) {
        allQueries.push(Query.cursorAfter(lastId));
      }
      allQueries.push(...queries);
      if (typeof options?.offset === "number") {
        allQueries.push(Query.offset(options?.offset));
      }
      allQueries.push(Query.limit(itemsPerPage));

      const response = await this.database.databases.databases.listDocuments(
        this.database.model.$id,
        this.model.$id,
        allQueries
      );

      for (const document of response.documents) {
        ++index;

        let shouldCancel = false;
        let shouldSkip = false;

        yield {
          "cancel": (flag?) => {
            shouldCancel = !!(flag ?? true);
          },
          "count": response.total,
          "document": document as TDocument,
          index,
          itemsPerPage,
          page,
          "pageCount": response.documents.length,
          pageIndex,
          "skip": (flag?) => {
            shouldSkip = !!(flag ?? true);
          },
        };

        if (shouldCancel) {
          return;
        }
        if (shouldSkip) {
          break;
        }
      }

      if (response.documents.length < itemsPerPage) {
        break;
      }
    } while (lastId);
  }

  /**
   * Starts a query and only returns with the first matching document.
   *
   * @param {QueryOneAppwriteProjectDatabaseCollectionDocumentOptions} options The options.
   *
   * @returns {Promise<TDocument|null>} The promise with the document or `null` if not found.
   */
  async queryOne(
    options: QueryOneAppwriteProjectDatabaseCollectionDocumentOptions
  ): Promise<TDocument | null> {
    const cursor = this.query({
      "itemsPerPage": 1,

      ...(options ?? {}),
    });
    for await (const { document, } of cursor) {
      return document;
    }

    return null;
  }

  /**
   * Inserts one or more items.
   *
   * @param {AppwriteDocumentData<TDocument>|null|undefined} data The data to update.
   * @param {UpdateAppwriteDocumentsOptions<TDocument>|null} [options=undefined] Custom options.
   */
  async update(
    data: AppwriteDocumentData<TDocument> | null | undefined,
    options?: UpdateAppwriteDocumentsOptions<TDocument> | null
  ): Promise<void> {
    const allDocuments: Pick<TDocument, "$id">[] = [];

    // collect data ...
    const cursor = this.query(options);
    for await (const { document, } of cursor) {
      allDocuments.push({
        "$id": document.$id,
      });
    }

    const count = allDocuments.length;
    let index = -1;

    // ... before update
    while (allDocuments.length > 0) {
      ++index;

      const documentToUpdate = allDocuments.shift()!;

      const updatedDocument = await this.updateOne(documentToUpdate, data);

      if (options?.onUpdate) {
        await Promise.resolve(
          options.onUpdate({
            count,
            "document": updatedDocument,
            index,
          })
        );
      }
    }
  }

  /**
   * Updates a single document.
   *
   * @param {Pick<TDocument, "$id">|string} documentOrId The document (or its ID) to update.
   * @param {Partial<AppwriteDocumentData<TDocument>|null>} [data=undefined] The data to update.
   *
   * @returns {Promise<TDocument>} The promise with the instance of the new document.
   */
  async updateOne(
    documentOrId: Pick<TDocument, "$id"> | string,
    data?: Partial<AppwriteDocumentData<TDocument>> | null | undefined
  ): Promise<TDocument> {
    let document: Pick<TDocument, "$id">;
    if (typeof documentOrId === "string") {
      document = {
        "$id": documentOrId,
      };
    } else {
      document = documentOrId;
    }

    const updatedDocument =
      await this.database.databases.databases.updateDocument(
        this.database.model.$id,
        this.model.$id,
        document.$id,
        data ?? undefined
      );

    return updatedDocument;
  }

  /**
   * Returns the same instance, but more typed.
   *
   * @returns {AppwriteProjectDatabaseCollection<TDocumentEx>} This instance as stronger typed version.
   */
  wrap<
    TDocumentEx extends TDocument
  >(): AppwriteProjectDatabaseCollection<TDocumentEx> {
    return this as unknown as AppwriteProjectDatabaseCollection<TDocumentEx>;
  }
}
