/**
 * @swagger
 *  /admin/user/all:
 *      get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get list of all the users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in firstName, lastName, mobile, username
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'   
 */
/**
 * @swagger
 *  /admin/user/profile:
 *      get:
 *          tags: [Users(Admin-Panel)]
 *          summary: get list of all the users
 *          responses:
 *              200:
 *                  description: success  
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first name of the user
 *                      example: erfan
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: yousefi
 *                  username:
 *                      type: string
 *                      description: the username of user
 *                      example: erfanyousefi
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  last_name:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  username:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  city:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  mobile:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 */

/**
 * @swagger
 *  /admin/user/update/{id}:
 *      patch:
 *          tags: [Users(Admin-Panel)]
 *          summary: update user detail and profile
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: the id of product for updating
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-profile'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'            
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