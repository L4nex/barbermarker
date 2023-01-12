import axiosConfig from '../axiosConfig';
import { AxiosResponse } from "axios";
import { getCurrentUser } from './AuthService';
import { DefaultDashboardDTO } from '../DTO/DefaultDashboard';

export function initDefaultDashboard() {        
    return new Promise<DefaultDashboardDTO>((resolve, reject) => {
        axiosConfig.get(`/user/dashboard/${getCurrentUser()?.userId}`)
            .then((response: AxiosResponse<DefaultDashboardDTO>) => {
                if (response.status > 300) reject()
                else resolve(response.data)
            });
    });
}

