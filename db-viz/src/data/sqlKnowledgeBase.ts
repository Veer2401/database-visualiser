// SQL Knowledge Base for Rule-Based Chatbot
// Each intent contains patterns to match and responses with SQL and explanations

export interface SQLIntent {
    intent: string;
    patterns: string[];
    response: {
        sql: string[];
        explanation: string;
    };
}

export const sqlKnowledgeBase: SQLIntent[] = [
    // Database Creation
    {
        intent: "create_database",
        patterns: [
            "create database",
            "new database",
            "make database",
            "how to create db",
            "create db"
        ],
        response: {
            sql: [
                "CREATE SCHEMA schema_name;",
                "SET search_path TO schema_name;"
            ],
            explanation: "Use CREATE SCHEMA to create a new schema in PostgreSQL. SET search_path selects it as the active schema for subsequent operations."
        }
    },
    {
        intent: "create_students_db",
        patterns: [
            "students database",
            "student db",
            "create students",
            "student table",
            "students table"
        ],
        response: {
            sql: [
                "CREATE TABLE students (\n  student_id SERIAL PRIMARY KEY,\n  first_name VARCHAR(50) NOT NULL,\n  last_name VARCHAR(50) NOT NULL,\n  email VARCHAR(100) UNIQUE,\n  date_of_birth DATE,\n  enrollment_date DATE DEFAULT CURRENT_DATE,\n  gpa DECIMAL(3,2)\n);"
            ],
            explanation: "This creates a students table with auto-incrementing ID, personal info, email with unique constraint, and academic details."
        }
    },
    {
        intent: "create_users_table",
        patterns: [
            "users table",
            "user table",
            "create users",
            "user management"
        ],
        response: {
            sql: [
                "CREATE TABLE users (\n  user_id SERIAL PRIMARY KEY,\n  username VARCHAR(50) NOT NULL UNIQUE,\n  email VARCHAR(100) NOT NULL UNIQUE,\n  password_hash VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  is_active BOOLEAN DEFAULT TRUE\n);"
            ],
            explanation: "A standard users table with authentication fields, timestamps for tracking, and an active status flag. Passwords should always be stored as hashes."
        }
    },
    {
        intent: "create_orders_table",
        patterns: [
            "orders table",
            "order table",
            "create orders",
            "ecommerce orders",
            "shopping orders"
        ],
        response: {
            sql: [
                "CREATE TABLE orders (\n  order_id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL,\n  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  total_amount DECIMAL(10,2) NOT NULL,\n  status VARCHAR(20) DEFAULT 'pending',\n  shipping_address TEXT,\n  FOREIGN KEY (user_id) REFERENCES users(user_id)\n);"
            ],
            explanation: "An orders table for e-commerce with status tracking using VARCHAR, foreign key to users, and automatic timestamp for order date."
        }
    },
    {
        intent: "create_products_table",
        patterns: [
            "products table",
            "product table",
            "create products",
            "inventory table",
            "items table"
        ],
        response: {
            sql: [
                "CREATE TABLE products (\n  product_id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  description TEXT,\n  price DECIMAL(10,2) NOT NULL,\n  stock_quantity INT DEFAULT 0,\n  category_id INT,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (category_id) REFERENCES categories(category_id)\n);"
            ],
            explanation: "A products table for inventory management with pricing, stock tracking, and category relationships."
        }
    },
    {
        intent: "create_employees_table",
        patterns: [
            "employees table",
            "employee table",
            "create employees",
            "staff table",
            "hr table"
        ],
        response: {
            sql: [
                "CREATE TABLE employees (\n  employee_id SERIAL PRIMARY KEY,\n  first_name VARCHAR(50) NOT NULL,\n  last_name VARCHAR(50) NOT NULL,\n  email VARCHAR(100) UNIQUE,\n  phone VARCHAR(20),\n  hire_date DATE NOT NULL,\n  department_id INT,\n  salary DECIMAL(10,2),\n  manager_id INT,\n  FOREIGN KEY (department_id) REFERENCES departments(department_id),\n  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)\n);"
            ],
            explanation: "An employees table with self-referencing foreign key for manager hierarchy and department relationship. Includes essential HR fields."
        }
    },
    {
        intent: "create_cars_table",
        patterns: [
            "cars table",
            "car table",
            "create cars",
            "vehicles table",
            "automobile table"
        ],
        response: {
            sql: [
                "CREATE TABLE cars (\n  car_id SERIAL PRIMARY KEY,\n  make VARCHAR(50) NOT NULL,\n  model VARCHAR(50) NOT NULL,\n  year INT NOT NULL,\n  color VARCHAR(30),\n  price DECIMAL(10,2),\n  mileage INT,\n  vin VARCHAR(17) UNIQUE,\n  is_available BOOLEAN DEFAULT TRUE\n);"
            ],
            explanation: "A cars table for dealership or rental management with VIN (Vehicle Identification Number) as unique identifier and availability tracking."
        }
    },

    // SELECT Queries
    {
        intent: "select_all",
        patterns: [
            "select all",
            "get all records",
            "fetch all data",
            "show all",
            "display all rows"
        ],
        response: {
            sql: [
                "SELECT * FROM table_name;"
            ],
            explanation: "SELECT * retrieves all columns from a table. For better performance, specify only needed columns instead of using *."
        }
    },
    {
        intent: "select_specific",
        patterns: [
            "select specific columns",
            "get certain columns",
            "choose columns",
            "select some fields"
        ],
        response: {
            sql: [
                "SELECT column1, column2, column3",
                "FROM table_name;"
            ],
            explanation: "Specify column names to retrieve only the data you need. This improves query performance and reduces data transfer."
        }
    },
    {
        intent: "select_where",
        patterns: [
            "select where",
            "filter data",
            "conditional select",
            "where clause",
            "filter rows"
        ],
        response: {
            sql: [
                "SELECT * FROM table_name",
                "WHERE condition;",
                "",
                "-- Examples:",
                "SELECT * FROM users WHERE age > 18;",
                "SELECT * FROM products WHERE price BETWEEN 10 AND 50;",
                "SELECT * FROM orders WHERE status = 'pending';"
            ],
            explanation: "The WHERE clause filters rows based on conditions. You can use comparison operators (=, >, <, >=, <=, <>), BETWEEN, IN, LIKE, and logical operators (AND, OR, NOT)."
        }
    },
    {
        intent: "select_distinct",
        patterns: [
            "select distinct",
            "unique values",
            "no duplicates",
            "distinct records"
        ],
        response: {
            sql: [
                "SELECT DISTINCT column_name",
                "FROM table_name;",
                "",
                "-- Multiple columns:",
                "SELECT DISTINCT column1, column2",
                "FROM table_name;"
            ],
            explanation: "DISTINCT removes duplicate values from the result set. When used with multiple columns, it returns unique combinations of those columns."
        }
    },

    // JOIN Operations
    {
        intent: "inner_join",
        patterns: [
            "inner join",
            "join tables",
            "combine tables",
            "match records",
            "join two tables"
        ],
        response: {
            sql: [
                "SELECT a.column1, b.column2",
                "FROM table_a a",
                "INNER JOIN table_b b ON a.id = b.a_id;"
            ],
            explanation: "INNER JOIN returns only rows that have matching values in both tables. It's the most common type of join and excludes non-matching rows from both tables."
        }
    },
    {
        intent: "left_join",
        patterns: [
            "left join",
            "left outer join",
            "all from left table"
        ],
        response: {
            sql: [
                "SELECT a.column1, b.column2",
                "FROM table_a a",
                "LEFT JOIN table_b b ON a.id = b.a_id;"
            ],
            explanation: "LEFT JOIN returns all rows from the left table and matching rows from the right table. Non-matching right rows show NULL values."
        }
    },
    {
        intent: "right_join",
        patterns: [
            "right join",
            "right outer join",
            "all from right table"
        ],
        response: {
            sql: [
                "SELECT a.column1, b.column2",
                "FROM table_a a",
                "RIGHT JOIN table_b b ON a.id = b.a_id;"
            ],
            explanation: "RIGHT JOIN returns all rows from the right table and matching rows from the left table. Non-matching left rows show NULL values."
        }
    },

    // Aggregate Functions
    {
        intent: "aggregate_count",
        patterns: [
            "count records",
            "count rows",
            "how many",
            "total count",
            "count function"
        ],
        response: {
            sql: [
                "SELECT COUNT(*) FROM table_name;",
                "SELECT COUNT(column_name) FROM table_name;",
                "SELECT COUNT(*) FROM orders WHERE status = 'completed';"
            ],
            explanation: "COUNT() returns the number of rows. COUNT(*) counts all rows, while COUNT(column) counts non-NULL values in that column."
        }
    },
    {
        intent: "aggregate_sum_avg",
        patterns: [
            "sum values",
            "calculate total",
            "average",
            "mean value",
            "sum function",
            "avg function"
        ],
        response: {
            sql: [
                "SELECT SUM(amount) FROM orders;",
                "SELECT AVG(price) FROM products;",
                "SELECT SUM(total_amount) as total_sales, AVG(total_amount) as avg_order_value FROM orders;"
            ],
            explanation: "SUM() calculates the total of numeric values. AVG() calculates the arithmetic mean. Both ignore NULL values."
        }
    },
    {
        intent: "group_by",
        patterns: [
            "group by",
            "group records",
            "aggregate by category",
            "summarize by"
        ],
        response: {
            sql: [
                "SELECT category, COUNT(*) as item_count FROM products GROUP BY category;",
                "SELECT category, COUNT(*) as item_count FROM products GROUP BY category HAVING COUNT(*) > 5;"
            ],
            explanation: "GROUP BY groups rows with the same values. Use aggregate functions with GROUP BY. HAVING filters groups (unlike WHERE which filters rows)."
        }
    },

    // Data Modification
    {
        intent: "insert_data",
        patterns: [
            "insert data",
            "add record",
            "insert into",
            "add new row",
            "insert row"
        ],
        response: {
            sql: [
                "INSERT INTO table_name (column1, column2, column3) VALUES ('value1', 'value2', 'value3');",
                "INSERT INTO table_name (column1, column2) VALUES ('value1a', 'value2a'), ('value1b', 'value2b'), ('value1c', 'value2c');"
            ],
            explanation: "INSERT INTO adds new rows to a table. You can insert single or multiple rows at once. Column order must match value order."
        }
    },
    {
        intent: "update_data",
        patterns: [
            "update data",
            "modify record",
            "change value",
            "update row",
            "edit record"
        ],
        response: {
            sql: [
                "UPDATE table_name",
                "SET column1 = 'new_value', column2 = 'another_value'",
                "WHERE condition;",
                "",
                "-- Example:",
                "UPDATE users",
                "SET email = 'new@email.com', updated_at = NOW()",
                "WHERE user_id = 1;"
            ],
            explanation: "UPDATE modifies existing records. ALWAYS use WHERE clause to avoid updating all rows accidentally. Test with SELECT first."
        }
    },
    {
        intent: "delete_data",
        patterns: [
            "delete data",
            "remove record",
            "delete row",
            "remove from table"
        ],
        response: {
            sql: [
                "DELETE FROM table_name",
                "WHERE condition;",
                "",
                "-- Example:",
                "DELETE FROM orders WHERE status = 'cancelled';",
                "",
                "-- Delete all (use with caution!):",
                "DELETE FROM table_name;"
            ],
            explanation: "DELETE removes rows from a table. ALWAYS use WHERE clause to avoid deleting all data. Consider using soft deletes (is_deleted flag) instead."
        }
    },

    // Constraints
    {
        intent: "primary_key",
        patterns: [
            "primary key",
            "pk constraint",
            "unique identifier",
            "primary key constraint"
        ],
        response: {
            sql: [
                "CREATE TABLE users (user_id SERIAL PRIMARY KEY, username VARCHAR(50));",
                "ALTER TABLE table_name ADD PRIMARY KEY (column_name);"
            ],
            explanation: "PRIMARY KEY uniquely identifies each row. It must be unique and NOT NULL. A table can have only one primary key, but it can consist of multiple columns (composite key)."
        }
    },
    {
        intent: "foreign_key",
        patterns: [
            "foreign key",
            "fk constraint",
            "reference another table",
            "relationship between tables",
            "create relationship"
        ],
        response: {
            sql: [
                "CREATE TABLE orders (order_id INT PRIMARY KEY, user_id INT, FOREIGN KEY (user_id) REFERENCES users(user_id));",
                "ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;"
            ],
            explanation: "FOREIGN KEY links two tables together. It references a PRIMARY KEY in another table. CASCADE options automatically propagate changes to related records."
        }
    },
    {
        intent: "unique_constraint",
        patterns: [
            "unique constraint",
            "unique values only",
            "no duplicate values",
            "ensure unique"
        ],
        response: {
            sql: [
                "ALTER TABLE table_name ADD UNIQUE (column_name);",
                "ALTER TABLE table_name ADD UNIQUE (column1, column2);"
            ],
            explanation: "UNIQUE constraint ensures all values in a column are different. Unlike PRIMARY KEY, you can have multiple UNIQUE constraints and they allow NULL values."
        }
    },
    {
        intent: "not_null_constraint",
        patterns: [
            "not null",
            "required field",
            "mandatory column",
            "prevent null"
        ],
        response: {
            sql: [
                "-- During table creation:",
                "column_name VARCHAR(50) NOT NULL,",
                "",
                "-- Add to existing column:",
                "ALTER TABLE table_name",
                "ALTER COLUMN column_name SET NOT NULL;"
            ],
            explanation: "NOT NULL constraint ensures a column cannot have NULL values. Use it for mandatory fields like usernames, emails, or IDs."
        }
    },
    {
        intent: "check_constraint",
        patterns: [
            "check constraint",
            "validate data",
            "data validation",
            "ensure value range"
        ],
        response: {
            sql: [
                "CREATE TABLE products (product_id SERIAL PRIMARY KEY, price DECIMAL(10,2) CHECK (price > 0), quantity INT CHECK (quantity >= 0));",
                "ALTER TABLE table_name ADD CONSTRAINT chk_age CHECK (age >= 18 AND age <= 120);"
            ],
            explanation: "CHECK constraint limits the values that can be placed in a column. It's useful for enforcing business rules at the database level."
        }
    },
    {
        intent: "auto_increment",
        patterns: [
            "auto increment",
            "auto id",
            "automatic id",
            "sequence",
            "auto generate id"
        ],
        response: {
            sql: [
                "-- PostgreSQL uses SERIAL for auto-increment:",
                "id SERIAL PRIMARY KEY",
                "",
                "-- Create sequence (advanced):",
                "CREATE SEQUENCE table_name_id_seq START 1000;",
                "",
                "-- Use sequence for existing column:",
                "ALTER TABLE table_name ALTER COLUMN id SET DEFAULT nextval('table_name_id_seq');"
            ],
            explanation: "SERIAL automatically generates unique numbers for new rows. It's the PostgreSQL equivalent of MySQL's AUTO_INCREMENT. Each new row gets the next sequence value."
        }
    },

    // Table Operations
    {
        intent: "alter_table",
        patterns: [
            "alter table",
            "modify table",
            "change table structure",
            "add column",
            "drop column"
        ],
        response: {
            sql: [
                "-- Add column:",
                "ALTER TABLE table_name",
                "ADD COLUMN column_name datatype;",
                "",
                "-- Drop column:",
                "ALTER TABLE table_name",
                "DROP COLUMN column_name;",
                "",
                "-- Modify column type:",
                "ALTER TABLE table_name",
                "ALTER COLUMN column_name TYPE new_datatype;",
                "",
                "-- Rename column:",
                "ALTER TABLE table_name",
                "RENAME COLUMN old_name TO new_name;"
            ],
            explanation: "ALTER TABLE changes table structure. Use ALTER COLUMN for modifications. You can add, remove, or modify columns. Be careful with DROP COLUMN on production databases."
        }
    },
    {
        intent: "drop_table",
        patterns: [
            "drop table",
            "delete table",
            "remove table",
            "destroy table"
        ],
        response: {
            sql: [
                "-- Drop single table:",
                "DROP TABLE table_name;",
                "",
                "-- Drop if exists (prevents error):",
                "DROP TABLE IF EXISTS table_name;",
                "",
                "-- Drop multiple tables:",
                "DROP TABLE table1, table2, table3;"
            ],
            explanation: "DROP TABLE permanently deletes a table and all its data. This action cannot be undone. Always backup before dropping tables in production."
        }
    },
    {
        intent: "truncate_table",
        patterns: [
            "truncate table",
            "clear table",
            "empty table",
            "remove all rows fast"
        ],
        response: {
            sql: [
                "TRUNCATE TABLE table_name CASCADE;"
            ],
            explanation: "TRUNCATE removes all rows from a table quickly. It's faster than DELETE because it doesn't log individual row deletions. Use CASCADE to truncate tables with foreign keys."
        }
    },

    // Indexes
    {
        intent: "create_index",
        patterns: [
            "create index",
            "add index",
            "improve performance",
            "speed up queries",
            "index column"
        ],
        response: {
            sql: [
                "-- Simple index:",
                "CREATE INDEX idx_name ON table_name(column_name);",
                "",
                "-- Unique index:",
                "CREATE UNIQUE INDEX idx_email ON users(email);",
                "",
                "-- Composite index:",
                "CREATE INDEX idx_name_date ON orders(customer_name, order_date);"
            ],
            explanation: "Indexes speed up data retrieval but slow down INSERT/UPDATE. Create indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses."
        }
    },

    // Subqueries
    {
        intent: "subquery",
        patterns: [
            "subquery",
            "nested query",
            "query inside query",
            "inner query"
        ],
        response: {
            sql: [
                "-- Subquery in WHERE:",
                "SELECT * FROM products",
                "WHERE price > (SELECT AVG(price) FROM products);",
                "",
                "-- Subquery in FROM:",
                "SELECT avg_price FROM",
                "  (SELECT category, AVG(price) as avg_price",
                "   FROM products GROUP BY category) as subq;",
                "",
                "-- Subquery with IN:",
                "SELECT * FROM users",
                "WHERE user_id IN (SELECT user_id FROM orders);"
            ],
            explanation: "Subqueries are queries nested inside other queries. They can be used in SELECT, FROM, WHERE, and HAVING clauses. Consider using JOINs for better performance."
        }
    },

    // Ordering and Limiting
    {
        intent: "order_by",
        patterns: [
            "order by",
            "sort results",
            "ascending",
            "descending",
            "arrange data"
        ],
        response: {
            sql: [
                "-- Ascending (default):",
                "SELECT * FROM products ORDER BY price ASC;",
                "",
                "-- Descending:",
                "SELECT * FROM products ORDER BY price DESC;",
                "",
                "-- Multiple columns:",
                "SELECT * FROM users ORDER BY last_name ASC, first_name ASC;"
            ],
            explanation: "ORDER BY sorts the result set. ASC (ascending) is default. You can sort by multiple columns - the second column breaks ties in the first."
        }
    },
    {
        intent: "limit_offset",
        patterns: [
            "limit results",
            "pagination",
            "first n rows",
            "skip rows",
            "limit offset"
        ],
        response: {
            sql: [
                "-- First 10 rows:",
                "SELECT * FROM products LIMIT 10;",
                "",
                "-- Pagination (skip first 20, get next 10):",
                "SELECT * FROM products LIMIT 10 OFFSET 20;",
                "",
                "-- Alternative syntax:",
                "SELECT * FROM products LIMIT 20, 10;"
            ],
            explanation: "LIMIT restricts the number of rows returned. OFFSET skips rows before returning. This is essential for pagination in web applications."
        }
    },

    // LIKE and Pattern Matching
    {
        intent: "like_pattern",
        patterns: [
            "like pattern",
            "pattern matching",
            "search text",
            "wildcard search",
            "contains"
        ],
        response: {
            sql: [
                "-- Starts with:",
                "SELECT * FROM users WHERE name LIKE 'John%';",
                "",
                "-- Ends with:",
                "SELECT * FROM users WHERE email LIKE '%@gmail.com';",
                "",
                "-- Contains (case-insensitive):",
                "SELECT * FROM products WHERE description ILIKE '%sale%';",
                "",
                "-- Single character wildcard:",
                "SELECT * FROM users WHERE name LIKE 'J_hn';"
            ],
            explanation: "LIKE is used for pattern matching. % matches any sequence of characters. _ matches exactly one character. ILIKE is case-insensitive (PostgreSQL standard)."
        }
    },

    // NULL Handling
    {
        intent: "null_handling",
        patterns: [
            "null values",
            "is null",
            "is not null",
            "handle null",
            "check null"
        ],
        response: {
            sql: [
                "-- Check for NULL:",
                "SELECT * FROM users WHERE phone IS NULL;",
                "",
                "-- Check for NOT NULL:",
                "SELECT * FROM users WHERE email IS NOT NULL;",
                "",
                "-- Replace NULL with default:",
                "SELECT COALESCE(phone, 'N/A') FROM users;",
                "",
                "-- Multiple fallbacks:",
                "SELECT COALESCE(phone, mobile, 'No phone') FROM users;"
            ],
            explanation: "NULL represents missing or unknown data. Use IS NULL or IS NOT NULL to check (not = NULL). COALESCE returns the first non-NULL value in PostgreSQL."
        }
    },

    // Views
    {
        intent: "create_view",
        patterns: [
            "create view",
            "virtual table",
            "saved query",
            "view definition"
        ],
        response: {
            sql: [
                "-- Create view:",
                "CREATE VIEW active_users AS",
                "SELECT user_id, username, email",
                "FROM users",
                "WHERE is_active = TRUE;",
                "",
                "-- Use view:",
                "SELECT * FROM active_users;",
                "",
                "-- Drop view:",
                "DROP VIEW IF EXISTS active_users;"
            ],
            explanation: "Views are virtual tables based on SELECT queries. They simplify complex queries, provide security by limiting data access, and don't store data themselves."
        }
    },

    // Transactions
    {
        intent: "transactions",
        patterns: [
            "transaction",
            "commit",
            "rollback",
            "begin transaction",
            "atomic operation"
        ],
        response: {
            sql: [
                "-- Start transaction:",
                "START TRANSACTION;",
                "",
                "-- Your SQL operations:",
                "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
                "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
                "",
                "-- If all successful:",
                "COMMIT;",
                "",
                "-- If error occurs:",
                "ROLLBACK;"
            ],
            explanation: "Transactions ensure ACID properties (Atomicity, Consistency, Isolation, Durability). All operations succeed together or fail together, maintaining data integrity."
        }
    },

    // Data Types
    {
        intent: "data_types",
        patterns: [
            "data types",
            "column types",
            "mysql types",
            "what type to use"
        ],
        response: {
            sql: [
                "-- Numeric: INT, BIGINT, DECIMAL(10,2), FLOAT, SERIAL",
                "-- String: VARCHAR(255), CHAR(10), TEXT",
                "-- Date/Time: DATE, TIMESTAMP, TIME",
                "-- Boolean: BOOLEAN",
                "-- Binary: BYTEA",
                "-- Special: JSON, JSONB, UUID"
            ],
            explanation: "Choose data types based on data nature and size. VARCHAR for variable text, DECIMAL for money, TIMESTAMP for dates, SERIAL for auto-incrementing IDs. Use JSONB for JSON data."
        }
    },

    // UNION
    {
        intent: "union_queries",
        patterns: [
            "union",
            "combine results",
            "merge queries",
            "union all"
        ],
        response: {
            sql: [
                "-- UNION (removes duplicates):",
                "SELECT name FROM customers",
                "UNION",
                "SELECT name FROM suppliers;",
                "",
                "-- UNION ALL (keeps duplicates):",
                "SELECT name FROM customers",
                "UNION ALL",
                "SELECT name FROM suppliers;"
            ],
            explanation: "UNION combines results from multiple SELECT statements. UNION removes duplicates, UNION ALL keeps them. Both require matching column count and compatible types."
        }
    },

    // CASE Statement
    {
        intent: "case_statement",
        patterns: [
            "case when",
            "if else sql",
            "conditional logic",
            "case statement"
        ],
        response: {
            sql: [
                "SELECT product_name, price,",
                "  CASE",
                "    WHEN price < 10 THEN 'Budget'",
                "    WHEN price < 50 THEN 'Mid-range'",
                "    WHEN price < 100 THEN 'Premium'",
                "    ELSE 'Luxury'",
                "  END AS price_category",
                "FROM products;"
            ],
            explanation: "CASE provides if-then-else logic in SQL. It evaluates conditions in order and returns the result for the first true condition. ELSE handles unmatched cases."
        }
    },

    // Date Functions
    {
        intent: "date_functions",
        patterns: [
            "date functions",
            "current date",
            "date difference",
            "date format"
        ],
        response: {
            sql: [
                "-- Current date/time:",
                "SELECT NOW(), CURRENT_DATE, CURRENT_TIME;",
                "",
                "-- Extract parts:",
                "SELECT EXTRACT(YEAR FROM date_col), EXTRACT(MONTH FROM date_col), EXTRACT(DAY FROM date_col);",
                "",
                "-- Date arithmetic:",
                "SELECT date_col + INTERVAL '7 days';",
                "SELECT end_date - start_date;",
                "",
                "-- Format date:",
                "SELECT TO_CHAR(date_col, 'YYYY-MM-DD');"
            ],
            explanation: "Date functions manipulate date/time values. NOW() returns current datetime, EXTRACT() gets date parts, date arithmetic uses + INTERVAL, TO_CHAR() formats dates."
        }
    },

    // String Functions
    {
        intent: "string_functions",
        patterns: [
            "string functions",
            "text manipulation",
            "concat",
            "substring"
        ],
        response: {
            sql: [
                "-- Concatenate:",
                "SELECT CONCAT(first_name, ' ', last_name) AS full_name;",
                "",
                "-- Substring:",
                "SELECT SUBSTRING(name, 1, 3);",
                "",
                "-- Case conversion:",
                "SELECT UPPER(name), LOWER(email);",
                "",
                "-- Trim whitespace:",
                "SELECT TRIM(name);",
                "",
                "-- Length:",
                "SELECT LENGTH(description);"
            ],
            explanation: "String functions manipulate text data. CONCAT joins strings, SUBSTRING extracts parts, UPPER/LOWER change case, TRIM removes whitespace, LENGTH counts characters."
        }
    }
];

// Function to find matching intent based on user input
export function findMatchingIntent(userInput: string): SQLIntent | null {
    const normalizedInput = userInput.toLowerCase().trim();

    // Check for comprehensive database schema pattern: "create database of X and create tables and insert values"
    const comprehensivePattern = /create\s+(?:a\s+)?database\s+(?:of\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s+.*(?:create|add).*table.*(?:insert|with).*(?:sample\s+)?data/i;
    const comprehensiveMatch = userInput.match(comprehensivePattern);
    if (comprehensiveMatch && comprehensiveMatch[1]) {
        const dbName = comprehensiveMatch[1];
        
        // Generate contextual tables and data based on database name
        let tables: string[] = [];
        let inserts: string[] = [];
        
        const dbNameLower = dbName.toLowerCase();
        
        if (dbNameLower.includes('car') || dbNameLower.includes('vehicle') || dbNameLower.includes('auto')) {
            tables = ['Cars', 'Manufacturers', 'Dealerships'];
            inserts = [
                `INSERT INTO Cars (name, manufacturer_id, model_year, price) VALUES ('Toyota Camry', 1, 2023, 35000), ('Honda Accord', 2, 2023, 38000);`,
                `INSERT INTO Manufacturers (name, country, founded_year) VALUES ('Toyota', 'Japan', 1937), ('Honda', 'Japan', 1948);`,
                `INSERT INTO Dealerships (name, city, phone) VALUES ('Downtown Motors', 'New York', '555-0101'), ('Suburban Motors', 'Boston', '555-0102');`
            ];
        } else if (dbNameLower.includes('airline') || dbNameLower.includes('flight') || dbNameLower.includes('airport')) {
            tables = ['Aircraft', 'Flights', 'Passengers'];
            inserts = [
                `INSERT INTO Aircraft (model, capacity, manufacturer) VALUES ('Boeing 747', 450, 'Boeing'), ('Airbus A380', 555, 'Airbus');`,
                `INSERT INTO Flights (flight_number, aircraft_id, departure_city, arrival_city, departure_time) VALUES ('AA100', 1, 'New York', 'London', '2024-01-15 08:00:00'), ('UA200', 2, 'Los Angeles', 'Tokyo', '2024-01-15 10:30:00');`,
                `INSERT INTO Passengers (first_name, last_name, flight_id, seat_number) VALUES ('John', 'Doe', 1, '12A'), ('Jane', 'Smith', 1, '12B');`
            ];
        } else if (dbNameLower.includes('company') || dbNameLower.includes('office') || dbNameLower.includes('employee')) {
            tables = ['Departments', 'Employees', 'Projects'];
            inserts = [
                `INSERT INTO Departments (name, manager, budget) VALUES ('Engineering', 'Alice Johnson', 500000), ('Sales', 'Bob Williams', 300000);`,
                `INSERT INTO Employees (name, department_id, salary, hire_date) VALUES ('Alice Johnson', 1, 120000, '2020-01-15'), ('Bob Williams', 2, 100000, '2019-06-01');`,
                `INSERT INTO Projects (name, department_id, start_date, budget) VALUES ('Product A', 1, '2024-01-01', 250000), ('Product B', 1, '2024-02-01', 280000);`
            ];
        } else if (dbNameLower.includes('store') || dbNameLower.includes('shop') || dbNameLower.includes('retail')) {
            tables = ['Products', 'Categories', 'Orders'];
            inserts = [
                `INSERT INTO Categories (name, description) VALUES ('Electronics', 'Electronic devices'), ('Clothing', 'Apparel and accessories');`,
                `INSERT INTO Products (name, category_id, price, stock) VALUES ('Laptop', 1, 999.99, 50), ('T-Shirt', 2, 29.99, 200);`,
                `INSERT INTO Orders (product_id, quantity, order_date, total_price) VALUES (1, 2, '2024-01-10', 1999.98), (2, 5, '2024-01-11', 149.95);`
            ];
        } else if (dbNameLower.includes('school') || dbNameLower.includes('university') || dbNameLower.includes('student')) {
            tables = ['Students', 'Courses', 'Enrollments'];
            inserts = [
                `INSERT INTO Students (first_name, last_name, email, enrollment_date) VALUES ('John', 'Smith', 'john@school.edu', '2023-09-01'), ('Maria', 'Garcia', 'maria@school.edu', '2023-09-01');`,
                `INSERT INTO Courses (course_code, title, instructor, credits) VALUES ('CS101', 'Introduction to Programming', 'Dr. Johnson', 3), ('MATH201', 'Calculus II', 'Dr. Lee', 4);`,
                `INSERT INTO Enrollments (student_id, course_id, grade, semester) VALUES (1, 1, 'A', 'Fall 2023'), (2, 1, 'B+', 'Fall 2023');`
            ];
        } else {
            // Generic tables for unknown database names
            tables = ['Items', 'Users', 'Transactions'];
            inserts = [
                `INSERT INTO Items (name, description, value) VALUES ('Item 1', 'Description 1', 100.00), ('Item 2', 'Description 2', 200.00);`,
                `INSERT INTO Users (username, email, created_at) VALUES ('user1', 'user1@example.com', NOW()), ('user2', 'user2@example.com', NOW());`,
                `INSERT INTO Transactions (user_id, item_id, quantity, transaction_date) VALUES (1, 1, 2, NOW()), (2, 2, 1, NOW());`
            ];
        }
        
        // Build comprehensive SQL
        const sql = [
            `CREATE SCHEMA ${dbName};`,
            `SET search_path TO ${dbName};`,
            ...tables.map(table => {
                const tableLower = table.toLowerCase();
                if (tableLower === 'cars') {
                    return `CREATE TABLE Cars (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  manufacturer_id INT,\n  model_year INT,\n  price DECIMAL(10,2),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`;
                } else if (tableLower === 'manufacturers') {
                    return `CREATE TABLE Manufacturers (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  country VARCHAR(50),\n  founded_year INT\n);`;
                } else if (tableLower === 'dealerships') {
                    return `CREATE TABLE Dealerships (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  city VARCHAR(50),\n  phone VARCHAR(15)\n);`;
                } else if (tableLower === 'aircraft') {
                    return `CREATE TABLE Aircraft (\n  id SERIAL PRIMARY KEY,\n  model VARCHAR(50) NOT NULL,\n  capacity INT,\n  manufacturer VARCHAR(50)\n);`;
                } else if (tableLower === 'flights') {
                    return `CREATE TABLE Flights (\n  id SERIAL PRIMARY KEY,\n  flight_number VARCHAR(10) NOT NULL UNIQUE,\n  aircraft_id INT,\n  departure_city VARCHAR(50),\n  arrival_city VARCHAR(50),\n  departure_time TIMESTAMP\n);`;
                } else if (tableLower === 'passengers') {
                    return `CREATE TABLE Passengers (\n  id SERIAL PRIMARY KEY,\n  first_name VARCHAR(50) NOT NULL,\n  last_name VARCHAR(50) NOT NULL,\n  flight_id INT,\n  seat_number VARCHAR(5)\n);`;
                } else if (tableLower === 'departments') {
                    return `CREATE TABLE Departments (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  manager VARCHAR(100),\n  budget DECIMAL(12,2)\n);`;
                } else if (tableLower === 'employees') {
                    return `CREATE TABLE Employees (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  department_id INT,\n  salary DECIMAL(10,2),\n  hire_date DATE\n);`;
                } else if (tableLower === 'projects') {
                    return `CREATE TABLE Projects (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  department_id INT,\n  start_date DATE,\n  budget DECIMAL(10,2)\n);`;
                } else if (tableLower === 'products') {
                    return `CREATE TABLE Products (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  category_id INT,\n  price DECIMAL(10,2),\n  stock INT\n);`;
                } else if (tableLower === 'categories') {
                    return `CREATE TABLE Categories (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  description TEXT\n);`;
                } else if (tableLower === 'orders') {
                    return `CREATE TABLE Orders (\n  id SERIAL PRIMARY KEY,\n  product_id INT,\n  quantity INT,\n  order_date TIMESTAMP,\n  total_price DECIMAL(10,2)\n);`;
                } else if (tableLower === 'students') {
                    return `CREATE TABLE Students (\n  id SERIAL PRIMARY KEY,\n  first_name VARCHAR(50) NOT NULL,\n  last_name VARCHAR(50) NOT NULL,\n  email VARCHAR(100),\n  enrollment_date DATE\n);`;
                } else if (tableLower === 'courses') {
                    return `CREATE TABLE Courses (\n  id SERIAL PRIMARY KEY,\n  course_code VARCHAR(10) UNIQUE,\n  title VARCHAR(100),\n  instructor VARCHAR(100),\n  credits INT\n);`;
                } else if (tableLower === 'enrollments') {
                    return `CREATE TABLE Enrollments (\n  id SERIAL PRIMARY KEY,\n  student_id INT,\n  course_id INT,\n  grade VARCHAR(2),\n  semester VARCHAR(20)\n);`;
                } else if (tableLower === 'items') {
                    return `CREATE TABLE Items (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  description TEXT,\n  value DECIMAL(10,2)\n);`;
                } else if (tableLower === 'users') {
                    return `CREATE TABLE Users (\n  id SERIAL PRIMARY KEY,\n  username VARCHAR(50) NOT NULL UNIQUE,\n  email VARCHAR(100),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`;
                } else if (tableLower === 'transactions') {
                    return `CREATE TABLE Transactions (\n  id SERIAL PRIMARY KEY,\n  user_id INT,\n  item_id INT,\n  quantity INT,\n  transaction_date TIMESTAMP\n);`;
                } else {
                    return `CREATE TABLE ${table} (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`;
                }
            }),
            ...inserts
        ];
        
        return {
            intent: "create_comprehensive_schema",
            patterns: ["create database with tables and data"],
            response: {
                sql,
                explanation: `Created comprehensive database '${dbName}' with ${tables.length} tables (${tables.join(', ')}) and sample data. You can now query, modify, and explore the database using SQL commands.`
            }
        };
    }

    // Check for dynamic database creation pattern: "create a database of X" or "create database X"
    const dynamicDbPattern = /create\s+(?:a\s+)?database\s+(?:of\s+)?([a-zA-Z_][a-zA-Z0-9_]*)/i;
    const dbMatch = userInput.match(dynamicDbPattern);
    if (dbMatch && dbMatch[1]) {
        const dbName = dbMatch[1];
        return {
            intent: "create_dynamic_database",
            patterns: ["create database"],
            response: {
                sql: [
                    `CREATE SCHEMA ${dbName};`,
                    `SET search_path TO ${dbName};`
                ],
                explanation: `Created schema '${dbName}'. You can now create tables in this schema. Try saying "create a table for..." to add tables.`
            }
        };
    }

    // Check for dynamic table creation pattern: "create a table for X" or "create table X"
    const dynamicTablePattern = /create\s+(?:a\s+)?table\s+(?:for\s+)?([a-zA-Z_][a-zA-Z0-9_]*)/i;
    const tableMatch = userInput.match(dynamicTablePattern);
    if (tableMatch && tableMatch[1]) {
        const tableName = tableMatch[1];
        const singularForm = tableName.endsWith('s') ? tableName.slice(0, -1) : tableName;
        
        // Create a basic table structure for the entity
        return {
            intent: "create_dynamic_table",
            patterns: ["create table"],
            response: {
                sql: [
                    `CREATE TABLE ${tableName} (`,
                    `  id SERIAL PRIMARY KEY,`,
                    `  name VARCHAR(100) NOT NULL,`,
                    `  description TEXT,`,
                    `  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
                    `);`
                ],
                explanation: `Created table '${tableName}' with basic columns (id, name, description, timestamps). You can modify this table or ask for specific columns.`
            }
        };
    }

    // Score each intent based on pattern matches
    let bestMatch: SQLIntent | null = null;
    let highestScore = 0;

    for (const intent of sqlKnowledgeBase) {
        let score = 0;

        for (const pattern of intent.patterns) {
            if (normalizedInput.includes(pattern.toLowerCase())) {
                // Longer pattern matches get higher scores
                score += pattern.length;
            }
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = intent;
        }
    }

    return highestScore > 0 ? bestMatch : null;
}

// Fallback response for unrecognized queries
export const fallbackResponse = {
    sql: [],
    explanation: "I'm sorry, I couldn't find a specific answer for your question. I can help you with:\n\n• Creating databases and tables (students, users, orders, products, etc.)\n• SELECT queries with WHERE, JOIN, GROUP BY\n• INSERT, UPDATE, DELETE operations\n• Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, etc.)\n• Indexes, Views, and Transactions\n• SQL functions (date, string, aggregate)\n\nTry asking something like:\n• 'How to create a students table?'\n• 'Show me JOIN syntax'\n• 'What is a foreign key?'"
};
