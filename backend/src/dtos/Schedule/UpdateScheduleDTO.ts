// DTO para alterar schedule
interface UpdateScheduleDTO {
    user_id: number;
    barberShop_id: number;
    service_id: number;
    scheduleTime_id: number;
    active: boolean;
  }
  
  export {UpdateScheduleDTO };