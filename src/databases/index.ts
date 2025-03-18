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

import type { Models, } from "node-appwrite";

/**
 * Supported attribute types by Appwrite.
 */
export type AppwriteAttribute =
  | Models.AttributeBoolean
  | Models.AttributeInteger
  | Models.AttributeFloat
  | Models.AttributeEmail
  | Models.AttributeEnum
  | Models.AttributeUrl
  | Models.AttributeIp
  | Models.AttributeDatetime
  | Models.AttributeRelationship
  | Models.AttributeString;

/**
 * The only-data part of an Appwrote `Models.Document`.
 */
export type AppwriteDocumentData<
  TDocument extends Models.Document = Models.Document
> = Omit<TDocument, keyof Models.Document>;

/**
 * An object with `queries` property.
 */
export interface WithQueries {
  /**
   * The queries to use.
   */
  queries: Iterable<string> | null;
}

export type * from "./databases";
export type * from "./collections";
export type * from "./attributes";
export type * from "./indexes";
