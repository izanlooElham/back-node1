/** 
 * @swagger
 *  definitions:
 *      ListOfBlogs:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      Blogs:       
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  title: 
 *                                      type: string
 *                                      example: "title of blog"
 *                                  text: 
 *                                      type: string
 *                                      example: "text of blog"
 *                                  short_text: 
 *                                      type: string
 *                                      example: "short_text of blog"
 *                                  image: 
 *                                      type: array
 *                                      example: "image of blog"
 *                                  category: 
 *                                      type: string
 *                                      example: "category of blog"
 *                                  tags: 
 *                                      type: array
 *                                      example: "tags of blog"
 * 
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *                  -   image
 *                  -   tags
 *                  -   reference
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  short_text:
 *                      type: string
 *                      description: the short_text of blog
 *                  tags:
 *                      type: string
 *                      description: the tags of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog
 *                  category:
 *                      type: string
 *                      description: the category of blog
 *                  reference:
 *                      type: string
 *                      description: the refrence of blogs
 */
/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get all blogs 
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
 *                              $ref: '#/definitions/ListOfBlogs' 
 */
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(Admin-Panel)]
 *          summary: add one blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition' 
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *         Update-Blog:
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
 *                  image: 
 *                      type: string
 *                  tags: 
 *                      type: string
 *                      description: the title of product
 *                  category: 
 *                      type: string
 *                      description: the title of product
 *                  reference:
 *                      type: string
 *                      description: the refrence of blogs
 */
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(Admin-Panel)]
 *          summary: update one blog by id
 *          cunsumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Blog'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicOfDefinition' 
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get one blog by id
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
 *  /admin/blogs/remove/{id}:
 *      delete:
 *          tags: [Blog(Admin-Panel)]
 *          summary: remove blog by id
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
