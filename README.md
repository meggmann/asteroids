# How to use this example

## Install dependencies

Run the following command

```sh
npm install
```

## Environment variables

Obtain an API key on https://api.nasa.gov/ and create a `.env` file in `/apps/api`
with the following content:

```sh
NASA_API_KEY=your_api_key
```

Otherwise the application will be using a demo key that has a limit of 30 requests per hour.


## Run the example

Run the following command to run the example:

```sh
npm run dev
```

## Go to the browser

And go to the following URL:

http://localhost:3000

## Task 2 - SQL

```sql
SELECT 
    u.name AS user_name,
    u.email AS user_email,
    SUM(p.price * o.quantity) AS total_spent
FROM 
    users u
JOIN 
    orders o ON u.id = o.user_id
JOIN 
    products p ON o.product_id = p.id
WHERE 
    p.category = 'Electronics'
GROUP BY 
    u.id, u.name, u.email
HAVING 
    COUNT(o.id) >= 3
    AND SUM(p.price * o.quantity) > 1000
ORDER BY 
    total_spent DESC;
```