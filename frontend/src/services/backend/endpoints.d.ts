/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/connections": {
    /** List connections */
    get: operations["__connections_get"];
    /** Create a connection */
    post: operations["__connections_post"];
  };
  "/connections/test-status": {
    /** Test status of a connection in creation */
    post: operations["__connections_test_status_post"];
  };
  "/connections/{connection_id}": {
    /** Update a connection */
    put: operations["__connections__connection_id__put"];
    /** Delete a connection */
    delete: operations["__connections__connection_id__delete"];
  };
  "/connections/{connection_id}/test-status": {
    /** Test status of a connection */
    get: operations["__connections__connection_id__test_status_get"];
  };
  "/connections/{connection_id}/count-dataframes": {
    /** Count dataframes of a connection */
    post: operations["__connections__connection_id__count_dataframes_post"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** ConnectionIDto */
    ConnectionIDto: {
      /** Name */
      name: string;
      /** Connector Info */
      connector_info:
        | components["schemas"]["PostgreSqlInfoIDto"]
        | components["schemas"]["MySqlInfoIDto"];
    };
    /** ConnectionODto */
    ConnectionODto: {
      /**
       * Type
       * @enum {string}
       */
      type: "postgresql" | "mysql";
      /** Id */
      id: number;
      /** Name */
      name: string;
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
      /** Is Up */
      is_up: boolean;
    };
    /** CountDataFramesODto */
    CountDataFramesODto: {
      /** Count */
      count: number;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** MySqlInfoIDto */
    MySqlInfoIDto: {
      /**
       * Type
       * @constant
       */
      type: "mysql";
      /** Host */
      host: string;
      /** Port */
      port: number;
      /** Database */
      database: string;
      /** User */
      user: string;
      /** Password */
      password: string | null;
    };
    /** PostgreSqlInfoIDto */
    PostgreSqlInfoIDto: {
      /**
       * Type
       * @constant
       */
      type: "postgresql";
      /** Host */
      host: string;
      /** Port */
      port: number;
      /** Database */
      database: string;
      /** User */
      user: string;
      /** Password */
      password: string | null;
    };
    /** TestStatusODto */
    TestStatusODto: {
      /** Is Up */
      is_up: boolean;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /** List connections */
  __connections_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ConnectionODto"][];
        };
      };
    };
  };
  /** Create a connection */
  __connections_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ConnectionIDto"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ConnectionODto"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Test status of a connection in creation */
  __connections_test_status_post: {
    requestBody: {
      content: {
        "application/json":
          | components["schemas"]["PostgreSqlInfoIDto"]
          | components["schemas"]["MySqlInfoIDto"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["TestStatusODto"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update a connection */
  __connections__connection_id__put: {
    parameters: {
      path: {
        connection_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ConnectionIDto"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ConnectionODto"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete a connection */
  __connections__connection_id__delete: {
    parameters: {
      path: {
        connection_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ConnectionODto"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Test status of a connection */
  __connections__connection_id__test_status_get: {
    parameters: {
      path: {
        connection_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["TestStatusODto"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Count dataframes of a connection */
  __connections__connection_id__count_dataframes_post: {
    parameters: {
      path: {
        connection_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["CountDataFramesODto"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
