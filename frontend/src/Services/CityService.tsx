import axiosConfig from '../axiosConfig';
import { AxiosResponse } from "axios";
import { CityDTO } from '../DTO/PersonalInformationDTO';

export function findCitysByState(idState: number) {        
    return new Promise<CityDTO[]>((resolve, reject) => {
        axiosConfig.get(`/citys/state/${idState}`)
            .then((response: AxiosResponse<CityDTO[]>) => {
                if (response.status > 300) reject()
                else resolve(response.data)
            });
    });
}

