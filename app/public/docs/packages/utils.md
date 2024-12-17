# @devcrate/utils

General utility functions for testing.

Here's a detailed overview of the utility functions provided in the `@devcrate/utils` package, along with installation and usage instructions.

## Overview of Utility Functions

### 1. Array Utilities ([`array.utils.ts`](./array.utils.ts#modal))

The purpose of this utility is to avoid using `lodash`. Lodash is a great library, but it is struggles to be tree-shaken, which makes it difficult to use.

- **Features**:
  - **uniq**: Returns unique values from an array.
  - **diff**: Computes the difference between two arrays.
  - **intersection**: Finds common elements between two arrays.
  - **union**: Merges multiple arrays into one, ensuring unique values.
  - **last**: Retrieves the last element of an array.
  - **first**: Retrieves the first element of an array.

### 2. Core Utilities ([`core.utils.ts`](./core.utils.ts#modal))
- **Features**:
  - **CommandOptions**: Interface for defining command options for executing shell commands.
  - Provides methods to handle command execution, logging, and error management.

### 3. File Utilities ([`file.utils.ts`](./file.utils.ts#modal))

This is very helpful when your setting up CI/CD pipelines and want to use node to manage the processes
- **Features**:
  - **mkdirpSync**: Ensures that a directory path exists, creating it if necessary.
  - **copyGlob**: Copies files matching a glob pattern to a destination.

### 4. Static Utilities ([`static.utils.ts`](./static.utils.ts#modal))

- **Features**:
  - **StaticExtends**: A decorator for enforcing type on a static property for a class.

### 5. Verify Tsconfig Utilities ([`verify-tsconfig.ts`](./verify-tsconfig.ts#modal))

- **Features**:
  - **verifyTsconfig**: Verifies the validity of all tsconfig files in a given directory.


## Installation

To install the `@devcrate/utils` package, run the following command:

```bash
npm install @devcrate/utils
```

## Usage

### Importing Utilities

You can import the utilities you need in your TypeScript files. For example:

```typescript
import { uniq, diff, intersection } from '@devcrate/utils/array.utils';
import { mkdirpSync } from '@devcrate/utils/file.utils';
```

### Example Usage

#### Array Utilities

```typescript
const uniqueArray = uniq([1, 2, 2, 3]); // => [1, 2, 3]
const arrayDiff = diff([1, 2, 3], [2, 3]); // => [1]
const commonElements = intersection([1, 2, 3], [2, 3]); // => [2, 3]
```

#### File Utilities

```typescript
await mkdirpSync('path/to/directory'); // Ensures the directory exists
```
