const express = require('express')
const router = express.Router()
const reservasController = require('../controllers/reservasController')

/**
 * @swagger
 * components:
 *  schemas:
 *    Reserva:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: El identificador único de la reserva
 *        hotel:
 *          type: string
 *          description: El nombre del hotel
 *        fecha:
 *          type: string
 *          format: date
 *          description: La fecha de la reserva
 *        tipo_habitacion:
 *          type: string
 *          description: El tipo de habitación
 *        estado:
 *          type: string
 *          description: El estado de la reserva
 *        num_huespedes:
 *          type: integer
 *          description: El número de huéspedes
 *      required:
 *        - id
 *        - hotel
 *        - fecha
 *        - tipo_habitacion
 *        - estado
 *        - num_huespedes
 *      example:
 *        id: 1
 *        hotel: "Hotel Paraíso"
 *        fecha: "2023-05-15"
 *        tipo_habitacion: "Doble"
 *        estado: "Confirmada"
 *        num_huespedes: 3
 */

// Crear reserva
/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Crear una nueva reserva
 *    tags: [Reservas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      201:
 *        description: Reserva creada con éxito
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reserva'
 */
router.post('/', reservasController.create)

// Obtener la lista de reservas
/**
 * @swagger
 * /api/reservas:
 *  get:
 *    summary: Obtener la lista de todas las reservas
 *    tags: [Reservas]
 *    responses:
 *      200:
 *        description: Una lista de reservas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reserva'
 */
router.get('/', reservasController.readAll)

// Obtener información de una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *    summary: Obtener información de una reserva específica
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: El identificador único de la reserva
 *    responses:
 *      200:
 *        description: Información de la reserva específica
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reserva'
 *      404:
 *        description: Reserva no encontrada
 */
router.get('/:id', reservasController.readOne)

// Actualizar información de una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *    summary: Actualizar información de una reserva específica
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: El identificador único de la reserva
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      200:
 *        description: Reserva actualizada con éxito
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reserva'
 *      404:
 *        description: Reserva no encontrada
 */
router.put('/:id', reservasController.update)

// Eliminar una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  delete:
 *    summary: Eliminar una reserva específica
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: El identificador único de la reserva
 *    responses:
 *      200:
 *        description: Reserva eliminada con éxito
 *      404:
 *        description: Reserva no encontrada
 */
router.delete('/:id', reservasController.delete)

// Filtros de reservas
/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *    summary: Filtrar reservas
 *    tags: [Reservas]
 *    parameters:
 *      - in: query
 *        name: hotel
 *        schema:
 *          type: string
 *        description: El nombre del hotel
 *      - in: query
 *        name: fecha_inicio
 *        schema:
 *          type: string
 *          format: date
 *        description: La fecha de inicio
 *      - in: query
 *        name: fecha_fin
 *        schema:
 *          type: string
 *          format: date
 *        description: La fecha de fin
 *      - in: query
 *        name: tipo_habitacion
 *        schema:
 *          type: string
 *        description: El tipo de habitación
 *      - in: query
 *        name: estado
 *        schema:
 *          type: string
 *        description: El estado de la reserva
 *      - in: query
 *        name: num_huespedes
 *        schema:
 *          type: integer
 *        description: El número de huéspedes
 *    responses:
 *      200:
 *        description: Reservas filtradas con éxito
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reserva'
 */
router.get('/search', reservasController.filter)


module.exports = router
