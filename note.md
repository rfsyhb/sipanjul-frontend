# Expected JSON
`GET` /product *received*
{
  [
    {
      "id": Number,
      "name": String,
      "stock": Boolean,
      "type": String,
      "packagesize": String,
      "image_url": String
    },
    {
      ...
    }
  ]
}

`GET` /store-status *received*
{
  "storestatus": Boolean,
}

`POST` /store-status __sent__
{
  "storestatus": Boolean
}

`POST` /verify-token __sent__
{
  "isValid": Boolean,
}

`GET` /opr/sales-report *received*
{
  [
    daily: {
      currentValue: Number,
      oldValue: Number,
      percentage: Float,
      isNegative: Boolean,
    },
    weekly: {
      ...
    },
    monthly: {
      ...
    }
  ]
}

`GET` /opr/bestselling-product *received*
{
  { 
    "weekly": [
      {
        "id": Number,
        "name": String,
        "stock": Boolean,
        "packagesize": String,
        "type": String,
        "image_url": String
      },
      {
        ...
      }
    ],
    "monthly": [
      {
        ...
      },
      {
        ...
      }
    ]
  }
}

`GET` /opr/recent-transaction *received*
{
  [
    {
      "name": String,
      "kuantitas": Number,
      "total": Number,
      "date": Datetime,
    },
    {
      ...
    }
  ]
}

`POST` /opr/checkout __sent__
{
  "items": [
    {
      "id": Number,
      "name": String,
      "quantity": Number,
      "price": Number,
    },
    {
      ...
    }
  ],
  "totalAmount": Number,
}

`GET` /opr/product *received*
{
  [
    {
      "id": Number,
      "name": String,
      "stock": Number,
      "type": String,
      "packagesize": String,
      "price": Number,
      "image_url": String,
    },
    {
      ...
    }
  ]
}

`POST` /opr/product __sent__
{
  "name": String,
  "stock": Number,
  "type": String,
  "packagesize": String,
  "price": Number,
  "image_url": String,
}

`DELETE` /opr/product/:id __sent__
{}

`PUT` /opr/product/:id __sent__
{
  "name": String,
  "type": String,
  "packagesize": String,
  "price": Number,
  "image_url": String,
}

`PUT` /opr/product/update-stock/:id __sent__
{
  "stock": Number,
  "desc": String,
  "isNegative": Boolean,
}

`POST` /opr/report/changed __sent__
{
  "startDate": Datetime,
  "endDate": Datetime,
  "division": String,
}

`POST` /opr/report/sales __sent__
{
  "startDate": Datetime,
  "endDate": Datetime,
  "division": String,
  "selectedData": String,
}

`POST` /opr/print-report __sent__
{}

`GET` /opr/sales-statistic *received*
[
  {
    period: "harian",
    data: [
      {
        "name": String,
        "totalPenjualan": Number, 
      },
      {
        ...
      }
    ]
  },
  {
    period: "mingguan",
    data: [
      {
        "name": String,
        "totalPenjualan": Number, 
      },
      {
        ...
      }
    ]
  },
  {
    period: "bulanan",
    data: [
      {
        "name": String,
        "totalPenjualan": Number, 
      },
      {
        ...
      }
    ]
  },
  {
    period: "tahunan",
    data: [
      {
        "name": String,
        "totalPenjualan": Number, 
      },
      {
        ...
      }
    ]
  },
]

# Need update
/opr/inventory
{
  "id": 2,
  "name": "Beras SPHP Thailand",
  "price": 63000,
  "stock": 100,
  "packagesize": "5Kg",
  "division": "SCPP",
  "image_url": "https://allofresh.id/media/catalog/product/cache/fb82878314ebdeb4be369a6c3c22b713/b/r/brc-8994209001796-1.jpg"
}
- _KURANG_ type "beras" / "lainnya"

# Endpoints
<!-- GUEST -->
1. GET /product 
2. GET /store-status 
3. POST /verify-token 

<!-- ADMIN -->
4. POST /store-status 
5. GET /opr/sales-report 
6. GET /opr/bestselling-product 
7. GET /opr/recent-transaction 
8. POST /opr/checkout
9. GET /opr/product 
10. POST /opr/product
11. PUT /opr/product/:id
12. PUT /opr/product/update-stock/:id
13. DELETE /opr/product/:id
14. POST /opr/report
15. POST /opr/print-report
16. GET /opr/sales-statistic