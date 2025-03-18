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

import { Client, } from "node-appwrite";
import type { AppwriteProjectDatabases, } from "./databases/databases";

/**
 * Options for constructor of `AppwriteProject` class.
 */
export interface AppwriteProjectOptions {
  /**
   * The API key. If not defined value is read from `APPWRITE_API_KEY` environment variable.
   */
  apiKey?: string | null;
  /**
   * Custom endpoint.
   *
   * @default "https://cloud.appwrite.io/v1"
   */
  endpoint?: string | null;
  /**
   * Custom forwarded user agent.
   */
  forwardedUserAgent?: string | null;
  /**
   * The JSON Web Token to use.
   */
  jwt?: string | null;
  /**
   * The custom locale.
   */
  locale?: string | null;
  /**
   * The project ID. If not defined value is read from `APPWRITE_PROJECT_ID` environment variable.
   */
  projectId?: string | null;
  /**
   * `true` for self-signed certificate.
   */
  selfSigned?: boolean | null;
  /**
   * Explicit session ID.
   */
  sessionId?: string | null;
}

/**
 * Options for `AppwriteProject.init()` method.
 */
export interface InitAppwriteProjectOptions {
  /**
   * `true` if database should also be initialized.
   */
  withDatabase?: boolean | null;
}

/**
 * Handles an Appwrite project.
 */
export class AppwriteProject {
  #client: Client | undefined;
  #databases: AppwriteProjectDatabases | undefined;
  #id: string | undefined;

  /**
   * The options.
   */
  public readonly options: Readonly<AppwriteProjectOptions>;

  /**
   * Initializes a new instance of that class.
   *
   * @param {AppwriteProjectOptions|string} optionsOrId The options or the project ID.
   */
  constructor(optionsOrId?: AppwriteProjectOptions | string) {
    if (optionsOrId) {
      if (typeof optionsOrId === "string") {
        this.options = {
          "projectId": optionsOrId,
        };
      } else {
        this.options = optionsOrId;
      }
    } else {
      this.options = {};
    }
  }

  /**
   * Gets the underlying client instance.
   */
  get client(): Client {
    return this.#client!;
  }

  /**
   * Gets the underlying database client instance.
   */
  get databases(): AppwriteProjectDatabases {
    return this.#databases!;
  }

  /**
   * Gets the ID of that project.
   */
  get id(): string {
    return this.#id!;
  }

  /**
   * Initializes this project with a new client instance.
   *
   * @param {InitAppwriteProjectOptions|null} [options] Custom options.
   */
  async init(options?: InitAppwriteProjectOptions | null) {
    this.#id =
      this.options.projectId?.trim() ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      process.env.APPWRITE_PROJECT_ID?.trim()!;

    this.#client = new Client()
      .setEndpoint(
        this.options.endpoint?.trim() || "https://cloud.appwrite.io/v1"
      )
      .setProject(this.id)
      .setKey(
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        this.options.apiKey?.trim() || process.env.APPWRITE_API_KEY?.trim()!
      );

    const locale = this.options?.locale?.trim();
    if (locale) {
      this.client.setLocale(locale);
    }

    if (typeof this.options.selfSigned === "boolean") {
      this.client.setSelfSigned(!!this.options.selfSigned);
    }

    const jwt = this.options?.jwt?.trim();
    if (jwt) {
      this.client.setJWT(jwt);
    }

    const sessionId = this.options?.sessionId?.trim();
    if (sessionId) {
      this.client.setSession(sessionId);
    }

    const forwardedUserAgent = this.options?.forwardedUserAgent?.trim();
    if (forwardedUserAgent) {
      this.client.setForwardedUserAgent(forwardedUserAgent);
    }

    if (options?.withDatabase) {
      await this.initDatabase();
    }
  }

  /**
   * Initializes the database context.
   */
  async initDatabase() {
    const { "AppwriteProjectDatabases": AppwriteProjectDatabasesClass, } =
      await import("./databases/databases.js");

    this.#databases = new AppwriteProjectDatabasesClass(this);

    await this.databases.init();
  }
}

export type * from "./databases";
