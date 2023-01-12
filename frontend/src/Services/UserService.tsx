import axiosConfig from '../axiosConfig';
import { AxiosResponse } from "axios";
import { PersonalInformationDTO } from '../DTO/PersonalInformationDTO';

export function findUser(idUser: number) {        
    return new Promise<PersonalInformationDTO>((resolve, reject) => {
        axiosConfig.get(`/user/${idUser}`)
            .then((response: AxiosResponse<PersonalInformationDTO>) => {
                if (response.status > 300) reject()
                else resolve(response.data)
            });
    });
}

export function findUserByEmail(email: string) {        
    return new Promise<PersonalInformationDTO>((resolve, reject) => {
        axiosConfig.put(`/findUserByEmail`, {
            email
        })
            .then((response: AxiosResponse<PersonalInformationDTO>) => {
                if (response.status > 300) reject()
                else resolve(response.data)
            });
    });
}

export function createUser(user: PersonalInformationDTO) {      
    return new Promise<PersonalInformationDTO>((resolve, reject) => {
        axiosConfig.post(`/user`, {user})
            .then((response: AxiosResponse<PersonalInformationDTO>) => {
                if (response.status > 300) reject()
                else resolve(response.data)
            });
    });
}
