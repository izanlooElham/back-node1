/**
 * @swagger
 *  definitions:
 *      publicOfDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20x
 *              data:
 *                  type: object
 *                  properties:
 *                      message:        
 *                          type: string
 *                          example: "the best message for that action"
 * 
 */
/** 
 * @swagger
 *  definitions:
 *      ListOfProducts:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      products:       
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  title: 
 *                                      type: string
 *                                      example: "title of product"
 *                                  text: 
 *                                      type: string
 *                                      example: "text of product"
 *                                  short_text: 
 *                                      type: string
 *                                      example: "short_text of product"
 *                                  images: 
 *                                      type: array
 *                                      example: "images of product"
 *                                  count: 
 *                                      type: integer
 *                                      example: "count of product"
 *                                  discount: 
 *                                      type: integer
 *                                      example: "discount of product"
 *                                  price: 
 *                                      type: integer
 *                                      example: "price of product"
 *                                  category: 
 *                                      type: string
 *                                      example: "category of product"
 *                                  tags: 
 *                                      type: array
 *                                      example: "tags of product"
 * 
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   images
 *                  -   price
 *                  -   category
 *                  -   count
 *                  -   discount
 *                  -   tags
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of product
 *                  text: 
 *                      type: string
 *                      description: the text of product
 *                  short_text: 
 *                      type: string
 *                      description: the short_text of product
 *                  images: 
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                  price: 
 *                      type: string
 *                      description: the title of product
 *                  tags: 
 *                      type: array
 *                      description: the title of product
 *                  category: 
 *                      type: string
 *                      description: the title of product
 *                  count: 
 *                      type: string
 *                      description: the title of product
 *                  discount: 
 *                      type: string
 *                      description: the title of product
 *                  width: 
 *                      type: string
 *                      description: the width of product packet
 *                  height: 
 *                      type: string
 *                      description: the height of product packet 
 *                  weight: 
 *                      type: string
 *                      description: the weight of product packet 
 *                  length: 
 *                      type: string
 *                      description: the length of product packet  
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *         Update-Product:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of product
 *                  text: 
 *                      type: string
 *                      description: the text of product
 *                  short_text: 
 *                      type: string
 *                      description: the short_text of product
 *                  images: 
 *                      type: array
 *                      items: 
 *                          type: string
 *                          format: binary
 *                  price: 
 *                      type: string
 *                      description: the title of product
 *                  tags: 
 *                      type: array
 *                      description: the title of product
 *                  category: 
 *                      type: string
 *                      description: the title of product
 *                  count: 
 *                      type: string
 *                      description: the title of product
 *                  discount: 
 *                      type: string
 *                      description: the title of product
 *                  width: 
 *                      type: string
 *                      description: the width of product packet
 *                  height: 
 *                      type: string
 *                      description: the height of product packet 
 *                  weight: 
 *                      type: string
 *                      description: the weight of product packet 
 *                  length: 
 *                      type: string
 *                      description: the length of product packet  
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(Admin-Panel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: success 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 */
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: get list of all the products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, short_text
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfProducts'   
 */
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags:  [Product(Admin-Panel)]
 *          summary: get one product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: objectId of product
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/update/{id}:
 *      patch:
 *          tags:  [Product(Admin-Panel)]
 *          summary: update one product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: the id of product for updating
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Product'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 * 
 * 
 */
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags:  [Product(Admin-Panel)]
 *          summary: delete one product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: objectId of product
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 */