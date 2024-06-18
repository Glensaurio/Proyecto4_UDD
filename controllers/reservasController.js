const reservations = [
  {
    id: 1,
    hotel: "Hotel Paraíso",
    fecha: "2023-05-15",
    tipo_habitacion: "Doble",
    estado: "Confirmada",
    num_huespedes: 3
  },
];

const reservasController = {
  // Crear una nueva reserva
  create: (req, res) => {
    const { hotel, fecha, tipo_habitacion, estado, num_huespedes } = req.body;
    const newReservation = {
      id: reservations.length + 1,
      hotel,
      fecha,
      tipo_habitacion,
      estado,
      num_huespedes
    };
    reservations.push(newReservation);
    res.status(201).json(newReservation);
  },

  // Obtener la lista de todas las reservas
  readAll: (req, res) => {
    res.json(reservations);
  },

  // Obtener información de una reserva específica
  readOne: (req, res) => {
    const { id } = req.params;
    const reserva = reservations.find(r => r.id === parseInt(id));
    if (reserva) {
      res.json(reserva);
    } else {
      res.status(404).json({ msg: "Reserva no encontrada." });
    }
  },

  // Actualizar información de una reserva específica
  update: (req, res) => {
    const { id } = req.params;
    const { hotel, fecha, tipo_habitacion, estado, num_huespedes } = req.body;
    const reservaIndex = reservations.findIndex(r => r.id === parseInt(id));
    if (reservaIndex !== -1) {
      reservations[reservaIndex] = { id: parseInt(id), hotel, fecha, tipo_habitacion, estado, num_huespedes };
      res.json(reservations[reservaIndex]);
    } else {
      res.status(404).json({ msg: "Reserva no encontrada." });
    }
  },

  // Eliminar una reserva específica
  delete: (req, res) => {
    const { id } = req.params;
    const reservaIndex = reservations.findIndex(r => r.id === parseInt(id));
    if (reservaIndex !== -1) {
      reservations.splice(reservaIndex, 1);
      res.json({ msg: "Reserva eliminada con éxito." });
    } else {
      res.status(404).json({ msg: "Reserva no encontrada." });
    }
  },

  // Filtrar reservas
  filter: (req, res) => {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

    let filteredReservations = reservations;

    if (hotel) {
        filteredReservations = filteredReservations.filter(r => r.hotel.toLowerCase().includes(hotel.toLowerCase()));
    }

    if (fecha_inicio || fecha_fin) {
        const startDate = fecha_inicio ? new Date(fecha_inicio) : null;
        const endDate = fecha_fin ? new Date(fecha_fin) : null;

        filteredReservations = filteredReservations.filter(r => {
            const reservationDate = new Date(r.fecha);
            if (startDate && endDate) {
                return reservationDate >= startDate && reservationDate <= endDate;
            }
            if (startDate) {
                return reservationDate >= startDate;
            }
            if (endDate) {
                return reservationDate <= endDate;
            }
            return true;
        });
    }

    if (tipo_habitacion) {
        filteredReservations = filteredReservations.filter(r => r.tipo_habitacion.toLowerCase().includes(tipo_habitacion.toLowerCase()));
    }

    if (estado) {
        filteredReservations = filteredReservations.filter(r => r.estado.toLowerCase().includes(estado.toLowerCase()));
    }

    if (num_huespedes) {
        filteredReservations = filteredReservations.filter(r => r.num_huespedes === parseInt(num_huespedes));
    }

    if (filteredReservations.length > 0) {
        res.json(filteredReservations);
    } else {
        res.status(404).json({ msg: "Reserva no encontrada." });
    }
}
};

module.exports = reservasController;
