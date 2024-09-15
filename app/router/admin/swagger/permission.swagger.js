

/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: object
 *              required: 
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of category
 *                  description:
 *                      tyep: string
 *                      description: the desc of permissions
 * 
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of category
 *                  description:
 *                      type: string
 *                      description: the desc of permission
 * 
 */

/** 
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:       
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  name: 
 *                                      type: string
 *                                      example: "name of permission"
 *                                  description: 
 *                                      type: string
 *                                      example: "desc of permission"
 * 
 */
/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permissions'
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
 *  /admin/permission/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: get all the permissions
 *          responses:
 *              200 :
 *                  description: success 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags:  [RBAC(Admin-Panel)]
 *          summary: update the permission by id
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
 *                          $ref: '#/components/schemas/Edit-Permission'
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
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags:  [RBAC(Admin-Panel)]
 *          summary: delete the permission by id
 *          parameters:
 *              -   in: path
 *                  name: id
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