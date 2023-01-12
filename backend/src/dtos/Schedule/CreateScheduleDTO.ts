// DTO para criar schedule
interface CreateScheduleDTO {
    user_id: number;
    barberShop_id: number;
    service_id: number;
    scheduleTime_id: number;
    barber_id?: number;
    active: boolean;
  }
  
  export {CreateScheduleDTO };