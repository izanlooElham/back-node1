/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: the user code for signup/signin
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refreshToken for get fresh token
 *              
 * 
 */

/**
 * @swagger
 *  tags:
 *      name: user-authentication
 *      description: user-auth section
 */

/**
 * @swagger
 *  /user/get-OTP:
 *      post:
 *          tags: [user-authentication]
 *          summary: enter your mobile and get OTP
 *          description: OTP(one time password)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'  
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error         
 *          
 */

/**
 * @swagger
 *  /user/check-OTP:
 *      post:
 *          tags: [user-authentication]
 *          summary: checking the OTP code
 *          description: OTP(one time password)
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error         
 *          
 */
/**
 * @swagger
 *  /user/check-refresh-token:
 *      post:
 *          tags: [user-authentication]
 *          summary: return a new accessToken and refreshToken
 *          description: OTP(one time password)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error         
 *          
 */
