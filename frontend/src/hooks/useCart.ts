import { useState } from "react";
import { v4 as UUIDGenerator } from 'uuid';
import ScheduleDTO from "../DTO/ScheduleDTO";
import { useLocalStorage } from "./useLocalStorage";

export function useCart(unique: string) {
  const { storedValue: schedules, setValue: setSchedules } = useLocalStorage("userCart") ?? [];

  const [storedCart, setStoredCart] = useState(() => {
    return schedules?.find((schedule: ScheduleDTO) => schedule.uuid === unique);
  });

  const setCartItem = (schedule: ScheduleDTO) => {
    setStoredCart(schedule)        
    let newSchedules = schedules?.filter((schedule: ScheduleDTO) => schedule.uuid !== unique);
    if(!schedule.uuid) schedule.uuid = UUIDGenerator();
    else newSchedules?.push(schedule);
    setSchedules(newSchedules ?? []);
  };

  return { storedCart, setCartItem };
}
