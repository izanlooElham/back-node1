/** 
 * @swagger
 *  definitions:
 *      AllTheStories:
 *          type: object 
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      stories:       
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  title: 
 *                                      type: string
 *                                      example: "title of story"
 *                                  video: 
 *                                      type: string
 *                                      example: "video of story"
 *                                  image:
 *                                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          story:
 *              type: object
 *              required:
 *                  -   title
 *                  -   video
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of product
 *                  video: 
 *                      type: string
 *                      description: the video of story
 *                      format: binary
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *         Update-story:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of product
 *                  video: 
 *                      type: string
 *                      description: the text of product
 *                      format: binary
 *                  image: 
 *                      type: file
 */
/**
 * @swagger
 *  /admin/story/add:
 *      post:
 *          tags: [Story(Admin-Panel)]
 *          summary: create and save story
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/story'
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
 *  /admin/story/all:
 *      get:
 *          tags: [Story(Admin-Panel)]
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
 *                              $ref: '#/definitions/AllTheStories'   
 */

/**
 * @swagger
 *  /admin/story/delete/{id}:
 *      delete:
 *          tags:  [Story(Admin-Panel)]
 *          summary: delete one story by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: objectId of story
 *                  type: string
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
 *  /admin/story/image/add/{id}:
 *      patch:
 *          tags: [Story(Admin-Panel)]
 *          summary: delete one story by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: objectId of story
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-story'
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