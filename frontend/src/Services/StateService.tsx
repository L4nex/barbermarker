import axiosConfig from '../axiosConfig';
import { AxiosResponse } from "axios";
import { StateDTO } from '../DTO/PersonalInformationDTO';

export function findStates() {        
    return new Promise<StateDTO[]>((resolve, reject) => {
        axiosConfig.get(`/states`)
            .then((response: AxiosResponse<StateDTO[]>) => {
                if (response.status > 300) reject()
                else resolve(response.data)
            });
    });
}

