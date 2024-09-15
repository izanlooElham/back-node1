/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required: 
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the head category
 * 
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(Admin-Panel)]
 *          summary: create new category title  
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'    
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
 *  /admin/category/parents:
 *      get:    
 *          tags: [Category(Admin-Panel)]
 *          summary: get All the Parents of Category
 *          responses:
 *              200:
 *                  description: success
 *      
 */
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:    
 *          tags: [Category(Admin-Panel)]
 *          summary: get All the child of parents in Category
 *          parameters: 
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 * 
 *      
 */
/**
 * @swagger
 *  /admin/category/all:
 *      get:    
 *          tags: [Category(Admin-Panel)]
 *          summary: get All the categories 
 *          responses:
 *              200:
 *                  description: success
 *      
 */
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:    
 *          tags: [Category(Admin-Panel)]
 *          summary: get all categories without populate and nested structure 
 *          responses:
 *              200:
 *                  description: success
 *      
 */
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:    
 *          tags: [Category(Admin-Panel)]
 *          summary: update the category 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true  
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 *      
 */
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:    
 *          tags: [Category(Admin-Panel)]
 *          summary: Remove One Category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 *      
 */
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:    
 *          tags: [Category(Admin-Panel)]
 *          summary: Remove One Category BY id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 *      
 */
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
 *  components:
 *      schemas:
 *         Update-category:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of category
 *                  parent: 
 *                      type: string
 *                      description: the parent of category
 *                  image: 
 *                      type: file
 */

/**
 * @swagger
 *  /admin/category/image/add/{id}:
 *      patch:
 *          tags: [Category(Admin-Panel)]
 *          summary: add image to category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: objectId of category
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-category'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition'
 */