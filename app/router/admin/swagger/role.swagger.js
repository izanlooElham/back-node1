
/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  permissions:
 *                      type: array
 *                      description: the permissionId for role
 *                  description:
 *                      type: string
 *                      description: the description for role
 * 
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  permissions:
 *                      type: array
 *                      description: the permissionId for role
 *                  description:
 *                      type: string
 *                      description: the description for role
 * 
 */

/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "62822e4ff68cdded54aa928d"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 *                                          
 */
/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
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
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: get all the roles
 *          responses:
 *              200:
 *                  description: success 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags:  [RBAC(Admin-Panel)]
 *          summary: update the role by id
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Role'
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
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags:  [RBAC(Admin-Panel)]
 *          summary: delete the role by id
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  description: the id of product for updating
 *                  type: string
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