import { IUser } from './../../interfaces/IUser';
import { container } from "tsyringe";
import { IAddress } from "../../interfaces/IAddress";
import { ICity } from "../../interfaces/ICity";
import { IDistrict } from "../../interfaces/IDistrict";
import { IProfile } from "../../interfaces/IProfile";
import { IState } from "../../interfaces/IState";
import { AddressRepository } from "../../typeorm/repositories/AddressRepository";
import { CityRepository } from "../../typeorm/repositories/CityRepository";
import { DistrictRepository } from "../../typeorm/repositories/DistrictRepository";
import { ProfileRepository } from "../../typeorm/repositories/ProfileRepository";
import { StateRepository } from "../../typeorm/repositories/StateRepository";
import { UserRepository } from '../../typeorm/repositories/UserRepository';
import { IBarberShop } from '../../interfaces/IBarberShop';
import { BarberShopRepository } from '../../typeorm/repositories/BarberShopRepository';
import { IService } from '../../interfaces/IService';
import { ServiceRepository } from '../../typeorm/repositories/ServiceRepository';
import { IBarber } from '../../interfaces/IBarber';
import { BarberRepository } from '../../typeorm/repositories/BarberRepository';
import { ISchedule } from '../../interfaces/ISchedule';
import { ScheduleRepository } from '../../typeorm/repositories/ScheduleRepository';
import { IScheduleTime } from '../../interfaces/IScheduleTime';
import { ScheduleTimeRepository } from '../../typeorm/repositories/ScheduleTimeRepository';

// Repositorio de Profiles
 container.registerSingleton<IProfile>(
    'ProfileRepository',
    ProfileRepository,
  );

// Repositorio de States
 container.registerSingleton<IState>(
  'StateRepository',
  StateRepository,
);

// Repositorio de States
 container.registerSingleton<IState>(
  'StateRepository',
  StateRepository,
);

// Repositorio de Cities
container.registerSingleton<ICity>(
  'CityRepository',
  CityRepository,
);

// Repositorio de District
container.registerSingleton<IDistrict>(
  'DistrictRepository',
  DistrictRepository,
);

// Repositorio de Address
container.registerSingleton<IAddress>(
  'AddressRepository',
  AddressRepository,
);

// Repositorio de User
container.registerSingleton<IUser>(
  'UserRepository',
  UserRepository,
);

// Repositorio de BarberShop
container.registerSingleton<IBarberShop>(
  'BarberShopRepository',
  BarberShopRepository,
);

// Repositorio de Service
container.registerSingleton<IService>(
  'ServiceRepository',
  ServiceRepository,
);

// Repositorio de Barber
container.registerSingleton<IBarber>(
  'BarberRepository',
  BarberRepository,
);

// Repositorio de Schedule
container.registerSingleton<ISchedule>(
  'ScheduleRepository',
  ScheduleRepository,
);

// Repositorio de ScheduleTime
container.registerSingleton<IScheduleTime>(
  'ScheduleTimeRepository',
  ScheduleTimeRepository,
);